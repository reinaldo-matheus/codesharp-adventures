import { Phase } from "@/data/lessons";
import { Sparkles, MapPin } from "lucide-react";

interface PhaseTransitionProps {
  phase: Phase;
  onContinue: () => void;
}

export const PhaseTransition = ({ phase, onContinue }: PhaseTransitionProps) => {
  return (
    <div className="card-quest animate-bounce-in text-center">
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-4">
          <span className="text-5xl animate-float">{phase.icon}</span>
        </div>
        
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-sm text-primary font-semibold uppercase tracking-wider">
            Nova Região Desbloqueada
          </span>
        </div>
        
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          {phase.name}
        </h2>
        
        <p className="text-muted-foreground">
          {phase.description}
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 text-rupee-gold mb-6">
        <Sparkles className="w-5 h-5 animate-pulse" />
        <span className="text-sm font-medium">Prepare-se para novos desafios!</span>
        <Sparkles className="w-5 h-5 animate-pulse" />
      </div>

      <button
        onClick={onContinue}
        className="btn-rpg-primary w-full flex items-center justify-center gap-2"
      >
        <span>Explorar</span>
        <MapPin className="w-5 h-5" />
      </button>
    </div>
  );
};
