import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <div className="flex flex-col items-start gap-8 md:gap-12 max-w-5xl mx-auto">
        {/* Banner Image - Static version without animations */}
        <div className="w-full">
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src="/images/banner.png" 
              alt="Stylized illustration" 
              className="w-full h-auto scale-110 md:scale-125 mix-blend-multiply opacity-80" 
            />
            <div className="absolute inset-0 bg-background/5"></div>
          </div>
        </div>
        
        {/* Welcome Message with specific font styling */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-left font-biro text-3xl md:text-4xl text-gray-900 dark:text-white"
          style={{ 
            padding: "0px",
            border: "none"
          }}
        >
          Welcome!
        </motion.p>
        
        {/* Description */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full space-y-4 md:space-y-6"
        >
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-50">
          <span className="font-bold text-gray-900 dark:text-white">Hey there!</span> I'm Kishan, and this is my little corner of the Internet — make yourself at home! I'm a freelance LLM engineer who specializes in fine-tuning, optimizing inference, and deploying large language models. Currently, I'm <span className="font-semibold text-green-600 dark:text-green-400">actively seeking new opportunities and exciting collaborations</span> in applied LLM/NLP engineering.
        </p>
          
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-50">
            My journey into ML began after completing my undergraduate studies in biotechnology, where I was a gold medalist. I transitioned into this field through dedicated self-study and online courses. Since then, I've become an active Kaggle competitor and recently achieved 4x Expert status, with silver and bronze medals in competitions and gold-medal-winning notebooks on fine-tuning and deploying LLaMA, Gemma, and Qwen models using TPUs and GPUs.
          </p>
        </motion.div>

{/* Thank you for visiting here! Did you find anything interesting?  */}


        {/* Photo in rectangular frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-3xl mx-auto"
        >
          <div className="relative overflow-hidden">
            <img
              src="/images/violin.png"
              alt="playing violin"
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>
        
        {/* Additional sections */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full"
        >
          <div className="space-y-4 md:space-y-6">
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white-100">Interests</h2>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-50">
                My current interests and learning goals include AI agents, GPU coding (CUDA, CUTLASS, and cuTE), 
                and the application of AI in neuroscience and biology, which I intend to explore in depth.
              </p>
            </div>

            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white-100">Beyond Work</h2>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-50">
              To balance things out, I'm into yoga, meditation, and learning the violin (progress is slow but steady!). Weekends are for exploring new ideas or just kicking back with friends.
              </p>
            </div>

            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white-100">Let's Connect!</h2>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-50">
                <span className="font-semibold text-green-600 dark:text-green-400">I'm actively seeking new opportunities and exciting collaborations!</span> Whether you're interested in discussing AI, innovation, freelance projects, or full-time roles, 
                please feel free to get in touch—I'd love to connect!
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pt-4"
            >
              <Link to="/contact">
                <Button className="group w-full md:w-auto text-sm md:text-base">
                  <span className="flex items-center gap-2">
                    <span className="whitespace-normal md:whitespace-nowrap">Let's connect and chat about all things AI and beyond!</span>
                    <ChevronRight className="transition-transform group-hover:translate-x-1 flex-shrink-0" />
                  </span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
