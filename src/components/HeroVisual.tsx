import { BrainLogo, useCopy } from "./ui";
export default function HeroVisual() {
  const { copy } = useCopy();
  return (
    <div
      className="hero-visual"
      aria-label={copy(
        "Brain and code illustration with a sample developer journey",
        "رسم توضيحي للعقل والبرمجة ورحلة تعلم مقترحة",
      )}
      role="img"
    >
      <div className="visual-grid" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="visual-star star-one">✦</div>
      <div className="visual-star star-two">+</div>
      <span className="float-tag tag-html">&lt;html&gt;</span>
      <span className="float-tag tag-react">⚛ React</span>
      <div className="brain-sphere">
        <BrainLogo />
      </div>
      <div className="code-window" dir="ltr">
        <div className="window-bar">
          <div>
            <i />
            <i />
            <i />
          </div>
          <span>your-future.js</span>
          <span>⌘</span>
        </div>
        <div className="code-lines">
          <div>
            <em>01</em>
            <span className="syntax-purple">const</span> future = {"{"}
          </div>
          <div>
            <em>02</em> passion:{" "}
            <span className="syntax-green">"building things"</span>,
          </div>
          <div>
            <em>03</em> skills: [<span className="syntax-orange">"code"</span>,{" "}
            <span className="syntax-orange">"create"</span>],
          </div>
          <div>
            <em>04</em> possibilities:{" "}
            <span className="syntax-purple">Infinity</span>
          </div>
          <div>
            <em>05</em>
            {"}"};
          </div>
          <div className="code-comment">
            <em>06</em>// your journey starts here_
          </div>
        </div>
      </div>
      <div className="visual-caption">
        <span className="status-dot" />
        {copy("A new chapter is loading", "فصل جديد في انتظارك")}
        <span>↗</span>
      </div>
    </div>
  );
}
