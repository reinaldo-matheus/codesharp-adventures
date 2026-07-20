import { useState } from "react";
import { JavaExercise } from "@/data/javaLessons";
import { evaluateExercise, getTokenChecklist } from "@/lib/javaValidation";
import { Check, X, Scroll, ChevronRight, Lightbulb, Keyboard, Code2, CheckCircle2, Circle } from "lucide-react";

interface JavaQuestCardProps {
  exercise: JavaExercise;
  exerciseNumber: number;
  totalExercises: number;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
  isReviewMode?: boolean;
}

const MAX_ATTEMPTS = 3;

const kindLabel: Record<JavaExercise["kind"], { label: string; icon: JSX.Element }> = {
  quiz: { label: "Múltipla escolha", icon: <Scroll className="w-4 h-4" /> },
  "type-answer": { label: "Resposta curta", icon: <Keyboard className="w-4 h-4" /> },
  "code-fill": { label: "Complete o código", icon: <Code2 className="w-4 h-4" /> },
  "code-write": { label: "Escreva o código", icon: <Code2 className="w-4 h-4" /> },
};

export const JavaQuestCard = ({
  exercise,
  exerciseNumber,
  totalExercises,
  onAnswer,
  onNext,
  isReviewMode = false,
}: JavaQuestCardProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [textResponse, setTextResponse] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [justFailed, setJustFailed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const attemptsLeft = MAX_ATTEMPTS - attempts;

  const resetState = () => {
    setSelectedOption(null);
    setTextResponse("");
    setAttempts(0);
    setLocked(false);
    setIsCorrect(false);
    setJustFailed(false);
    setShowHint(false);
  };

  const handleQuizClick = (index: number) => {
    if (locked || exercise.kind !== "quiz") return;
    setSelectedOption(index);
    const correct = index === exercise.correct;
    setIsCorrect(correct);
    setLocked(true);
    onAnswer(correct);
  };

  const handleVerify = () => {
    if (locked || !textResponse.trim()) return;
    const result = evaluateExercise(exercise, textResponse);

    if (result.correct) {
      setIsCorrect(true);
      setLocked(true);
      setJustFailed(false);
      onAnswer(true);
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (nextAttempts >= MAX_ATTEMPTS) {
      setIsCorrect(false);
      setLocked(true);
      setJustFailed(false);
      onAnswer(false);
    } else {
      setJustFailed(true);
      setTimeout(() => setJustFailed(false), 1200);
    }
  };

  const handleNext = () => {
    resetState();
    onNext();
  };

  const getOptionClass = (index: number) => {
    if (exercise.kind !== "quiz") return "btn-option";
    if (!locked) return "btn-option";
    if (index === exercise.correct) return "btn-option correct";
    if (index === selectedOption && index !== exercise.correct) return "btn-option incorrect";
    return "btn-option opacity-50";
  };

  const tokenChecklist = exercise.kind === "code-write" ? getTokenChecklist(exercise, textResponse) : [];
  const referenceCode =
    exercise.kind === "code-write"
      ? exercise.sampleSolution
      : exercise.kind === "code-fill" || exercise.kind === "type-answer"
      ? exercise.acceptedAnswers[0]
      : null;

  return (
    <div className="card-quest animate-bounce-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-float">{exercise.icon}</span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-display text-xl font-bold text-foreground">{exercise.title}</h2>
              {isReviewMode && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                  Revisão
                </span>
              )}
              <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-accent/20 text-accent rounded-full border border-accent/30">
                {kindLabel[exercise.kind].icon}
                {kindLabel[exercise.kind].label}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {isReviewMode ? "Revisão" : "Desafio"} {exerciseNumber} de {totalExercises}
            </p>
          </div>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: totalExercises }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i < exerciseNumber ? "bg-primary" : i === exerciseNumber - 1 ? "bg-primary animate-pulse" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Prompt */}
      <div className="mb-6">
        <p className="text-lg font-medium text-foreground leading-relaxed whitespace-pre-wrap">{exercise.prompt}</p>
      </div>

      {/* Body varies per exercise kind */}
      {exercise.kind === "quiz" && (
        <div className="space-y-3 mb-6">
          {exercise.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleQuizClick(index)}
              disabled={locked}
              className={`${getOptionClass(index)} flex items-center justify-between group`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted text-sm font-bold font-display">
                  {String.fromCharCode(65 + index)}
                </span>
                <code className="text-sm">{option}</code>
              </div>
              {locked && index === exercise.correct && <Check className="w-5 h-5 text-success" />}
              {locked && index === selectedOption && index !== exercise.correct && (
                <X className="w-5 h-5 text-destructive" />
              )}
            </button>
          ))}
        </div>
      )}

      {(exercise.kind === "type-answer" || exercise.kind === "code-fill") && (
        <div className="mb-6">
          {exercise.kind === "code-fill" ? (
            <pre
              className={`whitespace-pre-wrap break-words font-mono text-sm rounded-lg p-4 border transition-colors ${
                justFailed ? "animate-shake border-destructive/50" : "border-border"
              } bg-muted/40 text-foreground`}
            >
              {exercise.codeBefore}
              <input
                type="text"
                value={textResponse}
                disabled={locked}
                onChange={(e) => setTextResponse(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                placeholder={exercise.placeholder ?? "..."}
                className={`inline-block w-28 mx-1 px-2 py-0.5 rounded border font-mono text-sm bg-background text-primary align-baseline focus:outline-none focus:ring-2 focus:ring-primary ${
                  locked
                    ? isCorrect
                      ? "border-success text-success"
                      : "border-destructive text-destructive"
                    : "border-primary/50"
                }`}
              />
              {exercise.codeAfter}
            </pre>
          ) : (
            <input
              type="text"
              value={textResponse}
              disabled={locked}
              onChange={(e) => setTextResponse(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              placeholder={exercise.placeholder ?? "Digite sua resposta..."}
              className={`w-full px-4 py-3 rounded-lg border bg-muted/40 text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                justFailed ? "animate-shake border-destructive/50" : "border-border"
              } ${
                locked ? (isCorrect ? "border-success text-success" : "border-destructive text-destructive") : ""
              }`}
            />
          )}

          {!locked && (
            <div className="flex items-center justify-between mt-3 gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                {exercise.hint && (
                  <button
                    onClick={() => setShowHint((prev) => !prev)}
                    className="flex items-center gap-1 text-xs text-secondary hover:text-secondary/80 transition-colors"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    {showHint ? "Ocultar dica" : "Ver dica"}
                  </button>
                )}
                {attempts > 0 && (
                  <span className="text-xs text-muted-foreground">Tentativas restantes: {attemptsLeft}</span>
                )}
              </div>
              <button
                onClick={handleVerify}
                disabled={!textResponse.trim()}
                className="btn-rpg-primary px-5 py-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Verificar Resposta
              </button>
            </div>
          )}

          {showHint && exercise.hint && !locked && (
            <p className="mt-2 text-sm text-secondary/90 bg-secondary/10 border border-secondary/30 rounded-lg px-3 py-2">
              💡 {exercise.hint}
            </p>
          )}

          {justFailed && (
            <p className="mt-2 text-sm text-destructive animate-slide-up">
              Ainda não é isso... tente novamente!
            </p>
          )}
        </div>
      )}

      {exercise.kind === "code-write" && (
        <div className="mb-6">
          <textarea
            value={textResponse}
            disabled={locked}
            onChange={(e) => setTextResponse(e.target.value)}
            placeholder={exercise.starterCode || "// escreva seu código aqui..."}
            rows={5}
            spellCheck={false}
            className={`w-full px-4 py-3 rounded-lg border bg-muted/40 text-foreground font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-y ${
              justFailed ? "animate-shake border-destructive/50" : "border-border"
            } ${locked ? (isCorrect ? "border-success" : "border-destructive") : ""}`}
          />

          {tokenChecklist.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tokenChecklist.map(({ token, met }) => (
                <span
                  key={token}
                  className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full border font-mono ${
                    met
                      ? "bg-success/10 border-success/40 text-success"
                      : "bg-muted/40 border-border text-muted-foreground"
                  }`}
                >
                  {met ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                  {token}
                </span>
              ))}
            </div>
          )}

          {!locked && (
            <div className="flex items-center justify-between mt-3 gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                {exercise.hint && (
                  <button
                    onClick={() => setShowHint((prev) => !prev)}
                    className="flex items-center gap-1 text-xs text-secondary hover:text-secondary/80 transition-colors"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    {showHint ? "Ocultar dica" : "Ver dica"}
                  </button>
                )}
                {attempts > 0 && (
                  <span className="text-xs text-muted-foreground">Tentativas restantes: {attemptsLeft}</span>
                )}
              </div>
              <button
                onClick={handleVerify}
                disabled={!textResponse.trim()}
                className="btn-rpg-primary px-5 py-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Verificar Código
              </button>
            </div>
          )}

          {showHint && exercise.hint && !locked && (
            <p className="mt-2 text-sm text-secondary/90 bg-secondary/10 border border-secondary/30 rounded-lg px-3 py-2">
              💡 {exercise.hint}
            </p>
          )}

          {justFailed && (
            <p className="mt-2 text-sm text-destructive animate-slide-up">
              Quase lá! Confira o checklist acima e tente novamente.
            </p>
          )}
        </div>
      )}

      {/* Feedback */}
      {locked && (
        <div
          className={`animate-slide-up mb-4 p-4 rounded-lg ${
            isCorrect ? "bg-success/10 border border-success/30" : "bg-destructive/10 border border-destructive/30"
          }`}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-success" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                <X className="w-5 h-5 text-destructive" />
              </div>
            )}
            <div className="flex-1">
              <p className={`font-display font-semibold mb-1 ${isCorrect ? "text-success" : "text-destructive"}`}>
                {isCorrect ? "Boa, desenvolvedor(a)! Resposta certa." : "Quase lá!"}
              </p>
              <p className="text-sm text-muted-foreground">{exercise.explanation}</p>
              {!isCorrect && referenceCode && (
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-1">Resposta de referência:</p>
                  <pre className="whitespace-pre-wrap break-words font-mono text-xs bg-muted/50 border border-border rounded-lg p-3 text-foreground">
                    {referenceCode}
                  </pre>
                </div>
              )}
              {isCorrect && exercise.kind === "code-write" && (
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-1">Solução de referência (compare com a sua):</p>
                  <pre className="whitespace-pre-wrap break-words font-mono text-xs bg-muted/50 border border-border rounded-lg p-3 text-foreground">
                    {exercise.sampleSolution}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Next Button */}
      {locked && (
        <button onClick={handleNext} className="btn-rpg-primary w-full flex items-center justify-center gap-2">
          <span>Próximo Desafio</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
