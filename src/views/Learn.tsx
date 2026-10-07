import { useState } from "react";
import { PART_BY_ID, PARTS, type PartId } from "../curriculum";
import { speak, useSquad } from "../storage";

export function Learn({ route }: { route: string }) {
  const id = route.split("/")[2] as PartId | undefined;
  if (id && PART_BY_ID[id]) return <Lesson id={id} />;
  return <LessonIndex />;
}

function LessonIndex() {
  const { state } = useSquad();
  return (
    <>
      <p className="kicker">The eight</p>
      <h1>Learn the parts.</h1>
      <p className="lede">
        All language works from these eight. Learn the job of each one, then use it on your own
        life in the workbook.
      </p>
      <figure className="figure">
        <img
          src="/art/in-route.png"
          alt="A student sits by a chart labeled In route and Outside. In route lists the eight parts of speech. Outside lists period, comma, clauses, comparison, complements, contractions, and etc. The code 2-2-3-1 is at the bottom."
        />
      </figure>
      <div className="grid two">
        {PARTS.map((part, index) => (
          <a key={part.id} className="part-card" href={`#/learn/${part.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="swatch" style={{ background: swatch(index) }} />
            <small className="meta">{part.short}</small>
            <h3>{part.name}</h3>
            <p>{part.job}</p>
            {state.seenLessons.includes(part.id) && <p className="done-tag">Marked as learned</p>}
          </a>
        ))}
      </div>
    </>
  );
}

function Lesson({ id }: { id: PartId }) {
  const part = PART_BY_ID[id];
  const { state, toggleLesson, setJournal } = useSquad();
  const [picked, setPicked] = useState<number | null>(null);
  const learned = state.seenLessons.includes(part.id);
  const index = PARTS.findIndex((item) => item.id === part.id);
  const next = PARTS[index + 1];
  const journalId = `tool-${part.id}`;

  return (
    <article className="stack">
      <a className="back" href="#/learn">All eight parts</a>
      <p className="kicker">Part {index + 1} of 8</p>
      <h1>{part.name}</h1>
      <p className="lede">{part.definition}</p>
      <div className="actions">
        <button className="btn secondary" type="button" onClick={() => speak(`${part.name}. ${part.definition} ${part.example}`)}>
          Hear this
        </button>
        <button className="btn ghost" type="button" onClick={() => toggleLesson(part.id)}>
          {learned ? "Learned" : "Mark as learned"}
        </button>
      </div>
      <section className="panel">
        <p className="kicker">Example</p>
        <p className="example">
          {part.example.split(part.highlight).map((chunk, chunkIndex, all) => (
            <span key={`${chunk}-${chunkIndex}`}>
              {chunk}
              {chunkIndex < all.length - 1 && <mark>{part.highlight}</mark>}
            </span>
          ))}
        </p>
        <p>{part.why}</p>
      </section>
      <section className="panel">
        <p className="kicker">Check</p>
        <h2>{part.check.question}</h2>
        {part.check.choices.map((choice, choiceIndex) => {
          const show = picked !== null;
          const correct = choiceIndex === part.check.answer;
          const className = show ? (correct ? "choice good" : picked === choiceIndex ? "choice bad" : "choice") : "choice";
          return (
            <button key={choice} className={className} type="button" onClick={() => setPicked(choiceIndex)}>
              {choice}
            </button>
          );
        })}
        {picked !== null && <p className="note">{part.check.why}</p>}
      </section>
      <section className="panel stack">
        <p className="kicker">Use it</p>
        <h2>Write one honest line.</h2>
        <ul>
          {part.prompts.map((prompt) => (
            <li key={prompt}>{prompt}</li>
          ))}
        </ul>
        <label>
          Your line
          <textarea
            value={state.journal[journalId] || ""}
            onChange={(event) => setJournal(journalId, event.target.value)}
            placeholder="A short answer is enough."
          />
        </label>
      </section>
      <div className="actions">
        {next && <a className="btn" href={`#/learn/${next.id}`}>Next: {next.name}</a>}
        <a className="btn secondary" href="#/practice">Practice the code</a>
      </div>
    </article>
  );
}

function swatch(index: number) {
  const colors = ["#1e4a38", "#8d6b2f", "#8a3b32", "#245c78", "#3f4a34", "#6a4a78", "#8a5a2b", "#1f3d4d"];
  return colors[index % colors.length];
}
