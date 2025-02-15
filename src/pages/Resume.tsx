
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Resume = () => {
  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Resume</h1>
          <Button className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </Button>
        </div>
        
        <div className="glass rounded-lg p-8">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Experience</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Machine Learning Engineer</h3>
                  <p className="text-primary">TechCorp Inc.</p>
                  <p className="text-sm text-muted-foreground">2021 - Present</p>
                  <ul className="mt-2 space-y-2 text-muted-foreground">
                    <li>Developed and deployed machine learning models</li>
                    <li>Improved model accuracy by 25%</li>
                    <li>Led a team of 3 junior engineers</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Education</h2>
              <div>
                <h3 className="text-lg font-medium">B.Tech in Computer Science</h3>
                <p className="text-primary">University of Technology</p>
                <p className="text-sm text-muted-foreground">2017 - 2021</p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {["Python", "PyTorch", "TensorFlow", "Scikit-learn", "Deep Learning", 
                  "Computer Vision", "NLP", "Docker", "Git", "AWS"].map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Resume;
