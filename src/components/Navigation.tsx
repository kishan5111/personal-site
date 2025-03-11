
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Briefcase, BookOpen, MessageSquare, Github, Linkedin, Sun, Moon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKaggle } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { path: "/", label: "Home", icon: Home, color: "text-blue-600 dark:text-blue-400" },
    { path: "/portfolio", label: "Portfolio", icon: Briefcase, color: "text-purple-600 dark:text-purple-400" },
    { path: "/blog", label: "Blog", icon: BookOpen, color: "text-pink-600 dark:text-pink-400" },
    { path: "/contact", label: "Contact", icon: MessageSquare, color: "text-cyan-600 dark:text-cyan-400" },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto">
        {isMobile ? (
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full"
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <a href="https://github.com/kishan5111" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-gray-200 hover:text-primary transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/kishan-vavdara-55680b190/" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-gray-200 hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://www.kaggle.com/kishanvavdara" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-gray-200 hover:text-primary transition-colors">
                  <FontAwesomeIcon icon={faKaggle} className="h-5 w-5" />
                </a>
              </div>
            </div>
            {isMenuOpen && (
              <div className="flex flex-col space-y-4 mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === item.path ? item.color : "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                    location.pathname === item.path ? item.color : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <a href="https://github.com/kishan5111" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-gray-200 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/kishan-vavdara-55680b190/" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-gray-200 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.kaggle.com/kishanvavdara" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-gray-200 hover:text-primary transition-colors">
                <FontAwesomeIcon icon={faKaggle} className="h-5 w-5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
