import { Sparkles, Star } from "lucide-react";

interface XPBarProps {
  xp: number;
  level: number;
}

export const XPBar = ({ xp, level }: XPBarProps) => {
  const xpForNextLevel = level * 100;
  const currentLevelXP = xp % 100;
  const progress = (currentLevelXP / 100) * 100;

  return (
    <div className="flex items-center gap-4 w-full">
      {/* Level Badge */}
      <div className="level-badge animate-pulse-glow">
        <Star className="w-4 h-4 fill-current" />
        <span>Nível {level}</span>
      </div>

      {/* XP Bar */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-muted-foreground font-medium">XP</span>
          <span className="text-sm text-secondary font-display font-semibold">
            {currentLevelXP} / 100
          </span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Total XP */}
      <div className="xp-badge">
        <Sparkles className="w-4 h-4" />
        <span>{xp} XP</span>
      </div>
    </div>
  );
};
