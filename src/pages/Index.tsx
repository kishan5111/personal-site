
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-48 h-48 relative"
        >
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=300&h=300"
            alt="Profile"
            className="rounded-full w-full h-full object-cover shadow-lg border-4 border-primary/20"
          />
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hi, I'm Kishan Vavdara
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            A self-taught Machine Learning Engineer passionate about solving complex problems 
            and building intelligent systems. I specialize in deep learning and computer vision,
            turning data into meaningful insights.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-1 w-12 bg-primary rounded" />
              <span className="text-sm font-medium">Deep Learning</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-1 w-12 bg-primary rounded" />
              <span className="text-sm font-medium">Computer Vision</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-1 w-12 bg-primary rounded" />
              <span className="text-sm font-medium">Natural Language Processing</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
