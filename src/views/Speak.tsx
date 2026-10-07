import { useEffect, useState } from "react";
import { SPEECH_TOPICS } from "../curriculum";
import { useSquad } from "../storage";

const TOTAL = 120;

export function Speak() {
  const { addSpeech, setJournal, state } = useSquad();
  const [topic, setTopic] = useState(SPEECH_TOPICS[0]);
  const [running, setRunning] = useState(false);
  const [opened, setOpened] = useState(false);
  const [left, setLeft] = useState(TOTAL);
  const notes = state.journal["speech-notes"] || "";
  const [savedThisRun, setSavedThisRun] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setLeft((current) => {
        if (current <= 1) {
          setRunning(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (left === 0 && opened && !savedThisRun) {
      addSpeech();
      setSavedThisRun(true);
    }
  }, [left, opened, savedThisRun, addSpeech]);

  const minutes = Math.floor(left / 60);
  const seconds = String(left % 60).padStart(2, "0");
  let cue = "Say the line, then start.";
  if (opened && !running && left === TOTAL) cue = "You said it. Start when you are ready.";
  else if (!running && opened && left > 0 && left < TOTAL) cue = "Paused. Resume when you are ready.";
  else if (running && left > 60) cue = "You are on the floor.";
  else if (running && left <= 60 && left > 30) cue = "Hand up. One minute. You may stop, or you may continue.";
  else if (running && left <= 30 && left > 0) cue = "Hand up again. Thirty seconds left.";
  else if (left === 0) cue = "Time. If you went over, do it once more until it fits.";

  return (
    <div className="stack">
      <p className="kicker">Comprehension floor</p>
      <h1>Two minutes.</h1>
      <p>
        Stand up if you can. The timekeeper’s hand goes up at one minute, again at thirty seconds,
        and once more at the end. Peers give useful feedback, never shame. These are the GST topics
        from the book.
      </p>
      <figure className="figure narrow">
        <img
          src="/art/podium.png"
          alt="A student stands at a podium that says It’s All Business. The board behind him is marked GST and lists the eight parts of speech."
        />
      </figure>
      <figure className="figure narrow">
        <img
          src="/art/topics.png"
          alt="GST topic list: negative self-talk, negative media, overcoming negative thinking, high stress, negative emotions, misery, depression, negative people, and rumors and gossip."
        />
      </figure>
      <label>
        Topic
        <select value={topic} onChange={(event) => setTopic(event.target.value)}>
          {SPEECH_TOPICS.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <section className="panel">
        <p className="timer" aria-live="polite">{minutes}:{seconds}</p>
        <p className="cue">{cue}</p>
        <div className="actions" style={{ justifyContent: "center" }}>
          {!opened ? (
            <button className="btn" type="button" onClick={() => setOpened(true)}>
              It’s all business
            </button>
          ) : (
            <button className="btn" type="button" onClick={() => setRunning((value) => !value)} disabled={left === 0}>
              {running ? "Pause" : left === TOTAL ? "Start the clock" : "Resume"}
            </button>
          )}
          <button
            className="btn secondary"
            type="button"
            onClick={() => {
              setRunning(false);
              setLeft(TOTAL);
              setOpened(false);
              setSavedThisRun(false);
              setTopic(SPEECH_TOPICS[Math.floor(Math.random() * SPEECH_TOPICS.length)]);
            }}
          >
            New round
          </button>
        </div>
        <p className="muted" style={{ textAlign: "center" }}>Completed rounds on this device: {state.speeches}</p>
      </section>
      <label>
        Notes for next time
        <textarea
          value={notes}
          onChange={(event) => setJournal("speech-notes", event.target.value)}
          placeholder="What was clear. What to tighten."
        />
      </label>
    </div>
  );
}
