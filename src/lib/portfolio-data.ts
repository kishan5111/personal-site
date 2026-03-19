export type Medal = "Gold" | "Silver" | "Bronze";

export interface CompetitionNotebook {
  title: string;
  description: string;
  link: string;
  label?: string;
}

export interface CompetitionEntry {
  id: string;
  title: string;
  medal: Medal;
  rank: string;
  dateRange: string;
  teamCount: string;
  summary: string;
  challenge: string;
  bullets: string[];
  notebooks: CompetitionNotebook[];
  writeupLink?: string;
}

export interface CodeContribution {
  title: string;
  competitionId: string;
  competitionTitle: string;
  label: string;
  description: string;
  link: string;
}

export interface ActiveProject {
  title: string;
  url: string;
  status: string;
  description: string;
  bullets: string[];
}

export const competitions: Record<string, CompetitionEntry> = {
  jigsaw: {
    id: "jigsaw",
    title: "Jigsaw - Agile Community Rules Classification",
    medal: "Gold",
    rank: "5th / 2445 teams",
    dateRange: "Jul 23, 2025 - Oct 24, 2025",
    teamCount: "2445 teams",
    summary:
      "Built models for community-specific rule classification and finished 5th out of 2445 teams, earning a gold medal.",
    challenge:
      "Predict which community rule, if any, a comment may have violated so moderation systems can better respect subreddit-specific norms.",
    bullets: [
      "Framed the problem as high-signal community-aware classification instead of a generic toxicity task.",
      "Combined embedding-driven modeling with a diverse final ensemble for stronger leaderboard stability.",
      "Turned the final ranked solution into public code and a writeup rather than leaving the work as a private competition artifact.",
    ],
    notebooks: [
      {
        title: "Qwen embedding + LLaMA logistic regression pipeline",
        description:
          "Public notebook for the representation-first pipeline used during iteration on the Jigsaw rule classification task.",
        link: "https://www.kaggle.com/code/kishanvavdara/test-on-testdataset-qwenemdding-llama-lr",
        label: "Gold notebook",
      },
      {
        title: "5th place solution - diverse ensemble",
        description:
          "Final ranked solution that blended diverse models instead of overfitting to a single modeling approach.",
        link: "https://www.kaggle.com/code/kishanvavdara/5th-place-solution-diverse-ensemble",
        label: "Bronze notebook",
      },
    ],
    writeupLink:
      "https://www.kaggle.com/competitions/jigsaw-agile-community-rules/writeups/5th-place-solution-diverse-ensemble",
  },
  lmsys: {
    id: "lmsys",
    title: "LMSYS - Chatbot Arena Human Preference Predictions",
    medal: "Silver",
    rank: "21st / 1849 teams",
    dateRange: "Jul 2024 - Sep 2024",
    teamCount: "1849 teams",
    summary:
      "Secured 21st place out of 1849 teams by predicting human preferences in chatbot interactions, earning a silver medal.",
    challenge:
      "Model pairwise human preference signals from chatbot conversations and push open-weight LLM training and inference pipelines hard enough to compete.",
    bullets: [
      "Fine-tuned Llama and Gemma variants for the ranking task with custom TPU and GPU workflows.",
      "Optimized inference and post-processing to squeeze more signal out of the same model family.",
      "Published multiple medal-winning notebooks that were widely copied by the Kaggle community.",
    ],
    notebooks: [
      {
        title: "LMSYS - Llama 3 TPU train",
        description:
          "Fine-tuned and sharded Llama 3 8B on Kaggle TPUs with a custom training workflow.",
        link: "https://www.kaggle.com/code/kishanvavdara/lmsys-llama-3-tpu-train",
        label: "Gold notebook",
      },
      {
        title: "Inference - Llama 3 8B",
        description:
          "Parallel dual-T4 inference notebook for the fine-tuned Llama 3 8B system.",
        link: "https://www.kaggle.com/code/kishanvavdara/inference-llama-3-8b",
        label: "Gold notebook",
      },
      {
        title: "21st place human bias - 2 x Gemma 9B",
        description:
          "Final-ranked ensemble notebook combining two fine-tuned Gemma 9B models with feature engineering and post-processing.",
        link: "https://www.kaggle.com/code/kishanvavdara/21st-place-human-bias-2-x-gemma-9b-4096-len",
        label: "Silver solution",
      },
    ],
    writeupLink:
      "https://www.kaggle.com/competitions/lmsys-chatbot-arena/discussion/527627",
  },
  csiro: {
    id: "csiro",
    title: "CSIRO - Image2Biomass Prediction",
    medal: "Silver",
    rank: "73rd / 3803 teams",
    dateRange: "Oct 29, 2025 - Jan 29, 2026",
    teamCount: "3803 teams",
    summary:
      "Won a silver medal and placed 73rd out of 3803 teams on biomass prediction from pasture imagery.",
    challenge:
      "Predict pasture biomass from images, ground-truth measurements, and public data so farmers can make better grazing decisions.",
    bullets: [
      "Built a simple but effective ensemble with diverse image-driven approaches instead of overcomplicating the stack.",
      "Worked in a very large field, which makes the silver finish a strong ranking signal.",
      "Used the competition to show breadth beyond pure NLP while still staying grounded in pragmatic modeling choices.",
    ],
    notebooks: [],
    writeupLink:
      "https://www.kaggle.com/competitions/csiro-biomass/writeups/rank-76-approach-simple-ensemble-with-diverse-di",
  },
  map: {
    id: "map",
    title: "MAP - Charting Student Math Misunderstandings",
    medal: "Silver",
    rank: "74th / 1857 teams",
    dateRange: "Jul 11, 2025 - Oct 16, 2025",
    teamCount: "1857 teams",
    summary:
      "Placed 74th out of 1857 teams on misconception retrieval from student open-ended math responses.",
    challenge:
      "Predict likely misconceptions from student explanations so teachers can identify incorrect reasoning faster and respond with better intervention.",
    bullets: [
      "Worked on NLP for educational reasoning data where ranking the right misconception candidates mattered more than generic classification accuracy.",
      "Explored ensembles across Gemma, Qwen, and DeepSeek-style components instead of relying on a single model family.",
      "Published both training and inference notebooks plus a public writeup of the final blend.",
    ],
    notebooks: [
      {
        title: "Ensemble Gemma + Qwen + DeepSeek",
        description:
          "Submission-oriented ensemble notebook combining multiple model families for misconception ranking.",
        link: "https://www.kaggle.com/code/kishanvavdara/ensemble-gemma-qwen-deepseek",
        label: "Gold notebook",
      },
      {
        title: "DeepSeekMath 7B TPU train bf16",
        description:
          "TPU training notebook for DeepSeekMath 7B with a bf16 workflow tuned for Kaggle hardware constraints.",
        link: "https://www.kaggle.com/code/kishanvavdara/map-deepseekmath-7b-it-tpu-train-bf16",
        label: "Gold notebook",
      },
      {
        title: "DeepSeekMath 7B inference",
        description:
          "Public inference notebook focused on efficient scoring and submission generation.",
        link: "https://www.kaggle.com/code/kishanvavdara/deepseekmath-7b-inference",
        label: "Silver notebook",
      },
    ],
    writeupLink:
      "https://www.kaggle.com/competitions/map-charting-student-math-misunderstandings/writeups/public-29-private-75-approach-simple-blend-of-mu",
  },
  "llm-prompt": {
    id: "llm-prompt",
    title: "LLM Prompt Recovery Competition",
    medal: "Bronze",
    rank: "120th / 2175 teams",
    dateRange: "Mar 2024",
    teamCount: "2175 teams",
    summary:
      "Ranked 120th out of 2175 teams on prompt recovery, earning a bronze medal.",
    challenge:
      "Recover the prompt used to transform one piece of text into another while working under tight inference and modeling constraints.",
    bullets: [
      "Focused on practical prompt-recovery iteration rather than heavyweight experimentation.",
      "Used quantized multi-GPU inference to keep experimentation efficient on Kaggle hardware.",
    ],
    notebooks: [
      {
        title: "Gemma 7B it quant inference on multi-GPU",
        description:
          "Notebook for running quantized Gemma 7B inference across multiple GPUs for prompt recovery submissions.",
        link: "https://www.kaggle.com/code/kishanvavdara/gemma-7b-it-quant-inference-on-multi-gpu",
      },
    ],
  },
};

export const featuredCompetitionIds = ["jigsaw", "lmsys", "csiro", "map"];

export const additionalCompetitionIds = ["llm-prompt"];

export const selectedCodeContributions: CodeContribution[] = [
  {
    title: "MAP: Ensemble Gemma + Qwen + DeepSeek",
    competitionId: "map",
    competitionTitle: competitions.map.title,
    label: "Gold notebook",
    description:
      "Shows multi-model ensembling and submission strategy for misconception ranking rather than single-model dependence.",
    link: "https://www.kaggle.com/code/kishanvavdara/ensemble-gemma-qwen-deepseek",
  },
  {
    title: "MAP: DeepSeekMath 7B TPU train bf16",
    competitionId: "map",
    competitionTitle: competitions.map.title,
    label: "Gold notebook",
    description:
      "Demonstrates TPU fine-tuning and training workflow design under Kaggle hardware limits.",
    link: "https://www.kaggle.com/code/kishanvavdara/map-deepseekmath-7b-it-tpu-train-bf16",
  },
  {
    title: "MAP writeup",
    competitionId: "map",
    competitionTitle: competitions.map.title,
    label: "Writeup",
    description:
      "Public explanation of the simple blend approach and the reasoning behind the final leaderboard strategy.",
    link: "https://www.kaggle.com/competitions/map-charting-student-math-misunderstandings/writeups/public-29-private-75-approach-simple-blend-of-mu",
  },
  {
    title: "Jigsaw: Qwen embedding + LLaMA LR",
    competitionId: "jigsaw",
    competitionTitle: competitions.jigsaw.title,
    label: "Gold notebook",
    description:
      "Highlights representation-first modeling and fast experimentation for community-rule classification.",
    link: "https://www.kaggle.com/code/kishanvavdara/test-on-testdataset-qwenemdding-llama-lr",
  },
  {
    title: "Jigsaw: 5th place diverse ensemble",
    competitionId: "jigsaw",
    competitionTitle: competitions.jigsaw.title,
    label: "Bronze notebook",
    description:
      "Final public solution showing how diverse ensembles improved leaderboard performance and robustness.",
    link: "https://www.kaggle.com/code/kishanvavdara/5th-place-solution-diverse-ensemble",
  },
  {
    title: "LMSYS: Llama 3 TPU train",
    competitionId: "lmsys",
    competitionTitle: competitions.lmsys.title,
    label: "Gold notebook",
    description:
      "Shows practical large-model fine-tuning on Kaggle TPUs and the kind of infrastructure iteration that translates beyond competitions.",
    link: "https://www.kaggle.com/code/kishanvavdara/lmsys-llama-3-tpu-train",
  },
];

export const activeProjects: ActiveProject[] = [
  {
    title: "FitMyGPU",
    url: "https://fitmygpu.com",
    status: "Active development",
    description:
      "FitMyGPU helps reason about workload-to-hardware fit before serving decisions turn into expensive deployment mistakes.",
    bullets: [
      "Focused on matching real workloads to practical GPU constraints.",
      "Built around deployment tradeoffs, not just model-size tables.",
    ],
  },
  {
    title: "ServingOps",
    url: "https://servingops.com",
    status: "Active development",
    description:
      "ServingOps is an active project around practical model-serving workflows, operational constraints, and deployment decisions for production systems.",
    bullets: [
      "Centered on serving reliability, operational judgment, and infra ergonomics.",
      "Extends the portfolio beyond competitions into product and systems thinking.",
    ],
  },
];
