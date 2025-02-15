
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const timelineEvents = [
  {
    date: "2023",
    title: "Started ML Engineering Role",
    description: "Joined TechCorp as a Machine Learning Engineer",
    category: "Career"
  },
  {
    date: "2022",
    title: "First Kaggle Competition",
    description: "Achieved top 5% in my first Kaggle competition",
    category: "Achievement"
  },
  {
    date: "2021",
    title: "Graduated University",
    description: "Completed B.Tech in Computer Science",
    category: "Education"
  },
];

const Work = () => {
  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">My Journey</h1>
        <div className="max-w-3xl mx-auto mb-16">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 pb-12 last:pb-0"
            >
              <div className="absolute left-0 top-0 h-full w-px bg-border">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 h-3 w-3 rounded-full bg-primary" />
              </div>
              <div className="glass rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary">{event.date}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {event.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                <p className="text-muted-foreground">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Resume</h2>
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
      </motion.div>
    </div>
  );
};

export default Work;
