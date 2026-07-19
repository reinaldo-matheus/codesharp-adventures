// Per-device progress persistence (localStorage), plus optional cloud sync
// through Supabase for signed-in players. Cloud sync is entirely additive —
// every function here still works with no user/session, so guests keep the
// exact same local-only experience.

import { supabase } from "@/lib/supabaseClient";

export type Trail = "csharp" | "qa";

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

// Row Level Security on game_progress (see supabase/schema.sql) means this
// query can only ever return the signed-in user's own row.
export const fetchCloudProgress = async (trail: Trail, userId: string): Promise<StoredProgress | null> => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("game_progress")
    .select("data")
    .eq("user_id", userId)
    .eq("trail", trail)
    .maybeSingle();

  if (error || !data) return null;
  return data.data as StoredProgress;
};

export const upsertCloudProgress = async (trail: Trail, userId: string, progress: StoredProgress): Promise<void> => {
  if (!supabase) return;
  await supabase.from("game_progress").upsert(
    { user_id: userId, trail, data: progress },
    { onConflict: "user_id,trail" },
  );
};
