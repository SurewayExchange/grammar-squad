import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type SquadState = {
  seenLessons: string[];
  journal: Record<string, string>;
  feelings: Record<string, string[]>;
  tools: string[];
  faced: string[];
  chairStatement: string;
  chairMarks: string[];
  speeches: number;
  quizBest: number;
  sorted: boolean;
  labeled: string[];
};

const KEY = "grammar-squad-progress-v1";

const EMPTY: SquadState = {
  seenLessons: [],
  journal: {},
  feelings: {},
  tools: [],
  faced: [],
  chairStatement: "",
  chairMarks: [],
  speeches: 0,
  quizBest: 0,
  sorted: false,
  labeled: [],
};

function load(): SquadState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...JSON.parse(raw) };
  } catch {
    return EMPTY;
  }
}

type SquadApi = {
  state: SquadState;
  toggleLesson: (id: string) => void;
  setJournal: (id: string, value: string) => void;
  setFeelings: (theme: string, words: string[]) => void;
  toggleTool: (tool: string) => void;
  toggleFaced: (word: string) => void;
  setChairStatement: (value: string) => void;
  toggleChairMark: (mark: string) => void;
  addSpeech: () => void;
  setQuizBest: (score: number) => void;
  setSorted: (done: boolean) => void;
  markLabeled: (id: string) => void;
  reset: () => void;
};

const SquadContext = createContext<SquadApi | null>(null);

export function SquadProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SquadState>(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  const api = useMemo<SquadApi>(
    () => ({
      state,
      toggleLesson: (id) =>
        setState((current) => ({
          ...current,
          seenLessons: current.seenLessons.includes(id)
            ? current.seenLessons.filter((item) => item !== id)
            : [...current.seenLessons, id],
        })),
      setJournal: (id, value) =>
        setState((current) => ({ ...current, journal: { ...current.journal, [id]: value } })),
      setFeelings: (theme, words) =>
        setState((current) => ({ ...current, feelings: { ...current.feelings, [theme]: words } })),
      toggleTool: (tool) =>
        setState((current) => ({
          ...current,
          tools: current.tools.includes(tool)
            ? current.tools.filter((item) => item !== tool)
            : [...current.tools, tool],
        })),
      toggleFaced: (word) =>
        setState((current) => ({
          ...current,
          faced: current.faced.includes(word)
            ? current.faced.filter((item) => item !== word)
            : [...current.faced, word],
        })),
      setChairStatement: (value) => setState((current) => ({ ...current, chairStatement: value })),
      toggleChairMark: (mark) =>
        setState((current) => ({
          ...current,
          chairMarks: current.chairMarks.includes(mark)
            ? current.chairMarks.filter((item) => item !== mark)
            : [...current.chairMarks, mark],
        })),
      addSpeech: () => setState((current) => ({ ...current, speeches: current.speeches + 1 })),
      setQuizBest: (score) =>
        setState((current) => ({ ...current, quizBest: Math.max(current.quizBest, score) })),
      setSorted: (done) => setState((current) => ({ ...current, sorted: done })),
      markLabeled: (id) =>
        setState((current) => ({
          ...current,
          labeled: current.labeled.includes(id) ? current.labeled : [...current.labeled, id],
        })),
      reset: () => setState(EMPTY),
    }),
    [state],
  );

  return <SquadContext.Provider value={api}>{children}</SquadContext.Provider>;
}

export function useSquad() {
  const value = useContext(SquadContext);
  if (!value) throw new Error("useSquad must be used inside SquadProvider");
  return value;
}

export function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.92;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}
