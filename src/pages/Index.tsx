import { useState, useCallback } from "react";
import { lessons } from "@/data/lessons";
import { XPBar } from "@/components/game/XPBar";
import { QuestCard } from "@/components/game/QuestCard";
import { VictoryScreen } from "@/components/game/VictoryScreen";
import { GameHeader } from "@/components/game/GameHeader";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [xp, setXp] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const level = Math.floor(xp / 100) + 1;

  const handleAnswer = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setXp((prev) => prev + 50);
      setCorrectAnswers((prev) => prev + 1);
    }
  }, []);

  const handleNext = useCallback(() => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson((prev) => prev + 1);
    } else {
      setGameComplete(true);
    }
  }, [currentLesson]);

  const handleRestart = useCallback(() => {
    setCurrentLesson(0);
    setXp(0);
    setCorrectAnswers(0);
    setGameComplete(false);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/90 to-background" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Header */}
          <GameHeader />

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
          ) : (
            <QuestCard
              lesson={lessons[currentLesson]}
              lessonNumber={currentLesson + 1}
              totalLessons={lessons.length}
              onAnswer={handleAnswer}
              onNext={handleNext}
            />
          )}

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
