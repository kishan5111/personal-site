
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <div className="flex flex-col items-start gap-12 max-w-5xl mx-auto">
        {/* Banner Image - Static version without animations */}
        <div className="w-full">
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src="/lovable-uploads/a1907995-2300-41bc-abe6-9287e5026d29.png" 
              alt="Stylized illustration" 
              className="w-full h-auto scale-125 mix-blend-multiply opacity-80" 
            />
            <div className="absolute inset-0 bg-background/5"></div>
          </div>
        </div>
        
        {/* Welcome Message with specific font styling */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-left font-biro text-4xl text-gray-900 dark:text-white"
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
          className="w-full space-y-6"
        >
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <span className="font-bold text-gray-900 dark:text-white">Hey there!</span> I'm Kishan. This is my little corner on the Internet — make yourself at home! I'm currently working as a freelance data/ML engineer, 
            specializing in training, optimizing, and deploying VLMs (vision language models) and LLMs. 
            I transitioned into ML after completing my undergraduate studies in biotechnology (where I was a gold medalist!), 
            through self-study and online courses.
          </p>
          
          <p className="text-lg text-gray-700 dark:text-gray-300">
            I'm also an active participant in Kaggle competitions, sharing datasets, models, and notebooks. 
            I've published gold-medal-winning notebooks on fine-tuning and deploying LLaMA models using TPUs and GPUs, 
            as well as on training neural networks from scratch. Through my contributions, I recently became a 4x Kaggle Expert.
          </p>
        </motion.div>

        {/* Photo in rectangular frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-3xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-lg shadow-xl border-4 border-primary/20">
            <img
              src="/lovable-uploads/48b5603b-8a05-4dc8-88bb-a3d94d00d307.png"
              alt="Kishan playing violin"
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
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Interests</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                My current interests and learning goals include AI agents, GPU coding (CUDA, CUTLASS, and cuTE), 
                and the application of AI in neuroscience and biology, which I intend to explore in depth.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Outside of work</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                I believe in finding balance, so I enjoy practicing yoga and meditation, and I'm even trying to learn 
                the violin (wish me luck!). Weekends are for exploring new projects and ideas, or just relaxing with friends.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Let's Connect!</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                If you're interested in discussing AI, innovation, or potential collaborations, 
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
                <Button className="group">
                  Let's connect and chat about all things AI and beyond!
                  <ChevronRight className="transition-transform group-hover:translate-x-1" />
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
