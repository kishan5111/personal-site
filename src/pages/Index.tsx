import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/lib/blog-posts";

const Index = () => {
  const latestPost = blogPosts[0];

  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <div className="flex flex-col items-start gap-8 md:gap-12 max-w-5xl mx-auto">
        <div className="grid w-full gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 md:space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-left font-sans text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-5xl"
            >
              Kishan Vavdara
            </motion.h1>

            <p className="text-[15px] md:text-[1.02rem] text-gray-700 dark:text-gray-50">
              I'm Kishan, an <span className="font-semibold text-gray-900 dark:text-white">ML/LLM engineer</span> focused on fine-tuning, evaluation, inference optimization, and deployment of large language models. I work across the full model lifecycle, from training and benchmarking to efficient inference.
            </p>

            <p className="text-[15px] md:text-[1.02rem] text-gray-700 dark:text-gray-50">
              I'm a <span className="font-semibold text-gray-900 dark:text-white">Kaggle Competition Master and Notebook Master</span>, with multiple medal-winning solutions, including gold in competitions and gold-winning Kaggle notebooks on LLaMA, Gemma, and Qwen fine-tuning and inference. My work combines rigorous experimentation with practical systems thinking, especially where model quality, latency, and compute constraints all matter.
            </p>

            {/* <p className="text-base md:text-lg text-gray-700 dark:text-gray-50">
              I originally transitioned into ML from biotechnology through self-study and hands-on building. That path shaped how I work today: rigorous experimentation, fast iteration, and a strong bias toward practical results.
            </p> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-lg justify-self-center pt-0 lg:max-w-[310px] lg:justify-self-end lg:pt-10"
          >
            <div className="relative mx-auto aspect-square max-w-[360px] overflow-hidden rounded-full border border-border/50 bg-background/70 shadow-sm">
              <img
                src="/images/image_prof.jpeg"
                alt="Kishan Vavdara portrait"
                className="h-full w-full scale-100 object-cover object-[34%_24%]"
              />
            </div>
          </motion.div>
        </div>
        
        {/* Additional sections */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full -mt-10 md:-mt-12"
        >
          <div className="space-y-4 md:space-y-6">
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white-100">What I Can Help With</h2>
              <ul className="list-disc ml-5 space-y-2 text-[15px] md:text-[1.02rem] text-gray-700 dark:text-gray-50">
                <li>Fine-tuning, post-training, and reinforcement learning workflows for LLMs using PEFT and full fine-tuning approaches.</li>
                <li>Evaluation pipelines, benchmarking, and experiment design for model selection and iteration.</li>
                <li>Inference optimization across GPU setups, including latency, throughput, batching, and memory tradeoffs.</li>
                <li>Deployment-oriented workflows for teams building with LLaMA, Gemma, Qwen, and related open models.</li>
              </ul>
            </div>

            {latestPost && (
              <div className="pt-3 pb-2 md:pt-5 md:pb-4">
                <h2 className="text-lg md:text-xl font-bold mb-2 text-gray-900 dark:text-white-100">Latest Post</h2>
                <div className="space-y-2 rounded-2xl border border-border/50 bg-background/45 p-5 shadow-sm dark:border-white/15 dark:bg-white/[0.03]">
                  <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                    {latestPost.date} · {latestPost.readingTime}
                  </p>
                  <p className="text-base md:text-lg text-gray-900 dark:text-white font-semibold">
                    {latestPost.title}
                  </p>
                  <p className="text-base md:text-lg text-gray-700 dark:text-gray-50">
                    {latestPost.description}
                  </p>
                  <p>
                    <Link
                      to={`/blog/${latestPost.id}`}
                      className="font-semibold text-gray-900 underline decoration-border underline-offset-4 transition-colors hover:text-foreground dark:text-white"
                    >
                      Read the latest post
                    </Link>
                  </p>
                </div>
              </div>
            )}

            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white-100">Selected Work</h2>
              <p className="text-[15px] md:text-[1.02rem] text-gray-700 dark:text-gray-50">
                I also build tooling around practical LLM infrastructure problems. <a href="https://fitmygpu.com" target="_blank" rel="noreferrer" className="font-semibold text-gray-900 underline decoration-border underline-offset-4 transition-colors hover:text-foreground dark:text-white">FitMyGPU</a> helps reason about workload-to-hardware fit, deployment constraints, and compute tradeoffs earlier, while <a href="https://servingops.com" target="_blank" rel="noreferrer" className="font-semibold text-gray-900 underline decoration-border underline-offset-4 transition-colors hover:text-foreground dark:text-white">ServingOps</a> is focused on practical serving workflows and operational decisions for model deployment.
              </p>
            </div>

            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white-100">Let's Connect!</h2>
              <p className="text-[15px] md:text-[1.02rem] text-gray-700 dark:text-gray-50">
                I'm open to ML/LLM engineering roles and collaborations across fine-tuning, evaluation, inference, and deployment.
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
                    <span className="whitespace-normal md:whitespace-nowrap">Get in touch about roles, projects, or collaborations</span>
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
