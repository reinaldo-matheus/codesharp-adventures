import { useState, useCallback, useMemo } from "react";
import { lessons, phases, getCurrentPhase, Phase } from "@/data/lessons";
import { XPBar } from "@/components/game/XPBar";
import { QuestCard } from "@/components/game/QuestCard";
import { VictoryScreen } from "@/components/game/VictoryScreen";
import { GameHeader } from "@/components/game/GameHeader";
import { PhaseTransition } from "@/components/game/PhaseTransition";

// Import all background images
import heroBg from "@/assets/hero-bg.jpg";
import libraryBg from "@/assets/library-bg.jpg";
import dungeonBg from "@/assets/dungeon-bg.jpg";
import castleBg from "@/assets/castle-bg.jpg";
import crystalBg from "@/assets/crystal-bg.jpg";
import towerBg from "@/assets/tower-bg.jpg";
import volcanoBg from "@/assets/volcano-bg.jpg";
import sanctuaryBg from "@/assets/sanctuary-bg.jpg";

// Map phases to backgrounds
const phaseBackgrounds: Record<number, string> = {
  1: heroBg,        // Floresta dos Iniciantes
  2: libraryBg,     // Biblioteca Arcana
  3: dungeonBg,     // Dungeon das Sombras
  4: castleBg,      // Castelo do Mestre
  5: crystalBg,     // Cavernas de Cristal
  6: towerBg,       // Torre do Feiticeiro
  7: volcanoBg,     // Vulcão Ancestral
  8: sanctuaryBg,   // Santuário Celestial
};

const Index = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [xp, setXp] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showPhaseTransition, setShowPhaseTransition] = useState(false);
  const [pendingPhase, setPendingPhase] = useState<Phase | null>(null);

  const level = Math.floor(xp / 100) + 1;
  
  // Get current phase based on lesson
  const currentPhase = useMemo(() => getCurrentPhase(currentLesson), [currentLesson]);
  
  // Get background for current phase
  const currentBackground = phaseBackgrounds[currentPhase.id] || heroBg;

  const handleAnswer = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setXp((prev) => prev + 50);
      setCorrectAnswers((prev) => prev + 1);
    }
  }, []);

  const handleNext = useCallback(() => {
    if (currentLesson < lessons.length - 1) {
      const nextLesson = currentLesson + 1;
      const nextPhase = getCurrentPhase(nextLesson);
      
      // Check if we're entering a new phase
      if (nextPhase.id !== currentPhase.id) {
        setPendingPhase(nextPhase);
        setShowPhaseTransition(true);
        setCurrentLesson(nextLesson);
      } else {
        setCurrentLesson(nextLesson);
      }
    } else {
      setGameComplete(true);
    }
  }, [currentLesson, currentPhase.id]);

  const handlePhaseTransitionContinue = useCallback(() => {
    setShowPhaseTransition(false);
    setPendingPhase(null);
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentLesson(0);
    setXp(0);
    setCorrectAnswers(0);
    setGameComplete(false);
    setShowPhaseTransition(false);
    setPendingPhase(null);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with transition */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: `url(${currentBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/90 to-background" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Header */}
          <GameHeader />

          {/* Phase Indicator */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xl">{currentPhase.icon}</span>
            <span className="text-sm font-medium text-primary">
              {currentPhase.name}
            </span>
          </div>

          {/* XP Bar */}
          <div className="mb-6">
            <XPBar xp={xp} level={level} />
          </div>

          {/* Game Content */}
          {gameComplete ? (
            <VictoryScreen
              xp={xp}
              level={level}
              correctAnswers={correctAnswers}
              totalQuestions={lessons.length}
              onRestart={handleRestart}
            />
          ) : showPhaseTransition && pendingPhase ? (
            <PhaseTransition
              phase={pendingPhase}
              onContinue={handlePhaseTransitionContinue}
            />
          ) : (
            <QuestCard
              lesson={lessons[currentLesson]}
              lessonNumber={currentLesson + 1}
              totalLessons={lessons.length}
              onAnswer={handleAnswer}
              onNext={handleNext}
            />
          )}

          {/* Phase Progress */}
          <div className="mt-6 flex justify-center gap-2">
            {phases.map((phase) => (
              <div
                key={phase.id}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs transition-all ${
                  phase.id === currentPhase.id
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : phase.id < currentPhase.id
                    ? "bg-success/20 text-success border border-success/30"
                    : "bg-muted text-muted-foreground"
                }`}
                title={phase.name}
              >
                <span>{phase.icon}</span>
                <span className="hidden sm:inline">{phase.id}</span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <p className="text-center text-muted-foreground text-sm mt-8">
            Um jogo feito de Dev para Dev 🫡🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
