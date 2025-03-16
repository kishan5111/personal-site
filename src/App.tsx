
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import CompetitionDetail from "./pages/CompetitionDetail";

const queryClient = new QueryClient();

const App = () => {
  console.log("App component rendering");
  
  useEffect(() => {
    // Log that the App component has mounted
    console.log("App component mounted");
    
    // Set a class on the body to enable animations only after component mount
    document.body.classList.add('animation-ready');
    
    return () => {
      document.body.classList.remove('animation-ready');
    };
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          {/* Dappled light effect */}
          <div id="dappled-light" aria-hidden="true">
            <div id="glow"></div>
            <div id="glow-bounce"></div>
            <div className="perspective">
              <div id="leaves">
                <svg style={{ width: 0, height: 0, position: 'absolute' }}>
                  <defs>
                    <filter id="wind" x="-20%" y="-20%" width="140%" height="140%">
                      <feTurbulence type="fractalNoise" numOctaves="2" seed="1">
                        <animate 
                          attributeName="baseFrequency" 
                          dur="16s" 
                          keyTimes="0;0.33;0.66;1"
                          values="0.005 0.003;0.01 0.009;0.008 0.004;0.005 0.003" 
                          repeatCount="indefinite" 
                        />
                      </feTurbulence>
                      <feDisplacementMap in="SourceGraphic">
                        <animate 
                          attributeName="scale" 
                          dur="20s" 
                          keyTimes="0;0.25;0.5;0.75;1" 
                          values="45;55;75;55;45"
                          repeatCount="indefinite" 
                        />
                      </feDisplacementMap>
                    </filter>
                  </defs>
                </svg>
              </div>
              <div id="blinds">
                <div className="shutters">
                  {Array(20).fill(0).map((_, i) => (
                    <div key={i} className="shutter"></div>
                  ))}
                </div>
                <div className="vertical">
                  <div className="bar"></div>
                  <div className="bar"></div>
                </div>
              </div>
            </div>
            <div id="progressive-blur">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          
          <BrowserRouter basename="/">
            <Navigation />
            <div className="pt-20">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/competition/:id" element={<CompetitionDetail />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
