
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notebook {
  title: string;
  date: string;
  description: string;
  tools: string;
  link: string;
}

interface Competition {
  id: string;
  title: string;
  date: string;
  description: string;
  rank: string;
  notebooks: Notebook[];
  writeupLink?: string;
}

const competitions: Record<string, Competition> = {
  'lmsys': {
    id: 'lmsys',
    title: 'LMSYS - Chatbot Arena Human Preference Predictions',
    date: 'July - September 2024',
    description: 'Secured 21st place (Silver Medal) out of 1,849 teams by predicting human preferences in chatbot interactions.',
    rank: '21st / 1,849',
    notebooks: [
      {
        title: 'LMSYS - Llama-3 [TPU Train]',
        date: 'July 2024',
        description: 'Fine-tuned and sharded the Llama-3 8B model on Kaggle TPUs with a custom pipeline, earning a gold medal and over 700 copies.',
        tools: 'Torch_XLA, Transformers, PEFT, Scikit-learn, PyTorch',
        link: 'https://www.kaggle.com/code/kishanvavdara/lmsys-llama-3-tpu-train'
      },
      {
        title: 'Inference - Llama-3 8B',
        date: 'August 2024',
        description: 'Performed parallel inference on a fine-tuned Llama-3 8B model using dual T4 GPUs, processing 25k samples in under 5 hours.',
        tools: 'PyTorch, Transformers, Threading, PEFT',
        link: 'https://www.kaggle.com/code/kishanvavdara/inference-llama-3-8b'
      },
      {
        title: '21st Place [Human Bias] 2 x Gemma 9B [4096 len]',
        date: 'September 2024',
        description: 'Combined two fine-tuned Gemma 9B models with preprocessing, feature engineering, and post-processing.',
        tools: 'PyTorch, Transformers, TPU',
        link: 'https://www.kaggle.com/code/kishanvavdara/21st-place-human-bias-2-x-gemma-9b-4096-len'
      }
    ],
    writeupLink: 'https://www.kaggle.com/competitions/lmsys-chatbot-arena/discussion/527627'
  },
  'llm-prompt': {
    id: 'llm-prompt',
    title: 'LLM Prompt Recovery Competition',
    date: 'March 2024',
    description: 'Ranked 120th (Bronze Medal) out of 2,175 teams by recovering prompts used to transform given texts.',
    rank: '120th / 2,175',
    notebooks: [
      {
        title: 'Gemma 7b-it-quant Inference on Multi-GPU',
        date: 'March 2024',
        description: 'Implemented inference with the quantized Gemma-7b-it model on dual T4 GPUs for efficient prompting and submission.',
        tools: 'PyTorch, Transformers, PEFT',
        link: 'https://www.kaggle.com/code/kishanvavdara/gemma-7b-it-quant-inference-on-multi-gpu'
      }
    ]
  },
  'open-problems': {
    id: 'open-problems',
    title: 'Open Problems Competition',
    date: 'November - December 2023',
    description: 'Contributed two standout notebooks in the Open Problems Single-Cell Perturbations competition.',
    rank: 'Gold & Silver medals',
    notebooks: [
      {
        title: 'Neural Net Regression',
        date: 'November 2023',
        description: 'Trained and performed inference with a neural network to achieve a high score. Earned a gold medal and over 200 copies.',
        tools: 'PyTorch, Scikit-learn',
        link: 'https://www.kaggle.com/code/kishanvavdara/neural-network-regression'
      },
      {
        title: 'NLP Regression',
        date: 'December 2023',
        description: 'Utilized SMILES molecular data to generate embeddings and trained models including Conv1D, LSTM, and neural networks, earning a silver medal.',
        tools: 'PyTorch, TensorFlow',
        link: 'https://www.kaggle.com/code/kishanvavdara/nlp-regression'
      }
    ]
  }
};

const CompetitionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const competition = competitions[id as string];

  if (!competition) {
    return <div className="container mx-auto px-4 py-12">Competition not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button
        variant="ghost"
        className="mb-8"
        onClick={() => navigate('/portfolio')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Portfolio
      </Button>

      <h1 className="text-4xl font-bold mb-4 text-primary">{competition.title}</h1>
      <p className="text-muted-foreground mb-2">{competition.date}</p>
      <p className="text-lg mb-8">{competition.description}</p>
      
      {competition.writeupLink && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Competition Writeup</h2>
          <a 
            href={competition.writeupLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline inline-flex items-center"
          >
            Read Discussion <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6">Notebooks</h2>
      <div className="space-y-8">
        {competition.notebooks.map((notebook, index) => (
          <div key={index} className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{notebook.title}</h3>
            <p className="text-muted-foreground mb-2">{notebook.date}</p>
            <p className="mb-4">{notebook.description}</p>
            <p className="text-sm mb-4"><span className="font-medium">Tools:</span> {notebook.tools}</p>
            <a 
              href={notebook.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center"
            >
              View Code <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitionDetail;
