import ProjectShowcase from "../components/sections/ProjectShowcase";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Radio,
  Code2,
  Sparkles,
  Route,
  Check,
  MessageCircle,
  Terminal,
  Layers,
  Quote,
  MousePointer2,
} from "lucide-react";
import {
  Accordion,
  ButtonLink,
  CourseCard,
  Reveal,
  SectionTitle,
  useCopy,
} from "../components/ui";
import HeroVisual from "../components/HeroVisual";
import SEO from "../components/SEO";
import { courses, tracks } from "../data/courses";
import { faq } from "../data/faq";
import { testimonials } from "../data/testimonials";
export default function Home() {
  const { copy, t, local } = useCopy();
  const benefits = [
    {
      icon: Radio,
      en: "Live. Interactive. Human.",
      ar: "مباشر. تفاعلي. معك.",
      de: "Ask questions, get feedback, and learn with an instructor in real time.",
      da: "اسأل واحصل على ملاحظات وتعلم مع المدرب لحظة بلحظة.",
    },
    {
      icon: Code2,
      en: "Less watching. More doing.",
      ar: "تطبيق أكثر. فهم أعمق.",
      de: "Build your skills with hands-on coding and purposeful weekly practice.",
      da: "طور مهاراتك بالبرمجة العملية والتدريبات الأسبوعية الهادفة.",
    },
    {
      icon: Layers,
      en: "Projects you can be proud of.",
      ar: "مشاريع تفتخر بها.",
      de: "Turn what you learn into real, working projects, one step at a time.",
      da: "حوّل ما تتعلمه لمشاريع عملية تعمل فعلًا، خطوة بخطوة.",
    },
    {
      icon: Route,
      en: "A path, not a playlist.",
      ar: "مسار واضح، مش مجرد فيديوهات.",
      de: "Follow a clear learning journey with levels that build on each other.",
      da: "اتبع رحلة تعلم واضحة بمستويات مبنية على بعضها.",
    },
  ];
  return (
    <>
      <SEO
        en="Learn programming. Build your future."
        ar="تعلم البرمجة. ابنِ مستقبلك."
      />
      <section className="hero container">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="status-dot" />
            {copy(
              "BIG IDEAS START WITH A FIRST LINE",
              "الأفكار الكبيرة تبدأ بسطر كود",
            )}
          </div>
          <h1>
            {copy("Curious minds.", "عقول فضولية.")}
            <br />
            {copy("Real code.", "كود حقيقي.")}
            <br />
            <span>{copy("Brighter futures.", "مستقبل أفضل.")}</span>
          </h1>
          <p>
            {copy(
              "Your first line of code is the start of something bigger. Learn programming with live sessions, hands-on projects, and guidance at every step.",
              "أول سطر كود هو بداية لحاجة أكبر. تعلم البرمجة بمحاضرات مباشرة، ومشاريع عملية، وإرشاد في كل خطوة.",
            )}
          </p>
          <div className="hero-buttons">
            <ButtonLink to="/courses">{t("explore")}</ButtonLink>
            <Link to="/contact" className="hero-contact">
              {copy("Let’s talk", "خلينا نتكلم")}
              <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="hero-highlights">
            <span>
              <Check />
              {t("live")}
            </span>
            <span>
              <Check />
              {copy("Hands-on projects", "مشاريع عملية")}
            </span>
            <span>
              <Check />
              {copy("Beginner friendly", "مناسب للمبتدئين")}
            </span>
          </div>
        </div>
        <HeroVisual />
      </section>
      <div className="tech-ribbon">
        <div className="container">
          <span>
            {copy("YOUR IDEAS. THE RIGHT TOOLS.", "أفكارك. والأدوات المناسبة.")}
          </span>
          <div>
            <span>
              <Code2 /> HTML5
            </span>
            <span>
              <span className="ribbon-css">▱</span> CSS3
            </span>
            <span>
              <span className="ribbon-js">JS</span> JavaScript
            </span>
            <span>
              <span className="ribbon-react">⚛</span> React
            </span>
            <span>
              <Terminal /> Git & GitHub
            </span>
          </div>
        </div>
      </div>
      <section className="section container">
        <SectionTitle
          eyebrow={copy("THE MINDCODE DIFFERENCE", "فرق مايندكود")}
          title={copy("Learning that actually clicks.", "تعلم تفهمه وتطبّقه.")}
          description={copy(
            "Not just learning to code. Learning to think, create, and solve.",
            "مش بس تتعلم تكتب كود. تتعلم تفكر، تبدع، وتحل المشكلات.",
          )}
        />
        <div className="benefits-grid">
          {benefits.map(({ icon: Icon, ...b }, i) => (
            <Reveal className="benefit" key={b.en}>
              <div className="benefit-icon">
                <Icon size={23} />
                <span>0{i + 1}</span>
              </div>
              <h3>{copy(b.en, b.ar)}</h3>
              <p>{copy(b.de, b.da)}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="tracks-section">
        <div className="container section">
          <SectionTitle
            eyebrow={copy("FIND YOUR DIRECTION", "اختار اتجاهك")}
            title={copy(
              "One curious mind. Many possibilities.",
              "عقل فضولي واحد. فرص كتير.",
            )}
            description={copy(
              "Start with frontend. Grow into whatever comes next.",
              "ابدأ بتطوير الواجهات. واتطور للخطوة اللي بعدها.",
            )}
          />
          <div className="tracks-grid">
            {tracks.map((track, i) => (
              <Reveal
                key={track.en}
                className={`track-card ${track.available ? "active-track" : ""}`}
              >
                <span className="track-number">0{i + 1}</span>
                <div className="track-icon">{track.icon}</div>
                <h3>{local(track)}</h3>
                {track.available ? (
                  <Link to="/courses">
                    {t("available")}
                    <ArrowUpRight size={17} />
                  </Link>
                ) : (
                  <span className="coming-label">{t("soon")}</span>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section container" id="courses">
        <SectionTitle
          eyebrow={copy("START BUILDING", "ابدأ البناء")}
          title={copy(
            "Small steps. Powerful skills.",
            "خطوات صغيرة. مهارات قوية.",
          )}
          description={copy(
            "A clear path from your first page to your first React application.",
            "مسار واضح من أول صفحة ويب لأول تطبيق React.",
          )}
          action={
            <Link to="/courses" className="text-link">
              {copy("View all courses", "كل الكورسات")}
              <ArrowUpRight size={17} />
            </Link>
          }
        />
        <div className="courses-grid">
          {courses.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
        <p className="pricing-note">
          {copy(
            "Simple, level-by-level pricing. All prices are per level, per student. One live 2-hour session every week.",
            "أسعار واضحة لكل مستوى. كل الأسعار لكل مستوى ولكل طالب. محاضرة مباشرة أسبوعيًا مدتها ساعتان.",
          )}
        </p>
      </section>
      <section className="journey-section">
        <div className="container section">
          <SectionTitle
            eyebrow={copy(
              "FROM “HELLO” TO “I BUILT THIS”",
              "من «أهلًا» لـ «أنا بنيت ده»",
            )}
            title={copy(
              "Your next chapter, step by step.",
              "فصلك الجديد، خطوة بخطوة.",
            )}
          />
          <div className="journey">
            {[
              {
                en: "Choose your course",
                ar: "اختار كورسك",
                d: "Find the right starting point.",
                a: "حدد نقطة البداية المناسبة.",
              },
              {
                en: "Join live sessions",
                ar: "احضر المحاضرات",
                d: "Learn, ask, and explore together.",
                a: "اتعلم واسأل واستكشف معنا.",
              },
              {
                en: "Put it into practice",
                ar: "طبّق اللي اتعلمته",
                d: "Make progress with weekly tasks.",
                a: "اتقدم مع التدريبات الأسبوعية.",
              },
              {
                en: "Build something real",
                ar: "ابنِ مشروع حقيقي",
                d: "Bring your new skills to life.",
                a: "حوّل مهاراتك لمشروع عملي.",
              },
              {
                en: "Unlock your next level",
                ar: "ابدأ المستوى التالي",
                d: "Keep your curiosity moving.",
                a: "كمل رحلة الفضول والتعلم.",
              },
            ].map((s, i) => (
              <Reveal className="journey-step" key={s.en}>
                <span className="step-dot">0{i + 1}</span>
                <h3>{local(s)}</h3>
                <p>{copy(s.d, s.a)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ProjectShowcase />
      <section className="voices-section">
        <div className="container voices-inner">
          <Quote className="quote-icon" size={48} />
          <div>
            <p className="eyebrow">
              {copy(
                "REAL LEARNING. REAL VOICES.",
                "تجارب حقيقية. أصوات حقيقية.",
              )}
            </p>
            <h2>
              {copy(
                "Every great story starts somewhere.",
                "كل حكاية جميلة ليها بداية.",
              )}
            </h2>
            {testimonials.length ? (
              testimonials.map((r, i) => (
                <blockquote key={i}>
                  {local(r.quote)} — {r.name}
                </blockquote>
              ))
            ) : (
              <p>
                {copy(
                  "We’re building a community of curious minds. As our learners grow, this is where their honest experiences will live. Your story could be one of them.",
                  "إحنا بنبني مجتمع من العقول المحبة للتعلم. ومع تقدم طلابنا، هنا هتلاقي تجاربهم الحقيقية. وممكن حكايتك تكون واحدة منها.",
                )}
              </p>
            )}
            <Link className="text-link" to="/about">
              {copy("Get to know MindCode", "اتعرف على مايندكود")}
              <ArrowRight size={16} />
            </Link>
          </div>
          <span className="voices-decoration">
            <MessageCircle size={70} />
            <Sparkles size={28} />
          </span>
        </div>
      </section>
      <section className="section container faq-section">
        <div>
          <p className="eyebrow">
            <span />
            {copy("A LITTLE MORE CLARITY", "إجابات توضح الصورة")}
          </p>
          <h2>
            {copy("Curious?", "عندك فضول؟")}
            <br />
            {copy("You’re in the right place.", "أنت في المكان الصح.")}
          </h2>
          <p>
            {copy(
              "A few answers before your first line of code.",
              "إجابات على أسئلتك قبل أول سطر كود.",
            )}
          </p>
          <Link to="/contact" className="text-link">
            {copy("Ask us anything", "اسألنا عن أي حاجة")}
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <Accordion items={faq} />
      </section>
      <section className="container final-cta">
        <div className="cta-symbol">
          <MousePointer2 size={24} />
        </div>
        <p className="eyebrow">
          {copy(
            "THE FUTURE IS SOMETHING YOU BUILD",
            "المستقبل حاجة تقدر تبنيها",
          )}
        </p>
        <h2>
          {copy("Your programming journey", "رحلتك في البرمجة")}
          <br />
          <span>{copy("starts right here.", "تبدأ من هنا.")}</span>
        </h2>
        <p>
          {copy(
            "Bring your curiosity. We’ll help you turn it into a skill.",
            "تعال بفضولك. ونساعدك تحوله لمهارة.",
          )}
        </p>
        <div>
          <ButtonLink to="/courses">{t("explore")}</ButtonLink>
          <ButtonLink secondary to="/contact">
            {copy(
              "Contact & WhatsApp enrollment",
              "التواصل والتسجيل عبر واتساب",
            )}
          </ButtonLink>
        </div>
        <span className="cta-corner">{"{ }"}</span>
      </section>
    </>
  );
}
