
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

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
    title: "LMSYS Chatbot Arena - Silver Medal (21st/1849)",
    description: "Developed solutions for predicting human preferences in LLM responses, using fine-tuned models and achieving 21st place in this competitive Kaggle competition.",
    image: "https://images.unsplash.com/photo-1677442135688-8ef41013639e?w=800&q=80",
    tags: ["LLMs", "Llama-3", "Gemma 9B", "TPU Training"],
    github: "https://www.kaggle.com/competitions/lmsys-chatbot-arena/discussion/527627",
    demo: "https://www.kaggle.com/code/kishanvavdara/21st-place-human-bias-2-x-gemma-9b-4096-len"
  },
  {
    title: "LLM Prompt Recovery - Bronze Medal (120th/2175)",
    description: "Built solutions to recover the prompts used to transform given text, fine-tuning various LLMs including Gemma 7B-IT.",
    image: "https://images.unsplash.com/photo-1655720033654-a4239dd42d10?w=800&q=80",
    tags: ["LLM", "Gemma 7B", "Multi-GPU", "Prompt Engineering"],
    github: "https://www.kaggle.com/code/kishanvavdara/gemma-7b-it-quant-inference-on-multi-gpu",
    demo: "https://www.kaggle.com/code/kishanvavdara/gemma-7b-it-quant-inference-on-multi-gpu"
  },
  {
    title: "Open Problems Competition - Gold & Silver Medal",
    description: "Created award-winning notebooks for the Open Problems competitions, implementing neural network regression and NLP approaches.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
    tags: ["Neural Networks", "Regression", "NLP", "SMILES Embeddings"],
    github: "https://www.kaggle.com/code/kishanvavdara/neural-network-regression",
    demo: "https://www.kaggle.com/code/kishanvavdara/nlp-regression"
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
          These range from Kaggle competitions with gold and silver medals to personal research projects.
        </p>
        
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
      </motion.div>
    </div>
  );
};

export default Projects;
