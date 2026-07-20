import { Coffee, Terminal } from "lucide-react";
import { AccountButton } from "@/components/auth/AccountButton";
import { TrailSwitcher } from "@/components/shared/TrailSwitcher";

export const JavaHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <TrailSwitcher current="java" />
        <AccountButton />
      </div>
      <div className="inline-flex items-center gap-3 mb-4">
        <Coffee className="w-8 h-8 text-primary animate-float" />
        <h1 className="font-display text-4xl md:text-5xl font-bold">
          <span className="text-foreground">Code</span>
          <span className="text-primary">Sharp</span>
          <span className="text-secondary"> Java</span>
        </h1>
        <Terminal className="w-8 h-8 text-secondary animate-float" style={{ animationDelay: "0.5s" }} />
      </div>
      <p className="text-muted-foreground text-lg">
        Domine <span className="text-primary font-semibold">Java</span> e{" "}
        <span className="text-secondary font-semibold">Spring Boot</span> em uma jornada épica
      </p>
    </div>
  );
};
