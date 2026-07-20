import { Trophy, Sparkles, Star, RotateCcw, Coffee } from "lucide-react";

interface JavaVictoryScreenProps {
  xp: number;
  level: number;
  correctAnswers: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const JavaVictoryScreen = ({
  xp,
  level,
  correctAnswers,
  totalQuestions,
  onRestart,
}: JavaVictoryScreenProps) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="card-quest text-center animate-bounce-in">
      {/* Trophy Icon */}
      <div className="relative inline-block mb-6">
        <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center animate-pulse-glow mx-auto">
          <Coffee className="w-12 h-12 text-secondary" />
        </div>
        <div className="absolute -top-2 -right-2 animate-float">
          <Sparkles className="w-8 h-8 text-secondary" />
        </div>
      </div>

      {/* Title */}
      <h2 className="font-display text-3xl font-bold text-foreground mb-2">Certificação de Mestre(a) da JVM!</h2>
      <p className="text-muted-foreground mb-8">
        Você completou toda a trilha de Java, Orientação a Objetos e Spring Boot!
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-center gap-2 text-secondary mb-2">
            <Sparkles className="w-5 h-5" />
          </div>
          <p className="font-display text-2xl font-bold text-foreground">{xp}</p>
          <p className="text-xs text-muted-foreground">XP Total</p>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-center gap-2 text-primary mb-2">
            <Star className="w-5 h-5" />
          </div>
          <p className="font-display text-2xl font-bold text-foreground">{level}</p>
          <p className="text-xs text-muted-foreground">Nível</p>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-center gap-2 text-accent mb-2">
            <Trophy className="w-5 h-5" />
          </div>
          <p className="font-display text-2xl font-bold text-foreground">{percentage}%</p>
          <p className="text-xs text-muted-foreground">Acertos</p>
        </div>
      </div>

      {/* Performance Message */}
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6">
        <p className="text-primary font-display font-semibold">
          {percentage >= 80
            ? "🎉 Excelente! Você já programa e testa como um Java dev de mercado!"
            : percentage >= 60
            ? "☕ Muito bom! Continue praticando Spring Boot e streams!"
            : "🌱 Bom começo, aprendiz! Revise os conceitos e tente novamente!"}
        </p>
      </div>

      {/* Restart Button */}
      <button onClick={onRestart} className="btn-rpg-primary w-full flex items-center justify-center gap-2">
        <RotateCcw className="w-5 h-5" />
        <span>Refazer a Trilha</span>
      </button>
    </div>
  );
};
