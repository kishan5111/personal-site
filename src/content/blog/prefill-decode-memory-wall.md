**TL;DR:** In the serving regimes most people care about, prefill is usually much more compute-friendly while decode is usually memory-bound. Nearly everything about GPU selection, latency optimization, and throughput engineering follows from that. This matters more than ever for agentic workloads — where a single user request can trigger dozens of LLM calls chained together, and latency compounds at every step. This post goes from first principles to a real benchmark comparing the RTX Pro 6000 Blackwell (96 GB GDDR7, 1.792 TB/s) against the H100 SXM (80 GB HBM3, 3.35 TB/s) on GPT-OSS 120B.

## The Short Version

Before going deep, here is the decision frame everything builds toward:

| If your workload looks like this      | What usually dominates        | What to optimize or buy for          |
| ------------------------------------- | ----------------------------- | ------------------------------------ |
| Long prompts, short outputs           | Prefill                       | Tensor throughput, attention kernels |
| Streaming outputs, small decode batch | Decode                        | Memory bandwidth                     |
| Long context or many live sessions    | KV cache pressure             | VRAM, prefix reuse, eviction policy  |
| Multi-GPU serving                     | Inter-GPU communication       | NVLink over PCIe                     |
| Agentic loops with repeated LLM calls | TPOT compounding across calls | Decode latency, prefix caching       |

Use that table as a first pass. The rest of the article is about why those mappings hold up once you look at arithmetic intensity, KV-cache growth, and GPU architecture.

## The Two Phases Nobody Explains Clearly

Every LLM inference request goes through exactly two stages. They are so different in character that they might as well be separate programs running on the same hardware.

![Prefill and decode flow](/blog-assets/prefill-decode-memory-wall/prefill-decode-flow.svg)

### Prefill

When you send a prompt, the model processes **all tokens in parallel** through the full forward pass. For a 512-token prompt across 80 transformer layers, that means 80 attention operations, each attending to all 512 tokens simultaneously. Huge matrix multiplications. Dense arithmetic. The GPU is doing enormous amounts of computation per byte moved.

The output of prefill is two things:

1. The **KV cache** — key and value tensors for every token, every layer, cached for the decode loop
2. The **first token logits** — the probability distribution from which the first output token is sampled

Prefill latency maps directly to  **TTFT (Time to First Token)** .

### Decode

Now the model generates output one token at a time. At each step:

* Only the **single newest token** has its Q, K, V computed
* The new K and V vectors are appended to the KV cache
* The new Q attends against **all cached K vectors** — which means reading the entire KV cache from VRAM for every single token

This is the fundamental problem. To generate one token, the GPU must:

* Read the full model weights (~once)
* Read the full KV cache (~once)
* Do a tiny amount of actual computation

The ratio of memory reads to useful FLOPs is extremely low. This is what "memory-bound" means in practice.

Decode latency per token maps to **TPOT (Time Per Output Token)** and  **ITL (Inter-Token Latency)** .

### End-to-End Latency Math

```
E2E latency = TTFT + (N_output_tokens × TPOT)

where:
TTFT ≈ f(prompt_length, model_size, TFLOPS)
TPOT ≈ f(model_size, KV_cache_size, bandwidth)
```

For a 512-token prompt generating 256 tokens on a mid-range GPU, TTFT might be 200ms and TPOT might be 50ms — meaning the total wait is 200ms + (256 × 50ms) = 13 seconds. TPOT dominates almost every real user interaction.

**This compounds badly in agentic systems.** A single agent task say, a ReAct loop that calls tools, synthesizes results, and reasons over them, might involve 10–20 sequential LLM calls. If each call costs 2 seconds end-to-end, the full task takes 20–40 seconds. Every millisecond you shave off TPOT multiplies across every step in the chain. This is why inference latency is not just a UX concern anymore, it is the primary constraint on how fast an agent can operate.

---

## The Roofline Model: Why This Matters

The [Roofline model](https://en.wikipedia.org/wiki/Roofline_model) is the right mental model for understanding GPU-bound inference. It defines two performance ceilings for any given operation:

```
Compute ceiling:   Peak tensor throughput (e.g. ~989 dense-equivalent tensor TFLOPS on H100 SXM)
Bandwidth ceiling: Peak bandwidth × arithmetic intensity
```

**Arithmetic intensity** is the ratio of FLOPs to bytes moved:

```
Arithmetic Intensity (AI) = FLOPs / Bytes
```

That number tells you how much compute you get out of each byte you move through memory. If the arithmetic intensity is too low, the GPU spends its time waiting for data. If it is high enough, the GPU can stay busy doing math.

Every GPU has a **ridge point**:

- below it, the workload is **memory bound**
- above it, the workload is **compute bound**

![Roofline model with decode near the memory roof and prefill near the compute roof](/blog-assets/prefill-decode-memory-wall/roofline-prefill-decode.svg)

For a matrix multiply of weight matrix W ∈ ℝ^(d_in × d_out) with input X ∈ ℝ^(batch × d_in):

```
FLOPs  = 2 × batch × d_in × d_out
Bytes  = d_in × d_out × dtype_bytes   (just reading the weights, dominant term)
AI     = 2 × batch / dtype_bytes
```

At BF16 (2 bytes): `AI = batch`

That is the punchline. For batch `= 1`, BF16 decode has arithmetic intensity around:

```text
AI ≈ 1 FLOP / byte
```

That is tiny. On modern GPUs, the ridge point is nowhere near `1 FLOP/byte`. So decode at small batch sizes lives far below the ridge point, which means it is overwhelmingly memory bound.

Using a simplified dense-BF16 roofline approximation, the H100 SXM has a ridge point (the batch size where this GEMM view crosses from memory-bound to compute-bound) of roughly:

```
Ridge point = Peak TFLOPS / Peak bandwidth
            = 989 × 10^12 / (3.35 × 10^12)
            ≈ 295 (at BF16)
```

Meaning: under this simplified model, you need an effective batch around `295` before this approximation stops looking clearly bandwidth-dominated. Real decode kernels, cache reuse, quantization, and scheduler behavior will move that threshold, but the important point survives: at batch `= 1`, decode sits deep in the memory-bound regime.

This is why decode is memory-bound. Not as a vague intuition, but as a mathematical consequence of autoregressive generation. If the workload cannot feed the arithmetic units, the card with the bigger compute ceiling still spends its time waiting on memory.

### Quantization shifts the arithmetic intensity

This is one of the cleanest ways to think about quantization.

If you reduce weight precision, you reduce bytes moved per parameter.

- BF16: `2 bytes`
- FP8: `1 byte`
- INT4/FP4: `0.5 bytes` in idealized weight-only terms

So the same approximation becomes:

```text
AI ≈ 2 × B / dtype_bytes
```

Which means:

- BF16: `AI ≈ B`
- FP8: `AI ≈ 2B`
- INT4 / FP4: `AI ≈ 4B`

FP8 doubles arithmetic intensity. At batch=1, you go from AI=1 to AI=2 — still memory-bound, but the effective ridge point is now half of what it was. The compute-bound threshold is lower; you can reach it with smaller batches.

INT4 quantization: AI = 8 × batch. The ridge point drops to ~37 (on H100 SXM), meaning **batch=37 now moves you into compute-bound territory** — which is a very achievable batch size in production.

This is why quantization improves decode throughput beyond just "smaller weights fit in VRAM" — it structurally changes where you sit on the roofline.

So quantization helps. It absolutely does. But it does not magically erase the memory wall.

### Prefill is different

During prefill, the input X has shape `(seq_len, d_model)`  potentially thousands of tokens. If seq_len=2048:

```
AI ≈ 2 × 2048 / 2 = 2048 (BF16)
```

Well above the ridge point. Prefill is compute-bound on data-center GPUs. Empirical confirmation: research systematically placing prefill and decode kernels on the Roofline shows **prefill GEMM kernels cluster near the compute ceiling; decode kernels cluster near the bandwidth ceiling**  even on the same model, the same layer.

---

## Memory Breakdown: Training vs Inference

Understanding where VRAM goes is essential before talking GPUs. The rest of this piece is inference-focused, but it helps to anchor that against training.

### Training (per parameter at BF16 with AdamW)

| Component       | Bytes per param |
| --------------- | --------------- |
| Weights         | 2               |
| Gradients       | 2               |
| Adam m (fp32)   | 4               |
| Adam v (fp32)   | 4               |
| **Total** | **12**    |

A 7B model needs about **56 GB for Adam optimizer state alone** (`m` + `v` in fp32), or about **84 GB** if you include BF16 weights and gradients before counting activations, temporary buffers, or fragmentation. That is why training a 70B model on a single H100 is impossible without offloading, activation checkpointing, ZeRO-style partitioning, and aggressive memory optimization.

### Inference (per parameter at BF16)

| Component       | Bytes per param   |
| --------------- | ----------------- |
| Weights         | 2                 |
| KV cache        | varies            |
| Activations     | small, transient  |
| **Total** | **~2 + KV** |

Inference is far leaner. The KV cache becomes the variable cost, it becomes brutal once context length and concurrency grow.

### KV Cache Formula

For standard Multi-Head Attention (MHA):

```
KV_bytes = 2 × n_layers × n_heads × head_dim × seq_len × batch_size × dtype_bytes
```

The factor of 2 is for K and V. For Grouped Query Attention (GQA), replace `n_heads` with `n_kv_heads`.

```text
KV cache bytes(GQA)
= batch × 2 × n_layers × n_kv_heads × head_dim × seq_len × dtype_bytes
```

Let's work this out using a concrete example to build intuition. I will use gpt-oss-120b, because it is one of my favorite open-weight models.

**GPT-OSS 120B (MoE, 5.1B active params/token):**

From the model architecture:

* n_layers = 36
* attention_heads = 64
* n_kv_heads = 8 (GQA)
* head_dim = 64
* dtype = BF16 (2 bytes)
* context length up to `128k`

So at BF16:

```text
per-token KV bytes
= 2 × 36 × 8 × 64 × 2
= 73,728 bytes
≈ 72 KiB per token per sequence
```

That means:

- **8k tokens** -> about **576 MiB** per sequence
- **32k tokens** -> about **2.25 GiB** per sequence
- **128k tokens** -> about **9.0 GiB** per sequence

These numbers assume the **KV cache itself** is stored in BF16. The MXFP4 checkpoint format affects weight storage, but it does not automatically mean the KV cache is also stored at that precision.

That is for **one request**.

Now multiply by concurrent requests:

- 16 concurrent requests at 8k context -> about **9 GiB**
- 32 concurrent requests at 32k context -> about **72 GiB**
- 16 concurrent requests at 128k context -> about **144 GiB**

That is why long-context serving gets ugly so fast. The problem is not just the model weights. The cache becomes the pressure point.

**Further, Agentic systems make KV cache pressure significantly worse.** A tool-calling agent typically passes the full conversation history,including tool outputs — back as context on every call. An agent running 10 steps with 500-token tool responses per step accumulates 5,000+ tokens of context before it finishes. That's a 5K-token prefill on every subsequent call, each building a fresh KV cache. On a multi-agent setup with parallel workers, this multiplies across however many concurrent agent threads you are running.

![KV cache growth as context length and concurrency increase](/blog-assets/prefill-decode-memory-wall/kv-cache-growth.svg)

### KV eviction is not optional forever

Once capacity pressure grows, you need a policy:

- oldest-first eviction
- idle-session eviction
- TTL-based eviction
- prefix-aware reuse plus eviction of cold tails
- sink-token or rolling-window strategies for long-running sessions

Long-context users are expensive because they consume VRAM continuously. They can kill throughput even when the model itself fits comfortably.

### KV cache dtype changes the math fast

Because KV cache size scales linearly with `dtype_bytes`, dropping precision buys space immediately:

- **BF16 / FP16:** baseline
- **INT8 KV cache:** ~2x smaller than BF16
- **4-bit KV cache:** ~4x smaller than BF16

Using the same GPT-OSS 120B example:

- **BF16:** 8k -> **576 MiB**, 32k -> **2.25 GiB**, 128k -> **9.0 GiB**
- **INT8:** 8k -> **288 MiB**, 32k -> **1.125 GiB**, 128k -> **4.5 GiB**
- **4-bit:** 8k -> **144 MiB**, 32k -> **576 MiB**, 128k -> **2.25 GiB**

That is not just a capacity story. If you shrink the KV cache, you also shrink the bytes moved during attention, so decode can get faster.

But KV quantization is a tradeoff, not a free win. Smaller KV dtypes can save a lot of VRAM and bandwidth, but they can also cost quality if the quantizer or kernel is weak. The real question is not "can I quantize KV?" It is "how much quality do I lose for the space and throughput I gain?"

A recent example is **TurboQuant** from Google Research. The interesting part is not that it quantizes KV cache, many methods do that. The interesting part is that it pushes the quality-loss curve further out: their results report near-lossless behavior around **3.5 bits per channel**, mild degradation around **2.5 bits per channel**, and faster attention-logit computation than 32-bit keys on H100 in their setup. That is why KV dtype is becoming a real serving knob, not just a compression trick.

## GPU Architecture: Where the Numbers Come From

Now we will try to build intution on hardware side.

### Memory Hierarchy

Every GPU has a memory hierarchy with very different bandwidth at each level. The exact numbers vary by architecture, but the order-of-magnitude picture looks like this:

```
HBM/GDDR7  →  L2 cache  →  L1/Shared Memory  →  Registers
~1-4 TB/s     ~10 TB/s      ~100+ TB/s           ~20 PB/s (theoretical)
```

![GPU memory hierarchy from off-chip memory down to SM-local storage](/blog-assets/prefill-decode-memory-wall/gpu-memory-hierarchy.svg)

Model weights and KV cache live in HBM/GDDR7. Every decode step, the full weight matrices and KV cache must traverse the HBM→SM bus. This is the bottleneck.

### HBM vs GDDR7

This is the architectural fault line in the RTX Pro 6000 Blackwell vs H100 comparison.

|                       | HBM3 (H100 SXM)    | GDDR7 (RTX Pro 6000 BW) |
| --------------------- | ------------------ | ----------------------- |
| Bandwidth             | 3.35 TB/s          | 1.8 TB/s                |
| Capacity (single GPU) | 80 GB              | 96 GB                   |
| Latency               | Lower              | Higher                  |
| Physical die          | Stacked on package | Off-package             |
| NVLink support        | Yes (900 GB/s)     | No                      |
| Cost to manufacture   | High               | Lower                   |

HBM is stacked directly on the GPU die using Through-Silicon Vias (TSVs), giving extremely short signal paths and high bandwidth. GDDR7 is faster than GDDR6X but sits off-die on the PCB, limited by the memory bus width (RTX Pro 6000: 512-bit).

### SMs, tensor cores, and warp scheduling

Streaming multiprocessors (SMs) are where the math happens. To understand gpu architecture more deeply i reccomend watching this [video](https://www.youtube.com/watch?v=h9Z4oGN89MU)

They include:

- tensor cores for matrix-heavy AI kernels
- CUDA cores for general arithmetic
- warp schedulers to keep warps in flight
- register files and shared memory to keep data close

At a high level, each H100 Streaming Multiprocessor (SM) packages warp schedulers, CUDA cores, tensor cores, registers, and shared memory/L1 into a unit that can run many warps concurrently and hide latency when data reuse is high.

But none of that saves you if the kernel spends its life stalled on memory fetches.

That is the deeper lesson. GPU compute units are not the bottleneck just because they exist. They are only the bottleneck if the workload can keep them fed.

The RTX PRO 6000 Blackwell has **5th-gen Tensor Cores**, 96 GB of GDDR7, and a very different published spec profile from H100. NVIDIA gives clean workstation headlines like **125 TFLOPS FP32** and **4000 FP4 TOPS**, while H100 publishes data-center tensor numbers like **989 TF32 Tensor TFLOPS** and **1,979 BF16/FP16 Tensor TFLOPS with sparsity**. That is exactly why measured TTFT and TPOT matter more than marketing TOPS when you compare inference cards.

### NVLink vs PCIe

This matters the moment you stop fitting the model or KV cache comfortably on one device.

- **NVLink** gives far higher GPU-to-GPU bandwidth and lower communication pain.
- **PCIe** works, but the communication tax arrives sooner.

For multi-GPU inference:

- NVLink is better for tensor parallelism
- NVLink is better for expert traffic in MoE systems
- NVLink is better for large prompt-side synchronization

If you know you are going multi-GPU, `NVLink > PCIe` is still the right default rule.

---

## The Experiment: RTX Pro 6000 Blackwell vs H100 SXM on GPT-OSS 120B

Now the part that illustrates everything above concretely.

### GPU Spec Sheet

| Spec                     | RTX PRO 6000 Blackwell         | H100 SXM                                            |
| ------------------------ | ------------------------------ | --------------------------------------------------- |
| Architecture             | Blackwell GB202                | Hopper GH100                                        |
| VRAM                     | 96 GB GDDR7                    | 80 GB HBM3                                          |
| Memory bandwidth         | 1.792 TB/s                     | 3.35 TB/s                                           |
| Published compute signal | 125 TFLOPS FP32, 4000 FP4 TOPS | 989 TF32 Tensor TFLOPS, 1,979 BF16/FP16 w/ sparsity |
| Tensor Core gen          | 5th (FP4 support)              | 4th                                                 |
| NVLink                   | ❌ (PCIe Gen5 x16 only)        | ✅ 900 GB/s                                         |
| TDP                      | 600 W                          | 700 W                                               |
|                          |                                |                                                     |

The headline result from the GPT-OSS 120B experiment should be stated early and cleanly:

**H100 SXM won decode.**

Now, that is the counterintuitive result only if you were focusing on VRAM or vendor-advertised AI TOPS. It becomes much less surprising once you frame decode as a bandwidth-dominated workload.

### Why the result makes sense

- GPT-OSS 120B is MoE, so only a subset of total parameters are active per token.
- But decode is still repeatedly touching weights and KV state with low arithmetic intensity.
- H100's HBM bandwidth is in a higher class than the RTX PRO 6000 Blackwell's GDDR7 bandwidth.

That is the decode story.

The RTX card is still interesting for a different reason:

- **96 GB VRAM** can be the difference between fitting and offloading
- if the model or cache barely fits, "fit first" can dominate every other concern
- prefill-heavy or prompt-heavy workloads can narrow the gap because compute utilization improves

### What the Theory Predicts

**Decode (bandwidth-dominated at small batch):** H100 has `3.35 / 1.792 ≈ 1.87×` the memory bandwidth. At `bs=1`, I would expect a meaningful decode advantage in H100's favor. The exact factor will depend on kernels, cache reuse, quantization, and MoE routing overhead, but bandwidth is the first number to look at.

**Prefill (more compute-friendly):** H100 also has a much stronger published tensor-compute profile, so long-prompt TTFT and prefill throughput should generally favor it. I would not trust raw spec-sheet ratios here; kernel quality, precision, and scheduler behavior matter too much. But directionally, H100 should still win prompt-heavy work.

**VRAM advantage:** RTX Pro 6000 has 96 vs 80 GB. For GPT-OSS 120B in any quantized form that fits on a single card, the Blackwell has headroom for longer context or larger KV cache without offloading.

### Actual Benchmark Results

| Metric                                               | RTX Pro 6000 BW | H100 SXM        | Ratio (H100/RTX)   | Expected |
| ---------------------------------------------------- | --------------- | --------------- | ------------------ | -------- |
| Prefill throughput (tokens/s, prompt=512)            | 167.4           | 166.0           | 0.99x              | 1.87x    |
| Decode tok/s (bs=1)                                  | **172.1** | 166.1           | **0.97x**    | 1.87x    |
| Decode tok/s (bs=8)                                  | 618.7           | 703.9           | 1.14x              | 1.87x    |
| Decode tok/s (bs=32)                                 | 1,088.2         | 1,343.2         | 1.23x              | 1.87x    |
| TTFT (prompt=512)                                    | 27.5 ms         | 27.8 ms         | ≈                 | 0.53x    |
| TTFT (prompt=4096)                                   | 220.8 ms        | 199.3 ms        | 0.90x ✓           | 0.53x    |
| **Agentic loop latency (10-step ReAct, bs=1)** | **8.21s** | **8.04s** | **0.98x** ✓ | 0.53x    |
| Peak VRAM used (bs=1, 4K ctx)                        | 91.7 GB / 96 GB | 76.8 GB / 80 GB | —                 | —       |

**Full benchmark code and methodology:** [github.com/kishan5111/gptoss-benchmark](https://github.com/kishan5111/gptoss-benchmark)

### Key Findings

The raw result is simple: **RTX PRO 6000 wins slightly at `bs=1`, but H100 pulls ahead once batch and prompt length grow.**

#### 1. Low-batch decode is basically a tie

At `bs=1`, the RTX posts **172.1 tok/s** versus **166.1 tok/s** on H100, while short-prompt TTFT is essentially identical. That is the surprising part of the benchmark. It suggests that at very small batch sizes, software overheads, dispatch costs, and kernel behavior can outweigh the clean bandwidth story.

#### 2. The bandwidth story shows up as batch grows

Once decode batch rises, H100 starts behaving more like the roofline model says it should:

- `bs=8`: H100 leads by about **14%**
- `bs=32`: H100 leads by about **23%**

So the bandwidth advantage is real. It just does not show up cleanly at the very smallest batch sizes.

#### 3. H100 looks better on longer prefill

The 4K-token TTFT result gives H100 a clearer win: **199.3 ms vs 220.8 ms**, roughly **10% faster**. That is the regime where extra compute and memory hierarchy quality start to matter more consistently.

#### 4. Single-agent latency is nearly the same

On the 10-step agentic loop, the difference is only **2.1%**: **8.04s** on H100 versus **8.21s** on RTX PRO 6000. For low-concurrency agent flows, that is close enough that price, fit, and deployment constraints may matter more than raw decode bandwidth.

#### 5. VRAM headroom is still a real advantage for RTX

The RTX's extra **16 GB** matters when the model barely fits or KV cache pressure grows with context and concurrency. In those regimes, fit can dominate theoretical speed.

### What This Means for GPU Selection

The clean narrative that "H100 is always faster for inference" breaks down in practice:

**Choose RTX Pro 6000 Blackwell when:**

- Single-user applications or low-concurrency API serving
- Batch sizes consistently stay below 8
- VRAM capacity matters (96 GB vs 80 GB)
- Budget constraints ($8,500 vs $25,000+)
- Workstation/local deployment

**Choose H100 SXM when:**

- High-throughput serving with large batch sizes (32+)
- Multi-GPU tensor parallelism (NVLink required)
- Long-context workloads where prefill dominates
- Budget allows datacenter-grade hardware

**The real lesson:** Bandwidth theory provides a ceiling, not a floor. Software maturity, memory controller design, dispatch overhead, and kernel optimization all matter. **Always benchmark your actual workload** before assuming spec-sheet ratios translate directly to real performance.

**What to watch for:**

* Decode gap may track bandwidth surprisingly closely at `bs=1`
* The gap should **narrow as batch size grows** (more compute starts to matter)
* At some crossover batch, RTX Pro 6000's extra VRAM might allow it to serve a larger batch than H100, which could flip throughput
* TTFT on long prompts should usually favor H100, but measure it instead of trusting FLOPS ratios

### The crossover question

The question to ask is:

> At what effective batch size does arithmetic intensity rise enough that the compute gap matters more than the bandwidth gap?

That crossover depends on:

- prompt length
- effective batch from scheduler + continuous batching
- quantization level
- kernel quality
- MoE routing overhead

You should expect:

- **small-batch decode** -> H100 advantage is strong
- **larger prefill-heavy work** -> gap narrows
- **fit-constrained cases** -> RTX PRO can become attractive because avoiding offload beats theoretical wins

### The MoE wrinkle for GPT-OSS 120B

GPT-OSS 120B activates only **5.1B parameters per token** out of **117B total**. That helps compared with dense 120B-class behavior, but it does not erase the memory story.

In a dense model, every forward pass uses the same weights. In MoE, each token is routed to a different subset of experts. During decode:

* Different tokens in the same batch activate different experts
* At small batch sizes, only a few experts fire per step — low VRAM utilization, irregular memory access
* At large batch sizes, more tokens mean more unique experts activated — memory access patterns become **increasingly fragmented**

Research confirms this: MoE decode has **fragmented memory access** that can behave worse than a dense model with similar active parameters. DRAM bandwidth is used less efficiently because the access pattern is irregular rather than sequential. That makes H100's raw bandwidth advantage even more relevant for MoE decode.

---

## Continuous Batching: Why Throughput ≠ 1/Latency

If you only think in terms of single-request latency, you miss the most important serving optimization in modern LLM systems. Naively, if one request takes 1 second, two concurrent requests take 2 seconds. With  **continuous batching** , that's wrong.

![Static batching versus continuous batching](/blog-assets/prefill-decode-memory-wall/static-vs-continuous-batching.svg)

### Static batching

Static batching behaves like this:

- collect requests
- run them together
- wait for the whole batch to move forward
- do not insert new work until the batch reaches a clean boundary

### Continuous batching

Continuous batching behaves more like a scheduler:

- as sequences finish, their slots are recycled
- new requests are inserted into the active batch
- the decode loop keeps running with a moving frontier of live sequences

This changes the throughput/latency curve dramatically because decode rarely has enough work at tiny batch sizes. Continuous batching is how serving systems manufacture more useful effective batch without fully stalling the queue. This means:

* GPU utilization stays high
* TTFT for new requests is minimized
* Throughput approaches the hardware limit, not the average request length

The tradeoff: prefill operations are much more compute-intensive than decode. Inserting a new prefill into a batch of ongoing decode steps "steals" GPU time from the decoding sequences, causing a brief stall in streaming output. This is the prefill-decode interference problem, and it's why **disaggregated prefill/decode** (separate GPU pools for each phase) is an active area of systems research.

In vLLM, the scheduler policy is `fcfs` by default, but it also supports `priority`, where lower numeric priority is handled first. That matters because queue order determines who absorbs prefill/decode interference. Even with a smarter policy, though, the core problem does not go away: prefill spikes still steal cycles from streaming decode unless you chunk prefill carefully or separate the phases onto different resources.

**For agentic workloads, this interference pattern is especially painful.** Agents tend to generate short decode sequences (a tool call, a reasoning step) followed by a new prefill (the tool response injected as context). The prefill-decode cycle repeats rapidly, creating a situation where the serving system is constantly switching between the two phases rather than batching either efficiently. Inference engines like vLLM/SGLang have added agent-specific optimizations  prefix caching and RadixAttention — specifically to reduce the repeated prefill cost across agent turns that share a common system prompt or prior context.

### Why PagedAttention matters here

This is why vLLM's PagedAttention matters in the same discussion.

![Paged KV cache avoiding contiguous-allocation fragmentation](/blog-assets/prefill-decode-memory-wall/pagedattention-fragmentation.svg)

Continuous batching without efficient KV management turns into fragmentation hell. PagedAttention makes the scheduler and the cache layout cooperate:

- KV memory becomes easier to allocate incrementally
- freed sequence slots are easier to reuse
- fragmentation pressure drops
- higher concurrency becomes practical

You cannot talk seriously about throughput-first LLM serving anymore without talking about both:

- **continuous batching**
- **paged KV management**

## Speculative Decoding: Fixing the Bottleneck Directly

I will keep this brief because it deserves its own post.

If decode is slow because each token requires a serial forward pass, the fix is to  **draft multiple tokens at once and verify them in parallel** .

Draft model generates K candidate tokens quickly (smaller model).
Verifier (the full model) runs a single forward pass that accepts or rejects each draft token based on whether the full distribution agrees.

If the draft model is good, most tokens are accepted — K tokens in the time of ~1.1 forward passes instead of K forward passes. Effective speedup: 2–4x on decode.

This is directly tied to the memory-bound nature of decode: the bottleneck is weight reads, not compute. Speculative decoding amortizes the weight reads across multiple accepted tokens.

Variants:

* **Classic draft model** (small separate LM) — simple, requires 2 models in VRAM
* **EAGLE-1/2** — draft head trained on hidden states, no separate model weight cost
* **P-EAGLE** — Parallel-EAGLE3 drafting.

The key idea is not "more FLOPS." It is "fewer expensive serial large-model decode steps."

I will write a separate deep dive on EAGLE / P-EAGLE style approaches, because they deserve more than a paragraph.

---

## GPU Selection Framework

Given everything above, here is the practical decision logic:

### Single-GPU Inference

If the model barely fits. Maximize **VRAM first**.

Because once you start offloading weights or KV cache, you are not in an optimization problem anymore. You are in a survival problem.

### If the workload is decode-heavy

Maximize **memory bandwidth**.

Typical examples:

- chatbot serving
- streaming assistants
- interactive coding copilots
- low-batch online inference

### If the workload is prefill-heavy

Maximize **compute throughput** and kernel quality.

Typical examples:

- long RAG prompts
- prompt processing pipelines
- summarization over large contexts
- embeddings-style long-sequence ingestion before short decode

### Multi-GPU Inference

If you know multi-GPU is unavoidable. Favor **NVLink over PCIe** whenever you can.

```
RTX PRO 6000 Blackwell: no NVLink → PCIe Gen5 x16 only (~64 GB/s per direction)
H100 SXM: NVLink 4.0 → 900 GB/s chip-to-chip

For tensor parallel (weights split across GPUs):
  → Each forward pass requires all-reduce across GPUs
  → PCIe: ~64 GB/s per direction → severe bottleneck at TP=4+
  → NVLink: 900 GB/s → near-linear scaling to TP=8

Multi-GPU verdict: H100 wins decisively for tensor-parallel deployments
RTX Pro 6000 is a single-GPU card despite having 96 GB
```

### Reference GPU Comparison

The table below is intentionally practical rather than perfectly uniform. Vendor "compute" numbers are not always published in the same format across data-center and workstation cards, which is itself a useful warning sign.

| GPU                    |  VRAM |       Memory bandwidth |                               Public compute headline | Approx public rent ($/GPU-hr) | Best for                                                                                   |
| ---------------------- | ----: | ---------------------: | ----------------------------------------------------: | ----------------------------: | ------------------------------------------------------------------------------------------ |
| H100 SXM               | 80 GB |              3.35 TB/s | 989 TF32 Tensor TFLOPS, 1,979 BF16/FP16 Tensor TFLOPS |                     ~$2.1-4.0 | Decode-heavy serving, multi-GPU NVLink setups, latency-sensitive inference                 |
| H100 NVL / PCIe-class  | 94 GB |               3.9 TB/s | 835 TF32 Tensor TFLOPS, 1,671 BF16/FP16 Tensor TFLOPS |                     ~$1.4-2.4 | High-memory PCIe deployments where NVLink bridge is still available                        |
| A100 80GB SXM          | 80 GB |             2,039 GB/s |   312 TF32 Tensor TFLOPS, 624 BF16/FP16 Tensor TFLOPS |                     ~$1.1-1.8 | Strong older baseline, still very useful for serving and training                          |
| RTX 4090               | 24 GB | ~1.0 TB/s (board spec) |                                     ~82.6 TFLOPS FP32 |                    ~$0.24-0.6 | Local experimentation, smaller models, quantized inference, not serious 120B-class serving |
| RTX PRO 6000 Blackwell | 96 GB |             1,792 GB/s |                        125 TFLOPS FP32, 4000 FP4 TOPS |                         ~$1.8 | Fit-constrained workstation/server deployments, prefill-friendly or quantized workloads    |

The rough rules:

- If it fits and batch is small: **buy bandwidth**
- If it barely fits: **buy VRAM**
- If prompts are huge: **compute matters more**
- If generation dominates: **bandwidth dominates**

Approximate rent ranges above are directional March 2026 public on-demand prices, not enterprise contracts or spot rates.

## Failure Modes I've Hit

**1. Thinking TFLOPS = inference speed**
The most common mistake. More FLOPS only matters when you're compute-bound. If your batch is 1–4 and your model is large, you're memory-bound and FLOPS are almost irrelevant.

**2. Not accounting for KV cache VRAM at serving scale**
Local testing at bs=1 feels fine. Moving to production at bs=32 blows VRAM. Always calculate KV cache for your target concurrent request count before buying hardware.

**3. PCIe multi-GPU for tensor parallel**
Tried tensor parallel on PCIe-connected GPUs for a large MoE. All-reduce at each layer over PCIe crushed throughput. NVLink is not optional for tensor parallel beyond TP=2.

**4. Prefill-decode interference in continuous batching**
At high request rates, prefill operations from new requests stall ongoing decode streams. ITL spikes. This shows up as jitter in streaming outputs and is invisible in throughput benchmarks.

**5. Trusting vendor headline numbers as if they were directly comparable**
The spec sheet is not a benchmark. Data-center parts and workstation parts expose different headline metrics, often at different precisions, sometimes with sparsity, sometimes without. If you compare TOPS on one card to BF16 tensor throughput on another, you are already off track.

**6. Underestimating context growth in agentic loops**
An agent that calls 10 tools accumulates 10 tool responses as context. By step 10, the prefill for each new call is 5–10× longer than step 1. KV cache grows with it. What seemed like a comfortable VRAM budget at the start of the loop is gone by the end. If you are serving agents, always profile the full trajectory, not just the first call.

## Practical Takeaway

Here is the mental model I keep coming back to:

1. **Arithmetic intensity determines the bottleneck.**
2. **The bottleneck determines which GPU spec matters.**

That gives you the rest:

- Decode is usually memory bound at real serving batch sizes.
- Prefill is much more compute-friendly.
- KV cache, not just weights, determines whether the deployment remains healthy under concurrency.
- Choosing GPUs without knowing your prefill/decode mix is guessing.

That is why the H100 beating RTX PRO 6000 Blackwell on GPT-OSS 120B decode is not mysterious. It is the expected result once you frame the workload correctly.

**For agentic systems specifically:** you are almost always in the low-batch, high-decode-frequency regime. Each agent step is a LLM call with a small output and a growing input. Bandwidth wins. Every ms off TPOT is a ms off the full agent task latency, compounded across every step.

The more useful question is not "which GPU is best?" It is:

> Is my workload dominated by prompt ingestion, token-by-token generation, agentic loops, or memory pressure from concurrency?

Answer that first. The hardware choice gets much easier after that.

---

Data-center and workstation GPU specs above use official NVIDIA product pages for H100, A100, and RTX PRO 6000 Blackwell. The RTX 4090 row is included only as a rough consumer baseline using public board specs.

## References

1. OpenAI, “Introducing gpt-oss.” https://openai.com/index/introducing-gpt-oss/
2. OpenAI / Hugging Face, openai/gpt-oss-120b. https://huggingface.co/openai/gpt-oss-120b
3. NVIDIA, “H100 GPU.” https://www.nvidia.com/en-gb/data-center/h100/
4. NVIDIA, “RTX PRO 6000 Blackwell Workstation Edition.” https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/rtx-pro-6000/
5. NVIDIA, “A100 Tensor Core GPU.” https://www.nvidia.com/en-us/data-center/a100/
6. NVIDIA Technical Blog, “Mastering LLM Techniques: Inference Optimization.” https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/
7. W. Kwon et al., “Efficient Memory Management for Large Language Model Serving with PagedAttention.” https://arxiv.org/abs/2309.06180
8. T. Dao, “FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning.” https://arxiv.org/abs/2307.08691
9. Y. Zhong et al., “DistServe: Disaggregating Prefill and Decoding for Goodput-optimized Large Language Model Serving.” https://www.usenix.org/conference/osdi24/presentation/zhong-yinmin
10. “LLM Inference Unveiled: Survey and Roofline Model Insights.” https://arxiv.org/abs/2402.16363
11. “A Systematic Characterization of LLM Inference on GPUs.” https://arxiv.org/abs/2512.01644
12. vLLM scheduler configuration docs. https://docs.vllm.ai/en/stable/api/vllm/config/scheduler/
13. Google Research Blog, “TurboQuant: Redefining AI efficiency with extreme compression.” https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/
14. A. Zandieh et al., “TurboQuant: Online Vector Quantization with Near-optimal Distortion Rate.” https://arxiv.org/abs/2504.19874
15. Gpt-oss benchmark https://github.com/kishan5111/gptoss-benchmark
