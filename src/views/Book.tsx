import { useEffect, useState } from "react";
import { BOOK_PAGES } from "../curriculum";

function pageFromRoute(route: string) {
  const raw = Number(route.split("/")[2]);
  if (!Number.isFinite(raw) || raw < 1) return 1;
  return Math.min(BOOK_PAGES, Math.floor(raw));
}

export function Book({ route }: { route: string }) {
  const [page, setPage] = useState(() => pageFromRoute(route));

  useEffect(() => {
    setPage(pageFromRoute(route));
  }, [route]);

  function go(next: number) {
    const clamped = Math.min(BOOK_PAGES, Math.max(1, next));
    setPage(clamped);
    const hash = `#/book/${clamped}`;
    if (window.location.hash !== hash) window.location.hash = hash;
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key === "ArrowRight") go(page + 1);
      if (event.key === "ArrowLeft") go(page - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page]);

  const src = `/book/page-${String(page).padStart(2, "0")}.jpg`;

  return (
    <div className="stack">
      <p className="kicker">The paperback</p>
      <h1>Every page.</h1>
      <p>The pictures and pages from the book, in order. Use the arrows on your keyboard, or the buttons.</p>
      <div className="book-stage">
        <img src={src} alt={`Grammar Squad page ${page} of ${BOOK_PAGES}`} />
      </div>
      <div className="actions" style={{ justifyContent: "center" }}>
        <button className="btn secondary" type="button" onClick={() => go(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <label className="page-jump">
          Page
          <input
            type="number"
            min={1}
            max={BOOK_PAGES}
            value={page}
            onChange={(event) => go(Number(event.target.value) || 1)}
          />
          <span>of {BOOK_PAGES}</span>
        </label>
        <button className="btn" type="button" onClick={() => go(page + 1)} disabled={page === BOOK_PAGES}>
          Next
        </button>
      </div>
    </div>
  );
}
