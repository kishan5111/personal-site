export interface BlogPostRecord {
  id: string;
  title: string;
  excerpt: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  coverImage?: string;
  content: string;
}

export const blogPosts: BlogPostRecord[] = [
  {
    id: "beyond-lora-exploring-ia3-and-boft",
    title: "Beyond LoRA: Exploring IA3 and BOFT",
    excerpt:
      "LoRA is still the default PEFT baseline, but IA3 and BOFT are worth understanding once parameter budget, update geometry, and training behavior start to matter.",
    description:
      "A more technical look at how IA3 and BOFT differ from LoRA, what each method changes mathematically, and how I would benchmark them in a real PEFT workflow.",
    date: "March 11, 2026",
    readingTime: "12 min read",
    tags: ["PEFT", "Fine-tuning", "LLMs"],
    coverImage: "/images/banner.png",
    content: `LoRA is still the default PEFT baseline for good reasons. It is simple, widely supported, easy to merge, and usually strong enough to make progress quickly. But once I stop asking "can I fine-tune this model?" and start asking "what is the smallest, safest, and most controllable update I can make?", LoRA stops being the only method worth thinking about.

This is where IA3 and BOFT get interesting. They are not just smaller or more exotic alternatives. They represent different beliefs about how a frozen model should be adapted.

## Why LoRA became the default

LoRA works by keeping the pretrained weights frozen and learning low-rank updates for selected matrices. In practice that gives us a strong balance:

- small checkpoints
- good quality for many downstream tasks
- clean integration with existing training stacks
- no extra inference latency once the update is merged

That combination made LoRA the practical default, and I think that is still correct. If I want the fastest path to a serious baseline, LoRA is usually where I start.

The problem is that "default" is not the same as "best for every constraint". Once the training budget is tight, storage is tight, or I want a different kind of inductive bias, I want more than one tool available.

## A more exact view of what each method changes

Suppose a pretrained linear layer is:

\`\`\`text
y = W x
\`\`\`

with frozen pretrained weight matrix 'W'.

LoRA, IA3, and BOFT do not just differ in parameter count. They modify different parts of this computation:

- LoRA learns an additive low-rank correction to W
- IA3 rescales selected intermediate activations
- BOFT applies a structured multiplicative transform with an orthogonality bias

That means they have different failure modes. Additive updates can be expressive but may drift harder. Activation scaling can be very cheap but may not be expressive enough. Orthogonal structured updates may preserve useful geometry but ask more from the method choice itself.

## LoRA as an additive low-rank update

For LoRA, the common mental model is:

\`\`\`text
W' = W + (alpha / r) * B A
\`\`\`

where 'A' has shape '(r, d_in)', 'B' has shape '(d_out, r)', and 'r' is the adapter rank.

This is what gives LoRA its practical shape:

- trainable parameters scale like r * (d_in + d_out) instead of d_in * d_out
- the update is expressive enough for many downstream tasks
- the adapter can usually be merged into the base weights for inference

In transformer code, this usually means targeting projections like 'q_proj', 'k_proj', 'v_proj', 'o_proj', or feed-forward projections depending on the model family.

Here is a minimal Hugging Face PEFT setup for a LoRA baseline:

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
\`\`\`

This is still the fastest way I know to get a strong first baseline.

## IA3: change the activations, not the weight matrix

IA3 takes a very different approach from LoRA. Instead of learning additive low-rank updates to a weight matrix, it learns vectors that rescale internal activations.

That sounds like a small implementation detail, but it changes the character of the method.

My mental model is:

- LoRA says: "let me add a compact learned update to this layer"
- IA3 says: "let me amplify or suppress the signals already flowing through this layer"

This is appealing because it is extremely lightweight. The trainable state is tiny compared with a LoRA adapter, and the update is conceptually narrow. You are not asking the model to learn a fresh matrix-shaped correction. You are mostly steering existing pathways harder or softer.

In the PEFT formulation, IA3 learns vectors that rescale selected attention and feed-forward activations. A useful shorthand is:

\`\`\`text
k'    = l_k  * k
v'    = l_v  * v
h_ff' = l_ff * h_ff
\`\`\`

where 'l_k', 'l_v', and 'l_ff' are learned vectors and '*' means elementwise multiplication.

That is much more constrained than LoRA. The method is not inventing a fresh low-rank matrix. It is reweighting the internal information flow that the pretrained model already produces.

That makes IA3 interesting when:

- I care a lot about parameter count
- I want many cheap task-specific adapters
- I suspect the base model already has most of the capability and only needs careful steering

It also makes IA3 feel different during experiment design. With LoRA, I usually think about rank, target modules, alpha, dropout, optimizer settings, and where the useful update capacity should live. With IA3, the question becomes more about whether simple activation-level rescaling is enough for the task at hand.

That is the tradeoff. IA3 is elegant because it asks the model to do less. But that can also mean it has less freedom when the task needs a richer behavioral shift.

In practice, IA3 is appealing when I suspect the base model already knows most of what I need and the real job is selective amplification rather than representational surgery.

Here is what an IA3 setup looks like in PEFT:

\`\`\`python
from peft import IA3Config, TaskType, get_peft_model

ia3_config = IA3Config(
    task_type=TaskType.CAUSAL_LM,
    target_modules=["k_proj", "v_proj", "down_proj"],
    feedforward_modules=["down_proj"],
)

model = get_peft_model(model, ia3_config)
model.print_trainable_parameters()
\`\`\`

The important point is conceptual, not just syntactic: IA3 is telling the model which existing channels to trust more or less, not learning a broad additive patch over the layer weights.

## Where IA3 can be a better fit than LoRA

I would not position IA3 as "LoRA but better". I would position it as "LoRA is not always the right shape of update".

Cases where IA3 looks attractive to me:

1. I want a very small adapter footprint.
2. I care about fast iteration across many task variants.
3. The downstream task is fairly close to the pretrained behavior.
4. I want a strong low-cost baseline before paying for a larger adapter.

In that setting, IA3 is not just a smaller checkpoint. It is a deliberately conservative update mechanism.

That conservative quality matters. Sometimes I do not want the adapter to have too much expressive freedom. Sometimes the real problem is not "the model needs a major rewrite". It is "the model needs a more disciplined routing of what it already knows".

This also changes how I think about experiment cost. If I am sweeping many tasks, prompts, or dataset variants, IA3 is attractive because the adapter itself is so small that I can afford to treat it almost like a routing hypothesis rather than a full adaptation object.

## BOFT: multiplicative updates with a stronger structural bias

BOFT is interesting for a different reason.

Where LoRA is additive, BOFT is multiplicative. It builds on orthogonal finetuning ideas and uses butterfly factorization to make those updates more parameter-efficient.

The high-level shape is closer to

\`\`\`text
W' = R W
\`\`\`

or a related structured orthogonal transform around the frozen pretrained weight, where 'R' is not a dense unconstrained matrix but a product of butterfly-structured factors. The butterfly parameterization is what keeps the update practical.

The key idea I care about is not the butterfly math by itself. It is the bias that BOFT introduces.

LoRA says: add a learned correction.

BOFT says: transform the pretrained weights through a structured, orthogonal update space.

That gives BOFT a different flavor. The promise is not just parameter efficiency. The promise is that by constraining the update geometry, you may preserve more of the useful structure from pretraining while still adapting the model.

This is the part that makes BOFT worth watching. A lot of real finetuning pain is not "my model cannot learn the task at all". It is:

- overfitting quickly
- drifting too far from useful pretrained behavior
- getting an adapter that is technically tuned but feels brittle

BOFT is appealing because it treats the update rule itself as something that should have structure, not just low parameter count.

This is the type of PEFT method I reach for when I care not only about adapter size but also about the geometry of the update.

This is also where IA3 and BOFT become attractive if I am worried about catastrophic forgetting. I would not claim either method magically prevents it, but both impose a more constrained kind of change than a broad unconstrained update. IA3 only rescales existing pathways, and BOFT keeps the update inside a structured multiplicative family, so both can be sensible choices when I want adaptation pressure without rewriting too much of the pretrained behavior.

Here is what a BOFT configuration looks like in PEFT for a Llama-style naming scheme:

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
\`\`\`

I would not treat those hyperparameters as universally good. The real point is that BOFT gives me a structured multiplicative family to explore, not just another additive adapter.

## Why BOFT feels more experimental in practice

Even though I like the idea, I would still treat BOFT as a more deliberate choice than LoRA.

Why:

- the method is less standard in everyday LLM stacks
- the hyperparameter surface is less familiar to most practitioners
- debugging and intuition are not as mature as they are for LoRA

That does not make it bad. It just means I would not reach for BOFT unless I actually care about the bias it introduces.

If my goal is "give me the strongest reasonable baseline by tonight", LoRA still wins.

If my goal is "I care about preserving pretrained behavior, I want a more structured update family, and I am willing to tune for it", BOFT becomes more interesting.

Another way to say it: LoRA is my baseline adapter, IA3 is my cheapest steering adapter, and BOFT is my geometry-aware adapter.

## What I would actually benchmark

If I am comparing these methods seriously, I do not want a leaderboard screenshot. I want a table like this:

\`\`\`python
import pandas as pd

results = pd.DataFrame(
    [
        {"method": "lora", "trainable_pct": 0.12, "val_loss": 1.84, "ppl": 6.30},
        {"method": "ia3",  "trainable_pct": 0.01, "val_loss": 1.96, "ppl": 7.10},
        {"method": "boft", "trainable_pct": 0.05, "val_loss": 1.88, "ppl": 6.55},
    ]
)

print(results.sort_values("val_loss"))
\`\`\`

The exact metric will depend on the task, but the evaluation frame should usually include:

- task metric or validation loss
- trainable parameter count
- peak memory
- tokens per second
- stability across seeds
- sensitivity to data size and hyperparameters

That last one matters more than people admit. A method that wins once but collapses under small recipe changes is much less useful than a method that is slightly worse on paper but stable under repeated runs.

## Failure modes I would watch for

LoRA failure modes:

- rank too small to express the shift I need
- target modules too narrow
- overfitting when the dataset is tiny and noisy

IA3 failure modes:

- not enough expressive freedom
- downstream task requires richer weight-level change
- apparent convergence without enough behavioral movement

BOFT failure modes:

- more tuning burden
- less intuitive debugging
- gains that disappear if the task does not actually benefit from structured multiplicative updates

This is why I do not like method debates without workload context. The right question is not "which PEFT method is best?". The right question is "what kind of update do I want this frozen model to be allowed to make?".

## How I think about choosing between them

If I had to compress the decision into a simple practical rule:

### Choose LoRA when:

- I want the safest default
- I need broad community support and well-known recipes
- I want a baseline that is likely to work with minimal friction

### Choose IA3 when:

- I want the smallest possible trainable footprint
- I believe the task is close enough that activation rescaling may be sufficient
- I want a cheap adapter to test whether lightweight steering is enough
- I want a more conservative update because preserving pretrained behavior matters

### Choose BOFT when:

- I care about a more structured update family than additive low-rank patches
- I want to explore stronger preservation of pretrained behavior
- I am willing to spend more attention on the method itself, not just the dataset
- I am trying to reduce the risk of catastrophic forgetting with a more constrained update style

That last point matters. The right way to compare these methods is not by ideology. It is by what failure mode I am trying to avoid.

## My practical takeaway

LoRA is still the default for a reason. I do not think the lesson is "move on from LoRA". The lesson is "do not let LoRA become the only way you imagine PEFT".

IA3 is a reminder that very small, activation-level control can sometimes be enough.

BOFT is a reminder that the shape of the update matters, and that preserving useful pretrained structure may be as important as maximizing raw adapter flexibility.

If I were running a serious adaptation project, I would not frame this as a beauty contest between methods. I would frame it as a search over update styles:

- additive and flexible
- activation-level and conservative
- multiplicative and structurally constrained

That is the part I find most useful.

The real win is not picking a favorite acronym. The real win is understanding what kind of change I am allowing the model to make, what budget I am operating under, and what kind of failure I am trying to prevent while doing it.

In practice, I would still start with LoRA for speed, keep IA3 in mind when I want extremely cheap steering, and reach for BOFT when I specifically care about structured multiplicative updates rather than a generic additive patch.`,
  },
];

export const getBlogPostById = (id: string) =>
  blogPosts.find((post) => post.id === id);
