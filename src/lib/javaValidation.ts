import { JavaExercise } from "@/data/javaLessons";

const stripAccents = (value: string) => value.normalize("NFD").replace(/[̀-ͯ]/g, "");

// Normalizes free-text answers: trims, lowercases, drops accents/punctuation, collapses whitespace.
export const normalizeText = (value: string) =>
  stripAccents(value.trim().toLowerCase())
    .replace(/[.,;!?]+$/g, "")
    .replace(/\s+/g, " ");

// Normalizes code snippets: same as above but also strips ALL whitespace so
// formatting/indentation differences never fail a match.
export const normalizeCode = (value: string) => stripAccents(value.toLowerCase()).replace(/\s+/g, "");

export interface EvaluationResult {
  correct: boolean;
  missingTokens?: string[];
}

export const evaluateExercise = (exercise: JavaExercise, response: string | number): EvaluationResult => {
  switch (exercise.kind) {
    case "quiz":
      return { correct: response === exercise.correct };

    case "type-answer":
    case "code-fill": {
      const text = String(response);
      const normalizedText = normalizeText(text);
      const normalizedCode = normalizeCode(text);
      const correct = exercise.acceptedAnswers.some(
        (accepted) => normalizeText(accepted) === normalizedText || normalizeCode(accepted) === normalizedCode,
      );
      return { correct };
    }

    case "code-write": {
      const code = normalizeCode(String(response));
      const missingTokens = exercise.requiredTokens.filter((token) => !code.includes(normalizeCode(token)));
      const hasForbidden = (exercise.forbiddenTokens ?? []).some((token) => code.includes(normalizeCode(token)));
      return { correct: missingTokens.length === 0 && !hasForbidden && code.length > 0, missingTokens };
    }

    default:
      return { correct: false };
  }
};

// Per-token status used to render a live checklist while the user types a code-write answer.
export const getTokenChecklist = (exercise: JavaExercise, response: string) => {
  if (exercise.kind !== "code-write") return [];
  const code = normalizeCode(response);
  return exercise.requiredTokens.map((token) => ({
    token,
    met: code.includes(normalizeCode(token)),
  }));
};
