
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Briefcase, BookOpen, MessageSquare, Github, Linkedin, Sun, Moon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKaggle } from '@fortawesome/free-brands-svg-icons';
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navigation = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: Home, color: "text-blue-600 dark:text-blue-400" },
    { path: "/portfolio", label: "Portfolio", icon: Briefcase, color: "text-purple-600 dark:text-purple-400" },
    { path: "/blog", label: "Blog", icon: BookOpen, color: "text-pink-600 dark:text-pink-400" },
    { path: "/contact", label: "Contact", icon: MessageSquare, color: "text-cyan-600 dark:text-cyan-400" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 border-b border-gray-200 dark:border-border shadow-sm">
      <div className="container mx-auto">
        {isMobile ? (
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                  className="rounded-full"
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <a href="https://github.com/kishan5111" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-foreground/90 hover:text-primary transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/kishan-vavdara-55680b190/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-foreground/90 hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://www.kaggle.com/kishanvavdara" aria-label="Kaggle" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-foreground/90 hover:text-primary transition-colors">
                  <FontAwesomeIcon icon={faKaggle} className="h-5 w-5" />
                </a>
              </div>
            </div>
            {isMenuOpen && (
              <div className="flex flex-col space-y-4 mt-4 bg-white dark:bg-card p-4 rounded-lg shadow-lg">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === item.path ? item.color : "text-gray-700 dark:text-foreground/80"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                    location.pathname === item.path ? item.color : "text-gray-700 dark:text-foreground/80"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="rounded-full"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <a href="https://github.com/kishan5111" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-foreground/90 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/kishan-vavdara-55680b190/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-foreground/90 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.kaggle.com/kishanvavdara" aria-label="Kaggle" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-foreground/90 hover:text-primary transition-colors">
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
