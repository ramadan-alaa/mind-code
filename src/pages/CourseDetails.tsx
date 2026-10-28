import { useParams, Link } from "react-router-dom";
import { Check, Clock3, Radio, CalendarDays, ArrowLeft } from "lucide-react";
import { courses } from "../data/courses";
import {
  Accordion,
  ButtonLink,
  CourseCard,
  TechIcon,
  useCopy,
} from "../components/ui";
import { faq } from "../data/faq";
import SEO from "../components/SEO";
import NotFound from "./NotFound";
export default function CourseDetails() {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);
  const { copy, t, local } = useCopy();
  if (!course) return <NotFound />;
  return (
    <>
      <SEO en={`${course.name} course`} ar={`كورس ${course.name}`} />
      <section className="container detail-hero">
        <Link className="back-link" to="/courses">
          <ArrowLeft size={16} />
          {copy("All courses", "كل الكورسات")}
        </Link>
        <div className="detail-heading">
          <div>
            <div className="detail-label">
              <TechIcon course={course} />
              <span className="availability">
                <span className="status-dot" />
                {t("available")}
              </span>
            </div>
            <h1>
              {copy("Build with", "ابنِ باستخدام")} <span>{course.name}.</span>
            </h1>
            <p>{local(course.description)}</p>
            <div className="detail-badges">
              <span>{t(course.difficulty)}</span>
              <span>
                {course.levels.length} {t("levels")}
              </span>
              <span>{t("live")}</span>
            </div>
          </div>
          <aside className="enrollment-panel">
            <p>
              {copy("INVEST IN YOUR NEXT CHAPTER", "استثمر في خطوتك القادمة")}
            </p>
            <strong>
              {course.price.toLocaleString("en-US")}{" "}
              <span>{copy("EGP", "ج.م")}</span>
            </strong>
            <span>{t("perLevel")}</span>
            <ul>
              <li>
                <CalendarDays size={17} />
                {course.sessions} {t("sessions")}
              </li>
              <li>
                <Clock3 size={17} />
                {course.hours} {t("hours")}
              </li>
              <li>
                <Radio size={17} />
                {copy(
                  "One 2-hour live session per week",
                  "محاضرة مباشرة أسبوعيًا مدتها ساعتان",
                )}
              </li>
            </ul>
            <ButtonLink to={`/contact?course=${course.slug}`}>
              {t("ask")}
            </ButtonLink>
            <small>
              {copy(
                "Each level is priced separately, per student. This is not the price of the full course.",
                "سعر كل مستوى منفصل لكل طالب. هذا ليس سعر الكورس بالكامل.",
              )}
            </small>
          </aside>
        </div>
      </section>
      <section className="container section detail-content">
        <div>
          <p className="eyebrow">
            <span />
            {copy("THE LEARNING PATH", "مسار التعلم")}
          </p>
          <h2>{copy("One level at a time.", "مستوى بمستوى.")}</h2>
          <p>
            {copy(
              "Build a strong foundation, then put every new skill to work.",
              "ابنِ أساس قوي وطبّق كل مهارة جديدة.",
            )}
          </p>
          <div className="level-list">
            {course.levels.map((level, i) => (
              <details key={i} open={i === 0}>
                <summary>
                  <span className="level-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    {t("level")} {i + 1}
                  </span>
                  <span className="level-summary">
                    {course.sessions} {copy("sessions", "محاضرات")} ·{" "}
                    {course.hours} {copy("hours", "ساعات")}
                  </span>
                  <span>+</span>
                </summary>
                <div>
                  <p>{local(level)}</p>
                  <span>
                    {course.price.toLocaleString("en-US")}{" "}
                    {copy(
                      "EGP per student for this level",
                      "ج.م لكل طالب لهذا المستوى",
                    )}
                  </span>
                </div>
              </details>
            ))}
          </div>
          <h2 className="subsection-title">
            {copy("What you’ll take away", "هتتعلم إيه؟")}
          </h2>
          <ul className="outcome-list">
            {course.levels.map((l, i) => (
              <li key={i}>
                <Check size={18} />
                {local(l)}
              </li>
            ))}
          </ul>
        </div>
        <aside className="detail-sidebar">
          <h3>{copy("Made for curious minds", "للعقول المحبة للتعلم")}</h3>
          <p>
            {copy(
              "For students, university learners, and career switchers looking for guided, hands-on programming practice.",
              "للطلاب والجامعيين والراغبين في تغيير مسارهم المهني، بتطبيق عملي وإرشاد مباشر.",
            )}
          </p>
          <h3>{copy("Before you start", "قبل ما تبدأ")}</h3>
          <p>{local(course.prerequisites)}</p>
          <h3>{copy("How you’ll learn", "هتتعلم إزاي؟")}</h3>
          <p>
            {copy(
              "Live online sessions, weekly assignments, hands-on exercises, and practical course projects. Proposed slots are confirmed during enrollment.",
              "محاضرات مباشرة أونلاين، واجبات أسبوعية، تدريبات ومشاريع عملية. المواعيد المقترحة يتم تأكيدها عند التسجيل.",
            )}
          </p>
          <Link className="text-link" to="/contact">
            {copy("Discuss your learning path", "ناقش مسار تعلمك")} →
          </Link>
        </aside>
      </section>
      <section className="container section faq-section">
        <div>
          <p className="eyebrow">{copy("GOOD TO KNOW", "معلومات تهمك")}</p>
          <h2>{copy("Before your first session.", "قبل أول محاضرة.")}</h2>
        </div>
        <Accordion items={faq.slice(1, 5)} />
      </section>
      <section className="container section">
        <div className="section-heading">
          <h2>{copy("Keep exploring.", "كمل استكشاف.")}</h2>
        </div>
        <div className="related-grid">
          {courses
            .filter((c) => c.slug !== slug)
            .map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
        </div>
      </section>
    </>
  );
}
