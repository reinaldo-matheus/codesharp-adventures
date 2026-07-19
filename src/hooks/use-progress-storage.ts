// Lightweight per-device progress persistence (no backend/login needed).
// Saves each trail's checkpoint to localStorage so a player resumes where they left off.

export interface StoredProgress {
  currentIndex: number;
  xp: number;
  correctAnswers: number;
  gameComplete: boolean;
  streak: number;
  wrongAnswerIndices: number[];
}

const STORAGE_VERSION = 1;

export const loadProgress = (key: string): StoredProgress | null => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.version !== STORAGE_VERSION || !parsed?.data) return null;
    return parsed.data as StoredProgress;
  } catch {
    return null;
  }
};

export const saveProgress = (key: string, data: StoredProgress) => {
  try {
    localStorage.setItem(key, JSON.stringify({ version: STORAGE_VERSION, data }));
  } catch {
    // localStorage unavailable (private browsing, quota) — progress just won't persist.
  }
};

export const clearProgress = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
};
