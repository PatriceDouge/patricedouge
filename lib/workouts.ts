export type WorkoutCategory = "run" | "lift" | "race";
export type CompletionStatus = "completed" | "partial" | "missed";

export interface Workout {
  date: string;
  category: WorkoutCategory;
  label: string;
  description: string;
}

export interface TrainingWeek {
  label: string;
  start: string;
  end: string;
  miles: string;
  note?: string;
}

export const trainingWeeks: TrainingWeek[] = [
  { label: "Re-entry", start: "2026-02-12", end: "2026-02-15", miles: "19–23" },
  { label: "W1", start: "2026-02-16", end: "2026-02-22", miles: "38–42" },
  { label: "W2", start: "2026-02-23", end: "2026-03-01", miles: "39–44" },
  { label: "W3", start: "2026-03-02", end: "2026-03-08", miles: "30–40", note: "10K Race — Sat 3/7" },
  { label: "W4", start: "2026-03-09", end: "2026-03-15", miles: "35–41", note: "Recover + Rebuild" },
  { label: "W5", start: "2026-03-16", end: "2026-03-22", miles: "30–40", note: "Half Marathon — Sat 3/21" },
  { label: "W6", start: "2026-03-23", end: "2026-03-29", miles: "38–44", note: "Rebuild" },
  { label: "W7", start: "2026-03-30", end: "2026-04-05", miles: "41–47", note: "Build" },
  { label: "W8", start: "2026-04-06", end: "2026-04-12", miles: "39–45", note: "10-Miler Sharpening" },
  { label: "W9", start: "2026-04-13", end: "2026-04-19", miles: "30–40", note: "10-Miler — Sat 4/18" },
];

const data: [string, WorkoutCategory, string, string][] = [
  // Re-entry (Thu Feb 12 – Sun Feb 15)
  ["2026-02-12", "run", "Easy + Strides", "6–7 easy + 6×20s strides"],
  ["2026-02-13", "lift", "Lift C", "Lift C (light)"],
  ["2026-02-14", "run", "Easy Run", "8–10 easy (last 10 min steady optional)"],
  ["2026-02-15", "run", "Easy Run", "5–6 easy"],
  // W1 (Feb 16–22)
  ["2026-02-16", "lift", "Lift A", "Lift A"],
  ["2026-02-17", "run", "Run Q1", "10–12 mi · WU → 5–6×1 mi sub-T / 60–75s jog → CD"],
  ["2026-02-18", "lift", "Lift B", "Lift B"],
  ["2026-02-19", "run", "Run Q2", "9–10 mi · WU → 10×2:00 sub-T / 1:00 easy → CD"],
  ["2026-02-20", "lift", "Lift C", "Lift C"],
  ["2026-02-21", "run", "Long Run", "12–13 easy"],
  ["2026-02-22", "run", "Easy + Strides", "7–8 easy + strides"],
  // W2 (Feb 23 – Mar 1)
  ["2026-02-23", "lift", "Lift A", "Lift A"],
  ["2026-02-24", "run", "Run Q1", "11–12 mi · WU → 3×2 mi sub-T / 2:00 jog → CD"],
  ["2026-02-25", "lift", "Lift B", "Lift B"],
  ["2026-02-26", "run", "Run Q2", "9–10 mi · WU → 4×4:00 strong / 2:00 jog → CD"],
  ["2026-02-27", "lift", "Lift C", "Lift C"],
  ["2026-02-28", "run", "Long Run", "12–14 easy"],
  ["2026-03-01", "run", "Easy + Strides", "7–8 easy + strides"],
  // W3 (Mar 2–8) — 10K race Sat 3/7
  ["2026-03-02", "lift", "Lift A", "Lift A (normal)"],
  ["2026-03-03", "run", "Run Q", "10–11 mi · WU → 4×1 mi sub-T / 75s jog → CD"],
  ["2026-03-04", "lift", "Lift B", "Lift B (moderate)"],
  ["2026-03-05", "run", "Easy + Strides", "6–8 easy + 4–6 strides (light)"],
  ["2026-03-06", "lift", "Lift C", "Lift C (light or skip legs)"],
  ["2026-03-07", "race", "RACE: 10K", "10K Race"],
  ["2026-03-08", "run", "Recovery", "3–5 very easy or off"],
  // W4 (Mar 9–15) — recover + rebuild
  ["2026-03-09", "lift", "Lift A", "Lift A (light/mod)"],
  ["2026-03-10", "run", "Easy + Strides", "7–9 easy + strides"],
  ["2026-03-11", "lift", "Lift B", "Lift B"],
  ["2026-03-12", "run", "Run Q2", "9–10 mi · WU → 5–6×1 mi sub-T / 60–75s jog → CD"],
  ["2026-03-13", "lift", "Lift C", "Lift C"],
  ["2026-03-14", "run", "Long Run", "12–14 easy"],
  ["2026-03-15", "run", "Easy Run", "7–8 easy"],
  // W5 (Mar 16–22) — Half Marathon race Sat 3/21
  ["2026-03-16", "lift", "Lift A", "Lift A (normal)"],
  ["2026-03-17", "run", "Run Q", "10–11 mi · WU → 3×2 mi sub-T / 2:00 jog → CD"],
  ["2026-03-18", "lift", "Lift B", "Lift B (moderate)"],
  ["2026-03-19", "run", "Easy + Strides", "6–8 easy + 4–6 strides (light)"],
  ["2026-03-20", "lift", "Lift C", "Lift C (light or skip legs)"],
  ["2026-03-21", "race", "RACE: Half", "Half Marathon"],
  ["2026-03-22", "run", "Recovery", "3–5 very easy or off"],
  // W6 (Mar 23–29) — rebuild
  ["2026-03-23", "lift", "Lift A", "Lift A (light/mod)"],
  ["2026-03-24", "run", "Run Q1", "10–12 mi · WU → 5–6×1 mi sub-T / 60–75s jog → CD"],
  ["2026-03-25", "lift", "Lift B", "Lift B"],
  ["2026-03-26", "run", "Run Q2", "9–10 mi · WU → 4×4:00 strong / 2:00 jog → CD"],
  ["2026-03-27", "lift", "Lift C", "Lift C"],
  ["2026-03-28", "run", "Long Run", "12–14 easy"],
  ["2026-03-29", "run", "Easy + Strides", "7–8 easy + strides"],
  // W7 (Mar 30 – Apr 5) — build
  ["2026-03-30", "lift", "Lift A", "Lift A"],
  ["2026-03-31", "run", "Run Q1", "11–12 mi · WU → 4×2 mi sub-T / 2:00 jog → CD"],
  ["2026-04-01", "lift", "Lift B", "Lift B"],
  ["2026-04-02", "run", "Run Q2", "9–10 mi · WU → 6×1 mi sub-T / 60–75s jog → CD"],
  ["2026-04-03", "lift", "Lift C", "Lift C"],
  ["2026-04-04", "run", "Long Run", "14–16 easy (last 2–3 mi steady optional)"],
  ["2026-04-05", "run", "Easy + Strides", "7–9 easy + strides"],
  // W8 (Apr 6–12) — 10-miler sharpening
  ["2026-04-06", "lift", "Lift A", "Lift A"],
  ["2026-04-07", "run", "Run Q1", "11–12 mi · WU → 3×2 mi sub-T + 2×1 mi sub-T / short jog → CD"],
  ["2026-04-08", "lift", "Lift B", "Lift B"],
  ["2026-04-09", "run", "Run Q2", "9–10 mi · WU → 6×4:00 strong / 2:00 jog → CD"],
  ["2026-04-10", "lift", "Lift C", "Lift C"],
  ["2026-04-11", "run", "Long Run", "12–14 easy"],
  ["2026-04-12", "run", "Easy + Strides", "7–9 easy + strides"],
  // W9 (Apr 13–19) — 10-Miler race Sat 4/18
  ["2026-04-13", "lift", "Lift A", "Lift A (normal)"],
  ["2026-04-14", "run", "Run Q", "10–11 mi · WU → 3×2 mi sub-T / 2:00 jog → CD"],
  ["2026-04-15", "lift", "Lift B", "Lift B (moderate)"],
  ["2026-04-16", "run", "Easy + Strides", "6–8 easy + 4–6 strides (light)"],
  ["2026-04-17", "lift", "Lift C", "Lift C (light or skip legs)"],
  ["2026-04-18", "race", "RACE: 10-Mi", "10-Miler Race"],
  ["2026-04-19", "run", "Recovery", "3–5 very easy or off"],
];

const workoutMap = new Map<string, Workout>();
for (const [date, category, label, description] of data) {
  workoutMap.set(date, { date, category, label, description });
}

export function getWorkout(dateStr: string): Workout | undefined {
  return workoutMap.get(dateStr);
}

export function getTrainingWeek(dateStr: string): TrainingWeek | undefined {
  return trainingWeeks.find((w) => dateStr >= w.start && dateStr <= w.end);
}

export function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
