import { PARTS } from "../curriculum";
import { progressScore } from "../progress";
import { useSquad } from "../storage";

export function Home() {
  const { state } = useSquad();
  const score = progressScore(state);

  return (
    <>
      <section className="hero">
        <figure className="figure cover-frame">
          <img
            src="/art/cover.jpg"
            alt="Cover of Grammar Squad Therapeutics. Students with backpacks walk toward a school at sunrise. Written by Jessie Calvin Lee and Larry Davis."
          />
        </figure>
        <div className="stack">
          <div className="panel">
            <p className="kicker">Jessie Calvin Lee & Larry Davis</p>
            <h1>Change your thinking and your behavior.</h1>
            <p className="lede">
              Grammar Squad Therapeutics is a self-help path built on the eight parts of speech.
              You learn to name a thing, replace it, modify it, and then do the next right action.
            </p>
            <p className="byline">Knowledge can replace “I can’t” with “I can.”</p>
            <div className="actions">
              <a className="btn" href="#/book">Open the book</a>
              <a className="btn secondary" href="#/learn">Start with the eight</a>
            </div>
          </div>
          <aside className="ritual">
            <p className="kicker" style={{ color: "#e7d7a8" }}>Before you speak</p>
            <p className="line">It’s all business.</p>
            <p>
              Say it so the room knows you are here to be real. No shame games. No put-downs.
              Do the assignment.
            </p>
            <p>Your path is {score.percent}% walked. Writing stays on this device.</p>
          </aside>
        </div>
      </section>

      <section className="section">
        <h2>From the book</h2>
        <div className="grid three art-grid">
          <a className="card-link art-card" href="#/practice/sort">
            <img src="/art/code-chart.png" alt="A teacher points to the 2-2-3-1 chart: noun, pronoun, adjective, adverb, PIC, and verb." />
            <h3>2-2-3-1</h3>
          </a>
          <a className="card-link art-card" href="#/speak">
            <img src="/art/podium.png" alt="A student at a podium that reads It’s All Business, beside a GST list of the eight parts of speech." />
            <h3>It’s all business</h3>
          </a>
          <a className="card-link art-card" href="#/workbook/briefcase">
            <img src="/art/briefcase.png" alt="An open briefcase holding a page of words: kindness, understanding, forgiveness, patient, empathy, remorseful, insightful, truthful, compassionate, honest." />
            <h3>The briefcase</h3>
          </a>
        </div>
      </section>

      <section className="section">
        <h2>Four rooms</h2>
        <div className="grid four">
          <a className="card-link" href="#/learn">
            <small>01</small>
            <h3>Learn</h3>
            <p>Each part of speech, said plainly, with a check you can answer.</p>
          </a>
          <a className="card-link" href="#/practice">
            <small>02</small>
            <h3>Practice</h3>
            <p>Sort the code 2-2-3-1, label real sentences, and take the quiz.</p>
          </a>
          <a className="card-link" href="#/workbook">
            <small>03</small>
            <h3>Workbook</h3>
            <p>Hindsight, insight, the briefcase, and the chair. Private to you.</p>
          </a>
          <a className="card-link" href="#/speak">
            <small>04</small>
            <h3>Speak</h3>
            <p>A two-minute floor with a hand at one minute and at thirty seconds.</p>
          </a>
        </div>
      </section>

      <section className="section grid two">
        <article className="panel">
          <p className="kicker">The mission</p>
          <h2>A safe room to learn.</h2>
          <p>
            The squad exists for people who struggle to speak, read, write, share, and understand.
            That includes people in recovery and people coming back to the community. Learning to
            read, write, and comprehend changes thinking. Changed thinking changes behavior.
          </p>
          <p>
            A complete sentence here has three working pieces: a noun, a verb, and a predicate.
            The noun is the subject. The verb is the action. The predicate tells what the subject
            is doing.
          </p>
        </article>
        <article className="panel">
          <p className="kicker">Memory code</p>
          <h2>2-2-3-1</h2>
          <div className="code">
            <article><strong>2</strong> Noun, pronoun</article>
            <article><strong>2</strong> Adjective, adverb</article>
            <article><strong>3</strong> PIC: preposition, interjection, conjunction</article>
            <article><strong>1</strong> Verb, the lone star</article>
          </div>
          <p>Stay inside the eight parts and your sentence can be understood.</p>
          <a className="btn ghost" href="#/glossary">Open the glossary</a>
          <a className="btn ghost" href="#/about">Meet the authors</a>
        </article>
      </section>

      <section className="section panel">
        <h2>How a part of speech becomes a tool</h2>
        <div className="grid four">
          {PARTS.map((part) => (
            <a key={part.id} className="card-link" href={`#/learn/${part.id}`}>
              <small>{part.short}</small>
              <h3>{part.name}</h3>
              <p>{part.job}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
