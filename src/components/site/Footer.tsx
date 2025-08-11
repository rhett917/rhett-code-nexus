import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Rhett Brown. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" aria-label="GitHub" className="hover-scale"><Github /></a>
          <a href="#" aria-label="LinkedIn" className="hover-scale"><Linkedin /></a>
          <a href="#" aria-label="Twitter/X" className="hover-scale"><Twitter /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
