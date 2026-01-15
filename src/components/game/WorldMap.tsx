import { phases, getLessonsByPhase } from "@/data/lessons";
import { MapPin, Lock, CheckCircle2, Sparkles } from "lucide-react";

interface WorldMapProps {
  currentPhaseId: number;
  completedLessons: number;
  totalLessons: number;
  onClose: () => void;
}

// Position configurations for the map nodes (percentage based)
const nodePositions = [
  { x: 15, y: 75 },  // Phase 1 - Floresta
  { x: 35, y: 55 },  // Phase 2 - Biblioteca
  { x: 25, y: 35 },  // Phase 3 - Dungeon
  { x: 50, y: 25 },  // Phase 4 - Castelo
  { x: 70, y: 35 },  // Phase 5 - Cavernas
  { x: 85, y: 50 },  // Phase 6 - Torre
  { x: 75, y: 70 },  // Phase 7 - Vulcão
  { x: 55, y: 85 },  // Phase 8 - Santuário
];

export const WorldMap = ({ 
  currentPhaseId, 
  completedLessons, 
  totalLessons,
  onClose 
}: WorldMapProps) => {
  // Calculate which phases are completed, current, or locked
  const getPhaseStatus = (phaseId: number) => {
    if (phaseId < currentPhaseId) return "completed";
    if (phaseId === currentPhaseId) return "current";
    return "locked";
  };

  // Calculate lessons completed in each phase
  const getLessonsProgressForPhase = (phaseId: number) => {
    const phaseLessons = getLessonsByPhase(phaseId);
    let lessonsBeforePhase = 0;
    for (let i = 1; i < phaseId; i++) {
      lessonsBeforePhase += getLessonsByPhase(i).length;
    }
    
    const completedInPhase = Math.max(0, Math.min(
      phaseLessons.length,
      completedLessons - lessonsBeforePhase
    ));
    
    return { completed: completedInPhase, total: phaseLessons.length };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl mx-4">
        {/* Map Container */}
        <div className="card-quest p-6 relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🗺️</span>
              <div>
                <h2 className="font-cinzel text-2xl font-bold text-gold">
                  Mapa do Reino
                </h2>
                <p className="text-sm text-muted-foreground">
                  {completedLessons}/{totalLessons} quests completadas
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="btn-rpg px-4 py-2 text-sm"
            >
              Fechar
            </button>
          </div>

          {/* Map Area */}
          <div 
            className="relative w-full aspect-[16/10] rounded-lg overflow-hidden"
            style={{
              background: `
                radial-gradient(ellipse at 20% 80%, hsl(var(--forest-dark) / 0.4) 0%, transparent 40%),
                radial-gradient(ellipse at 80% 30%, hsl(var(--magic-blue) / 0.3) 0%, transparent 40%),
                radial-gradient(ellipse at 50% 50%, hsl(var(--rupee-gold) / 0.2) 0%, transparent 50%),
                linear-gradient(180deg, hsl(25 30% 15%) 0%, hsl(25 25% 10%) 100%)
              `
            }}
          >
            {/* Decorative grid lines */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" className="text-gold"/>
              </svg>
            </div>

            {/* Path connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {nodePositions.slice(0, -1).map((pos, index) => {
                const nextPos = nodePositions[index + 1];
                const status = getPhaseStatus(index + 2);
                const isCompleted = status === "completed" || status === "current";
                
                return (
                  <g key={`path-${index}`}>
                    {/* Path shadow */}
                    <line
                      x1={`${pos.x}%`}
                      y1={`${pos.y}%`}
                      x2={`${nextPos.x}%`}
                      y2={`${nextPos.y}%`}
                      stroke="rgba(0,0,0,0.5)"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    {/* Main path */}
                    <line
                      x1={`${pos.x}%`}
                      y1={`${pos.y}%`}
                      x2={`${nextPos.x}%`}
                      y2={`${nextPos.y}%`}
                      stroke={isCompleted ? "hsl(45 80% 55%)" : "hsl(25 20% 30%)"}
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={isCompleted ? "none" : "8 4"}
                      className={isCompleted ? "" : "opacity-50"}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Region Nodes */}
            {phases.map((phase, index) => {
              const pos = nodePositions[index];
              const status = getPhaseStatus(phase.id);
              const progress = getLessonsProgressForPhase(phase.id);
              
              return (
                <div
                  key={phase.id}
                  className={`
                    absolute transform -translate-x-1/2 -translate-y-1/2
                    transition-all duration-300
                    ${status === "current" ? "scale-110 z-20" : "z-10"}
                    ${status === "locked" ? "opacity-60" : ""}
                  `}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  {/* Node glow effect */}
                  {status === "current" && (
                    <div className="absolute inset-0 -m-4 bg-primary/30 rounded-full blur-xl animate-pulse" />
                  )}
                  
                  {/* Node container */}
                  <div
                    className={`
                      relative flex flex-col items-center gap-1 p-2 rounded-lg
                      cursor-default select-none
                      ${status === "completed" 
                        ? "bg-success/20 border-2 border-success/50" 
                        : status === "current"
                        ? "bg-primary/20 border-2 border-primary glow-green"
                        : "bg-muted/30 border-2 border-muted/50"
                      }
                    `}
                  >
                    {/* Icon */}
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center text-2xl
                      ${status === "completed" 
                        ? "bg-success/30" 
                        : status === "current"
                        ? "bg-primary/30 animate-bounce-slow"
                        : "bg-muted/30"
                      }
                    `}>
                      {status === "locked" ? (
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      ) : status === "completed" ? (
                        <div className="relative">
                          <span>{phase.icon}</span>
                          <CheckCircle2 className="absolute -top-1 -right-1 w-4 h-4 text-success" />
                        </div>
                      ) : (
                        <div className="relative">
                          <span>{phase.icon}</span>
                          <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-gold animate-pulse" />
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <span className={`
                      text-xs font-cinzel font-bold text-center whitespace-nowrap max-w-[80px] truncate
                      ${status === "completed" 
                        ? "text-success" 
                        : status === "current"
                        ? "text-primary"
                        : "text-muted-foreground"
                      }
                    `}>
                      {phase.name.split(" ").slice(-1)[0]}
                    </span>

                    {/* Progress bar */}
                    {status !== "locked" && (
                      <div className="w-16 h-1 bg-muted/30 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            status === "completed" ? "bg-success" : "bg-primary"
                          }`}
                          style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                        />
                      </div>
                    )}

                    {/* Current phase indicator */}
                    {status === "current" && (
                      <MapPin className="absolute -top-6 left-1/2 -translate-x-1/2 w-5 h-5 text-gold animate-bounce" />
                    )}
                  </div>
                </div>
              );
            })}

            {/* Decorative elements */}
            <div className="absolute bottom-4 left-4 text-xs text-muted-foreground/50 font-cinzel">
              Reino de CodeSharp
            </div>
            
            {/* Compass */}
            <div className="absolute top-4 right-4 w-12 h-12 rounded-full border-2 border-gold/30 flex items-center justify-center bg-background/50">
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[12px] border-b-gold" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center rotate-180">
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[12px] border-b-gold/30" />
                </div>
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] text-gold font-bold">N</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success/50 border border-success" />
              <span className="text-muted-foreground">Completado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary/50 border border-primary animate-pulse" />
              <span className="text-muted-foreground">Atual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted/50 border border-muted" />
              <span className="text-muted-foreground">Bloqueado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
