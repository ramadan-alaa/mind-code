import { useState } from "react";
import { Search, SlidersHorizontal, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CourseCard, useCopy } from "../components/ui";
import { courses, tracks } from "../data/courses";
import SEO from "../components/SEO";
export default function Courses() {
  const { copy, t, local } = useCopy();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [status, setStatus] = useState("all");
  const current = courses.filter(
    (c) =>
      (c.name + " " + local(c.description))
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (difficulty === "all" || c.difficulty === difficulty) &&
      (category === "all" || category === "frontend") &&
      status !== "soon",
  );
  const upcoming = tracks.filter(
    (c) =>
      !c.available &&
      (category === "all" || category === c.en) &&
      (local(c) + " " + c.en).toLowerCase().includes(search.toLowerCase()) &&
      difficulty === "all" &&
      status !== "available",
  );
  return (
    <>
      <SEO en="Explore courses" ar="استكشف الكورسات" />
      <section className="container page-heading">
        <p className="eyebrow">
          <span />
          {copy("YOUR NEXT CHAPTER", "خطوتك الجاية")}
        </p>
        <h1>
          {copy("Find your starting point.", "اختار نقطة بدايتك.")}
          <br />
          <span>{copy("Build from there.", "وابنِ عليها.")}</span>
        </h1>
        <p>
          {copy(
            "Practical skills. Live guidance. A learning path that grows with you.",
            "مهارات عملية. إرشاد مباشر. ومسار تعلم يكبر معك.",
          )}
        </p>
      </section>
      <section className="container catalog section">
        <div className="filter-bar">
          <label className="search-field">
            <Search size={18} />
            <input
              aria-label={copy("Search courses", "ابحث عن كورس")}
              placeholder={copy(
                "What do you want to learn?",
                "عايز تتعلم إيه؟",
              )}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <SlidersHorizontal className="filter-icon" size={18} />
          <label>
            <span className="sr-only">{copy("Category", "المجال")}</span>
            <select
              aria-label={copy("Category", "المجال")}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">{copy("All tracks", "كل المسارات")}</option>
              <option value="frontend">{local(tracks[0])}</option>
              {tracks.slice(1).map((c) => (
                <option key={c.en} value={c.en}>
                  {local(c)}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">{copy("Difficulty", "المستوى")}</span>
            <select
              aria-label={copy("Difficulty", "المستوى")}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="all">
                {copy("All skill levels", "كل المستويات")}
              </option>
              <option value="beginner">{t("beginner")}</option>
              <option value="intermediate">{t("intermediate")}</option>
            </select>
          </label>
          <label>
            <span className="sr-only">{copy("Availability", "الإتاحة")}</span>
            <select
              aria-label={copy("Availability", "الإتاحة")}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">
                {copy("All availability", "كل الحالات")}
              </option>
              <option value="available">{t("available")}</option>
              <option value="soon">{t("soon")}</option>
            </select>
          </label>
        </div>
        <p className="results-count" aria-live="polite">
          {current.length + upcoming.length}{" "}
          {copy("learning options", "خيارات للتعلم")}
        </p>
        {current.length > 0 && (
          <div className="courses-grid">
            {current.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        )}
        {upcoming.length > 0 && (
          <div className="upcoming-grid">
            {upcoming.map((c) => (
              <article className="upcoming-card" key={c.en}>
                <span className="track-icon">{c.icon}</span>
                <span className="coming-label">{t("soon")}</span>
                <h3>{local(c)}</h3>
                <p>
                  {copy(
                    "More ways to follow your curiosity. Details will be shared when this track is ready.",
                    "طرق أكثر لمتابعة شغفك. هنشارك التفاصيل لما المسار يكون جاهز.",
                  )}
                </p>
              </article>
            ))}
          </div>
        )}
        {!current.length && !upcoming.length && (
          <div className="empty-state">
            <Search size={32} />
            <h2>{copy("A fresh search might help.", "نجرب بحث جديد؟")}</h2>
            <p>
              {copy(
                "No courses match these filters. Try another keyword or reset your filters.",
                "مفيش كورسات مطابقة. جرب كلمة تانية أو امسح الفلاتر.",
              )}
            </p>
            <button
              className="button"
              onClick={() => {
                setSearch("");
                setCategory("all");
                setDifficulty("all");
                setStatus("all");
              }}
            >
              {copy("Reset filters", "مسح الفلاتر")}
            </button>
          </div>
        )}
        <div className="catalog-help">
          <div>
            <h3>{copy("Not sure where to begin?", "مش عارف تبدأ منين؟")}</h3>
            <p>
              {copy(
                "Tell us a little about yourself. We’ll help you find your path.",
                "احكيلنا عنك شوية. ونساعدك تختار مسارك.",
              )}
            </p>
          </div>
          <Link to="/contact" className="text-link">
            {copy("Let’s find your fit", "نختار مع بعض")}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
