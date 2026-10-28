import { Reveal, SectionTitle, useCopy } from "../ui";

export default function ProjectShowcase() {
  const { copy, local } = useCopy();
  return (
    <section className="section container">
      <SectionTitle
        eyebrow={copy("MADE POSSIBLE WITH CODE", "أفكار تتحول لكود")}
        title={copy("Imagine what you could build.", "تخيل اللي ممكن تبنيه.")}
        description={copy(
          "Sample project ideas to turn your learning into something tangible.",
          "أفكار مشاريع توضيحية لتحويل التعلم لنتائج ملموسة.",
        )}
      />
      <div className="projects-grid">
        {[
          {
            en: "A portfolio that’s all you.",
            ar: "معرض أعمال يشبهك.",
            tech: "HTML",
            type: "portfolio",
          },
          {
            en: "A page that makes an impression.",
            ar: "صفحة تسيب انطباع.",
            tech: "CSS",
            type: "landing",
          },
          {
            en: "A little less chaos. A lot more done.",
            ar: "تنظيم أكثر. إنجاز أكبر.",
            tech: "JavaScript",
            type: "tasks",
          },
          {
            en: "Your spending, made clearer.",
            ar: "مصروفاتك بشكل أوضح.",
            tech: "React",
            type: "expenses",
          },
        ].map((p, i) => (
          <Reveal className="project-card" key={p.type}>
            <div className={`project-preview preview-${p.type}`} dir="ltr">
              <div className="mini-browser">
                <div className="mini-toolbar">
                  <i />
                  <i />
                  <i />
                  <span>your-next-project.app</span>
                </div>
                {i === 0 ? (
                  <div className="mock-portfolio">
                    <span>your.portfolio ↗</span>
                    <h4>
                      Creative mind.
                      <br />
                      Developer in the making<span>.</span>
                    </h4>
                    <div className="mock-chips">
                      <i />
                      <i />
                      <i />
                    </div>
                    <span>Selected work ↓</span>
                  </div>
                ) : i === 1 ? (
                  <div className="mock-landing">
                    <span>
                      form<span> & function</span>
                    </span>
                    <h4>
                      Good things.
                      <br />
                      Thoughtfully made.
                    </h4>
                    <div className="mock-product" />
                    <span className="mock-button">
                      Explore the collection ↗
                    </span>
                  </div>
                ) : i === 2 ? (
                  <div className="mock-tasks">
                    <h4>
                      Make room for focus<span>✧</span>
                    </h4>
                    <p>Today, one thing at a time.</p>
                    {[
                      "Design something new",
                      "Write a little code",
                      "Make it your own",
                    ].map((s, j) => (
                      <div key={s}>
                        <span className={j === 0 ? "checked" : ""}>
                          {j === 0 ? "✓" : ""}
                        </span>
                        {s}
                        <small>↗</small>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mock-expenses">
                    <span>
                      Overview <small>This month⌄</small>
                    </span>
                    <h4>
                      EGP 2,450<span>↗</span>
                    </h4>
                    <p>Your spending at a glance</p>
                    <div className="mock-chart">
                      {[30, 65, 42, 80, 50, 90, 64, 75, 48, 60].map((v, k) => (
                        <i key={k} style={{ height: `${v}%` }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <span className="sample-badge">
                {copy("SAMPLE PROJECT IDEA", "فكرة مشروع توضيحية")}
              </span>
            </div>
            <div className="project-info">
              <span>{p.tech}</span>
              <h3>{local(p)}</h3>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
