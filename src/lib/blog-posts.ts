import prefillDecodeMemoryWallContent from "@/content/blog/prefill-decode-memory-wall.md?raw";

export interface BlogSection {
  id: string;
  title: string;
  content: string;
}

export interface ComparisonRow {
  method: string;
  trainablePct: string;
  convergenceSpeed: string;
  memoryOverhead: string;
  bestFor: string;
  failureRisk: string;
}

export interface RelatedPostLink {
  title: string;
  url: string;
}

export interface BlogPostRecord {
  id: string;
  title: string;
  excerpt: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  coverImage?: string;
  intro?: string[];
  sections?: BlogSection[];
  comparisonRows?: ComparisonRow[];
  relatedPosts?: RelatedPostLink[];
  content?: string;
}

export const blogPosts: BlogPostRecord[] = [
  {
    id: "prefill-decode-and-the-memory-wall",
    title: "Prefill, Decode, and the Memory Wall: A Deep Dive into LLM Inference",
    excerpt:
      "From TTFT and TPOT to GPU architecture - everything that actually determines how fast your model runs",
    description:
      "A deep dive into LLM inference bottlenecks: prefill vs decode, TTFT and TPOT, roofline reasoning, KV-cache growth, GPU memory hierarchy, and a GPT-OSS 120B benchmark on RTX PRO 6000 Blackwell vs H100 SXM.",
    date: "March 25, 2026",
    readingTime: "26 min read",
    tags: ["LLM Inference", "GPU Systems", "Serving"],
    content: prefillDecodeMemoryWallContent,
  },
  {
    id: "beyond-lora-exploring-ia3-and-boft",
    title:
      "LoRA, IA3, and BOFT: What Each Method Actually Changes (and When to Use Which)",
    excerpt: "",
    description:
      "A practical breakdown of LoRA, IA3, and BOFT - what each method modifies, when to reach for each, and the failure modes that matter in real fine-tuning work.",
    date: "March 11, 2026",
    readingTime: "13 min read",
    tags: ["PEFT", "Fine-tuning", "LLMs"],
    coverImage: "/images/banner.png",
    intro: [
      "I ran LoRA, IA3, and BOFT while fine-tuning models for Kaggle competition work - training LLMs on task-specific datasets where parameter budget and training stability both mattered. The short version: LoRA is still the default for a reason, but it is not always the right shape of update. IA3 surprised me with how little it could get away with. BOFT had training behavior I did not expect.",
      "This post is about what each method actually changes, when that difference matters, and the failure modes I ran into.",
    ],
    sections: [
      {
        id: "how-to-choose",
        title: "How to choose",
        content: `If I need a quick rule before running experiments, this is the one I use.

### Choose LoRA when

- I want the safest default.
- I need broad tooling support and familiar recipes.
- I expect the task to need a meaningful behavioral shift.

### Choose IA3 when

- I want the smallest trainable footprint possible.
- I think the base model already knows most of what I need.
- I want a conservative update because preserving pretrained behavior matters.

### Choose BOFT when

- I care about structured updates more than raw adapter familiarity.
- I want to test whether multiplicative transforms preserve useful pretrained behavior better than additive patches.
- I am willing to spend more time understanding the method instead of only tuning the dataset.`,
      },
      {
        id: "why-lora-became-the-default",
        title: "Why LoRA became the default",
        content: `LoRA won the default slot because it is simple, widely supported, easy to merge, and usually strong enough to get a serious baseline quickly.

The mental model is also easy to carry around: keep the pretrained weights frozen and learn a compact additive patch on top. That gives me:

- small checkpoints
- reasonable training stability
- broad model support in existing PEFT stacks
- no extra inference latency once I merge the update

If I want the fastest path to a usable baseline, LoRA is still where I start. The mistake is assuming "default" also means "best under every constraint."`,
      },
      {
        id: "what-each-method-changes",
        title: "What each method changes",
        content: `Start from the same frozen linear layer:

\`\`\`text
y = W x
\`\`\`

The important difference is not just parameter count. It is the shape of the update each method is allowed to make.

- LoRA learns an additive low-rank correction to \`W\`.
- IA3 rescales selected internal activations flowing through the layer.
- BOFT applies a structured multiplicative transform around the frozen weight.

That distinction matters because different update shapes fail in different ways. Additive updates can be expressive but drift more. Activation rescaling can be extremely cheap but sometimes too constrained. Structured multiplicative updates can preserve useful pretrained geometry, but they ask more from the method and the tuning recipe.`,
      },
      {
        id: "lora-additive-low-rank-update",
        title: "LoRA: additive low-rank update",
        content: `The LoRA view is:

\`\`\`text
W' = W + (alpha / r) BA
\`\`\`

with \`A\` shaped like \`(r, d_in)\`, \`B\` shaped like \`(d_out, r)\`, and \`r\` as the adapter rank.

That gives LoRA its practical balance:

- trainable parameters scale with \`r (d_in + d_out)\` instead of \`d_in d_out\`
- the update is expressive enough for many downstream tasks
- the adapter can usually be merged into the base weights for inference

This is why LoRA remains the default. It is easy to reason about and strong enough that I can trust it as a first serious baseline.

\`\`\`python
from peft import LoraConfig, TaskType, get_peft_model

lora_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=16,
    lora_alpha=32,
    lora_dropout=0.05,
    target_modules=["q_proj", "v_proj"],
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
\`\`\``,
      },
      {
        id: "ia3-rescaling-activations",
        title: "IA3: rescaling activations",
        content: `IA3 does something much narrower than LoRA. Instead of learning an additive patch over the weights, it learns vectors that rescale internal activations.

A useful shorthand is:

\`\`\`text
k'    = l_k * k
v'    = l_v * v
h_ff' = l_ff * h_ff
\`\`\`

The important part is not the syntax. It is the bias. IA3 is not asking for a fresh low-rank matrix-shaped correction. It is asking which existing channels should be trusted more or less.

That makes IA3 attractive when:

- adapter size matters a lot
- I want many cheap task-specific adapters
- the base model already has most of the capability and mostly needs steering

\`\`\`python
from peft import IA3Config, TaskType, get_peft_model

ia3_config = IA3Config(
    task_type=TaskType.CAUSAL_LM,
    target_modules=["k_proj", "v_proj", "down_proj"],
    feedforward_modules=["down_proj"],
)

model = get_peft_model(model, ia3_config)
model.print_trainable_parameters()
\`\`\``,
      },
      {
        id: "where-ia3-beats-lora",
        title: "Where IA3 beats LoRA",
        content: `IA3 is not "LoRA but better." It is better when the task needs a smaller and more conservative update.

That usually means:

- I care a lot about parameter count.
- I am sweeping many task variants and want very cheap adapters.
- The downstream behavior is close enough to pretraining that activation rescaling might be sufficient.
- I want to reduce the chance of rewriting too much of the pretrained behavior.

This is also where catastrophic forgetting enters the conversation. I would not claim IA3 prevents it, but the method does put the model inside a much narrower update family. If I want adaptation pressure without broad representational surgery, IA3 becomes much more attractive.`,
      },
      {
        id: "boft-multiplicative-structured",
        title: "BOFT: multiplicative + structured",
        content: `BOFT is interesting because it changes the geometry of the update, not just the size.

The shorthand I keep in mind is:

\`\`\`text
W' = R W
\`\`\`

where \`R\` is not a dense unconstrained matrix but a structured transform built from butterfly-style factors. The important part is the bias this introduces.

- LoRA says: add a compact learned patch.
- BOFT says: transform the pretrained weights through a structured multiplicative family.

That is what makes BOFT worth trying when I care about preserving pretrained behavior while still adapting the model.

\`\`\`python
from peft import BOFTConfig, TaskType, get_peft_model

boft_config = BOFTConfig(
    task_type=TaskType.CAUSAL_LM,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
    boft_block_size=4,
    boft_n_butterfly_factor=2,
    boft_dropout=0.1,
)

model = get_peft_model(model, boft_config)
model.print_trainable_parameters()
\`\`\``,
      },
      {
        id: "why-boft-feels-experimental",
        title: "Why BOFT feels experimental",
        content: `Even when I like the idea, BOFT still feels like a deliberate choice rather than a default choice.

Why:

- the method is less common in everyday LLM stacks
- the hyperparameter surface is less familiar than LoRA's
- the debugging intuition is weaker
- training behavior can feel different enough that I need to spend time learning the method itself

If my goal is "give me a strong baseline tonight," I still reach for LoRA. If my goal is "test a structured update family because preserving pretrained behavior matters," BOFT becomes much more interesting.`,
      },
      {
        id: "failure-modes",
        title: "Failure modes",
        content: `The failure mode is often more important than the headline method.

LoRA failure modes:

- rank too small for the shift I need
- target modules too narrow
- overfitting when the dataset is small and noisy

IA3 failure modes:

- not enough expressive freedom
- convergence that looks clean but does not move behavior enough
- tasks that really need weight-level change rather than routing changes

BOFT failure modes:

- more tuning burden
- less intuitive debugging
- gains that disappear when the task does not really benefit from structured multiplicative updates

The useful question is not "which PEFT method is best?" It is "what kind of update am I willing to let this frozen model make?"`,
      },
      {
        id: "practical-takeaway",
        title: "Practical takeaway",
        content: `LoRA is still the default for a reason. I do not think the lesson is "move on from LoRA." The lesson is "do not let LoRA become the only update shape you can imagine."

IA3 is a reminder that a very small amount of steering can sometimes be enough. BOFT is a reminder that the geometry of the update can matter, not just the adapter size.

If I need one sentence to end on: use LoRA as the default baseline, reach for IA3 when you want conservative and tiny updates, and try BOFT when the structure of the update itself is part of what you want to test.`,
      },
    ],
    comparisonRows: [
      {
        method: "LoRA",
        trainablePct: "~0.1% - 1%",
        convergenceSpeed: "Fast once the recipe is tuned",
        memoryOverhead: "Low",
        bestFor: "Default baselines and broader task shifts",
        failureRisk: "Medium",
      },
      {
        method: "IA3",
        trainablePct: "~0.01%",
        convergenceSpeed: "Fast to try, can plateau early",
        memoryOverhead: "Very low",
        bestFor: "Tiny adapters and conservative steering",
        failureRisk: "Medium to high",
      },
      {
        method: "BOFT",
        trainablePct: "~0.05% - 0.2%",
        convergenceSpeed: "Variable, usually slower to tune",
        memoryOverhead: "Low to moderate",
        bestFor: "Structured updates and preservation-sensitive tuning",
        failureRisk: "High",
      },
    ],
    relatedPosts: [
      { title: "[LINK_1_TITLE]", url: "[LINK_1_URL]" },
      { title: "[LINK_2_TITLE]", url: "[LINK_2_URL]" },
      { title: "[LINK_3_TITLE]", url: "[LINK_3_URL]" },
    ],
  },
];

export const getBlogPostById = (id: string) =>
  blogPosts.find((post) => post.id === id);
