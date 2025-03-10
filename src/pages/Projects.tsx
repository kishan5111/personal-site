
import { ExternalLink, Github, Trophy, Medal, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      
      {/* Competitions Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Competitions</h2>
        
        {/* LMSYS Competition */}
        <div className="mb-8 border-b pb-6">
          <h3 className="text-xl font-semibold">LMSYS - Chatbot Arena Human Preference Predictions (Kaggle)</h3>
          <p className="text-sm text-muted-foreground mb-1">July - September 2024</p>
          <p className="mb-2">Secured 21st place (Silver Medal) out of 1,849 teams by predicting human preferences in chatbot interactions.</p>
          
          <h4 className="font-medium mb-2 mt-4">Notebooks:</h4>
          <ol className="space-y-4 ml-1">
            <li className="border rounded-md p-3">
              <div className="font-medium">LMSYS - Llama-3 [TPU Train] (July 2024)</div>
              <p className="text-sm mb-2">Fine-tuned and sharded the Llama-3 8B model on Kaggle TPUs with a custom pipeline, earning a gold medal and over 700 copies.</p>
              <p className="text-sm mb-2"><span className="font-medium">Tools:</span> Torch_XLA, Transformers, PEFT, Scikit-learn, PyTorch</p>
              <a 
                href="https://www.kaggle.com/code/kishanvavdara/lmsys-llama-3-tpu-train"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary text-sm flex items-center gap-1 hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Kaggle - lmsys-llama-3-tpu-train</span>
              </a>
            </li>
            
            <li className="border rounded-md p-3">
              <div className="font-medium">Inference - Llama-3 8B (August 2024)</div>
              <p className="text-sm mb-2">Performed parallel inference on a fine-tuned Llama-3 8B model using dual T4 GPUs, processing 25k samples in under 5 hours. Earned a gold medal, over 1,000 copies, and ranked among the highest-upvoted notebooks in the competition.</p>
              <p className="text-sm mb-2"><span className="font-medium">Tools:</span> PyTorch, Transformers, Threading, PEFT</p>
              <a 
                href="https://www.kaggle.com/code/kishanvavdara/inference-llama-3-8b"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary text-sm flex items-center gap-1 hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Kaggle - inference-llama-3-8b</span>
              </a>
            </li>
            
            <li className="border rounded-md p-3">
              <div className="font-medium">21st Place [Human Bias] 2 x Gemma 9B [4096 len] (September 2024)</div>
              <p className="text-sm mb-2">Combined two fine-tuned Gemma 9B models with preprocessing, feature engineering, and post-processing, achieving inference for 25k samples in under 9 hours on Tesla T4 GPUs.</p>
              <a 
                href="https://www.kaggle.com/code/kishanvavdara/21st-place-human-bias-2-x-gemma-9b-4096-len"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary text-sm flex items-center gap-1 hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Kaggle - 21st-place-human-bias-2-x-gemma-9b-4096-len</span>
              </a>
            </li>
          </ol>
          
          <div className="mt-4">
            <a 
              href="https://www.kaggle.com/competitions/lmsys-chatbot-arena/discussion/527627"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary text-sm flex items-center gap-1 hover:underline"
            >
              <BookOpen className="h-3 w-3" />
              <span>Competition Writeup: Kaggle Discussion</span>
            </a>
          </div>
        </div>
        
        {/* LLM Prompt Recovery Competition */}
        <div className="mb-8 border-b pb-6">
          <h3 className="text-xl font-semibold">LLM Prompt Recovery Competition (Kaggle)</h3>
          <p className="text-sm text-muted-foreground mb-1">March 2024</p>
          <p className="mb-2">Ranked 120th (Bronze Medal) out of 2,175 teams by recovering prompts used to transform given texts.</p>
          
          <h4 className="font-medium mb-2 mt-4">Notebook:</h4>
          <ol className="space-y-4 ml-1">
            <li className="border rounded-md p-3">
              <div className="font-medium">Gemma 7b-it-quant Inference on Multi-GPU</div>
              <p className="text-sm mb-2">Implemented inference with the quantized Gemma-7b-it model on dual T4 GPUs for efficient prompting and submission.</p>
              <a 
                href="https://www.kaggle.com/code/kishanvavdara/gemma-7b-it-quant-inference-on-multi-gpu"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary text-sm flex items-center gap-1 hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Kaggle - gemma-7b-it-quant-inference-on-multi-gpu</span>
              </a>
            </li>
          </ol>
        </div>
        
        {/* Open Problems Competition */}
        <div className="mb-8 border-b pb-6">
          <h3 className="text-xl font-semibold">Open Problems Competition (Kaggle)</h3>
          <p className="text-sm text-muted-foreground mb-1">November - December 2023</p>
          <p className="mb-2">Contributed two standout notebooks in the Open Problems Single-Cell Perturbations competition:</p>
          
          <h4 className="font-medium mb-2 mt-4">Notebooks:</h4>
          <ol className="space-y-4 ml-1">
            <li className="border rounded-md p-3">
              <div className="font-medium">Neural Net Regression (November 2023)</div>
              <p className="text-sm mb-2">Trained and performed inference with a neural network to achieve a high score. Earned a gold medal and over 200 copies.</p>
              <a 
                href="https://www.kaggle.com/code/kishanvavdara/neural-network-regression"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary text-sm flex items-center gap-1 hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Kaggle - neural-network-regression</span>
              </a>
            </li>
            
            <li className="border rounded-md p-3">
              <div className="font-medium">NLP Regression (December 2023)</div>
              <p className="text-sm mb-2">Utilized SMILES molecular data to generate embeddings and trained models including Conv1D, LSTM, and neural networks, earning a silver medal.</p>
              <a 
                href="https://www.kaggle.com/code/kishanvavdara/nlp-regression"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary text-sm flex items-center gap-1 hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Kaggle - nlp-regression</span>
              </a>
            </li>
          </ol>
        </div>
      </section>
      
      {/* Projects Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        
        <div className="space-y-6">
          {/* Gemini for YouTube Videos */}
          <div className="border rounded-md p-4">
            <h3 className="text-lg font-semibold">Gemini for YouTube Videos</h3>
            <p className="text-sm text-muted-foreground mb-1">November 2024</p>
            <p className="text-sm mb-3">Developed a tool to download, upload, and chat with YouTube videos/shorts using their URLs, leveraging Gemini 1.5 Pro with long context capabilities for interactive conversations.</p>
            <p className="text-sm mb-3"><span className="font-medium">Tools:</span> Pytube, google.generativeai</p>
            <a 
              href="https://www.kaggle.com/code/kishanvavdara/gemini-for-youtube-videos"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary text-sm flex items-center gap-1 hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              <span>Kaggle - gemini-for-youtube-videos</span>
            </a>
          </div>
          
          {/* Time Series BitPredict */}
          <div className="border rounded-md p-4">
            <h3 className="text-lg font-semibold">Time Series BitPredict 💰📈</h3>
            <p className="text-sm text-muted-foreground mb-1">September 2023</p>
            <p className="text-sm mb-3">Created a time series forecasting project to predict Bitcoin prices. Implemented dense neural networks, multivariate dense models, feature engineering, ensemble techniques, and future forecasting capabilities.</p>
            <p className="text-sm mb-3"><span className="font-medium">Tools:</span> TensorFlow, Matplotlib, Pandas, NumPy</p>
            <a 
              href="https://www.kaggle.com/code/kishanvavdara/time-series-bitpredict"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary text-sm flex items-center gap-1 hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              <span>Kaggle - time-series-bitpredict</span>
            </a>
          </div>
          
          {/* SkimLit */}
          <div className="border rounded-md p-4">
            <h3 className="text-lg font-semibold">SkimLit (Skim Literature)</h3>
            <p className="text-sm text-muted-foreground mb-1">August 2023</p>
            <p className="text-sm mb-3">Built an NLP model to streamline reading medical abstracts by replicating and exceeding the performance of the deep learning model from the 2017 paper PubMed 200k RCT: A Dataset for Sequential Sentence Classification in Medical Abstracts. Included thorough EDA, text cleaning, and advanced NLP techniques for training and evaluation.</p>
            <p className="text-sm mb-3"><span className="font-medium">Tools:</span> Scikit-learn, NumPy, Pandas, Matplotlib, TensorFlow, Keras</p>
            <a 
              href="https://github.com/kishan5111/Deep_Learning_Vault/blob/main/projects/Project-sentence-classification-in-medical-abstract.ipynb"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary text-sm flex items-center gap-1 hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              <span>GitHub - Project-sentence-classification-in-medical-abstract.ipynb</span>
            </a>
          </div>
          
          {/* Food Vision Notebook */}
          <div className="border rounded-md p-4">
            <h3 className="text-lg font-semibold">Food Vision Notebook</h3>
            <p className="text-sm text-muted-foreground mb-1">July 2023</p>
            <p className="text-sm mb-3">Developed a transfer learning model by fine-tuning a pretrained neural network to classify 101 food categories using the Food101 dataset. Surpassed the accuracy benchmark set by the DeepFood paper. Conducted comprehensive exploratory data analysis (EDA) of predictions to gain insights into model performance.</p>
            <p className="text-sm mb-3"><span className="font-medium">Tools:</span> Scikit-learn, NumPy, Pandas, Matplotlib, TensorFlow, TensorFlow Hub</p>
            <a 
              href="https://github.com/kishan5111/Deep_Learning_Vault/blob/main/projects/Project-Food-Vision.ipynb"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary text-sm flex items-center gap-1 hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              <span>GitHub - Project-Food-Vision.ipynb</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
