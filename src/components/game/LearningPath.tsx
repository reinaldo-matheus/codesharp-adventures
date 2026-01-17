import { phases, getLessonsByPhase, lessons } from "@/data/lessons";
import { motion } from "framer-motion";
import { Star, Lock, Play, Crown, Flame, Sparkles, Map, Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LearningPathProps {
  currentPhase: number;
  currentLesson: number;
  xp: number;
  level: number;
  streak: number;
  onStartLesson: () => void;
  onOpenMap: () => void;
}

export const LearningPath = ({
  currentPhase,
  currentLesson,
  xp,
  level,
  streak,
  onStartLesson,
  onOpenMap,
}: LearningPathProps) => {
  const activePhase = phases.find((p) => p.id === currentPhase) || phases[0];
  const phaseLessons = getLessonsByPhase(currentPhase);
  const lessonsInPreviousPhases = lessons.filter((l) => l.phase < currentPhase).length;
  const lessonIndexInPhase = currentLesson - lessonsInPreviousPhases;

  // Calculate phase progress
  const completedInPhase = Math.min(lessonIndexInPhase, phaseLessons.length);
  const phaseProgress = phaseLessons.length > 0 ? (completedInPhase / phaseLessons.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-40 right-10 w-48 h-48 rounded-full bg-secondary/5 blur-3xl" />

      <div className="relative z-10">
        {/* Top Stats Bar */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border/50"
        >
          <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
            {/* Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              <Flame className="w-5 h-5 text-amber-500" />
              <span className="font-bold text-amber-500">{streak}</span>
            </div>

            {/* XP */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-bold text-primary">{xp}</span>
            </div>

            {/* Level */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
              <Crown className="w-5 h-5 text-secondary" />
              <span className="font-bold text-secondary">Lv.{level}</span>
            </div>

            {/* Map Button */}
            <button
              onClick={onOpenMap}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <Map className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </motion.header>

        {/* Current Phase Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mx-4 mt-6 max-w-lg mx-auto"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-4 shadow-lg shadow-primary/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />
            
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/70 text-sm font-medium">
                  FASE {currentPhase}, LIÇÃO {lessonIndexInPhase + 1}
                </p>
                <h2 className="text-primary-foreground font-display text-xl font-bold mt-1">
                  {activePhase.name}
                </h2>
                <p className="text-primary-foreground/80 text-sm mt-0.5">
                  {activePhase.description}
                </p>
              </div>
              <div className="text-4xl">{activePhase.icon}</div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 bg-primary-foreground/20 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${phaseProgress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-primary-foreground rounded-full"
              />
            </div>
            <p className="text-primary-foreground/70 text-xs mt-2">
              {completedInPhase} de {phaseLessons.length} lições concluídas
            </p>
          </div>
        </motion.div>

        {/* Learning Path Trail */}
        <div className="px-4 py-8 max-w-lg mx-auto">
          <div className="relative flex flex-col items-center">
            {/* Connecting Line */}
            <div className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 via-muted to-muted left-1/2 transform -translate-x-1/2" />

            {/* Lesson Nodes */}
            {phaseLessons.slice(0, 6).map((lesson, index) => {
              const isCompleted = index < lessonIndexInPhase;
              const isCurrent = index === lessonIndexInPhase;
              const isLocked = index > lessonIndexInPhase;
              
              // Zigzag pattern
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={cn(
                    "relative flex items-center gap-4 mb-8",
                    isLeft ? "self-start ml-8" : "self-end mr-8"
                  )}
                >
                  {/* Node */}
                  <button
                    onClick={isCurrent ? onStartLesson : undefined}
                    disabled={isLocked}
                    className={cn(
                      "relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
                      isCompleted && "bg-success text-success-foreground shadow-success/30",
                      isCurrent && "bg-primary text-primary-foreground shadow-primary/40 scale-110 animate-pulse",
                      isLocked && "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    {/* Outer ring for current */}
                    {isCurrent && (
                      <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping" />
                    )}
                    
                    {/* Icon */}
                    {isCompleted ? (
                      <Star className="w-8 h-8 fill-current" />
                    ) : isCurrent ? (
                      <Play className="w-8 h-8 fill-current ml-1" />
                    ) : (
                      <Lock className="w-6 h-6" />
                    )}
                  </button>

                  {/* Lesson Info Card */}
                  {(isCurrent || isCompleted) && (
                    <div
                      className={cn(
                        "absolute top-1/2 transform -translate-y-1/2 bg-card border border-border rounded-xl p-3 shadow-md min-w-[140px]",
                        isLeft ? "left-24" : "right-24"
                      )}
                    >
                      <p className="text-xs text-muted-foreground">
                        Lição {index + 1}
                      </p>
                      <p className="font-semibold text-foreground text-sm">
                        {lesson.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {lesson.icon}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* More lessons indicator */}
            {phaseLessons.length > 6 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-2 text-muted-foreground text-sm mt-4"
              >
                <span>+{phaseLessons.length - 6} lições restantes</span>
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Start Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent"
        >
          <button
            onClick={onStartLesson}
            className="w-full max-w-lg mx-auto flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Zap className="w-6 h-6" />
            <span>Iniciar Lição</span>
          </button>
        </motion.div>

        {/* Footer spacing */}
        <div className="h-24" />
      </div>
    </div>
  );
};
