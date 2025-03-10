
import { ExternalLink, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Achievements Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-primary border-b pb-4">Achievements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* LMSYS Competition */}
          <div 
            onClick={() => navigate('/competition/lmsys')}
            className="border rounded-lg p-6 hover:border-primary cursor-pointer transition-colors h-full"
          >
            <h3 className="text-2xl font-semibold mb-2">LMSYS - Chatbot Arena Human Preference Predictions</h3>
            <p className="mb-2">Secured 21st place (Silver Medal) out of 1,849 teams</p>
          </div>
          
          {/* LLM Prompt Recovery Competition */}
          <div 
            onClick={() => navigate('/competition/llm-prompt')}
            className="border rounded-lg p-6 hover:border-primary cursor-pointer transition-colors h-full"
          >
            <h3 className="text-2xl font-semibold mb-2">LLM Prompt Recovery Competition</h3>
            <p className="mb-2">Ranked 120th (Bronze Medal) out of 2,175 teams</p>
          </div>
          
          {/* Open Problems Competition */}
          <div 
            onClick={() => navigate('/competition/open-problems')}
            className="border rounded-lg p-6 hover:border-primary cursor-pointer transition-colors h-full"
          >
            <h3 className="text-2xl font-semibold mb-2">Open Problems Competition</h3>
            <p className="mb-2">Multiple gold and silver medal notebooks</p>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-primary border-b pb-4">Personal Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gemini for YouTube Videos */}
          <div className="border rounded-md p-6 h-full flex flex-col">
            <h3 className="text-xl font-semibold mb-2">Gemini for YouTube Videos</h3>
            <p className="text-sm mb-4 flex-grow">Developed a tool to download, upload, and chat with YouTube videos/shorts using their URLs, leveraging Gemini 1.5 Pro with long context capabilities for interactive conversations.</p>
            <div>
              <p className="text-sm mb-3"><span className="font-medium">Tools:</span> Pytube, google.generativeai</p>
              <a 
                href="https://www.kaggle.com/code/kishanvavdara/gemini-for-youtube-videos"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary text-sm flex items-center gap-1 hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Code - gemini-for-youtube-videos</span>
              </a>
            </div>
          </div>
          
          {/* Time Series BitPredict */}
          <div className="border rounded-md p-6 h-full flex flex-col">
            <h3 className="text-xl font-semibold mb-2">Time Series BitPredict 💰📈</h3>
            <p className="text-sm mb-4 flex-grow">Created a time series forecasting project to predict Bitcoin prices. Implemented dense neural networks, multivariate dense models, feature engineering, ensemble techniques, and future forecasting capabilities.</p>
            <div>
              <p className="text-sm mb-3"><span className="font-medium">Tools:</span> TensorFlow, Matplotlib, Pandas, NumPy</p>
              <a 
                href="https://www.kaggle.com/code/kishanvavdara/time-series-bitpredict"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary text-sm flex items-center gap-1 hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Code - time-series-bitpredict</span>
              </a>
            </div>
          </div>
          
          {/* SkimLit */}
          <div className="border rounded-md p-6 h-full flex flex-col">
            <h3 className="text-xl font-semibold mb-2">SkimLit (Skim Literature)</h3>
            <p className="text-sm mb-4 flex-grow">Built an NLP model to streamline reading medical abstracts by replicating and exceeding the performance of the deep learning model from the 2017 paper PubMed 200k RCT: A Dataset for Sequential Sentence Classification in Medical Abstracts.</p>
            <div>
              <p className="text-sm mb-3"><span className="font-medium">Tools:</span> Scikit-learn, NumPy, Pandas, Matplotlib, TensorFlow, Keras</p>
              <a 
                href="https://github.com/kishan5111/Deep_Learning_Vault/blob/main/projects/Project-sentence-classification-in-medical-abstract.ipynb"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary text-sm flex items-center gap-1 hover:underline"
              >
                <Github className="h-3 w-3" />
                <span>GitHub - Project-sentence-classification-in-medical-abstract.ipynb</span>
              </a>
            </div>
          </div>
          
          {/* Food Vision Notebook */}
          <div className="border rounded-md p-6 h-full flex flex-col">
            <h3 className="text-xl font-semibold mb-2">Food Vision Notebook</h3>
            <p className="text-sm mb-4 flex-grow">Developed a transfer learning model by fine-tuning a pretrained neural network to classify 101 food categories using the Food101 dataset. Surpassed the accuracy benchmark set by the DeepFood paper.</p>
            <div>
              <p className="text-sm mb-3"><span className="font-medium">Tools:</span> Scikit-learn, NumPy, Pandas, Matplotlib, TensorFlow, TensorFlow Hub</p>
              <a 
                href="https://github.com/kishan5111/Deep_Learning_Vault/blob/main/projects/Project-Food-Vision.ipynb"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary text-sm flex items-center gap-1 hover:underline"
              >
                <Github className="h-3 w-3" />
                <span>GitHub - Project-Food-Vision.ipynb</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
