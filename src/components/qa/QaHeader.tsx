import { Link } from "react-router-dom";
import { ShieldCheck, Bug, ArrowLeftRight } from "lucide-react";
import { AccountButton } from "@/components/auth/AccountButton";

export const QaHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 mb-4 px-3 py-1.5 rounded-full bg-muted/50 border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          Trocar para trilha C#
        </Link>
        <AccountButton />
      </div>
      <div className="inline-flex items-center gap-3 mb-4">
        <ShieldCheck className="w-8 h-8 text-primary animate-float" />
        <h1 className="font-display text-4xl md:text-5xl font-bold">
          <span className="text-foreground">Code</span>
          <span className="text-primary">Sharp</span>
          <span className="text-secondary"> QA</span>
        </h1>
        <Bug className="w-8 h-8 text-secondary animate-float" style={{ animationDelay: "0.5s" }} />
      </div>
      <p className="text-muted-foreground text-lg">
        Torne-se um <span className="text-primary font-semibold">QA</span> e domine{" "}
        <span className="text-secondary font-semibold">automação de testes e APIs</span> em uma jornada épica
      </p>
    </div>
  );
};
