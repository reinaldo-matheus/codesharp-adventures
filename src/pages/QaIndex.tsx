import { useState, useCallback, useMemo, useEffect } from "react";
import {
  qaExercises,
  qaPhases,
  getCurrentQaPhase,
  QaPhase,
  QaExercise,
} from "@/data/qaLessons";
import { XPBar } from "@/components/game/XPBar";
import { QaQuestCard } from "@/components/qa/QaQuestCard";
import { QaVictoryScreen } from "@/components/qa/QaVictoryScreen";
import { QaHeader } from "@/components/qa/QaHeader";
import { QaPhaseTransition } from "@/components/qa/QaPhaseTransition";
import { QaWorldMap } from "@/components/qa/QaWorldMap";
import { QaLearningPath } from "@/components/qa/QaLearningPath";
import { Map, RotateCcw } from "lucide-react";
import { loadProgress, saveProgress, clearProgress } from "@/hooks/use-progress-storage";

// Import all background images (reused from the C# track)
import heroBg from "@/assets/hero-bg.jpg";
import libraryBg from "@/assets/library-bg.jpg";
import volcanoBg from "@/assets/volcano-bg.jpg";
import dungeonBg from "@/assets/dungeon-bg.jpg";
import crystalBg from "@/assets/crystal-bg.jpg";
import sanctuaryBg from "@/assets/sanctuary-bg.jpg";
import towerBg from "@/assets/tower-bg.jpg";

const phaseBackgrounds: Record<number, string> = {
  1: heroBg, // Vila do Aprendiz QA
  2: libraryBg, // Academia dos Casos de Teste
  3: volcanoBg, // Forja da Automação
  4: dungeonBg, // Oficina Java & JUnit
  5: crystalBg, // Cavernas da API REST
  6: sanctuaryBg, // Santuário REST Assured
  7: towerBg, // Torre CI/CD
};

interface WrongAnswer {
  exerciseIndex: number;
  exercise: QaExercise;
}

const PROGRESS_KEY = "codesharp:qa:progress";

const QaIndex = () => {
  const [savedProgress] = useState(() => loadProgress(PROGRESS_KEY));

  const [currentExercise, setCurrentExercise] = useState(() => {
    const idx = savedProgress?.currentIndex ?? 0;
    return Number.isInteger(idx) && idx >= 0 && idx < qaExercises.length ? idx : 0;
  });
  const [xp, setXp] = useState(() => savedProgress?.xp ?? 0);
  const [correctAnswers, setCorrectAnswers] = useState(() => savedProgress?.correctAnswers ?? 0);
  const [gameComplete, setGameComplete] = useState(() => savedProgress?.gameComplete ?? false);
  const [showPhaseTransition, setShowPhaseTransition] = useState(false);
  const [pendingPhase, setPendingPhase] = useState<QaPhase | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [isInGame, setIsInGame] = useState(false);
  const [streak, setStreak] = useState(() => savedProgress?.streak ?? 5);

  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>(() => {
    const indices = savedProgress?.wrongAnswerIndices ?? [];
    return indices
      .filter((i) => Number.isInteger(i) && i >= 0 && i < qaExercises.length)
      .map((exerciseIndex) => ({ exerciseIndex, exercise: qaExercises[exerciseIndex] }));
  });
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [reviewingPhaseId, setReviewingPhaseId] = useState<number | null>(null);

  const level = Math.floor(xp / 100) + 1;

  // Persist the player's checkpoint locally so they resume where they left off.
  useEffect(() => {
    saveProgress(PROGRESS_KEY, {
      currentIndex: currentExercise,
      xp,
      correctAnswers,
      gameComplete,
      streak,
      wrongAnswerIndices: wrongAnswers.map((wa) => wa.exerciseIndex),
    });
  }, [currentExercise, xp, correctAnswers, gameComplete, streak, wrongAnswers]);

  const currentPhase = useMemo(() => getCurrentQaPhase(currentExercise), [currentExercise]);

  const displayPhaseId = isReviewMode && reviewingPhaseId ? reviewingPhaseId : currentPhase.id;
  const currentBackground = phaseBackgrounds[displayPhaseId] || heroBg;

  const [reviewQuestionToRemove, setReviewQuestionToRemove] = useState<number | null>(null);

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      if (isCorrect) {
        setXp((prev) => prev + 50);
        setCorrectAnswers((prev) => prev + 1);

        if (isReviewMode && reviewingPhaseId !== null) {
          const currentReviewQuestion = wrongAnswers.filter((wa) => wa.exercise.phase === reviewingPhaseId)[
            currentReviewIndex
          ];
          if (currentReviewQuestion) {
            setReviewQuestionToRemove(currentReviewQuestion.exerciseIndex);
          }
        }
      } else if (!isReviewMode) {
        const currentExerciseData = qaExercises[currentExercise];
        setWrongAnswers((prev) => {
          if (prev.some((wa) => wa.exerciseIndex === currentExercise)) {
            return prev;
          }
          return [...prev, { exerciseIndex: currentExercise, exercise: currentExerciseData }];
        });
      }
    },
    [currentExercise, isReviewMode, wrongAnswers, currentReviewIndex, reviewingPhaseId],
  );

  const [pendingNextExercise, setPendingNextExercise] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    if (isReviewMode && reviewingPhaseId !== null) {
      let updatedWrongAnswers = wrongAnswers;
      if (reviewQuestionToRemove !== null) {
        updatedWrongAnswers = wrongAnswers.filter((wa) => wa.exerciseIndex !== reviewQuestionToRemove);
        setWrongAnswers(updatedWrongAnswers);
        setReviewQuestionToRemove(null);
      }

      const remainingWrongAnswers = updatedWrongAnswers.filter((wa) => wa.exercise.phase === reviewingPhaseId);

      if (remainingWrongAnswers.length === 0) {
        setIsReviewMode(false);
        setReviewingPhaseId(null);
        setCurrentReviewIndex(0);

        if (pendingNextExercise !== null) {
          setCurrentExercise(pendingNextExercise);
          setPendingNextExercise(null);
          if (pendingPhase) {
            setShowPhaseTransition(true);
          }
        } else if (currentExercise >= qaExercises.length - 1) {
          setGameComplete(true);
        }
      } else if (currentReviewIndex >= remainingWrongAnswers.length) {
        setCurrentReviewIndex(0);
      }
      return;
    }

    if (currentExercise < qaExercises.length - 1) {
      const nextExercise = currentExercise + 1;
      const nextPhase = getCurrentQaPhase(nextExercise);

      if (nextPhase.id !== currentPhase.id) {
        const wrongForPhase = wrongAnswers.filter((wa) => wa.exercise.phase === currentPhase.id);

        if (wrongForPhase.length > 0) {
          setIsReviewMode(true);
          setReviewingPhaseId(currentPhase.id);
          setCurrentReviewIndex(0);
          setPendingPhase(nextPhase);
          setPendingNextExercise(nextExercise);
        } else {
          setPendingPhase(nextPhase);
          setShowPhaseTransition(true);
          setCurrentExercise(nextExercise);
        }
      } else {
        setCurrentExercise(nextExercise);
      }
    } else {
      const wrongForPhase = wrongAnswers.filter((wa) => wa.exercise.phase === currentPhase.id);

      if (wrongForPhase.length > 0) {
        setIsReviewMode(true);
        setReviewingPhaseId(currentPhase.id);
        setCurrentReviewIndex(0);
      } else {
        setGameComplete(true);
      }
    }
  }, [
    currentExercise,
    currentPhase.id,
    wrongAnswers,
    isReviewMode,
    currentReviewIndex,
    reviewingPhaseId,
    pendingPhase,
    reviewQuestionToRemove,
    pendingNextExercise,
  ]);

  const handlePhaseTransitionContinue = useCallback(() => {
    setShowPhaseTransition(false);
    setPendingPhase(null);
    setIsInGame(false);
  }, []);

  const handleRestart = useCallback(() => {
    clearProgress(PROGRESS_KEY);
    setCurrentExercise(0);
    setXp(0);
    setCorrectAnswers(0);
    setGameComplete(false);
    setShowPhaseTransition(false);
    setPendingPhase(null);
    setShowMap(false);
    setIsInGame(false);
    setWrongAnswers([]);
    setIsReviewMode(false);
    setCurrentReviewIndex(0);
    setReviewingPhaseId(null);
    setReviewQuestionToRemove(null);
    setPendingNextExercise(null);
  }, []);

  const toggleMap = useCallback(() => {
    setShowMap((prev) => !prev);
  }, []);

  const handleStartLesson = useCallback(() => {
    setIsInGame(true);
  }, []);

  if (!isInGame && !gameComplete) {
    return (
      <div className="theme-qa">
        <QaLearningPath
          currentPhase={currentPhase.id}
          currentExercise={currentExercise}
          xp={xp}
          level={level}
          streak={streak}
          onStartLesson={handleStartLesson}
          onOpenMap={toggleMap}
        />
        {showMap && (
          <QaWorldMap
            currentPhaseId={currentPhase.id}
            completedExercises={currentExercise}
            totalExercises={qaExercises.length}
            onClose={toggleMap}
          />
        )}
      </div>
    );
  }

  return (
    <div className="theme-qa min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: `url(${currentBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/90 to-background" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          <QaHeader />

          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-xl">{currentPhase.icon}</span>
            <span className="text-sm font-medium text-primary">{currentPhase.name}</span>
            <button
              onClick={toggleMap}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-secondary hover:bg-secondary/30 transition-all text-xs"
              title="Ver Mapa da Qualidade"
            >
              <Map className="w-3 h-3" />
              <span className="hidden sm:inline">Mapa</span>
            </button>
          </div>

          <div className="mb-6">
            <XPBar xp={xp} level={level} />
          </div>

          {isReviewMode && reviewingPhaseId !== null && (
            <div className="mb-4 p-3 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: "3s" }} />
              <div>
                <p className="text-amber-300 font-display font-semibold text-sm">Modo Revisão Ativo</p>
                <p className="text-amber-200/70 text-xs">
                  Responda corretamente {wrongAnswers.filter((wa) => wa.exercise.phase === reviewingPhaseId).length}{" "}
                  desafio(s) para avançar
                </p>
              </div>
            </div>
          )}

          {gameComplete ? (
            <QaVictoryScreen
              xp={xp}
              level={level}
              correctAnswers={correctAnswers}
              totalQuestions={qaExercises.length}
              onRestart={handleRestart}
            />
          ) : showPhaseTransition && pendingPhase ? (
            <QaPhaseTransition phase={pendingPhase} onContinue={handlePhaseTransitionContinue} />
          ) : isReviewMode && reviewingPhaseId !== null ? (
            (() => {
              const reviewQuestions = wrongAnswers.filter((wa) => wa.exercise.phase === reviewingPhaseId);
              const currentReview = reviewQuestions[currentReviewIndex];
              if (!currentReview) return null;

              return (
                <QaQuestCard
                  exercise={currentReview.exercise}
                  exerciseNumber={currentReviewIndex + 1}
                  totalExercises={reviewQuestions.length}
                  onAnswer={handleAnswer}
                  onNext={handleNext}
                  isReviewMode={true}
                />
              );
            })()
          ) : (
            <QaQuestCard
              exercise={qaExercises[currentExercise]}
              exerciseNumber={currentExercise + 1}
              totalExercises={qaExercises.length}
              onAnswer={handleAnswer}
              onNext={handleNext}
            />
          )}

          <div className="mt-6 flex justify-center gap-2 flex-wrap">
            {qaPhases.map((phase) => (
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

          <p className="text-center text-muted-foreground text-sm mt-8">
            Uma trilha feita de QA para QA 🐛🛡️
          </p>
        </div>
      </div>

      {showMap && (
        <QaWorldMap
          currentPhaseId={currentPhase.id}
          completedExercises={currentExercise}
          totalExercises={qaExercises.length}
          onClose={toggleMap}
        />
      )}
    </div>
  );
};

export default QaIndex;
