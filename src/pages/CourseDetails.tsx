import { MobileSlider } from "../components/MobileSlider";
import { useState, useEffect, useId } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Clock3,
  Radio,
  CalendarDays,
  Layers3,
  Code2,
  BookOpen,
  MessageCircle,
  Compass,
  Sparkles,
  Copy,
  CheckCheck,
  Award,
  Users,
  Laptop,
  Play,
  FileCode2,
} from "lucide-react";
import type { CSSProperties } from "react";
import {
  courses,
  courseCategories,
  courseCategory,
  courseTotals,
} from "../data/courses";
import { academy } from "../config/academy";
import {
  Accordion,
  ButtonLink,
  CourseCard,
  TechIcon,
  Reveal,
  SectionTitle,
  useCopy,
} from "../components/ui";
import CourseCurriculum from "../components/courses/CourseCurriculum";
import { courseProjectsMap } from "../data/courseProjects";
import { faq } from "../data/faq";
import SEO from "../components/SEO";
import NotFound from "./NotFound";
import "../styles/course-details.css";

const snippets: Record<
  string,
  {
    fileName: string;
    code: string[];
    previewHtml?: string;
  }
> = {
  html: {
    fileName: "index.html",
    code: [
      "<!DOCTYPE html>",
      '<html lang="ar" dir="rtl">',
      "  <head>",
      "    <title>موقعي الأول | My First Website</title>",
      "  </head>",
      "  <body>",
      '    <header class="hero">',
      "      <h1>أهلاً بك في عالم الويب 🚀</h1>",
      "      <p>أول خطوة حقيقية لبناء مستقبلك الرقمي.</p>",
      '      <a href="#contact" class="btn">ابدأ الآن</a>',
      "    </header>",
      "  </body>",
      "</html>",
    ],
    previewHtml: "🚀 أول صفحة ويب حقيقية تبنيها بنفسك بتنسيق دلالي واحترافي.",
  },
  css: {
    fileName: "styles.css",
    code: [
      ":root {",
      "  --accent: #66a8fb;",
      "  --glass: rgba(255, 255, 255, 0.08);",
      "}",
      ".modern-card {",
      "  display: grid;",
      "  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));",
      "  gap: 1.5rem;",
      "  backdrop-filter: blur(16px);",
      "  border-radius: 16px;",
      "  transition: transform 0.3s ease, box-shadow 0.3s ease;",
      "}",
      ".modern-card:hover {",
      "  transform: translateY(-4px);",
      "  box-shadow: 0 12px 30px rgba(102, 168, 251, 0.25);",
      "}",
    ],
    previewHtml:
      "✨ واجهات حديثة بتأثيرات الزجاج وانتقالات ناعمة واستجابة لكل الشاشات.",
  },
  javascript: {
    fileName: "app.js",
    code: [
      "// بناء تطبيق تفاعلي مع الذاكرة المحلية",
      "const goals = ['تعلم JS', 'بناء مشاريع حقيقية'];",
      "",
      "async function loadMindCodeData() {",
      "  const res = await fetch('/api/learner-journey');",
      "  const journey = await res.json();",
      "  return journey.map(step => ({",
      "    ...step,",
      "    completed: true,",
      "    unlocked: 'Infinite Potential ⚡'",
      "  }));",
      "}",
    ],
    previewHtml: "⚡ برمجة التفاعل الحقيقي والـ APIs والمنطق البرمجي السليم.",
  },
  react: {
    fileName: "CourseApp.jsx",
    code: [
      "import { useState } from 'react';",
      "import { motion } from 'framer-motion';",
      "",
      "export default function NextChapter() {",
      "  const [mastery, setMastery] = useState(100);",
      "  return (",
      "    <motion.div whileHover={{ scale: 1.05 }}>",
      "      <h2>مهاراتك مع React.js</h2>",
      "      <p>جاهز لسوق العمل: {mastery}% 🚀</p>",
      "    </motion.div>",
      "  );",
      "}",
    ],
    previewHtml: "⚛️ بناء تطبيقات متطورة بالمكونات وإدارة الحالة والـ Hooks.",
  },
};

export default function CourseDetails() {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);
  const { copy, t, local } = useCopy();
  const reduce = useReducedMotion();

  // State
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");
  const [copied, setCopied] = useState(false);
  const [activeNav, setActiveNav] = useState("curriculum");
  const [levelSelection, setLevelSelection] = useState({ slug, index: 0 });
  const selectedLevelIndex =
    levelSelection.slug === slug ? levelSelection.index : 0;

  // Generate unique IDs for tab accessibility
  const codeTabId = useId();
  const previewTabId = useId();

  // ScrollSpy observer for section navigation
  useEffect(() => {
    const sections = [
      "curriculum",
      "projects",
      "course-fit",
      "experience",
      "faq",
    ];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveNav(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!course) return <NotFound />;

  const snippetInfo = snippets[course.slug] || {
    fileName:
      course.slug === "git-github"
        ? "workflow.sh"
        : course.slug === "tailwind-css"
          ? "styles.css"
          : course.slug === "typescript"
            ? "task.ts"
            : "app/page.tsx",
    code:
      course.slug === "git-github"
        ? [
            "git switch -c feature/course-page",
            "git add .",
            'git commit -m "Add course page"',
            "git push -u origin feature/course-page",
          ]
        : course.slug === "tailwind-css"
          ? [
              '@import "tailwindcss";',
              "@theme {",
              "  --color-academy: #b5a3ef;",
              "}",
            ]
          : course.slug === "typescript"
            ? [
                "type Task = { id: string; title: string; done: boolean };",
                "function complete(task: Task): Task {",
                "  return { ...task, done: true };",
                "}",
              ]
            : [
                "export default async function Page() {",
                "  const courses = await getCourses();",
                "  return <CourseList courses={courses} />;",
                "}",
              ],
    previewHtml: local(course.description),
  };
  const projects = course.levels.some((level) => level.project)
    ? course.levels.map((level, index) => ({
        title: { en: level.en, ar: level.ar },
        description: level.project!,
        tag: {
          en: `Level ${index + 1} Project`,
          ar: `مشروع المستوى ${index + 1}`,
        },
        highlight: index === course.levels.length - 1,
      }))
    : courseProjectsMap[course.slug] || [];
  const levelIndex = Math.min(selectedLevelIndex, course.levels.length - 1);
  const selectedLevel = course.levels[levelIndex];
  const selectedPrice = selectedLevel.price ?? course.price;
  const totals = courseTotals(course);
  const enrollmentUrl = `/contact?course=${course.slug}&level=${levelIndex + 1}`;

  const handleCopyCode = () => {
    const textToCopy = snippetInfo.code.join("\n");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    copy(
      `Hello MindCode Academy, I would like to inquire about ${course.name}, level ${levelIndex + 1}, and its schedule.`,
      `مرحباً مايندكود أكاديمي، أود الاستفسار عن كورس ${course.name}، المستوى ${levelIndex + 1}، ومواعيد المحاضرات القادمة.`,
    ),
  );
  const whatsappUrl = /^\d{8,15}$/.test(academy.whatsapp)
    ? `https://wa.me/${academy.whatsapp}?text=${whatsappMessage}`
    : enrollmentUrl;

  return (
    <div
      className="course-detail"
      style={
        {
          "--course-color": course.color,
          "--course-color-glow": `${course.color}33`,
          "--course-tint": `color-mix(in srgb, var(--course-color) 12%, transparent)`,
        } as CSSProperties
      }
    >
      <SEO
        en={`${course.name} Course`}
        ar={`كورس ${course.name} التفاعلي`}
        descriptionEn={course.description.en}
        descriptionAr={course.description.ar}
      />

      {/* Hero Ambient Glow Layer */}
      <div className="course-hero-ambient" aria-hidden="true">
        <div className="hero-glow-blob blob-1" />
        <div className="hero-glow-blob blob-2" />
        <div className="hero-glow-grid" />
      </div>

      {/* Main Course Intro Hero */}
      <section className="container course-intro">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Link className="back-link" to="/courses">
            <ArrowLeft size={15} />
            {copy("All courses", "كل الكورسات")}
            <span>/</span>
            <bdi>{course.name}</bdi>
          </Link>
        </motion.div>

        <div className="course-intro-grid">
          <motion.div
            className="course-intro-copy"
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="course-intro-label">
              <span className="availability-pulse">
                <span className="pulse-dot" />
                <span className="pulse-ring" />
                {t("available")}
              </span>
              <span className="course-category-tag">
                {local(courseCategories[courseCategory(course)])}
              </span>
              <span className="course-level-pill">{t(course.difficulty)}</span>
            </div>

            <h1 className="course-main-heading">
              <span className="heading-sub">
                {copy("Master Real Skills.", "اتقن مهارات حقيقية.")}
              </span>
              <br />
              {copy("Build with", "ابنِ مشروعاتك بـ")}{" "}
              <span className="course-name-highlight">
                <bdi>{course.name}</bdi>
              </span>
            </h1>

            <p className="course-main-desc">{local(course.description)}</p>

            {/* Quick value proposition tags */}
            <div className="hero-feature-tags">
              <span>
                <Check size={14} />
                {copy("Live 1-on-1 Mentorship", "محاضرات لايف وتطبيق عملي")}
              </span>
              <span>
                <Check size={14} />
                {copy("Real-World Projects", "مشاريع عملية للبورتفوليو")}
              </span>
              <span>
                <Check size={14} />
                {copy("Accredited Certificate", "شهادة إتمام معتمدة")}
              </span>
            </div>

            <div className="course-intro-actions">
              <ButtonLink to={enrollmentUrl}>
                {copy("Enroll / Inquire Now", "سجّل أو استفسر الآن")}
              </ButtonLink>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-quick-btn"
                aria-label={copy("WhatsApp Inquiry", "استفسار عبر واتساب")}
              >
                <MessageCircle size={16} />
                <span>{copy("Direct WhatsApp", "استفسر عبر واتساب")}</span>
              </a>

              <a href="#curriculum" className="text-link hero-explore-link">
                {copy("Explore syllabus", "استكشف المنهج")}
                <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="course-intro-promise">
              <Sparkles size={14} />
              {copy(
                "Small interactive cohorts. Clear roadmap. Step-by-step guidance.",
                "مجموعات صغيرة تفاعلية. مسار واضح. خطوة بخطوة حتى الاحتراف.",
              )}
            </div>
          </motion.div>

          {/* Interactive Code Playground / Visual Sandbox */}
          <motion.div
            className="course-code-art-wrapper"
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Floating micro badges with levitation */}
            <motion.div
              className="floating-badge badge-practical"
              animate={reduce ? {} : { y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Code2 size={13} />
              <span>{copy("100% Practical", "100% تطبيقي وعملي")}</span>
            </motion.div>

            <motion.div
              className="floating-badge badge-feedback"
              animate={reduce ? {} : { y: [0, 6, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <Award size={13} />
              <span>{copy("Code Review Included", "مراجعة كود أسبوعية")}</span>
            </motion.div>

            <div className="course-code-editor-card">
              {/* Window Header with Tabs */}
              <div className="course-editor-topbar">
                <div className="window-dots" aria-hidden="true">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>

                <div className="editor-tabs" role="tablist">
                  <button
                    type="button"
                    role="tab"
                    id={codeTabId}
                    aria-selected={activeTab === "code"}
                    aria-controls={`${codeTabId}-panel`}
                    className={`editor-tab ${activeTab === "code" ? "is-active" : ""}`}
                    onClick={() => setActiveTab("code")}
                  >
                    <FileCode2 size={13} />
                    <span>{snippetInfo.fileName}</span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    id={previewTabId}
                    aria-selected={activeTab === "preview"}
                    aria-controls={`${previewTabId}-panel`}
                    className={`editor-tab ${activeTab === "preview" ? "is-active" : ""}`}
                    onClick={() => setActiveTab("preview")}
                  >
                    <Play size={12} />
                    <span>{copy("Live Outcome", "النتيجة التفاعلية")}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="editor-copy-btn"
                  title={copy("Copy code", "نسخ الكود")}
                  aria-label={copy("Copy snippet", "نسخ الكود")}
                >
                  {copied ? <CheckCheck size={14} /> : <Copy size={14} />}
                </button>
              </div>

              {/* Editor Content Area */}
              <div className="editor-inner-content">
                <AnimatePresence mode="wait">
                  {activeTab === "code" ? (
                    <motion.div
                      key="code"
                      id={`${codeTabId}-panel`}
                      role="tabpanel"
                      aria-labelledby={codeTabId}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="editor-code-panel"
                      dir="ltr"
                    >
                      <pre>
                        {snippetInfo.code.map((line, i) => (
                          <div key={i} className="editor-line">
                            <span className="line-num">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <code className="line-text">{line || " "}</code>
                          </div>
                        ))}
                      </pre>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="preview"
                      id={`${previewTabId}-panel`}
                      role="tabpanel"
                      aria-labelledby={previewTabId}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="editor-preview-panel"
                    >
                      <div className="preview-illustration">
                        <TechIcon course={course} />
                        <h4>
                          {course.name} —{" "}
                          {copy("Interactive Showcase", "عرض تفاعلي")}
                        </h4>
                        <p>{snippetInfo.previewHtml}</p>
                        <div className="preview-badge-row">
                          <span className="badge-tag">
                            <Check size={12} />{" "}
                            {copy("Clean Architecture", "كود نظيف ومعياري")}
                          </span>
                          <span className="badge-tag">
                            <Check size={12} />{" "}
                            {copy("Production Ready", "جاهز للإنتاج")}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Status Bar */}
              <div className="editor-statusbar">
                <div className="status-item">
                  <span className="status-indicator-dot" />
                  <span>
                    {copy("Ready for practice", "جاهز للتطبيق العملي")}
                  </span>
                </div>
                <div className="status-tags">
                  <span>UTF-8</span>
                  <span>{course.name}</span>
                </div>
              </div>
            </div>

            <div className="course-art-caption">
              <Sparkles size={13} />
              <span>
                {copy(
                  "Interactive hands-on learning from day one.",
                  "تطبيق عملي خطوة بخطوة من المحاضرة الأولى.",
                )}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Quick Facts Metric Grid */}
        <motion.div
          className="course-quick-facts"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          {[
            {
              Icon: Layers3,
              value: `${course.levels.length}`,
              label: t("levels"),
              sub: copy("Progressive path", "مستويات متدرجة"),
            },
            {
              Icon: CalendarDays,
              value: `${course.sessions}`,
              label: t("sessions"),
              sub: copy("2h weekly live", "محاضرة ساعتين / أسبوع"),
            },
            {
              Icon: Clock3,
              value: `${course.hours}`,
              label: t("hours"),
              sub: copy("Intensive learning", "تدريب وتطبيق مركز"),
            },
            {
              Icon: Users,
              value: copy("Live Cohort", "مجموعات تفاعلية"),
              label: copy("Direct Instructor Access", "تفاعل مباشر مع المدرب"),
              sub: copy("Max 6-8 students", "عدد محدود لكل دفعة"),
            },
          ].map(({ Icon, value, label, sub }, idx) => (
            <div key={idx} className="quick-fact-card">
              <div className="fact-icon-wrap">
                <Icon size={20} />
              </div>
              <div className="fact-info">
                <strong>{value}</strong>
                <span className="fact-label">{label}</span>
                <small className="fact-sub">{sub}</small>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Course Layout Body with Sticky Nav and Sidebar */}
      <div className="container course-body-layout">
        <div className="course-main-content">
          {/* Sticky Section Navigation Bar */}
          <nav
            className="course-section-nav-sticky"
            aria-label={copy("Course sections", "أقسام الكورس")}
          >
            <div className="nav-links-track">
              {[
                {
                  id: "curriculum",
                  label: copy("Learning Path", "مسار التعلم"),
                },
                {
                  id: "projects",
                  label: copy("Projects You'll Build", "المشاريع العملية"),
                },
                {
                  id: "course-fit",
                  label: copy("Who Is This For?", "لمن هذا الكورس؟"),
                },
                {
                  id: "experience",
                  label: copy("Why MindCode?", "ليه مايندكود؟"),
                },
                { id: "faq", label: copy("FAQ", "أسئلة شائعة") },
              ].map(({ id, label }) => {
                const isActive = activeNav === id;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`nav-tab-link ${isActive ? "is-active" : ""}`}
                    onClick={() => setActiveNav(id)}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        className="nav-active-pill"
                        layoutId="activeNavPill"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            <div className="nav-quick-cta">
              <Link to={enrollmentUrl} className="nav-enroll-button">
                {copy("Enroll", "سجّل الآن")}
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </nav>

          {/* Section 1: Curriculum Learning Path */}
          <section className="course-content-section" id="curriculum">
            <Reveal>
              <p className="eyebrow">
                <span />
                {copy("A CLEAR PATH FORWARD", "مسار تدريبي واضح ومتكامل")}
              </p>
              <h2>
                {copy(
                  "One level. One step closer to mastery.",
                  "كل مستوى يقرّبك لهدفك الاحترافي.",
                )}
              </h2>
              <p className="course-section-description">
                {copy(
                  "Structured into manageable levels. You can enroll level by level with complete flexibility, accompanied by weekly assignments and direct mentor code reviews.",
                  "المنهج مقسم إلى مستويات واضحة. يمكنك دراسة كل مستوى بشكل منفصل وبمرونة كاملة، مع تدريبات أسبوعية ومراجعة دورية من المدرب.",
                )}
              </p>
            </Reveal>

            <CourseCurriculum key={course.slug} course={course} />
            {course.progression && (
              <div className="course-path-card">
                <h3>{copy("Your learning path", "مسارك التعليمي")}</h3>
                <p>{local(course.progression)}</p>
                <p dir="ltr">HTML → CSS → JavaScript → React</p>
                <Link className="text-link" to="/courses">
                  {copy(
                    "Compare courses and prerequisites",
                    "قارن الكورسات ومتطلباتها",
                  )}
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            )}

            <div className="curriculum-footnote-box">
              <BookOpen size={16} />
              <span>
                {copy(
                  "Not sure which level to start with? We conduct a free 10-minute diagnostic session to place you in the perfect level.",
                  "مش متأكد تبدأ من أنهي مستوى؟ بنعملك جلسة تقييم سريعة مجانية لاختيار المستوى الأنسب لمستواك الحالي.",
                )}
              </span>
            </div>
          </section>

          {/* Section 2: Real-World Projects Showcase */}
          <section className="course-content-section" id="projects">
            <Reveal>
              <p className="eyebrow">
                <span />
                {copy("PORTFOLIO BUILDERS", "مشاريع عملية لبورتفوليو حقيقي")}
              </p>
              <h2>
                {copy(
                  "Projects that speak louder than words.",
                  "مشاريع حقيقية تتحدث عن مهاراتك بثقة.",
                )}
              </h2>
              <p className="course-section-description">
                {copy(
                  "You don't just watch tutorials. You build end-to-end practical applications from scratch that you can proudly showcase in interviews.",
                  "مش مجرد شروحات نظرية؛ هتبني مشاريع متكاملة من الصفر بنفسك، تقدر تضيفها لسيرتك الذاتية وتستعرضها في مقابلات العمل.",
                )}
              </p>
            </Reveal>

            <div className="projects-grid">
              {projects.map((proj, idx) => (
                <motion.div
                  key={idx}
                  className={`project-card ${proj.highlight ? "is-featured" : ""}`}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.1 }}
                >
                  <div className="project-card-header">
                    <span className="project-tag-pill">{local(proj.tag)}</span>
                    <Laptop size={18} className="project-icon" />
                  </div>
                  <h3>{local(proj.title)}</h3>
                  <p>{local(proj.description)}</p>
                  <div className="project-card-footer">
                    <span className="project-feature-label">
                      <Check size={13} />
                      {copy(
                        "Source Code & Feedback Included",
                        "مراجعة الكود مع المدرب",
                      )}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Section 3: Course Fit & Target Audience */}
          <section className="course-content-section" id="course-fit">
            <Reveal>
              <p className="eyebrow">
                <span />
                {copy("FIND YOUR FIT", "اعرف نقطة بدايتك")}
              </p>
              <h2>
                {copy(
                  "Your curiosity belongs here.",
                  "فضولك ورغبتك في التطور مكانهم هنا.",
                )}
              </h2>
            </Reveal>

            <div className="course-fit-grid">
              <Reveal className="course-fit-card">
                <Compass size={24} className="fit-card-icon" />
                <h3>
                  {copy("Who is this course for?", "الكورس ده مصمم لمين؟")}
                </h3>
                <p>
                  {copy(
                    course.audience?.en ??
                      "High school and university students, career switchers, and developers seeking hands-on mastery with personalized instructor mentoring rather than pre-recorded videos.",
                    course.audience?.ar ??
                      "للطلاب الجامعيين والراغبين في تغيير مسارهم المهني والمطورين الباحثين عن إرشاد مباشر وتطبيق عملي حقيقي بدلاً من الفيديوهات المسجلة الجافة.",
                  )}
                </p>
                <div className="fit-tags-list">
                  <span>{t(course.difficulty)}</span>
                  <span>{copy("Direct Mentoring", "إرشاد شخصي")}</span>
                  <span>{copy("Practical Application", "تطبيق 100%")}</span>
                </div>
              </Reveal>

              <Reveal className="course-fit-card">
                <Code2 size={24} className="fit-card-icon" />
                <h3>
                  {copy("Prerequisites & Preparation", "المتطلبات السابقة")}
                </h3>
                <p>{local(course.prerequisites)}</p>
                <div className="fit-checklist">
                  <div className="checklist-item">
                    <Check size={14} />
                    <span>
                      {copy(
                        "A PC or Laptop (Windows / Mac / Linux)",
                        "جهاز كمبيوتر أو لابتوب",
                      )}
                    </span>
                  </div>
                  <div className="checklist-item">
                    <Check size={14} />
                    <span>
                      {copy(
                        "Stable internet connection for live sessions",
                        "إنترنت مستقر للمحاضرات المباشرة",
                      )}
                    </span>
                  </div>
                  <div className="checklist-item">
                    <Check size={14} />
                    <span>
                      {copy(
                        "Curiosity and 3-4 hours weekly practice",
                        "الرغبة في التعلم وتخصيص وقت للتطبيق",
                      )}
                    </span>
                  </div>
                </div>

                <Link className="text-link fit-contact-link" to={enrollmentUrl}>
                  {copy(
                    "Ask about your starting level",
                    "تواصل معنا لاختيار بدايتك",
                  )}
                  <ArrowUpRight size={15} />
                </Link>
              </Reveal>
            </div>
            {course.outcomes && (
              <div className="course-path-card">
                <h3>
                  {copy("What you will be able to build", "ما ستتمكن من بنائه")}
                </h3>
                <ul>
                  {course.outcomes.map((outcome) => (
                    <li key={outcome.en}>{local(outcome)}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Section 4: Why MindCode Learning Experience */}
          <section className="course-content-section" id="experience">
            <Reveal>
              <p className="eyebrow">
                <span />
                {copy("THE MINDCODE ADVANTAGE", "تجربة التعلم في مايندكود")}
              </p>
              <h2>
                {copy(
                  "Why learners thrive with us.",
                  "ليه بتتعلم أسرع وبثقة أكبر معنا؟",
                )}
              </h2>
            </Reveal>

            <div className="experience-cards-grid">
              {[
                {
                  icon: Users,
                  title: copy(
                    "Live Interactive Cohorts",
                    "محاضرات لايف تفاعلية",
                  ),
                  desc: copy(
                    "You ask questions in real-time, share your screen when stuck, and learn with an instructor actively guiding you.",
                    "محاضرات مباشرة صوت وصورة مع المدرب، تقدر تشارك شاشتك وتسأل في أي نقطة فوراً.",
                  ),
                },
                {
                  icon: Code2,
                  title: copy(
                    "Line-by-Line Code Reviews",
                    "مراجعة كود سطر بسطر",
                  ),
                  desc: copy(
                    "Receive constructive weekly feedback on your assignments to adopt professional coding standards and clean habits.",
                    "واجباتك ومشاريعك بتتراجع سطر بسطر مع ملاحظات لتكتب كود نظيف متوافق مع معايير الشركات.",
                  ),
                },
                {
                  icon: MessageCircle,
                  title: copy(
                    "Continuous Mentor Support",
                    "متابعة مستمرة بين المحاضرات",
                  ),
                  desc: copy(
                    "Have a question between sessions? Reach out to the instructor directly without waiting for the next week.",
                    "واقف في مشكلة أثناء المذاكرة؟ تواصل مع المدرب مباشرة في أي وقت بدون ما تستنى المحاضرة اللي بعدها.",
                  ),
                },
                {
                  icon: Award,
                  title: copy(
                    "Verified Certificate of Completion",
                    "شهادة إتمام معتمدة",
                  ),
                  desc: copy(
                    "Earn a verifiable MindCode Academy certificate upon completing your level and delivering your practical capstone.",
                    "احصل على شهادة موثقة من مايندكود تثبت إنجازك للمستوى وتسليمك للمشاريع العملية المطلوبة.",
                  ),
                },
              ].map((item, idx) => (
                <Reveal key={idx} className="experience-card">
                  <div className="exp-icon-wrap">
                    <item.icon size={22} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Section 5: Course FAQ */}
          <section className="course-content-section course-questions" id="faq">
            <Reveal>
              <p className="eyebrow">
                <span />
                {copy("ANSWERS & CLARITY", "إجابات توضح كل التفاصيل")}
              </p>
              <h2>
                {copy(
                  "Frequently asked questions.",
                  "الأسئلة الشائعة حول الكورس.",
                )}
              </h2>
            </Reveal>

            <Accordion
              items={course.faq ?? faq.slice(0, 6)}
              className="course-accordion"
            />
          </section>
        </div>

        {/* Aside: Sticky Enrollment Card */}
        <aside className="course-enrollment-column">
          <Reveal className="course-enrollment-card">
            <div className="course-enrollment-top">
              <span className="enrollment-status-badge">
                <span className="live-dot" />
                {copy("ENROLLMENT OPEN", "التسجيل متاح الآن")}
              </span>
              <TechIcon course={course} />
            </div>

            {/* Level selection pill buttons */}
            <div className="level-selector-row">
              <small className="selector-label">
                {copy("Select level to view details:", "اختر المستوى:")}
              </small>
              <div className="level-buttons-group">
                {course.levels.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`level-pill-btn ${levelIndex === idx ? "is-selected" : ""}`}
                    aria-pressed={levelIndex === idx}
                    onClick={() => setLevelSelection({ slug, index: idx })}
                  >
                    {t("level")} {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <p className="course-price-label">
              {copy("Pricing per student / level", "سعر كل مستوى لكل طالب:")}
            </p>

            <div className="course-enrollment-price">
              {course.oldPrice && (
                <del style={{ color: "var(--muted)" }}>
                  {course.oldPrice.toLocaleString("en-US")}
                </del>
              )}
              <strong>{selectedPrice.toLocaleString("en-US")}</strong>
              <span>{copy("EGP", "ج.م")}</span>
              <small className="price-term">{t("perLevel")}</small>
            </div>

            <div className="course-price-divider" />
            {course.scheduleOnRequest && (
              <div className="course-total-note">
                <p>
                  {copy("Selected level: ", "المستوى المختار: ")}
                  {local(selectedLevel)}
                </p>
                <p>
                  {copy("Complete course: ", "الكورس بالكامل: ")}
                  {totals.price.toLocaleString("en-US")} {copy("EGP", "ج.م")} ·{" "}
                  {totals.hours} {copy("hours", "ساعة")} · {totals.sessions}{" "}
                  {copy("weekly sessions", "محاضرة أسبوعية")}
                </p>
                <p>
                  {copy(
                    "One 2-hour session per week. Schedule on request.",
                    "محاضرة أسبوعيًا مدتها ساعتان. المواعيد حسب الطلب.",
                  )}
                </p>
              </div>
            )}

            {/* Included highlights checklist */}
            <ul className="enrollment-features-list">
              {[
                {
                  Icon: Layers3,
                  text: `${course.levels.length} ${copy("Structured levels available", "مستويات تعلم مدروسة ومنظمة")}`,
                },
                {
                  Icon: CalendarDays,
                  text: `${course.sessions} ${copy("Live interactive sessions / level", "محاضرات لايف تفاعلية لكل مستوى")}`,
                },
                {
                  Icon: Clock3,
                  text: `${course.hours} ${copy("Intensive practice hours", "ساعات تدريب وتطبيق مكثف")}`,
                },
                {
                  Icon: Radio,
                  text: copy(
                    "Live online via Google Meet / Zoom",
                    "أونلاين مباشر مع تفاعل حي",
                  ),
                },
                {
                  Icon: Code2,
                  text: copy(
                    "Weekly practical assignments & reviews",
                    "مشاريع وواجبات تطبيقية أسبوعية",
                  ),
                },
                {
                  Icon: Award,
                  text: copy(
                    "Certificate upon project completion",
                    "شهادة إتمام بعد تسليم المشروع",
                  ),
                },
              ].map(({ Icon, text }, i) => (
                <li key={i}>
                  <Icon size={16} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <div className="enrollment-action-buttons">
              <ButtonLink to={enrollmentUrl}>
                {copy("Enroll Now / Inquire", "سجّل الآن في الكورس")}
              </ButtonLink>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-enrollment-link"
              >
                <MessageCircle size={16} />
                <span>
                  {copy("Quick WhatsApp Inquiry", "استفسار سريع عبر واتساب")}
                </span>
              </a>
            </div>

            <p className="course-enrollment-disclosure">
              {copy(
                "Each level is paid separately with full flexibility. No upfront commitment for the whole track.",
                "يتم سداد كل مستوى بشكل منفصل بمرونة تامة. لا يوجد أي إلزام بدفع المسار كاملاً مسبقاً.",
              )}
            </p>
          </Reveal>

          {/* Quick Help Card */}
          <div className="course-enrollment-help">
            <p>
              {copy(
                "Have specific questions about schedule or format?",
                "عندك سؤال عن المواعيد أو طريقة الدفع؟",
              )}
            </p>
            <Link to={enrollmentUrl} className="help-link">
              {copy("Talk to an instructor directly", "تحدث مع المدرب مباشرة")}
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </aside>
      </div>

      {/* Floating Bottom Bar for Mobile Devices */}
      <div
        className="mobile-sticky-enrollment-bar"
        aria-label={copy("Quick Enrollment", "التسجيل السريع")}
      >
        <div className="mobile-bar-info">
          <strong>{course.name}</strong>
          <span>
            {selectedPrice.toLocaleString("en-US")}{" "}
            {copy("EGP / level", "ج.م / مستوى")}
          </span>
        </div>
        <Link to={enrollmentUrl} className="mobile-bar-cta">
          {copy("Enroll Now", "سجّل الآن")}
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Related / Next Courses Section */}
      <section className="container section course-related">
        <SectionTitle
          eyebrow={copy("EXPAND YOUR SKILLSET", "اكتشف مساراتك القادمة")}
          title={copy(
            "There's always an exciting next step.",
            "خطواتك القادمة في عالم البرمجة.",
          )}
          action={
            <Link className="text-link" to="/courses">
              {copy("All courses", "كل الكورسات")}
              <ArrowUpRight size={16} />
            </Link>
          }
        />
        <MobileSlider className="related-grid" always>
          {courses
            .filter((c) => c.slug !== slug)
            .map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
        </MobileSlider>
      </section>
    </div>
  );
}
