import { useState, useCallback, useMemo, useEffect } from "react";
import {
  javaExercises,
  javaPhases,
  getCurrentJavaPhase,
  JavaPhase,
  JavaExercise,
} from "@/data/javaLessons";
import { XPBar } from "@/components/game/XPBar";
import { JavaQuestCard } from "@/components/java/JavaQuestCard";
import { JavaVictoryScreen } from "@/components/java/JavaVictoryScreen";
import { JavaHeader } from "@/components/java/JavaHeader";
import { JavaPhaseTransition } from "@/components/java/JavaPhaseTransition";
import { JavaWorldMap } from "@/components/java/JavaWorldMap";
import { JavaLearningPath } from "@/components/java/JavaLearningPath";
import { Map, RotateCcw } from "lucide-react";
import { loadProgress, saveProgress, clearProgress, fetchCloudProgress, upsertCloudProgress } from "@/hooks/use-progress-storage";
import { useAuth } from "@/contexts/AuthContext";

// Import all background images (reused from the other tracks)
import heroBg from "@/assets/hero-bg.jpg";
import libraryBg from "@/assets/library-bg.jpg";
import volcanoBg from "@/assets/volcano-bg.jpg";
import towerBg from "@/assets/tower-bg.jpg";
import dungeonBg from "@/assets/dungeon-bg.jpg";
import crystalBg from "@/assets/crystal-bg.jpg";
import castleBg from "@/assets/castle-bg.jpg";

const phaseBackgrounds: Record<number, string> = {
  1: heroBg, // Vila do Aprendiz Java
  2: libraryBg, // Academia da Orientação a Objetos
  3: volcanoBg, // Forja das Coleções & Streams
  4: towerBg, // Torre das Exceções
  5: dungeonBg, // Oficina de Testes
  6: crystalBg, // Cavernas da API Spring Boot
  7: castleBg, // Pico do Deploy
};

interface WrongAnswer {
  exerciseIndex: number;
  exercise: JavaExercise;
}

const PROGRESS_KEY = "codesharp:java:progress";
const TRAIL = "java" as const;

const JavaIndex = () => {
  const { user } = useAuth();
  const [savedProgress] = useState(() => loadProgress(PROGRESS_KEY));

  const [currentExercise, setCurrentExercise] = useState(() => {
    const idx = savedProgress?.currentIndex ?? 0;
    return Number.isInteger(idx) && idx >= 0 && idx < javaExercises.length ? idx : 0;
  });
  const [xp, setXp] = useState(() => savedProgress?.xp ?? 0);
  const [correctAnswers, setCorrectAnswers] = useState(() => savedProgress?.correctAnswers ?? 0);
  const [gameComplete, setGameComplete] = useState(() => savedProgress?.gameComplete ?? false);
  const [showPhaseTransition, setShowPhaseTransition] = useState(false);
  const [pendingPhase, setPendingPhase] = useState<JavaPhase | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [isInGame, setIsInGame] = useState(false);
  const [streak, setStreak] = useState(() => savedProgress?.streak ?? 3);

  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>(() => {
    const indices = savedProgress?.wrongAnswerIndices ?? [];
    return indices
      .filter((i) => Number.isInteger(i) && i >= 0 && i < javaExercises.length)
      .map((exerciseIndex) => ({ exerciseIndex, exercise: javaExercises[exerciseIndex] }));
  });
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [reviewingPhaseId, setReviewingPhaseId] = useState<number | null>(null);

  const level = Math.floor(xp / 100) + 1;

  // Persist the player's checkpoint locally so they resume where they left off,
  // and mirror it to the cloud too when signed in.
  useEffect(() => {
    const progress = {
      currentIndex: currentExercise,
      xp,
      correctAnswers,
      gameComplete,
      streak,
      wrongAnswerIndices: wrongAnswers.map((wa) => wa.exerciseIndex),
    };
    saveProgress(PROGRESS_KEY, progress);
    if (user) {
      void upsertCloudProgress(TRAIL, user.id, progress);
    }
  }, [currentExercise, xp, correctAnswers, gameComplete, streak, wrongAnswers, user]);

  // On sign-in, cloud progress (if any) takes over as the source of truth;
  // otherwise this is a brand new account, so upload whatever local/guest
  // progress already exists.
  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    (async () => {
      const cloud = await fetchCloudProgress(TRAIL, user.id);
      if (cancelled) return;

      if (cloud) {
        const idx = Number.isInteger(cloud.currentIndex) && cloud.currentIndex >= 0 && cloud.currentIndex < javaExercises.length
          ? cloud.currentIndex
          : 0;
        setCurrentExercise(idx);
        setXp(cloud.xp ?? 0);
        setCorrectAnswers(cloud.correctAnswers ?? 0);
        setGameComplete(cloud.gameComplete ?? false);
        setStreak(cloud.streak ?? 3);
        setWrongAnswers(
          (cloud.wrongAnswerIndices ?? [])
            .filter((i) => Number.isInteger(i) && i >= 0 && i < javaExercises.length)
            .map((exerciseIndex) => ({ exerciseIndex, exercise: javaExercises[exerciseIndex] })),
        );
      } else {
        await upsertCloudProgress(TRAIL, user.id, {
          currentIndex: currentExercise,
          xp,
          correctAnswers,
          gameComplete,
          streak,
          wrongAnswerIndices: wrongAnswers.map((wa) => wa.exerciseIndex),
        });
      }
    })();

    return () => {
      cancelled = true;
    };
    // Only re-run when the signed-in user changes — this is a one-time
    // handshake per login, not a reaction to every local state change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const currentPhase = useMemo(() => getCurrentJavaPhase(currentExercise), [currentExercise]);

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
        const currentExerciseData = javaExercises[currentExercise];
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
        } else if (currentExercise >= javaExercises.length - 1) {
          setGameComplete(true);
        }
      } else if (currentReviewIndex >= remainingWrongAnswers.length) {
        setCurrentReviewIndex(0);
      }
      return;
    }

    if (currentExercise < javaExercises.length - 1) {
      const nextExercise = currentExercise + 1;
      const nextPhase = getCurrentJavaPhase(nextExercise);

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
      <div className="theme-java">
        <JavaLearningPath
          currentPhase={currentPhase.id}
          currentExercise={currentExercise}
          xp={xp}
          level={level}
          streak={streak}
          onStartLesson={handleStartLesson}
          onOpenMap={toggleMap}
        />
        {showMap && (
          <JavaWorldMap
            currentPhaseId={currentPhase.id}
            completedExercises={currentExercise}
            totalExercises={javaExercises.length}
            onClose={toggleMap}
          />
        )}
      </div>
    );
  }

  return (
    <div className="theme-java min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: `url(${currentBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/90 to-background" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          <JavaHeader />

          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-xl">{currentPhase.icon}</span>
            <span className="text-sm font-medium text-primary">{currentPhase.name}</span>
            <button
              onClick={toggleMap}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-secondary hover:bg-secondary/30 transition-all text-xs"
              title="Ver Mapa do Backend"
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
            <JavaVictoryScreen
              xp={xp}
              level={level}
              correctAnswers={correctAnswers}
              totalQuestions={javaExercises.length}
              onRestart={handleRestart}
            />
          ) : showPhaseTransition && pendingPhase ? (
            <JavaPhaseTransition phase={pendingPhase} onContinue={handlePhaseTransitionContinue} />
          ) : isReviewMode && reviewingPhaseId !== null ? (
            (() => {
              const reviewQuestions = wrongAnswers.filter((wa) => wa.exercise.phase === reviewingPhaseId);
              const currentReview = reviewQuestions[currentReviewIndex];
              if (!currentReview) return null;

              return (
                <JavaQuestCard
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
            <JavaQuestCard
              exercise={javaExercises[currentExercise]}
              exerciseNumber={currentExercise + 1}
              totalExercises={javaExercises.length}
              onAnswer={handleAnswer}
              onNext={handleNext}
            />
          )}

          <div className="mt-6 flex justify-center gap-2 flex-wrap">
            {javaPhases.map((phase) => (
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
            Uma trilha feita de dev para dev ☕🚀
          </p>
        </div>
      </div>

      {showMap && (
        <JavaWorldMap
          currentPhaseId={currentPhase.id}
          completedExercises={currentExercise}
          totalExercises={javaExercises.length}
          onClose={toggleMap}
        />
      )}
    </div>
  );
};

export default JavaIndex;
