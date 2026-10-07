import { useState } from "react";
import { CHAIR_MARKS, COPING_TOOLS, PARTS, THEMES } from "../curriculum";
import { useSquad } from "../storage";

export function Workbook({ route }: { route: string }) {
  const section = route.split("/")[2] || "home";
  if (section === "theme") return <ThemePage theme={decodeURIComponent(route.split("/")[3] || "")} />;
  if (section === "briefcase") return <Briefcase />;
  if (section === "chair") return <Chair />;
  return <WorkbookHome />;
}

function WorkbookHome() {
  const { state, reset } = useSquad();
  const [confirmReset, setConfirmReset] = useState(false);
  return (
    <div className="stack">
      <p className="kicker">Private workbook</p>
      <h1>Hindsight, then insight.</h1>
      <p className="lede">
        Hindsight is what you can see about the past now. Insight is what that past still does
        inside you. Write a few sentences. Then name three feelings. Those feelings go in the briefcase.
      </p>
      <figure className="figure">
        <img
          src="/art/insight.jpg"
          alt="Two young people keeping their heads above the water, looking straight ahead."
        />
      </figure>
      <figure className="figure">
        <img
          src="/art/path.jpg"
          alt="A person stands on a wooden dock between cliffs of hanging houses, facing a bright opening across the water."
        />
      </figure>
      <p className="warn">
        This writing stays in this browser. Skip any prompt. If you feel unsafe with yourself,
        call or text 988 in the United States.
      </p>
      <div className="grid two">
        {THEMES.map((theme) => {
          const started = Boolean((state.journal[theme] || "").trim() || (state.feelings[theme] || []).some(Boolean));
          return (
            <a key={theme} className="card-link" href={`#/workbook/theme/${encodeURIComponent(theme)}`}>
              <small>{started ? "Started" : "Open"}</small>
              <h3>{theme}</h3>
              <p>Use the eight parts. Then name three feelings.</p>
            </a>
          );
        })}
      </div>
      <div className="actions">
        <a className="btn" href="#/workbook/briefcase">Open the briefcase</a>
        <a className="btn secondary" href="#/workbook/chair">Sit in the chair</a>
      </div>
      <div>
        {!confirmReset ? (
          <button className="btn ghost" type="button" onClick={() => setConfirmReset(true)}>
            Erase saved writing
          </button>
        ) : (
          <div className="row">
            <button className="btn" type="button" onClick={() => { reset(); setConfirmReset(false); }}>
              Yes, erase it
            </button>
            <button className="btn secondary" type="button" onClick={() => setConfirmReset(false)}>
              Keep it
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ThemePage({ theme }: { theme: string }) {
  const { state, setJournal, setFeelings } = useSquad();
  if (!THEMES.includes(theme)) {
    return (
      <div>
        <a className="back" href="#/workbook">Back to the workbook</a>
        <h1>That page is not in the book.</h1>
      </div>
    );
  }
  const feelings = state.feelings[theme] || ["", "", ""];
  return (
    <div className="stack">
      <a className="back" href="#/workbook">All themes</a>
      <p className="kicker">Hindsight</p>
      <h1>{theme}</h1>
      <figure className="figure">
        <img
          src="/art/path.jpg"
          alt="A person stands on a wooden dock, looking across the water toward a bright opening between hanging houses."
        />
      </figure>
      <p>
        Using the eight parts of speech, describe a time you experienced this as a child, as far
        back as you can remember. A noun, a verb, and a predicate are enough to begin.
      </p>
      <div className="row">
        {PARTS.map((part) => (
          <span key={part.id} className="chip">{part.name}</span>
        ))}
      </div>
      <label>
        Your sentences
        <textarea
          value={state.journal[theme] || ""}
          onChange={(event) => setJournal(theme, event.target.value)}
        />
      </label>
      <section className="panel stack">
        <p className="kicker">Insight</p>
        <h2>{theme} caused me to feel</h2>
        {[0, 1, 2].map((slot) => (
          <label key={slot}>
            Feeling {slot + 1}
            <input
              type="text"
              value={feelings[slot] || ""}
              onChange={(event) => {
                const next = [...feelings];
                next[slot] = event.target.value;
                setFeelings(theme, next);
              }}
            />
          </label>
        ))}
        <p className="muted">
          These feelings are your insight and your causative factors. They collect in the briefcase.
        </p>
      </section>
      <a className="btn" href="#/workbook/briefcase">Put them in the briefcase</a>
    </div>
  );
}

function Briefcase() {
  const { state, toggleFaced, toggleTool } = useSquad();
  const words = Object.entries(state.feelings).flatMap(([theme, list]) =>
    list.filter(Boolean).map((word) => ({ theme, word: `${theme}: ${word}` })),
  );
  return (
    <div className="stack">
      <a className="back" href="#/workbook">Workbook</a>
      <p className="kicker">What you carry</p>
      <h1>The briefcase.</h1>
      <figure className="figure narrow">
        <img
          src="/art/briefcase.png"
          alt="An open briefcase. Inside is a page that reads kindness, understanding, forgiveness, patient, empathy, remorseful, insightful, truthful, compassionate, honest."
        />
      </figure>
      <p>
        You choose what stays in the case. When you answer a present moment with an old hurt, you
        have left the present and opened the case. Face a feeling to lighten it. Pack a tool you
        can actually use.
      </p>
      {words.length === 0 ? (
        <p className="note">No feelings saved yet. Write three under any theme and they will show up here.</p>
      ) : (
        <div className="row">
          {words.map((item) => (
            <button
              key={item.word}
              type="button"
              className={state.faced.includes(item.word) ? "chip good" : "chip"}
              onClick={() => toggleFaced(item.word)}
            >
              {state.faced.includes(item.word) ? "Faced · " : ""}{item.word}
            </button>
          ))}
        </div>
      )}
      <section className="panel">
        <h2>Pack the new case</h2>
        <p>Tap the tools you will carry instead.</p>
        <div className="row">
          {COPING_TOOLS.map((tool) => (
            <button
              key={tool}
              type="button"
              className={state.tools.includes(tool) ? "tool on" : "tool"}
              onClick={() => toggleTool(tool)}
            >
              {tool}
            </button>
          ))}
        </div>
      </section>
      <a className="btn" href="#/workbook/chair">When you are ready, the chair</a>
    </div>
  );
}

function Chair() {
  const { state, setChairStatement, toggleChairMark } = useSquad();
  return (
    <div className="stack">
      <a className="back" href="#/workbook">Workbook</a>
      <p className="kicker">Change</p>
      <h1>The Chair.</h1>
      <figure className="figure narrow">
        <img
          src="/art/looking-ahead.jpg"
          alt="A student with a backpack looks up toward the light, standing in front of a bulletin board."
        />
      </figure>
      <p>
        The chair means you can tell the truth about the harm you caused. Thought, then feeling,
        then behavior. A caused B, and B caused C. You do not have to wait for a perfect workbook
        to start this sentence.
      </p>
      <div className="stack">
        {CHAIR_MARKS.map((mark) => (
          <button
            key={mark}
            type="button"
            className={state.chairMarks.includes(mark) ? "choice picked" : "choice"}
            onClick={() => toggleChairMark(mark)}
          >
            {mark}
          </button>
        ))}
      </div>
      <label>
        The responsibility I take
        <textarea
          value={state.chairStatement}
          onChange={(event) => setChairStatement(event.target.value)}
          placeholder="I take responsibility for…"
        />
      </label>
      <p className="note">
        Foresight is the plan you make because you can see your triggers. Oversight is the impulse
        you are trying not to repeat.
      </p>
    </div>
  );
}
