import {
  BrainLogo,
  ButtonLink,
  Reveal,
  SectionTitle,
  useCopy,
} from "../components/ui";
import { Code2, Heart, Compass, UserRound } from "lucide-react";
import SEO from "../components/SEO";
export default function About() {
  const { copy } = useCopy();
  return (
    <>
      <SEO en="About our academy" ar="عن أكاديميتنا" />
      <section className="container page-heading about-heading">
        <p className="eyebrow">
          <span />
          {copy("HELLO, WE’RE MINDCODE", "أهلًا، إحنا مايندكود")}
        </p>
        <h1>
          {copy("Great things begin", "الحاجات الكبيرة تبدأ")}
          <br />
          {copy("with a curious", "بعقل")}{" "}
          <span>{copy("mind.", "فضولي.")}</span>
        </h1>
        <p>
          {copy(
            "We believe programming is a way to turn “what if?” into “look what I made.” We’re here to help you take that first step.",
            "نؤمن إن البرمجة طريقة لتحويل «ماذا لو؟» إلى «شوف اللي بنيته». وإحنا هنا عشان نساعدك تاخد أول خطوة.",
          )}
        </p>
      </section>
      <section className="container about-story">
        <div className="about-art">
          <BrainLogo />
          <span>{"{ curiosity + code }"}</span>
        </div>
        <div>
          <p className="eyebrow">{copy("OUR PURPOSE", "هدفنا")}</p>
          <h2>
            {copy("Less intimidating.", "تعلم أبسط.")}
            <br />
            {copy("More empowering.", "وثقة أكبر.")}
          </h2>
          <p>
            {copy(
              "Getting started with programming can feel overwhelming. MindCode Academy makes it approachable through a clear, structured path and a simple belief: you learn best by doing.",
              "البداية في البرمجة ممكن تبدو صعبة. مايندكود أكاديمي بتبسطها بمسار واضح ومنظم، وإيمان بسيط: أفضل طريقة للتعلم هي التطبيق.",
            )}
          </p>
          <p>
            {copy(
              "We start with frontend development: the building blocks of the web. Through live online sessions, weekly practice, and practical projects, learners develop the skills and confidence to create things of their own.",
              "بنبدأ بتطوير واجهات الويب، أساس بناء المواقع. من خلال محاضرات مباشرة وتدريب أسبوعي ومشاريع عملية، يتعلم الطلاب المهارات والثقة لبناء أفكارهم.",
            )}
          </p>
        </div>
      </section>
      <section className="container section">
        <SectionTitle
          eyebrow={copy("WHAT GUIDES US", "اللي بيوجهنا")}
          title={copy(
            "A better way to find your potential.",
            "طريقة أفضل لاكتشاف قدراتك.",
          )}
        />
        <div className="values-grid">
          {[
            {
              Icon: Code2,
              en: "Learn by making.",
              ar: "اتعلم بالتطبيق.",
              de: "Real exercises and meaningful projects make abstract concepts click.",
              da: "تدريبات حقيقية ومشاريع هادفة تخلي المفاهيم أوضح.",
            },
            {
              Icon: Heart,
              en: "Start where you are.",
              ar: "ابدأ من مكانك.",
              de: "Beginner-friendly teaching, room for questions, and direct instructor guidance.",
              da: "تعليم مناسب للمبتدئين، مساحة للأسئلة وإرشاد مباشر من المدرب.",
            },
            {
              Icon: Compass,
              en: "Always a next step.",
              ar: "دايمًا فيه خطوة جاية.",
              de: "Structured levels help you build skills gradually, with purpose and clarity.",
              da: "مستويات منظمة تساعدك تبني مهاراتك تدريجيًا بهدف ووضوح.",
            },
          ].map(({ Icon, ...v }) => (
            <Reveal className="value-card" key={v.en}>
              <Icon size={25} />
              <h3>{copy(v.en, v.ar)}</h3>
              <p>{copy(v.de, v.da)}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="instructor-section">
        <div className="container instructor-inner">
          <div className="instructor-placeholder">
            <UserRound size={72} />
            <span>
              {copy("THE HUMAN BEHIND THE CODE", "الإنسان وراء الكود")}
            </span>
          </div>
          <div>
            <p className="eyebrow">
              {copy("YOUR GUIDE, EVERY STEP", "مرشدك في كل خطوة")}
            </p>
            <h2>
              {copy(
                "Real guidance. A personal approach.",
                "إرشاد حقيقي. اهتمام بتعلمك.",
              )}
            </h2>
            <p>
              {copy(
                "Learning is better when you can ask “why?” Our approach centers on direct instructor guidance, practical feedback, and helping learners grow at every level.",
                "التعلم أفضل لما تقدر تسأل «ليه؟». أسلوبنا قائم على إرشاد مباشر من المدرب، وملاحظات عملية، ومساعدة المتعلم على التطور في كل مستوى.",
              )}
            </p>
            <p className="muted">
              {copy(
                "Instructor profile and photo will be shared here when verified information is available.",
                "هنضيف نبذة المدرب وصورته هنا عند توفر معلومات موثقة.",
              )}
            </p>
            <ButtonLink to="/contact">
              {copy("Talk about your goals", "احكيلنا عن أهدافك")}
            </ButtonLink>
          </div>
        </div>
      </section>
      <section className="container section about-bottom">
        <h2>
          {copy("Your ideas deserve a starting point.", "أفكارك تستاهل بداية.")}
        </h2>
        <ButtonLink to="/courses">
          {copy("Find your first course", "اختار أول كورس ليك")}
        </ButtonLink>
      </section>
    </>
  );
}
