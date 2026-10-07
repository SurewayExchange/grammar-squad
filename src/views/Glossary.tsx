import { useMemo, useState } from "react";
import { GLOSSARY } from "../curriculum";
import { speak } from "../storage";

export function Glossary() {
  const [query, setQuery] = useState("");
  const items = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return GLOSSARY;
    return GLOSSARY.filter((item) => `${item.term} ${item.meaning}`.toLowerCase().includes(needle));
  }, [query]);

  return (
    <div>
      <a className="back" href="#/">Home</a>
      <h1>Glossary</h1>
      <figure className="figure narrow">
        <img
          src="/art/memory.jpg"
          alt="The word Insightful above two students walking through a doorway. In loving memory of Jannie Mae Davis."
        />
      </figure>
      <label className="search">
        Search
        <input value={query} onChange={(event) => setQuery(event.target.value)} type="text" placeholder="hindsight, chair, trigger" />
      </label>
      <dl className="glossary">
        {items.map((item) => (
          <div key={item.term}>
            <dt>
              {item.term}{" "}
              <button className="btn ghost" type="button" onClick={() => speak(`${item.term}. ${item.meaning}`)}>
                Hear
              </button>
            </dt>
            <dd>{item.meaning}</dd>
          </div>
        ))}
      </dl>
      {items.length === 0 && <p>No matching word. Try chair, insight, or trigger.</p>}
      <p className="footer-note">
        Grammar Squad was written by Jessie Calvin Lee and Larry Davis. This site is an interactive
        workbook for that curriculum. If you are in crisis, call or text 988.
      </p>
    </div>
  );
}
