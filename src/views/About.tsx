export function About() {
  return (
    <div className="stack">
      <a className="back" href="#/">Home</a>
      <p className="kicker">From the book</p>
      <h1>About the authors</h1>
      <figure className="figure book-stage">
        <img
          src="/book/page-78.jpg"
          alt="About the Authors. Photographs and words of Jesse Calvin Lee and Larry Davis."
        />
      </figure>
      <figure className="figure">
        <img
          src="/art/partners.jpg"
          alt="Two smiling young men in dress clothes, each holding a briefcase marked with a question mark."
        />
      </figure>
      <figure className="figure">
        <img
          src="/art/memory.jpg"
          alt="Insightful. Two students walking through a doorway. In loving memory of Jannie Mae Davis."
        />
      </figure>
    </div>
  );
}
