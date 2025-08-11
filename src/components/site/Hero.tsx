import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative">
      <div className="container flex min-h-[72vh] flex-col items-center justify-center gap-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-primary"></span>
          Available for new opportunities
        </div>
        <h1 className="text-4xl font-bold md:text-6xl">Blockchain & Full-Stack Developer</h1>
        <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
          I build secure, scalable blockchain applications and modern web solutions.
          Expert in Solidity, Rust, Node.js, JavaScript, and frameworks like React, Vue, Hardhat, and Truffle.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="#projects">
            <Button variant="hero" className="hover-scale">Explore Projects <ArrowRight className="ml-1" /></Button>
          </a>
          <a href="#contact">
            <Button variant="outline" className="hover-scale">Contact Me <Mail className="ml-1" /></Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
