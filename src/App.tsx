import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import CompetitionDetail from "./pages/CompetitionDetail";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Load fonts
    const loadFonts = async () => {
      const openSansLink = document.createElement('link');
      openSansLink.rel = 'stylesheet';
      openSansLink.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap';
      
      const biroLink = document.createElement('link');
      biroLink.rel = 'stylesheet';
      biroLink.href = 'https://fonts.cdnfonts.com/css/biro-script-plus-28';
      
      const biroStandardLink = document.createElement('link');
      biroStandardLink.rel = 'stylesheet';
      biroStandardLink.href = 'https://fonts.cdnfonts.com/css/biro-script-standard';
      
      document.head.appendChild(openSansLink);
      document.head.appendChild(biroLink);
      document.head.appendChild(biroStandardLink);
      
      return () => {
        document.head.removeChild(openSansLink);
        document.head.removeChild(biroLink);
        document.head.removeChild(biroStandardLink);
      };
    };
    
    loadFonts();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          {/* Blinds background */}
          <div id="blinds" aria-hidden="true">
            <div className="shutters">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="shutter"></div>
              ))}
            </div>
            <div className="vertical">
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>
          
          <BrowserRouter>
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
