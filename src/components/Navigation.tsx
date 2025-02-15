
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Briefcase, FileText, Calendar, MessageSquare, Github, Linkedin, Twitter, BookOpen, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { path: "/", label: "Home", icon: Home, color: "text-blue-500" },
    { path: "/portfolio", label: "Portfolio", icon: Briefcase, color: "text-purple-500" },
    { path: "/resume", label: "Resume", icon: FileText, color: "text-green-500" },
    { path: "/timeline", label: "Timeline", icon: Calendar, color: "text-orange-500" },
    { path: "/blog", label: "Blog", icon: BookOpen, color: "text-pink-500" },
    { path: "/contact", label: "Contact", icon: MessageSquare, color: "text-cyan-500" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                location.pathname === item.path ? item.color : "text-muted-foreground"
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
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="h-5 w-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
