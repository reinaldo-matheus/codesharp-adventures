import { useState, useCallback, useMemo } from "react";
import { lessons, phases, getCurrentPhase, Phase, Lesson, getLessonsByPhase } from "@/data/lessons";
import { XPBar } from "@/components/game/XPBar";
import { QuestCard } from "@/components/game/QuestCard";
import { VictoryScreen } from "@/components/game/VictoryScreen";
import { GameHeader } from "@/components/game/GameHeader";
import { PhaseTransition } from "@/components/game/PhaseTransition";
import { WorldMap } from "@/components/game/WorldMap";
import { Map, RotateCcw } from "lucide-react";

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

// Track wrong answers with lesson index
interface WrongAnswer {
  lessonIndex: number;
  lesson: Lesson;
}

const Index = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [xp, setXp] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showPhaseTransition, setShowPhaseTransition] = useState(false);
  const [pendingPhase, setPendingPhase] = useState<Phase | null>(null);
  const [showMap, setShowMap] = useState(false);
  
  // Wrong answers tracking
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [reviewingPhaseId, setReviewingPhaseId] = useState<number | null>(null);

  const level = Math.floor(xp / 100) + 1;
  
  // Get current phase based on lesson
  const currentPhase = useMemo(() => getCurrentPhase(currentLesson), [currentLesson]);
  
  // Get wrong answers for current phase
  const wrongAnswersForCurrentPhase = useMemo(() => {
    return wrongAnswers.filter(wa => wa.lesson.phase === currentPhase.id);
  }, [wrongAnswers, currentPhase.id]);
  
  // Get background for current phase (or reviewing phase)
  const displayPhaseId = isReviewMode && reviewingPhaseId ? reviewingPhaseId : currentPhase.id;
  const currentBackground = phaseBackgrounds[displayPhaseId] || heroBg;

  const handleAnswer = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setXp((prev) => prev + 50);
      setCorrectAnswers((prev) => prev + 1);
      
      // If in review mode, remove this question from wrong answers
      if (isReviewMode && reviewingPhaseId !== null) {
        const currentReviewQuestion = wrongAnswers.filter(wa => wa.lesson.phase === reviewingPhaseId)[currentReviewIndex];
        if (currentReviewQuestion) {
          setWrongAnswers((prev) => 
            prev.filter(wa => wa.lessonIndex !== currentReviewQuestion.lessonIndex)
          );
        }
      }
    } else if (!isReviewMode) {
      // Only add to wrong answers if not already in review mode
      const currentLessonData = lessons[currentLesson];
      setWrongAnswers((prev) => {
        // Don't add duplicates
        if (prev.some(wa => wa.lessonIndex === currentLesson)) {
          return prev;
        }
        return [...prev, { lessonIndex: currentLesson, lesson: currentLessonData }];
      });
    }
  }, [currentLesson, isReviewMode, wrongAnswers, currentReviewIndex, reviewingPhaseId]);

  const handleNext = useCallback(() => {
    // If in review mode
    if (isReviewMode && reviewingPhaseId !== null) {
      const remainingWrongAnswers = wrongAnswers.filter(wa => wa.lesson.phase === reviewingPhaseId);
      
      if (currentReviewIndex < remainingWrongAnswers.length - 1) {
        // More review questions to go
        setCurrentReviewIndex((prev) => prev + 1);
      } else {
        // Check if there are still wrong answers for this phase (user might have gotten some wrong again)
        const stillWrong = wrongAnswers.filter(wa => wa.lesson.phase === reviewingPhaseId);
        
        if (stillWrong.length > 0) {
          // Restart review with remaining wrong answers
          setCurrentReviewIndex(0);
        } else {
          // All correct! Exit review mode and continue to next phase
          setIsReviewMode(false);
          setReviewingPhaseId(null);
          setCurrentReviewIndex(0);
          
          // Now check if we should show phase transition or continue
          if (currentLesson < lessons.length - 1) {
            const nextPhase = getCurrentPhase(currentLesson);
            if (pendingPhase && pendingPhase.id !== currentPhase.id) {
              setShowPhaseTransition(true);
            }
          } else {
            setGameComplete(true);
          }
        }
      }
      return;
    }

    // Normal mode - check if we're at the end of a phase
    if (currentLesson < lessons.length - 1) {
      const nextLesson = currentLesson + 1;
      const nextPhase = getCurrentPhase(nextLesson);
      
      // Check if we're entering a new phase
      if (nextPhase.id !== currentPhase.id) {
        // Check if there are wrong answers for current phase
        const wrongForPhase = wrongAnswers.filter(wa => wa.lesson.phase === currentPhase.id);
        
        if (wrongForPhase.length > 0) {
          // Enter review mode before allowing phase transition
          setIsReviewMode(true);
          setReviewingPhaseId(currentPhase.id);
          setCurrentReviewIndex(0);
          setPendingPhase(nextPhase);
          // Don't advance lesson yet - must complete review first
        } else {
          // No wrong answers, proceed normally
          setPendingPhase(nextPhase);
          setShowPhaseTransition(true);
          setCurrentLesson(nextLesson);
        }
      } else {
        setCurrentLesson(nextLesson);
      }
    } else {
      // Last lesson - check for any remaining wrong answers
      const wrongForPhase = wrongAnswers.filter(wa => wa.lesson.phase === currentPhase.id);
      
      if (wrongForPhase.length > 0) {
        setIsReviewMode(true);
        setReviewingPhaseId(currentPhase.id);
        setCurrentReviewIndex(0);
      } else {
        setGameComplete(true);
      }
    }
  }, [currentLesson, currentPhase.id, wrongAnswers, isReviewMode, currentReviewIndex, reviewingPhaseId, pendingPhase]);

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
    setShowMap(false);
    setWrongAnswers([]);
    setIsReviewMode(false);
    setCurrentReviewIndex(0);
    setReviewingPhaseId(null);
  }, []);

  const toggleMap = useCallback(() => {
    setShowMap((prev) => !prev);
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

          {/* Phase Indicator with Map Button */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-xl">{currentPhase.icon}</span>
            <span className="text-sm font-medium text-primary">
              {currentPhase.name}
            </span>
            <button
              onClick={toggleMap}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-secondary hover:bg-secondary/30 transition-all text-xs"
              title="Ver Mapa do Reino"
            >
              <Map className="w-3 h-3" />
              <span className="hidden sm:inline">Mapa</span>
            </button>
          </div>

          {/* XP Bar */}
          <div className="mb-6">
            <XPBar xp={xp} level={level} />
          </div>

          {/* Review Mode Indicator */}
          {isReviewMode && reviewingPhaseId !== null && (
            <div className="mb-4 p-3 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
              <div>
                <p className="text-amber-300 font-display font-semibold text-sm">
                  Modo Revisão Ativo
                </p>
                <p className="text-amber-200/70 text-xs">
                  Responda corretamente {wrongAnswers.filter(wa => wa.lesson.phase === reviewingPhaseId).length} questão(ões) para avançar
                </p>
              </div>
            </div>
          )}

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
          ) : isReviewMode && reviewingPhaseId !== null ? (
            (() => {
              const reviewQuestions = wrongAnswers.filter(wa => wa.lesson.phase === reviewingPhaseId);
              const currentReview = reviewQuestions[currentReviewIndex];
              if (!currentReview) return null;
              
              return (
                <QuestCard
                  lesson={currentReview.lesson}
                  lessonNumber={currentReviewIndex + 1}
                  totalLessons={reviewQuestions.length}
                  onAnswer={handleAnswer}
                  onNext={handleNext}
                  isReviewMode={true}
                />
              );
            })()
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

      {/* World Map Modal */}
      {showMap && (
        <WorldMap
          currentPhaseId={currentPhase.id}
          completedLessons={currentLesson}
          totalLessons={lessons.length}
          onClose={toggleMap}
        />
      )}
    </div>
  );
};

export default Index;
