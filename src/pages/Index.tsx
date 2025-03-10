
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <div className="flex flex-col items-start gap-12 max-w-5xl mx-auto">
        {/* Banner Image */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <img 
            src="/lovable-uploads/0c091e16-50c2-42a3-a4ad-5ba37dd27f89.png" 
            alt="Kishan Vavdara - Machine Learning Engineer" 
            className="w-full" 
          />
        </motion.div>

        {/* Welcome Message - Left aligned */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-biro text-3xl md:text-4xl lg:text-5xl text-primary text-left"
        >
          Welcome to my world of AI & ML
        </motion.h1>
        
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
              <h2 className="text-xl font-semibold mb-2">Interests</h2>
              <p className="text-lg text-muted-foreground">
                My current interests and learning goals include AI agents, GPU coding (CUDA, CUTLASS, and cuTE), 
                and the application of AI in neuroscience and biology, which I intend to explore in depth.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Outside of work</h2>
              <p className="text-lg text-muted-foreground">
                I believe in finding balance, so I enjoy practicing yoga and meditation, and I'm even trying to learn 
                the violin (wish me luck!). Weekends are for exploring new projects and ideas, or just relaxing with friends.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Let's Connect!</h2>
              <p className="text-lg text-muted-foreground">
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
