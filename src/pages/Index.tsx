
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12 md:gap-16">
        {/* Left profile section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-56 h-56 shrink-0"
        >
          <div className="relative">
            <img
              src="/lovable-uploads/c1c2be73-5b68-4934-906f-3202d2d8265d.png"
              alt="Profile"
              className="rounded-full w-full h-full object-cover shadow-lg border-4 border-primary/20"
            />
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
          </div>
        </motion.div>
        
        {/* Right content section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1"
        >
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">About Me</h2>
              <p className="text-lg text-muted-foreground">
                Hey there! I'm Kishan Vavdara 👋. I'm currently working as a freelance data/ML engineer, 
                specializing in training, optimizing, and deploying VLMs (vision language models) and LLMs. 
                I transitioned into ML after completing my undergraduate studies in biotechnology (where I was a gold medalist!), 
                through self-study and online courses.
              </p>
            </div>
            
            <p className="text-lg text-muted-foreground">
              I'm also an active participant in Kaggle competitions, sharing datasets, models, and notebooks. 
              I've published gold-medal-winning notebooks on fine-tuning and deploying LLaMA models using TPUs and GPUs, 
              as well as on training neural networks from scratch. Through my contributions, I recently became a 4x Kaggle Expert.
            </p>

            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">Interests</h2>
              <p className="text-lg text-muted-foreground">
                My current interests and learning goals include AI agents, GPU coding (CUDA, CUTLASS, and cuTE), 
                and the application of AI in neuroscience and biology, which I intend to explore in depth.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">Outside of work</h2>
              <p className="text-lg text-muted-foreground">
                I believe in finding balance, so I enjoy practicing yoga and meditation, and I'm even trying to learn 
                the violin (wish me luck!). Weekends are for exploring new projects and ideas, or just relaxing with friends.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">Let's Connect!</h2>
              <p className="text-lg text-muted-foreground">
                If you're interested in discussing AI, innovation, or potential collaborations, 
                please feel free to get in touch—I'd love to connect!
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
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
