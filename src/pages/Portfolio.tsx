
import { ExternalLink, Github, Briefcase, Trophy, GraduationCap, BookOpen, Calendar } from "lucide-react";
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
      
      {/* My Journey Timeline Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-primary border-b pb-4">My Journey</h2>
        
        <div className="relative border-l border-primary ml-6 mt-8 space-y-12">
          {/* Freelance Experience */}
          <div className="relative pl-8">
            <span className="absolute flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full -left-5 ring-4 ring-background">
              <Briefcase className="w-5 h-5 text-primary" />
            </span>
            <div className="flex items-center gap-2 text-lg text-primary font-semibold mb-2">
              <span>Freelance</span>
              <span className="flex items-center gap-1 text-sm font-normal text-muted-foreground">
                <Calendar className="w-3 h-3" /> Dec 2023 - Present · 9 mos
              </span>
            </div>
            <h3 className="text-xl font-medium mb-2">Machine Learning Engineer</h3>
            <p className="text-muted-foreground">Started getting work from connection, working as a freelance Machine Learning Engineer.</p>
          </div>
          
          {/* Kaggle */}
          <div className="relative pl-8">
            <span className="absolute flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full -left-5 ring-4 ring-background">
              <Trophy className="w-5 h-5 text-primary" />
            </span>
            <div className="flex items-center gap-2 text-lg text-primary font-semibold mb-2">
              <span>Kaggle</span>
              <span className="flex items-center gap-1 text-sm font-normal text-muted-foreground">
                <Calendar className="w-3 h-3" /> Oct 2023 - Present · 11 mos
              </span>
            </div>
            <h3 className="text-xl font-medium mb-2">Kaggle Machine Learning and Data Science Competitor</h3>
            <p className="text-muted-foreground">Started contributing in Kaggle competitions, discussions, and code sharing.</p>
          </div>
          
          {/* Self Study */}
          <div className="relative pl-8">
            <span className="absolute flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full -left-5 ring-4 ring-background">
              <BookOpen className="w-5 h-5 text-primary" />
            </span>
            <div className="flex items-center gap-2 text-lg text-primary font-semibold mb-2">
              <span>Self Study</span>
              <span className="flex items-center gap-1 text-sm font-normal text-muted-foreground">
                <Calendar className="w-3 h-3" /> Nov 2022 - Sep 2023
              </span>
            </div>
            <h3 className="text-xl font-medium mb-2">Learning Machine Learning</h3>
            <ul className="list-disc ml-5 text-muted-foreground space-y-1">
              <li>Google Data Analytics Professional Certificate | Coursera (Nov 2022 - Feb 2023)</li>
              <li>Deep Learning A-Z 2023 | Udemy (Apr 2023 - June 2023)</li>
              <li>Tensorflow Developer Certificate Bootcamp | Udemy (Jun 2023 - Sep 2023)</li>
            </ul>
          </div>
          
          {/* Education */}
          <div className="relative pl-8">
            <span className="absolute flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full -left-5 ring-4 ring-background">
              <GraduationCap className="w-5 h-5 text-primary" />
            </span>
            <div className="flex items-center gap-2 text-lg text-primary font-semibold mb-2">
              <span>Gujarat University</span>
              <span className="flex items-center gap-1 text-sm font-normal text-muted-foreground">
                <Calendar className="w-3 h-3" /> Apr 2019 - Jun 2022
              </span>
            </div>
            <h3 className="text-xl font-medium mb-2">BSc, Biotechnology (Gold Medalist)</h3>
            <p className="text-muted-foreground">
              Undergraduate studies at Gujarat University.
              <a 
                href="https://psc.shayonainstitute.edu.in/public/asset/images/Latest-Updates/pscGold%20Medals_GSC%20GNR%20Students_71st%20Convocation_GU_B.Sc.%20Sem%206_March%202022_05%2001%202023%20%281%29.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary ml-1 hover:underline"
              >
                View Certificate
              </a>
            </p>
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
