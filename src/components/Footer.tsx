const links = [
  { label: "Email", href: "mailto:kishanvavdara@gmail.com" },
  { label: "GitHub", href: "https://github.com/kishan5111" },
  { label: "Kaggle", href: "https://www.kaggle.com/kishanvavdara" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kishan-vavdara-55680b190/" },
];

const Footer = () => (
  <footer className="container mx-auto px-4 pb-10 pt-6">
    <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/50 pt-6 text-sm text-muted-foreground">
      <span>Kishan Vavdara</span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          {link.label}
        </a>
      ))}
    </div>
  </footer>
);

export default Footer;
