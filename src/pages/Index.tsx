
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-56 h-56 md:w-64 md:h-64 relative"
        >
          <img
            src="/lovable-uploads/c1c2be73-5b68-4934-906f-3202d2d8265d.png"
            alt="Profile"
            className="rounded-full w-full h-full object-cover shadow-lg border-4 border-primary/20"
          />
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hi, I'm Kishan Vavdara
          </h1>
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-muted-foreground">
              A passionate Machine Learning Engineer with a drive for innovation and excellence. 
              Through the power of AI and deep learning, I transform complex data into actionable insights 
              that shape the future of technology.
            </p>
            
            <p className="text-lg md:text-xl text-muted-foreground">
              With expertise in deep learning, computer vision, and natural language processing, 
              I've contributed to groundbreaking projects that push the boundaries of what's possible 
              with artificial intelligence.
            </p>

            <div className="space-y-4 mt-8">
              <div className="flex items-center space-x-4">
                <div className="h-1 w-12 bg-primary rounded" />
                <span className="text-sm font-medium">Deep Learning Expert</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-1 w-12 bg-primary rounded" />
                <span className="text-sm font-medium">Computer Vision Specialist</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-1 w-12 bg-primary rounded" />
                <span className="text-sm font-medium">NLP Solutions Architect</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-lg text-primary font-medium"
            >
              Let's build the future of AI together
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
