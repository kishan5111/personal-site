
import { ExternalLink, Github, Trophy, Medal, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Gemini for YouTube Videos",
    description: "Built a tool that enables downloading, uploading and chatting with any YouTube video/shorts using Gemini 1.5 Pro's long context capabilities.",
    tags: ["Gemini 1.5 Pro", "YouTube API", "PyTube", "Google GenAI"],
    github: "https://www.kaggle.com/code/kishanvavdara/gemini-for-youtube-videos",
    demo: "https://www.kaggle.com/code/kishanvavdara/gemini-for-youtube-videos"
  },
  {
    title: "BitPredict: Bitcoin Price Forecasting",
    description: "Developed comprehensive time series forecasting models for Bitcoin price prediction using various neural network architectures.",
    tags: ["Time Series", "Dense NN", "Ensemble Models", "TensorFlow"],
    github: "https://www.kaggle.com/code/kishanvavdara/time-series-bitpredict",
    demo: "https://www.kaggle.com/code/kishanvavdara/time-series-bitpredict"
  },
  {
    title: "SkimLit: Medical Abstract Classification",
    description: "Created an NLP model to make reading medical abstracts easier, replicating and beating the 2017 PubMed 200k RCT paper's model.",
    tags: ["NLP", "TensorFlow", "Keras", "Medical ML"],
    github: "https://github.com/kishan5111/Deep_Learning_Vault/blob/main/projects/Project-sentence-classification-in-medical-abstract.ipynb",
    demo: "https://github.com/kishan5111/Deep_Learning_Vault/blob/main/projects/Project-sentence-classification-in-medical-abstract.ipynb"
  },
  {
    title: "Food Vision Classification",
    description: "Fine-tuned pre-trained models to classify 101 food categories, beating the DeepFood paper's accuracy using the Food101 dataset.",
    tags: ["Transfer Learning", "TensorFlow", "Computer Vision", "Food101"],
    github: "https://github.com/kishan5111/Deep_Learning_Vault/blob/main/projects/Project-Food-Vision.ipynb",
    demo: "https://github.com/kishan5111/Deep_Learning_Vault/blob/main/projects/Project-Food-Vision.ipynb"
  }
];

const competitions = [
  {
    name: "LMSYS Chatbot Arena Human Preference Predictions",
    rank: "21st / 1,849 teams (Silver Medal)",
    icon: <Trophy className="h-5 w-5 text-yellow-500" />,
    writeup: "https://www.kaggle.com/competitions/lmsys-chatbot-arena/discussion/527627",
    projects: [
      {
        title: "Llama-3 [TPU Train]",
        date: "July 2024",
        medal: "Gold",
        description: "Fine-tuned and sharded Llama-3 8B on TPU with a custom pipeline, resulting in a gold medal and widespread community adoption (700+ copies).",
        technologies: "torch_xla, Transformers, PEFT, Scikit-learn, PyTorch",
        link: "https://www.kaggle.com/code/kishanvavdara/lmsys-llama-3-tpu-train",
      },
      {
        title: "Inference - Llama-3 8B",
        date: "August 2024",
        medal: "Gold",
        description: "Deployed a fine-tuned Llama-3 8B model using a two-GPU setup for parallel inference on a large test set, earning another gold medal and high community recognition.",
        technologies: "Torch, Transformers, Threading, PEFT",
        link: "https://www.kaggle.com/code/kishanvavdara/inference-llama-3-8b",
      },
      {
        title: "Human Bias with 2x Gemma 9B",
        date: "September 2024",
        medal: "Silver",
        description: "Combined two fine-tuned Gemma 9B models with advanced preprocessing and feature engineering to achieve fast and accurate inference, earning a 21st place finish.",
        technologies: "PyTorch, Feature Engineering, Model Ensembling",
        link: "https://www.kaggle.com/code/kishanvavdara/21st-place-human-bias-2-x-gemma-9b-4096-len",
      }
    ]
  },
  {
    name: "LLM Prompt Recovery Competition",
    rank: "120th / 2,175 teams (Bronze Medal)",
    icon: <Medal className="h-5 w-5 text-amber-700" />,
    writeup: null,
    projects: [
      {
        title: "Gemma 7B-IT Quantized Inference",
        date: "March 2024",
        medal: "Bronze",
        description: "Built solutions to recover the prompts used to transform given text, fine-tuning Gemma 7B-IT on multiple GPUs for efficient inference.",
        technologies: "Gemma 7B, Multi-GPU Training, Quantization",
        link: "https://www.kaggle.com/code/kishanvavdara/gemma-7b-it-quant-inference-on-multi-gpu",
      }
    ]
  },
  {
    name: "Open Problems Competition",
    rank: "Gold & Silver Medals",
    icon: <Trophy className="h-5 w-5 text-yellow-500" />,
    writeup: null,
    projects: [
      {
        title: "Neural Network Regression",
        date: "November 2023",
        medal: "Gold",
        description: "Developed neural network training and inference pipelines to achieve a high score, resulting in a gold medal and 200+ notebook copies.",
        technologies: "Neural Networks, Regression, TensorFlow",
        link: "https://www.kaggle.com/code/kishanvavdara/neural-network-regression",
      },
      {
        title: "NLP Regression",
        date: "December 2023",
        medal: "Silver",
        description: "Used molecular SMILES representations to generate embeddings and trained Conv1D, LSTM, and neural network models for accurate predictions.",
        technologies: "NLP, SMILES Embeddings, Conv1D, LSTM",
        link: "https://www.kaggle.com/code/kishanvavdara/nlp-regression",
      }
    ]
  }
];

const Projects = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <p className="text-muted-foreground mb-10">
        A showcase of my machine learning, deep learning, and natural language processing projects.
      </p>
      
      {/* Competition Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Competition Projects
        </h2>
        
        <div className="space-y-12">
          {competitions.map((competition, index) => (
            <div key={index} className="border-t pt-6">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-2">
                  {competition.icon}
                  <h3 className="text-xl font-semibold">{competition.name}</h3>
                </div>
                <div className="text-muted-foreground">
                  {competition.rank}
                </div>
              </div>
              
              {competition.writeup && (
                <div className="mb-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => window.open(competition.writeup, "_blank")}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Read Competition Write-up</span>
                  </Button>
                </div>
              )}
              
              <div className="space-y-6 mt-4">
                {competition.projects.map((project, projectIndex) => (
                  <div key={projectIndex} className="border p-4 rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{project.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{project.date}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          project.medal === "Gold" ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400" : 
                          project.medal === "Silver" ? "bg-gray-300/20 text-gray-700 dark:text-gray-300" :
                          "bg-amber-700/20 text-amber-700 dark:text-amber-500"
                        }`}>
                          {project.medal} Medal
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                    {project.technologies && (
                      <div className="mb-3">
                        <div className="text-xs text-muted-foreground mb-1">Technologies:</div>
                        <p className="text-sm">{project.technologies}</p>
                      </div>
                    )}
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-primary hover:underline text-sm"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>View Notebook</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Personal Projects Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Personal Projects</h2>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="border p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-muted-foreground hover:text-primary text-sm"
                >
                  <Github className="h-3 w-3" />
                  <span>Code</span>
                </a>
                <a 
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-muted-foreground hover:text-primary text-sm"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Demo</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
