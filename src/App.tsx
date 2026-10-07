import { useEffect, useState } from "react";
import { useSquad } from "./storage";
import { progressScore } from "./progress";
import { About } from "./views/About";
import { Book } from "./views/Book";
import { Glossary } from "./views/Glossary";
import { Home } from "./views/Home";
import { Learn } from "./views/Learn";
import { Practice } from "./views/Practice";
import { Speak } from "./views/Speak";
import { Workbook } from "./views/Workbook";

function useRoute() {
  const [route, setRoute] = useState(() => window.location.hash || "#/");
  useEffect(() => {
    const onChange = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

export function App() {
  const route = useRoute();
  const { state } = useSquad();
  const score = progressScore(state);
  const page = route.replace(/^#\/?/, "").split("/")[0] || "home";

  let view = <Home />;
  if (page === "book") view = <Book route={route} />;
  if (page === "about") view = <About />;
  if (page === "learn") view = <Learn route={route} />;
  if (page === "practice") view = <Practice route={route} />;
  if (page === "workbook") view = <Workbook route={route} />;
  if (page === "speak") view = <Speak />;
  if (page === "glossary") view = <Glossary />;

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#/" aria-label="Grammar Squad Therapeutics, home">
          <span className="seal" aria-hidden="true"><span>2·2</span><span>3·1</span></span>
          <span>
            <strong>Grammar Squad</strong>
            <span>Therapeutics</span>
          </span>
        </a>
        <div className="progress-pill" aria-label={`Progress ${score.percent} percent`}>
          Path <b>{score.percent}%</b>
        </div>
      </header>
      <main>{view}</main>
      <div className="dock">
        <footer className="site-credit">
          <a href="https://www.fakelit.com" target="_blank" rel="noopener noreferrer">
            Powered by Fakelit.com
          </a>
          <span>
            The first website, app, and game development platform all in one. Publish apps to Google Play and the App Store.
          </span>
        </footer>
        <nav className="nav" aria-label="Primary">
          <a href="#/" aria-current={page === "home" ? "page" : undefined}>Home</a>
          <a href="#/book" aria-current={page === "book" ? "page" : undefined}>Book</a>
          <a href="#/learn" aria-current={page === "learn" ? "page" : undefined}>Learn</a>
          <a href="#/practice" aria-current={page === "practice" ? "page" : undefined}>Practice</a>
          <a href="#/workbook" aria-current={page === "workbook" ? "page" : undefined}>Workbook</a>
          <a href="#/speak" aria-current={page === "speak" ? "page" : undefined}>Speak</a>
        </nav>
      </div>
    </div>
  );
}
