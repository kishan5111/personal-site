
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="glass rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Let's Connect!</h2>
            <p className="text-muted-foreground mb-8">
              Feel free to reach out if you're interested in collaborating or discussing new opportunities. I'm always excited to connect with fellow developers and explore interesting projects.
            </p>
            
            <div className="space-y-4">
              <a 
                href="mailto:contact@example.com"
                className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>contact@example.com</span>
              </a>
            </div>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">Connect with me</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 glass rounded-full hover:text-primary transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 glass rounded-full hover:text-primary transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 glass rounded-full hover:text-primary transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
