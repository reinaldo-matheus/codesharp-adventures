import { javaPhases, getExercisesByPhase, javaExercises } from "@/data/javaLessons";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Lock,
  Play,
  Crown,
  Flame,
  Sparkles,
  Map,
  ChevronRight,
  ChevronDown,
  Trophy,
  Coffee,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import auroraMascot from "@/assets/aurora-mascot.png";
import { AccountButton } from "@/components/auth/AccountButton";
import { TrailSwitcher } from "@/components/shared/TrailSwitcher";

interface JavaLearningPathProps {
  currentPhase: number;
  currentExercise: number;
  xp: number;
  level: number;
  streak: number;
  onStartLesson: () => void;
  onOpenMap: () => void;
}

const getExerciseGlobalIndex = (phaseId: number, localIndex: number) => {
  const exercisesBeforePhase = javaExercises.filter((e) => e.phase < phaseId).length;
  return exercisesBeforePhase + localIndex;
};

export const JavaLearningPath = ({
  currentPhase,
  currentExercise,
  xp,
  level,
  streak,
  onStartLesson,
  onOpenMap,
}: JavaLearningPathProps) => {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(currentPhase);

  const totalExercises = javaExercises.length;
  const overallProgress = (currentExercise / totalExercises) * 100;

  const mascotMessage = useMemo(() => {
    if (currentExercise === 0) return "Olá, aprendiz! Pronto(a) para compilar seu primeiro café? ☕";
    if (overallProgress < 25) return "Ótimo começo! Todo bom Java dev começa pelos fundamentos. ☕";
    if (overallProgress < 50) return "Metade do caminho! Suas coleções e streams estão afiadas. ⚙️";
    if (overallProgress < 75) return "Uau! Spring Boot já não tem mais segredo pra você. 🌱";
    return "Lendário! Você já programa e testa como um profissional Java. 🏆";
  }, [currentExercise, overallProgress]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * 400,
              y: Math.random() * 800,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Top Stats Bar */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="safe-top sticky top-0 z-20 bg-background/90 backdrop-blur-xl border-b border-primary/20"
        >
          <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30"
            >
              <Flame className="w-5 h-5 text-amber-500" />
              <span className="font-bold text-amber-400">{streak}</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30"
            >
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-bold text-primary">{xp}</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-secondary/20 to-yellow-500/20 border border-secondary/30"
            >
              <Crown className="w-5 h-5 text-secondary" />
              <span className="font-bold text-secondary">Lv.{level}</span>
            </motion.div>

            <div className="flex items-center gap-1.5">
              <TrailSwitcher current="java" variant="icon" />

              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenMap}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-muted to-muted/50 border border-border hover:border-primary/50 transition-colors"
              >
                <Map className="w-5 h-5 text-foreground" />
              </motion.button>

              <AccountButton variant="icon" />
            </div>
          </div>

          <div className="px-4 pb-3 max-w-lg mx-auto">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Trophy className="w-3 h-3" />
              <span>
                Progresso Geral: {currentExercise}/{totalExercises} desafios
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary via-emerald-400 to-secondary rounded-full"
              />
            </div>
          </div>
        </motion.header>

        {/* Mascot Section */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="px-4 mt-6 max-w-lg mx-auto"
        >
          <div className="relative flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 border border-primary/20 backdrop-blur-sm">
            {/* Mascot Avatar (icon-based, no image asset yet) */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex-shrink-0"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 -m-3"
              >
                <div
                  className="absolute inset-0 rounded-full opacity-30 blur-md"
                  style={{
                    background:
                      "conic-gradient(from 0deg, hsl(var(--primary)), hsl(28, 90%, 55%), hsl(10, 75%, 50%), hsl(var(--secondary)), hsl(var(--primary)))",
                  }}
                />
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 -m-2 rounded-full bg-primary/40 blur-lg"
              />

              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                  className="absolute w-2 h-2"
                  style={{
                    top: `${20 + Math.sin((i * 60 * Math.PI) / 180) * 40}%`,
                    left: `${50 + Math.cos((i * 60 * Math.PI) / 180) * 50}%`,
                  }}
                >
                  <Sparkles className="w-full h-full text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.8)]" />
                </motion.div>
              ))}

              <motion.div
                className="relative w-24 h-36 flex items-center justify-center"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
              >
                <img
                  src={auroraMascot}
                  alt="Aurora, Mestra da JVM"
                  className="w-full h-full object-contain drop-shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
                  style={{
                    filter: "drop-shadow(0 0 10px hsl(var(--primary) / 0.4))",
                  }}
                />
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-14 h-3 bg-primary/30 rounded-full blur-md"
              />
            </motion.div>

            {/* Speech Bubble */}
            <div className="flex-1 relative">
              <div className="absolute -left-2 top-4 w-3 h-3 bg-card rotate-45 border-l border-b border-primary/20" />
              <div className="bg-card rounded-xl p-3 border border-primary/20 shadow-lg">
                <p className="text-sm text-foreground font-medium">{mascotMessage}</p>
                <p className="text-xs text-muted-foreground mt-1">— Aurora, Mestra da JVM</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Phase List */}
        <div className="px-4 py-6 max-w-lg mx-auto pb-32">
          {javaPhases.map((phase, phaseIndex) => {
            const phaseExercises = getExercisesByPhase(phase.id);
            const exercisesBeforePhase = javaExercises.filter((e) => e.phase < phase.id).length;
            const phaseStartIndex = exercisesBeforePhase;
            const phaseEndIndex = phaseStartIndex + phaseExercises.length;

            const isCurrentPhase = phase.id === currentPhase;
            const isCompletedPhase = currentExercise >= phaseEndIndex;
            const isLockedPhase = currentExercise < phaseStartIndex;
            const isExpanded = expandedPhase === phase.id;

            const completedInPhase = Math.max(0, Math.min(currentExercise - phaseStartIndex, phaseExercises.length));
            const phaseProgress = (completedInPhase / phaseExercises.length) * 100;

            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: phaseIndex * 0.1 }}
                className="mb-4"
              >
                {/* Phase Header */}
                <motion.button
                  whileHover={{ scale: isLockedPhase ? 1 : 1.01 }}
                  whileTap={{ scale: isLockedPhase ? 1 : 0.99 }}
                  onClick={() => !isLockedPhase && setExpandedPhase(isExpanded ? null : phase.id)}
                  disabled={isLockedPhase}
                  className={cn(
                    "w-full relative overflow-hidden rounded-2xl p-4 transition-all duration-300",
                    isCurrentPhase && "bg-gradient-to-r from-primary/90 to-primary/70 shadow-lg shadow-primary/30",
                    isCompletedPhase && !isCurrentPhase && "bg-gradient-to-r from-success/80 to-success/60",
                    isLockedPhase && "bg-muted/50 opacity-60 cursor-not-allowed",
                  )}
                >
                  {isCurrentPhase && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  )}

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center text-2xl",
                          isCurrentPhase && "bg-primary-foreground/20",
                          isCompletedPhase && !isCurrentPhase && "bg-success-foreground/20",
                          isLockedPhase && "bg-muted",
                        )}
                      >
                        {isLockedPhase ? <Lock className="w-5 h-5" /> : phase.icon}
                      </div>
                      <div className="text-left">
                        <p
                          className={cn(
                            "text-xs font-medium opacity-70",
                            (isCurrentPhase || isCompletedPhase) && "text-white",
                            isLockedPhase && "text-muted-foreground",
                          )}
                        >
                          FASE {phase.id}
                        </p>
                        <h3
                          className={cn(
                            "font-display font-bold",
                            (isCurrentPhase || isCompletedPhase) && "text-white",
                            isLockedPhase && "text-muted-foreground",
                          )}
                        >
                          {phase.name}
                        </h3>
                        <p
                          className={cn(
                            "text-xs opacity-70",
                            (isCurrentPhase || isCompletedPhase) && "text-white",
                            isLockedPhase && "text-muted-foreground",
                          )}
                        >
                          {phase.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCompletedPhase && <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />}
                      {!isLockedPhase && (
                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown
                            className={cn(
                              "w-5 h-5",
                              (isCurrentPhase || isCompletedPhase) ? "text-white" : "text-muted-foreground",
                            )}
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {!isLockedPhase && (
                    <div className="mt-3 h-1.5 bg-black/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${phaseProgress}%` }}
                        transition={{ duration: 0.5 }}
                        className={cn(
                          "h-full rounded-full",
                          isCurrentPhase && "bg-white",
                          isCompletedPhase && "bg-yellow-300",
                        )}
                      />
                    </div>
                  )}
                </motion.button>

                {/* Expanded Exercises */}
                <AnimatePresence>
                  {isExpanded && !isLockedPhase && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 pl-6 space-y-2">
                        {phaseExercises.map((exercise, localIndex) => {
                          const globalIndex = getExerciseGlobalIndex(phase.id, localIndex);
                          const isCompleted = globalIndex < currentExercise;
                          const isCurrent = globalIndex === currentExercise;
                          const isLocked = globalIndex > currentExercise;

                          return (
                            <motion.div
                              key={localIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: localIndex * 0.05 }}
                              className="relative"
                            >
                              {localIndex < phaseExercises.length - 1 && (
                                <div
                                  className={cn(
                                    "absolute left-5 top-12 w-0.5 h-6",
                                    isCompleted ? "bg-success" : "bg-muted",
                                  )}
                                />
                              )}

                              <button
                                onClick={isCurrent ? onStartLesson : undefined}
                                disabled={isLocked}
                                className={cn(
                                  "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
                                  isCompleted && "bg-success/10 border border-success/20",
                                  isCurrent && "bg-primary/10 border-2 border-primary shadow-lg shadow-primary/20",
                                  isLocked && "bg-muted/30 opacity-50 cursor-not-allowed",
                                )}
                              >
                                <div
                                  className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                                    isCompleted && "bg-success text-success-foreground",
                                    isCurrent && "bg-primary text-primary-foreground animate-pulse",
                                    isLocked && "bg-muted text-muted-foreground",
                                  )}
                                >
                                  {isCompleted ? (
                                    <Star className="w-5 h-5 fill-current" />
                                  ) : isCurrent ? (
                                    <Play className="w-5 h-5 fill-current ml-0.5" />
                                  ) : (
                                    <Lock className="w-4 h-4" />
                                  )}
                                </div>

                                <div className="flex-1 text-left">
                                  <p
                                    className={cn(
                                      "font-medium text-sm",
                                      isCompleted && "text-success",
                                      isCurrent && "text-primary",
                                      isLocked && "text-muted-foreground",
                                    )}
                                  >
                                    {exercise.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Desafio {localIndex + 1} • {exercise.icon}
                                  </p>
                                </div>

                                {isCurrent && (
                                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                                    <ChevronRight className="w-5 h-5 text-primary" />
                                  </motion.div>
                                )}
                                {isCompleted && <span className="text-xs text-success font-medium">+50 XP</span>}
                              </button>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Start Button */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="safe-bottom fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/95 to-transparent"
        >
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px hsl(var(--primary) / 0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onStartLesson}
            className="w-full max-w-lg mx-auto flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-primary via-primary to-emerald-500 text-primary-foreground font-bold text-lg shadow-xl shadow-primary/30 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
            />

            <Coffee className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Iniciar Compilação</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
