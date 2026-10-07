import { useEffect, useState } from "react";
import { useSquad } from "./storage";
import { progressScore } from "./progress";
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
  if (page === "learn") view = <Learn route={route} />;
  if (page === "practice") view = <Practice route={route} />;
  if (page === "workbook") view = <Workbook route={route} />;
  if (page === "speak") view = <Speak />;
  if (page === "glossary") view = <Glossary />;

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#/">
          <span className="seal">2·2·3·1</span>
          <span>
            <strong>Grammar Squad</strong>
            <span>Eight parts. One change.</span>
          </span>
        </a>
        <div className="progress-pill" aria-label={`Progress ${score.percent} percent`}>
          Path <b>{score.percent}%</b>
        </div>
      </header>
      <main>{view}</main>
      <nav className="nav" aria-label="Primary">
        <a href="#/" aria-current={page === "home" ? "page" : undefined}>Home</a>
        <a href="#/learn" aria-current={page === "learn" ? "page" : undefined}>Learn</a>
        <a href="#/practice" aria-current={page === "practice" ? "page" : undefined}>Practice</a>
        <a href="#/workbook" aria-current={page === "workbook" ? "page" : undefined}>Workbook</a>
        <a href="#/speak" aria-current={page === "speak" ? "page" : undefined}>Speak</a>
      </nav>
    </div>
  );
}
