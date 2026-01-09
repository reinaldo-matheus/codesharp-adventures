import { Sword, Code2 } from "lucide-react";

export const GameHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-3 mb-4">
        <Sword className="w-8 h-8 text-primary animate-float" />
        <h1 className="font-display text-4xl md:text-5xl font-bold">
          <span className="text-foreground">Code</span>
          <span className="text-primary">Sharp</span>
        </h1>
        <Code2 className="w-8 h-8 text-secondary animate-float" style={{ animationDelay: "0.5s" }} />
      </div>
      <p className="text-muted-foreground text-lg">
        Domine <span className="text-primary font-semibold">C#</span> e <span className="text-secondary font-semibold">.NET</span> em uma aventura épica
      </p>
    </div>
  );
};
