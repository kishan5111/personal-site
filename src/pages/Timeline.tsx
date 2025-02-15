
import { motion } from "framer-motion";

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
  // Add more events as needed
];

const Timeline = () => {
  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">My Journey</h1>
        <div className="max-w-3xl mx-auto">
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
      </motion.div>
    </div>
  );
};

export default Timeline;
