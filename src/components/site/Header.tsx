import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import LoginDialog from "./LoginDialog";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm font-bold text-gradient">RB</span>
          <span className="sr-only">Rhett Brown</span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground story-link">About</a>
          <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground story-link">Projects</a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground story-link">Contact</a>
        </div>
        <div className="flex items-center gap-2">
          <a href="#projects" className="hidden md:block">
            <Button variant="outline">View Projects</Button>
          </a>
          <Button variant="ghost" onClick={() => setOpen(true)}>Sign in</Button>
          <button className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </nav>
      <LoginDialog open={open} onOpenChange={setOpen} />
    </header>
  );
};

export default Header;
