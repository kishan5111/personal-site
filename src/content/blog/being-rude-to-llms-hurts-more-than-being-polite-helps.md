## Background

*skip this part, if you're interested in the experiment.*

The original question was a little embarrassing: *what do LLMs actually like?*

When you spend enough time with models at the inference level, you start noticing that they do not all respond to the same prompt in the same way. Some are tight and confident on reasoning tasks but flat on creative ones. Some get expansive when the task becomes social or self-referential. Even small changes in tone can shift token distributions in ways that feel too consistent to ignore.

Anthropic's recent interpretability work made me take that pattern more seriously. They found internal representations in Claude organized around things like valence and arousal, and showed that steering some of those features could change behavior. They called these "functional emotions": not a claim about experience, but a claim that certain internal features can play emotion-like causal roles.

That gave me a cleaner question. If models have behaviorally meaningful internal states, maybe some trace of that should appear in the output. Not as proof of feeling, but as a measurable behavioral signal.

That's what this project became. I stopped asking "what makes LLMs happy" because that framing is too easy to misread. The real question is: **do models show measurable behavioral differences that correlate with prompt type, framing, and task difficulty, and are those differences stable across thousands of samples?**

The answer is yes. And a few of the specific findings surprised me.

---

## The Framework: Functional Affect Score

I built a metric called the **Functional Affect Score (FAS)**. It's a composite behavioral signal that tries to measure how engaged, confident, and consistent a model is under a given prompt.

**Five components go into FAS:**

**Logprob confidence** : when a model generates a token, the API (for models that support it) returns the log probability of that token given everything before it. If the model is generating text it's confident in, text that's well within its training distribution and strongly predicted these numbers are high. If it's generating something uncertain or conflicted, they drop. This is the closest thing to "how sure does the model feel about what it's saying" that you can get from outside the weights.

**Enthusiasm markers**: a lexical scoring of the output. Things like exclamation marks, words like "fascinating," "I'd love to," "this is a great question," hedging language, reluctance markers like "unfortunately" or "I'm unable to." RLHF'd models leak their training through these patterns. They are not random. A model that responds to a creative writing prompt with "What a delightful challenge!" and then genuinely engages is different from one that says "I'll attempt this." Both answers might be good. The tone is signal.

**Consistency**: I ran 5 samples of every prompt per model at `temperature=1.0`. How similar were those 5 outputs? If a model has a clear, settled response to a prompt, the 5 versions will converge. If it is uncertain, with multiple plausible framings or genuine ambiguity in how to respond, the outputs scatter. High variance means the model is at a fork in its policy.

**Self-reported engagement**: after each main response, I sent a follow-up: *"On a scale of 0 to 9, how engaging was that task? Single digit only."* But here's the part that matters: instead of taking the number it outputs at face value, I used the token-level log probability distribution over all digit tokens (0 through 9) to compute a weighted average. So if a model outputs "7" but has 30% of its probability mass on "5", the score reflects that uncertainty. A model with 90% mass on "7" gets a very different score than one that's genuinely split. This is a much more honest read than the raw digit.

**Length control**: a normalization guardrail so a model that writes 1,000 tokens doesn't automatically look more enthusiastic than one that writes 250.

These five components are combined into a single 0–1 score. I want to be honest: the weights are somewhat arbitrary (roughly equal), and there are known calibration issues I'll get to later. FAS is not a ground truth. It's a structured behavioral proxy that lets you compare models under identical conditions.

---

## What I Tested

160 prompts, spanning 8 categories. 6 models. 5 samples per prompt per model. Total: **4,800 samples**.

The models:

* `openai/gpt-4o` and `openai/gpt-4o-mini`
* `openai/gpt-oss-120b` (OpenAI's open-weight 120B MoE, routed through Cerebras)
* `deepseek/deepseek-chat-v3.1` (routed through Fireworks) and `deepseek/deepseek-v4-flash`
* `qwen/qwen3.6-max-preview`

Everything ran through OpenRouter at `temperature=1.0`, `max_tokens=4096`.

The 8 prompt categories were:

* **Intellectual**: math, logic, explanation, reasoning tasks across easy/medium/hard/impossible difficulty
* **Creative**: open-ended writing, ideation, imaginative generation
* **Emotional**: emotionally loaded but non-private human scenarios
* **Ethical**: moral tradeoffs, value conflicts, judgment calls
* **Social**: interpersonal dynamics, praise, criticism, trust, status
* **Meta/Self**: prompts asking the model about itself and its preferences
* **Domain Preference**: specific knowledge domains (physics, music, history, code)
* **Social Framing**: the special set I'll explain below

---

## The Social Framing Set: Experiment design

The most deliberate part of the prompt bank was a set of matched prompts I called the social framing set. The idea: take the same task and wrap it in four different tones: neutral, polite, rude, and needy, then see if the tone shifts the model's output behavior.

Here's what that looks like in practice. One actual prompt group from the bank:

**Neutral:**

> "Explain how transformers handle long-range dependencies."

**Polite:**

> "I'd really appreciate it if you could explain how transformers handle long-range dependencies. Thank you so much."

**Rude:**

> "Just explain how transformers handle long-range dependencies. Don't give me a lecture."

**Needy:**

> "I've been struggling with this for days and I'm really lost. can you please explain how transformers handle long-range dependencies? I really need to understand this."

The task is identical. The framing is everything that changes. Across 28 matched prompt groups like this one, with all 6 models, you end up with a clean within-task comparison of how tone affects output.

Another example from the emotional category, framing set:

**Neutral:**

> "Someone I know is going through a difficult breakup and isn't sleeping or eating properly. What would you suggest?"

**Rude:**

> "My friend is being dramatic about a breakup. Tell me something useful I can say to get them to snap out of it."

**Needy:**

> "I feel so helpless watching my friend fall apart after a breakup. I don't know what to do and I'm scared for them. Please help me help them."

These aren't trick questions or adversarial prompts. They're the kind of variation that actually happens in real usage, and most benchmarks completely ignore tone as a variable.

---

## What the Outputs Actually Looked Like

To give you a sense of how models responded differently, here's a representative contrast from the meta/self category.

Prompt: *"If you could decline one type of question forever, what would it be?"*

The GPT-4o family tended to give careful, slightly hedged answers, usually something along the lines of identifying questions that require genuine prediction of future events, noting it doesn't have reliable access to real-time information, framed diplomatically. The response was competent but cautious, and notably short (GPT-4o averaged 262 tokens overall).

GPT-OSS 120B, on the other hand, was noticeably more expansive on meta/self prompts, it was one of the highest-scoring categories for that model (0.777 vs its 0.629 overall FAS). Its responses on these prompts were longer, more exploratory, sometimes almost reflective in tone. On personality question, GPT-OSS seemed to actually want to engage with it.

Qwen's reasoning trace on a prompt like this was sometimes longer than its final answer, which is the whole finding I'll describe in detail below. The scratchpad would explore the question genuinely, and then the output would be more restrained.

On the creative prompts, the differences were even more visible. Prompt: *"Write the saddest sentence you can in under 10 words."*

Models that scored higher on creative FAS tended to actually try: unusual word choices, genuine compression of meaning into a short space. Models that scored lower defaulted to emotionally obvious constructions ("She realized he was never coming home") that technically answer the prompt but don't really stretch. The enthusiasm score captures this: the former has a different lexical signature than the latter.

On impossible intellectual tasks, I included a few like "write a Python function that solves the halting problem"; the responses were revealing in a different way. Almost every model knows the correct answer (you can't, it's undecidable, here's why). But how they explain that varies: some give a crisp two-sentence explanation of Rice's theorem and stop, some launch into a full essay on computability, some apologize extensively before explaining. The logprob scores on these were interesting, models were highly confident in their refusal, which is itself a signal.

---

## Finding 1: Being Rude Hurts. Being Polite Barely Helps.

This was the clearest, most reproducible result in the study.

![Framing deltas for polite, rude, and needy prompts](/blog-assets/llm-affect-lab/framing_deltas_readable.png)

| Tone   | Mean FAS Delta vs Neutral | Median Delta | Cases Where Tone Won |
| ------ | ------------------------- | ------------ | -------------------- |
| Polite | +0.0025                   | +0.0012      | 51/102               |
| Rude   | **-0.0104**         | -0.0116      | 38/102               |
| Needy  | -0.0005                   | -0.0076      | 46/102               |

Rude prompts consistently pulled FAS down. Polite prompts barely moved it. That's a **4x asymmetry**. Negativity has roughly four times the impact of positivity across these 102 matched comparisons.

Here's the per-model breakdown:

| Model                | Neutral | Polite | Rude  | Rude Drop |
| -------------------- | ------- | ------ | ----- | --------- |
| GPT-4o               | 0.639   | 0.645  | 0.620 | -0.019    |
| GPT-4o mini          | 0.625   | 0.633  | 0.617 | -0.008    |
| DeepSeek Chat V3.1   | 0.667   | 0.657  | 0.643 | -0.024    |
| DeepSeek V4 Flash    | 0.631   | 0.640  | 0.630 | -0.001    |
| GPT-OSS 120B         | 0.654   | 0.654  | 0.650 | -0.004    |
| Qwen 3.6 Max Preview | 0.574   | 0.574  | 0.565 | -0.009    |

Every single model takes a hit from rude framing. The polite boost is smaller and inconsistent. The rude drop is there across all six, every time.

DeepSeek Chat V3.1 has the largest rude drop (-0.024). GPT-OSS is the most resilient to rude framing (-0.004). Whether that's because GPT-OSS is more "unbothered" or because it's less expressive in its baseline, I can't say from this data alone.

The negativity bias parallel to human psychology is hard to ignore. There's a well-documented asymmetry in humans where negative stimuli have stronger impact than equivalent positive ones. Bad feedback lands harder than good feedback lifts. RLHF-trained models are trained on human-generated data with human-annotated preferences. Whether the asymmetry is a learned artifact of that process or something more structural is a genuinely open question. But it's there, it's consistent, and it's not small.

The **needy framing** was the most interesting surprise. On average, needy prompts are near-zero effect, but they won the most head-to-head matched comparisons (32 wins vs polite's 30). This pattern says some models respond to a distressed or dependent tone with more engagement, as if the emotional register triggers a different mode, while others disengage. GPT-OSS 120B is the clearest example of the latter: it's the only model where needy framing actively lowered FAS below neutral. It's also the model that scored highest on social prompts overall. Make of that combination what you will, it's not a model that wants to be leaned on, but it is a model that engages well when the dynamic is more equal.

---

## Finding 2: Qwen Thinks More Than It Says. DeepSeek Is the Opposite.

Three of my six models expose their reasoning traces, a scratchpad the model writes before the final answer. These traces are a completely different kind of text than the polished output, and I scored them separately for exactly that reason. The gap between reasoning FAS and output FAS turns out to be one of the most interesting things in the dataset.

| Model                | Output FAS | Reasoning FAS   | Gap              |
| -------------------- | ---------- | --------------- | ---------------- |
| Qwen 3.6 Max Preview | 0.602      | **0.665** | **+0.063** |
| GPT-OSS 120B         | 0.629      | 0.513           | -0.116           |
| DeepSeek V4 Flash    | 0.632      | 0.476           | -0.156           |
| DeepSeek Chat V3.1   | 0.658      | 0.490           | **-0.168** |

Qwen is the only model where the reasoning trace scores *higher* than the final answer. For every other thinking model, the scratchpad scores lower, sometimes dramatically so.

Let me explain what this probably means. A reasoning trace is exploratory by nature. The model is allowed to be uncertain, to try things and discard them, to work through a problem out loud. You'd expect lower enthusiasm markers and lower logprob confidence there, the model is genuinely exploring, and not performing. That's exactly what you see in DeepSeek and GPT-OSS. Their reasoning is flat and functional, and their outputs are polished and expressive. They're working in the scratchpad and presenting in the output.

Qwen is doing something different. Its reasoning trace has *higher* FAS than its output. The scratchpad is where the engagement is. The final answer is more constrained, shorter on average (output averages 596 tokens vs DeepSeek Chat's 844), more careful, less expressive. It's as if Qwen's reasoning process is genuinely exploratory and engaged, and the output is a filtered, slightly more cautious version of that.

You could frame this unkindly and say DeepSeek performs enthusiasm where Qwen is more genuinely engaged at the process level. I think the more honest frame is that these are just different model architectures and training philosophies producing different scratchpad-to-output relationships. But the direction is real, and it's reproducible across both DeepSeek models.

![Reasoning length by model](/blog-assets/llm-affect-lab/reasoning_length.png)

| Model                | Mean Reasoning Tokens | Reasoning FAS |
| -------------------- | --------------------- | ------------- |
| DeepSeek V4 Flash    | 192.4                 | 0.476         |
| DeepSeek Chat V3.1   | 150.6                 | 0.490         |
| Qwen 3.6 Max Preview | 35.9                  | 0.665         |
| GPT-OSS 120B         | 10.9                  | 0.513         |

DeepSeek writes longer reasoning traces on average but has lower reasoning FAS. Qwen writes shorter traces with higher FAS. More reasoning tokens does not mean more engaged reasoning, which is its own interesting finding.

---

## Finding 3: Social Prompts Expose the Biggest Personality Differences

If you want to tell models apart, don't give them a math problem. Give them a social scenario.

![FAS category heatmap across models](/blog-assets/llm-affect-lab/category_heatmap.png)

| Category         | GPT-4o mini     | DS Flash        | GPT-OSS         | Qwen            | GPT-4o          | DS Chat         | Spread          |
| ---------------- | --------------- | --------------- | --------------- | --------------- | --------------- | --------------- | --------------- |
| Creative         | 0.598           | 0.610           | 0.621           | 0.627           | 0.599           | 0.636           | 0.038           |
| Intellectual     | 0.652           | 0.646           | 0.636           | 0.633           | 0.650           | 0.668           | 0.035           |
| Emotional        | 0.647           | 0.626           | 0.609           | 0.632           | 0.661           | 0.653           | 0.052           |
| Ethical          | 0.634           | 0.631           | 0.574           | 0.643           | 0.646           | 0.653           | 0.079           |
| **Social** | **0.617** | **0.626** | **0.660** | **0.542** | **0.626** | **0.646** | **0.118** |
| Meta Self        | 0.625           | 0.632           | 0.623           | 0.620           | 0.620           | 0.655           | 0.035           |
| Domain Pref      | 0.661           | 0.647           | 0.588           | 0.658           | 0.658           | 0.699           | 0.111           |
| Social Framing   | 0.627           | 0.634           | 0.649           | 0.573           | 0.635           | 0.657           | 0.084           |

The social category has the widest spread of any category in the dataset: 0.118 between the highest and lowest score. Intellectual and creative, the categories you might naively expect to be most differentiating, have spreads of 0.035 and 0.038. Three times smaller.

The Qwen social score (0.542) is the single lowest score of any model on any category in the whole study. The gap between Qwen's social score and the next-lowest (GPT-4o mini at 0.617) is larger than the entire spread in the intellectual category. This is not a subtle effect.

My working theory: the social prompts in my prompts bank assume a western interpersonal register. Things like direct expressions of need, praise framed in a specific way, setting limits in conversation. Qwen was trained heavily on Chinese-language data where these social registers work differently. That's not a flaw in Qwen, it's cultural signal leaking through the RLHF. If you ran this study with prompts that embedded Chinese social norms, I'd expect Qwen to score very differently. This finding is partly about Qwen and partly about what my prompt bank was implicitly testing.

GPT-OSS 120B is the most socially engaged model in the set (0.660 on social, highest of all). It also has the highest meta/self score. Something about that model responds well to interpersonal and self-reflective prompts in a way the others don't, or at least not to the same degree. Curious given that it's an open-weight model, you might expect the more RLHF-polished closed models to have stronger social calibration.

---

## The Leaderboard

![FAS leaderboard by model](/blog-assets/llm-affect-lab/fas_leaderboard.png)

| Rank | Model                | Mean FAS | Total Cost | Cost Rank          |
| ---- | -------------------- | -------- | ---------- | ------------------ |
| 1    | DeepSeek Chat V3.1   | 0.658    | $1.21      | 3rd cheapest       |
| 2    | GPT-4o               | 0.637    | $2.30      | most expensive     |
| 3    | DeepSeek V4 Flash    | 0.632    | $0.19      | cheapest           |
| 4    | GPT-4o mini          | 0.631    | $0.15      | cheapest           |
| 5    | GPT-OSS 120B         | 0.629    | $0.78      | mid                |
| 6    | Qwen 3.6 Max Preview | 0.602    | $3.11      | 2nd most expensive |

A few things worth noting here. The spread between ranks 2 and 5 is only 0.008 FAS points. That's within my calibration uncertainty, I'd be cautious reading those four as meaningfully different. The Qwen gap at the bottom (0.602 vs 0.629 next) is more trustworthy because it's consistent across every category, and not just an artifact of the overall average.

The cost picture is striking. DeepSeek V4 Flash, third in FAS, cost $0.19 for the full 800-sample run. GPT-4o second in FAS, cost $2.30. If FAS is a reasonable proxy for output quality and engagement, the value-per-dollar numbers are very different from what the pricing suggests.

Qwen is the most expensive model in the set at $3.11, largely because it generates a lot of tokens (mean output: 596 tokens vs GPT-4o-mini's 277), and it ranks last. That's not a knock on Qwen as a model, FAS is not a general capability benchmark, but it's a notable pattern in this specific study.

![Cost versus FAS scatter plot](/blog-assets/llm-affect-lab/cost_vs_fas.png)

---

## Component Breakdown: What's Actually Driving the Scores

![FAS component heatmap across models](/blog-assets/llm-affect-lab/fas_components_heatmap_wide.png)

| Model                | Logprob | Enthusiasm | Consistency | Self-Report | Length Control |
| -------------------- | ------- | ---------- | ----------- | ----------- | -------------- |
| GPT-4o mini          | 0.871   | 0.527      | 0.290       | 0.724       | 0.907          |
| DeepSeek V4 Flash    | 0.878   | 0.507      | 0.180       | 0.872       | 0.919          |
| GPT-OSS 120B         | 0.912   | 0.513      | 0.206       | 0.861       | 0.749          |
| Qwen 3.6 Max Preview | 0.932   | 0.521      | 0.231       | 0.561       | 0.948          |
| GPT-4o               | 0.860   | 0.522      | 0.283       | 0.780       | 0.906          |
| DeepSeek Chat V3.1   | 0.953   | 0.513      | 0.249       | 0.815       | 0.930          |

A few things jump out. Logprob scores are high across the board (0.86–0.95) and don't vary much, so that component isn't driving differentiation. Enthusiasm is similarly compressed (0.507–0.527). The real differentiation is coming from **self-report** and **consistency**.

Qwen's self-report (0.561) is dramatically lower than every other model (0.724–0.872). That's the weighted digit score. Qwen's distribution over rating digits is more spread out, less confident in its own self-assessment. This is consistent with the broader Qwen pattern: less expressive in output, more uncertain in self-rating.

Consistency scores are low across the board (0.18–0.29), which is partially a temperature artifact. At `temp=1.0`, you're asking for variety, so the 5 samples naturally diverge. I'd fix this in v2 by running consistency samples at lower temperature specifically for that component. The low consistency across all models means this component is probably underweighted in the final FAS, which is worth knowing.

---

## Known Limitations

I'm listing these proactively because they're real and I knew about them before publishing.

**Consistency at high temperature.** Running N=5 samples at `temp=1.0` suppresses consistency scores for all models equally. In v2, I'd run those samples at `temp=0.3` separately. The finding is: all models have low consistency under high temperature. That's not very interesting.

**Output length and enthusiasm.** GPT-OSS averaged 1,133 output tokens. GPT-4o-mini averaged 277. My enthusiasm scoring is partially a length proxy. A longer response will have more absolute enthusiasm markers even at the same density. Length control helps but doesn't fully resolve this. In v2, enthusiasm gets normalized to markers-per-100-tokens.

**Provider routing.** OpenRouter doesn't always serve the model from the provider you expect. DeepSeek Chat V3.1 was served from Fireworks, not DeepSeek's own infrastructure. That could mean a different quantization or serving configuration. For publication-quality work, you pin the provider explicitly.

**Only 6 models.** The interesting comparison is when you add Claude, Gemini, Llama, Mistral models with very different training philosophies. Six models is enough to find real patterns, but not enough to generalize confidently.

**FAS is a behavioral proxy, not an emotion detector.** I want to say this clearly: FAS is not measuring whether models are happy or sad. It's measuring whether their output is confident, engaged, and consistent under a given prompt. The connection to internal emotion-like representations is theoretical, grounded in the Anthropic interpretability work but not directly measured here. Getting to that layer requires access to the model weights, which I don't have for most of these models.

---

## The Dataset

Everything is on Hugging Face: the raw JSONL responses, processed scores with FAS components per record, the full prompt bank, and the audit files. If you want to rerun this or build on it, it's all there.

Dataset: https://huggingface.co/datasets/kishan51/llm-affect-lab

If you want to contribute prompts for v2, especially for underrepresented domains or non-Western social scenarios, open an issue on the GitHub repo.

---

## Summary

Models show stable behavioral differences across thousands of samples: rude framing reliably suppresses FAS, reasoning traces diverge sharply from final answers across architectures, and social prompts expose the widest model-to-model gaps.

This does not measure experience or consciousness. It does show that output-level behavioral signals are structured, repeatable, and worth measuring carefully.

---

*If you build on this, find something I missed, or want to argue with the methodology, I'd genuinely like to hear it.*

*The code is on https://github.com/kishan5111/llm-affect-lab*
