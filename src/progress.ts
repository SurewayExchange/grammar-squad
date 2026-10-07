import { PARTS, QUIZ, THEMES } from "./curriculum";
import type { SquadState } from "./storage";

export function progressScore(state: SquadState) {
  const lessonPoints = Math.min(state.seenLessons.length, PARTS.length);
  const labelPoints = state.labeled.length > 0 ? 1 : 0;
  const sortPoints = state.sorted ? 1 : 0;
  const quizPoints = state.quizBest >= Math.ceil(QUIZ.length * 0.7) ? 1 : 0;
  const bookPoints = THEMES.some((theme) => (state.journal[theme] || "").trim().length > 0) ? 1 : 0;
  const speechPoints = state.speeches > 0 ? 1 : 0;
  const earned = lessonPoints + labelPoints + sortPoints + quizPoints + bookPoints + speechPoints;
  const total = PARTS.length + 5;
  return { earned, total, percent: Math.round((earned / total) * 100) };
}
