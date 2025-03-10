import { motion } from "framer-motion";
import { ExternalLink, Github, Trophy, Medal, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Gemini for YouTube Videos",
    description: "Built a tool that enables downloading, uploading and chatting with any YouTube video/shorts using Gemini 1.5 Pro's long context capabilities.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    tags: ["Gemini 1.5 Pro", "YouTube API", "PyTube", "Google GenAI"],
    github: "https://www.kaggle.com/code/kishanvavdara/gemini-for-youtube-videos",
    demo: "https://www.kaggle.com/code/kishanvavdara/gemini-for-youtube-videos"
  },
  {
    title: "BitPredict: Bitcoin Price Forecasting",
    description: "Developed comprehensive time series forecasting models for Bitcoin price prediction using various neural network architectures.",
    image: "https://images.unsplash.com/photo-1591994843349-f415893b3a6b?w=800&q=80",
    tags: ["Time Series", "Dense NN", "Ensemble Models", "TensorFlow"],
    github: "https://www.kaggle.com/code/kishanvavdara/time-series-bitpredict",
    demo: "https://www.kaggle.com/code/kishanvavdara/time-series-bitpredict"
  },
  {
    title: "SkimLit: Medical Abstract Classification",
    description: "Created an NLP model to make reading medical abstracts easier, replicating and beating the 2017 PubMed 200k RCT paper's model.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    tags: ["NLP", "TensorFlow", "Keras", "Medical ML"],
    github: "https://github.com/kishan5111/Deep_Learning_Vault/blob/main/projects/Project-sentence-classification-in-medical-abstract.ipynb",
    demo: "https://github.com/kishan5111/Deep_Learning_Vault/blob/main/projects/Project-sentence-classification-in-medical-abstract.ipynb"
  },
  {
    title: "Food Vision Classification",
    description: "Fine-tuned pre-trained models to classify 101 food categories, beating the DeepFood paper's accuracy using the Food101 dataset.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    tags: ["Transfer Learning", "TensorFlow", "Computer Vision", "Food101"],
    github: "https://github.com/kishan5111/Deep_Learning_Vault/blob/main/projects/Project-Food-Vision.ipynb",
    demo: "https://github.com/kishan5111/Deep_Learning_Vault/blob/main/projects/Project-Food-Vision.ipynb"
  }
];

const competitions = [
  {
    name: "LMSYS Chatbot Arena Human Preference Predictions",
    rank: "21st / 1,849 teams (Silver Medal)",
    icon: <Trophy className="h-6 w-6 text-yellow-500" />,
    writeup: "https://www.kaggle.com/competitions/lmsys-chatbot-arena/discussion/527627",
    projects: [
      {
        title: "Llama-3 [TPU Train]",
        date: "July 2024",
        medal: "Gold",
        description: "Fine-tuned and sharded Llama-3 8B on TPU with a custom pipeline, resulting in a gold medal and widespread community adoption (700+ copies).",
        technologies: "torch_xla, Transformers, PEFT, Scikit-learn, PyTorch",
        link: "https://www.kaggle.com/code/kishanvavdara/lmsys-llama-3-tpu-train",
        image: "https://images.unsplash.com/photo-1677442135688-8ef41013639e?w=800&q=80",
      },
      {
        title: "Inference - Llama-3 8B",
        date: "August 2024",
        medal: "Gold",
        description: "Deployed a fine-tuned Llama-3 8B model using a two-GPU setup for parallel inference on a large test set, earning another gold medal and high community recognition.",
        technologies: "Torch, Transformers, Threading, PEFT",
        link: "https://www.kaggle.com/code/kishanvavdara/inference-llama-3-8b",
        image: "https://images.unsplash.com/photo-1677442135688-8ef41013639e?w=800&q=80",
      },
      {
        title: "Human Bias with 2x Gemma 9B",
        date: "September 2024",
        medal: "Silver",
        description: "Combined two fine-tuned Gemma 9B models with advanced preprocessing and feature engineering to achieve fast and accurate inference, earning a 21st place finish.",
        technologies: "PyTorch, Feature Engineering, Model Ensembling",
        link: "https://www.kaggle.com/code/kishanvavdara/21st-place-human-bias-2-x-gemma-9b-4096-len",
        image: "https://images.unsplash.com/photo-1677442135688-8ef41013639e?w=800&q=80",
      }
    ]
  },
  {
    name: "LLM Prompt Recovery Competition",
    rank: "120th / 2,175 teams (Bronze Medal)",
    icon: <Medal className="h-6 w-6 text-amber-700" />,
    writeup: null,
    projects: [
      {
        title: "Gemma 7B-IT Quantized Inference",
        date: "March 2024",
        medal: "Bronze",
        description: "Built solutions to recover the prompts used to transform given text, fine-tuning Gemma 7B-IT on multiple GPUs for efficient inference.",
        technologies: "Gemma 7B, Multi-GPU Training, Quantization",
        link: "https://www.kaggle.com/code/kishanvavdara/gemma-7b-it-quant-inference-on-multi-gpu",
        image: "https://images.unsplash.com/photo-1655720033654-a4239dd42d10?w=800&q=80",
      }
    ]
  },
  {
    name: "Open Problems Competition",
    rank: "Gold & Silver Medals",
    icon: <Trophy className="h-6 w-6 text-yellow-500" />,
    writeup: null,
    projects: [
      {
        title: "Neural Network Regression",
        date: "November 2023",
        medal: "Gold",
        description: "Developed neural network training and inference pipelines to achieve a high score, resulting in a gold medal and 200+ notebook copies.",
        technologies: "Neural Networks, Regression, TensorFlow",
        link: "https://www.kaggle.com/code/kishanvavdara/neural-network-regression",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
      },
      {
        title: "NLP Regression",
        date: "December 2023",
        medal: "Silver",
        description: "Used molecular SMILES representations to generate embeddings and trained Conv1D, LSTM, and neural network models for accurate predictions.",
        technologies: "NLP, SMILES Embeddings, Conv1D, LSTM",
        link: "https://www.kaggle.com/code/kishanvavdara/nlp-regression",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
      }
    ]
  }
];

const Projects = () => {
  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          A showcase of my machine learning, deep learning, and natural language processing projects.
          From award-winning Kaggle competition solutions to personal research initiatives.
        </p>
        
        {/* Competition Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Trophy className="h-7 w-7 text-yellow-500" />
            Competition Projects
          </h2>
          
          {competitions.map((competition, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-3">
                  {competition.icon}
                  <h3 className="text-2xl font-semibold">{competition.name}</h3>
                </div>
                <div className="text-muted-foreground text-lg font-medium">
                  {competition.rank}
                </div>
              </div>
              
              {competition.writeup && (
                <div className="mb-4">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => window.open(competition.writeup, "_blank")}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Read Competition Write-up</span>
                  </Button>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {competition.projects.map((project, projectIndex) => (
                  <motion.div 
                    key={projectIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (index + projectIndex) * 0.05 }}
                    className="glass rounded-lg overflow-hidden group h-full flex flex-col"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          project.medal === "Gold" ? "bg-yellow-500/90 text-black" : 
                          project.medal === "Silver" ? "bg-gray-300/90 text-black" :
                          "bg-amber-700/90 text-white"
                        }`}>
                          {project.medal} Medal
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-semibold">{project.title}</h3>
                        <span className="text-xs text-muted-foreground">{project.date}</span>
                      </div>
                      <p className="text-muted-foreground mb-4 text-sm flex-grow">{project.description}</p>
                      <div className="mb-4">
                        <div className="text-xs text-muted-foreground mb-2 font-medium">Technologies:</div>
                        <p className="text-sm">{project.technologies}</p>
                      </div>
                      <div className="mt-auto">
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>View Notebook</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Other Projects Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Personal Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-lg overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span>Code</span>
                    </a>
                    <a 
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span>Demo</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;
