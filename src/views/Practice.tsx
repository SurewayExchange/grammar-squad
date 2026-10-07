import { useMemo, useState } from "react";
import { CODE_GROUPS, PARTS, PART_BY_ID, QUIZ, SENTENCES, type PartId } from "../curriculum";
import { useSquad } from "../storage";

export function Practice({ route }: { route: string }) {
  const section = route.split("/")[2] || "home";
  if (section === "sort") return <SortGame />;
  if (section === "label") return <LabelGame />;
  if (section === "quiz") return <Quiz />;
  return <PracticeHome />;
}

function PracticeHome() {
  const { state } = useSquad();
  return (
    <>
      <p className="kicker">Practice</p>
      <h1>Make the eight stick.</h1>
      <p className="lede">Three drills. Short. You can repeat them until the code is yours.</p>
      <div className="grid three">
        <a className="card-link" href="#/practice/sort">
          <small>{state.sorted ? "Cleared" : "Drill"}</small>
          <h3>Sort 2-2-3-1</h3>
          <p>Place each part in its group: naming, modifying, PIC, or the lone star.</p>
        </a>
        <a className="card-link" href="#/practice/label">
          <small>{state.labeled.length}/{SENTENCES.length} sentences</small>
          <h3>Label a sentence</h3>
          <p>Tap each word and name its part of speech.</p>
        </a>
        <a className="card-link" href="#/practice/quiz">
          <small>Best {state.quizBest}/{QUIZ.length}</small>
          <h3>Squad quiz</h3>
          <p>Eight questions on the method, not just the definitions.</p>
        </a>
      </div>
    </>
  );
}

function SortGame() {
  const { setSorted } = useSquad();
  const [placed, setPlaced] = useState<Partial<Record<PartId, string>>>({});
  const [selected, setSelected] = useState<PartId | null>(PARTS[0].id);
  const [checked, setChecked] = useState(false);

  const remaining = PARTS.filter((part) => !placed[part.id]);
  const correct = PARTS.every((part) => placed[part.id] === part.group);

  function place(groupId: string) {
    if (!selected) return;
    setPlaced((current) => ({ ...current, [selected]: groupId }));
    setChecked(false);
    const next = remaining.find((part) => part.id !== selected);
    setSelected(next?.id ?? null);
  }

  return (
    <div className="stack">
      <a className="back" href="#/practice">All practice</a>
      <h1>Sort the code.</h1>
      <p>Tap a part, then tap the group it belongs in.</p>
      <div className="row" aria-label="Parts still to sort">
        {remaining.map((part) => (
          <button
            key={part.id}
            type="button"
            className={selected === part.id ? "chip picked" : "chip"}
            onClick={() => setSelected(part.id)}
          >
            {part.name}
          </button>
        ))}
        {remaining.length === 0 && <span className="muted">Every part is placed.</span>}
      </div>
      <div className="buckets">
        {CODE_GROUPS.map((group) => (
          <button key={group.id} type="button" className="bucket" onClick={() => place(group.id)}>
            <h3>{group.code} · {group.title}</h3>
            <p className="muted">{group.hint}</p>
            <div className="row">
              {PARTS.filter((part) => placed[part.id] === group.id).map((part) => (
                <span key={part.id} className="chip">{part.name}</span>
              ))}
            </div>
          </button>
        ))}
      </div>
      <div className="actions">
        <button
          className="btn"
          type="button"
          onClick={() => {
            setChecked(true);
            if (correct) setSorted(true);
          }}
        >
          Check the sort
        </button>
        <button
          className="btn secondary"
          type="button"
          onClick={() => {
            setPlaced({});
            setChecked(false);
            setSelected(PARTS[0].id);
          }}
        >
          Reset
        </button>
      </div>
      {checked && (
        <p className="note">
          {correct
            ? "That’s the code. Two naming, two modifying, three PIC, one verb."
            : "Not yet. Noun and pronoun name. Adjective and adverb modify. Preposition, interjection, and conjunction are PIC. The verb stands alone."}
        </p>
      )}
    </div>
  );
}

function LabelGame() {
  const { markLabeled, state } = useSquad();
  const [index, setIndex] = useState(0);
  const sentence = SENTENCES[index];
  const [answers, setAnswers] = useState<Record<number, PartId>>({});
  const [active, setActive] = useState(0);
  const [checked, setChecked] = useState(false);

  const score = useMemo(
    () => sentence.tokens.filter((token, tokenIndex) => answers[tokenIndex] === token.part).length,
    [answers, sentence],
  );

  function choose(part: PartId) {
    setAnswers((current) => ({ ...current, [active]: part }));
    setChecked(false);
    setActive((current) => Math.min(current + 1, sentence.tokens.length - 1));
  }

  function check() {
    setChecked(true);
    if (score === sentence.tokens.length) markLabeled(sentence.id);
  }

  function go(nextIndex: number) {
    setIndex(nextIndex);
    setAnswers({});
    setActive(0);
    setChecked(false);
  }

  return (
    <div className="stack">
      <a className="back" href="#/practice">All practice</a>
      <h1>Label the sentence.</h1>
      <p className="muted">
        Sentence {index + 1} of {SENTENCES.length}
        {state.labeled.includes(sentence.id) ? " · cleared" : ""}
      </p>
      <div className="tokens">
        {sentence.tokens.map((token, tokenIndex) => {
          const picked = answers[tokenIndex];
          let className = "chip";
          if (tokenIndex === active) className += " picked";
          if (checked && picked) className += picked === token.part ? " good" : " bad";
          return (
            <button key={`${token.text}-${tokenIndex}`} type="button" className={className} onClick={() => setActive(tokenIndex)}>
              {token.text}
              {picked ? ` · ${PART_BY_ID[picked].name}` : ""}
            </button>
          );
        })}
      </div>
      <div className="row">
        {PARTS.map((part) => (
          <button key={part.id} className="chip" type="button" onClick={() => choose(part.id)}>
            {part.name}
          </button>
        ))}
      </div>
      <div className="actions">
        <button className="btn" type="button" onClick={check}>Check</button>
        <button className="btn secondary" type="button" disabled={index === 0} onClick={() => go(index - 1)}>Previous</button>
        <button className="btn secondary" type="button" disabled={index === SENTENCES.length - 1} onClick={() => go(index + 1)}>Next</button>
      </div>
      {checked && (
        <p className="note">
          {score} of {sentence.tokens.length} correct. {sentence.teach}
        </p>
      )}
    </div>
  );
}

function Quiz() {
  const { setQuizBest, state } = useSquad();
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const item = QUIZ[step];

  function choose(choice: number) {
    if (picked !== null) return;
    setPicked(choice);
    if (choice === item.answer) setCorrectCount((count) => count + 1);
  }

  function next() {
    if (step === QUIZ.length - 1) {
      const score = correctCount;
      setQuizBest(score);
      setFinished(true);
      return;
    }
    setStep((current) => current + 1);
    setPicked(null);
  }

  if (finished) {
    return (
      <div className="stack">
        <h1>Quiz complete.</h1>
        <p className="lede">You scored {correctCount} out of {QUIZ.length}. Best saved: {Math.max(state.quizBest, correctCount)}.</p>
        <button
          className="btn"
          type="button"
          onClick={() => {
            setStep(0);
            setPicked(null);
            setCorrectCount(0);
            setFinished(false);
          }}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="stack">
      <a className="back" href="#/practice">All practice</a>
      <p className="kicker">Question {step + 1} of {QUIZ.length}</p>
      <h1>{item.question}</h1>
      {item.choices.map((choice, index) => {
        let className = "choice";
        if (picked !== null && index === item.answer) className = "choice good";
        else if (picked === index) className = "choice bad";
        return (
          <button key={choice} className={className} type="button" onClick={() => choose(index)}>
            {choice}
          </button>
        );
      })}
      {picked !== null && (
        <>
          <p className="note">{item.why}</p>
          <button className="btn" type="button" onClick={next}>
            {step === QUIZ.length - 1 ? "See score" : "Next question"}
          </button>
        </>
      )}
    </div>
  );
}
