import { useState } from "react";
import { Lesson } from "@/data/lessons";
import { Check, X, Scroll, ChevronRight } from "lucide-react";

interface QuestCardProps {
  lesson: Lesson;
  lessonNumber: number;
  totalLessons: number;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

export const QuestCard = ({
  lesson,
  lessonNumber,
  totalLessons,
  onAnswer,
  onNext,
}: QuestCardProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (index: number) => {
    if (showResult) return;
    
    setSelectedOption(index);
    setShowResult(true);
    onAnswer(index === lesson.correct);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowResult(false);
    onNext();
  };

  const getOptionClass = (index: number) => {
    if (!showResult) return "btn-option";
    if (index === lesson.correct) return "btn-option correct";
    if (index === selectedOption && index !== lesson.correct) return "btn-option incorrect";
    return "btn-option opacity-50";
  };

  return (
    <div className="card-quest animate-bounce-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-float">{lesson.icon}</span>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">
              {lesson.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              Quest {lessonNumber} de {totalLessons}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-primary">
          <Scroll className="w-5 h-5" />
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: totalLessons }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i < lessonNumber
                ? "bg-primary"
                : i === lessonNumber - 1
                ? "bg-primary animate-pulse"
                : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <div className="mb-6">
        <p className="text-lg font-medium text-foreground leading-relaxed whitespace-pre-wrap">
          {lesson.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {lesson.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            disabled={showResult}
            className={`${getOptionClass(index)} flex items-center justify-between group`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted text-sm font-bold font-display">
                {String.fromCharCode(65 + index)}
              </span>
              <code className="text-sm">{option}</code>
            </div>
            {showResult && index === lesson.correct && (
              <Check className="w-5 h-5 text-success" />
            )}
            {showResult && index === selectedOption && index !== lesson.correct && (
              <X className="w-5 h-5 text-destructive" />
            )}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {showResult && (
        <div className={`animate-slide-up mb-4 p-4 rounded-lg ${
          selectedOption === lesson.correct
            ? "bg-success/10 border border-success/30"
            : "bg-destructive/10 border border-destructive/30"
        }`}>
          <div className="flex items-start gap-3">
            {selectedOption === lesson.correct ? (
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-success" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                <X className="w-5 h-5 text-destructive" />
              </div>
            )}
            <div>
              <p className={`font-display font-semibold mb-1 ${
                selectedOption === lesson.correct ? "text-success" : "text-destructive"
              }`}>
                {selectedOption === lesson.correct ? "Mandou bem, aventureiro!" : "Quase lá!"}
              </p>
              <p className="text-sm text-muted-foreground">
                {lesson.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Next Button */}
      {showResult && (
        <button
          onClick={handleNext}
          className="btn-rpg-primary w-full flex items-center justify-center gap-2"
        >
          <span>Próxima Quest</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
