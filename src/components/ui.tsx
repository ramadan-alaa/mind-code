import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Clock3,
  CalendarDays,
  Radio,
  Layers3,
  Plus,
  GitBranch,
  Wind,
  Blocks,
  Gamepad2,
  Terminal,
  Server,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { courseTotals, type Course, type Localized } from "../data/courses";
const technicalTerms =
  /((?:\.[A-Za-z]|[A-Za-z])[A-Za-z0-9_+#./-]*(?:[ \t\u00a0]+[A-Za-z][A-Za-z0-9_+#./-]*)*)/g;
// Native options, metadata and messaging need the Unicode equivalent of <bdi>.
export const isolateTechnicalText = (value: string) =>
  value.replace(technicalTerms, "\u2066$1\u2069");
export function useCopy() {
  const { i18n, t } = useTranslation();
  const ar = i18n.language === "ar";
  const local = (value: Localized) => value[ar ? "ar" : "en"];
  return {
    ar,
    t,
    copy: (en: string, arabic: string) => (ar ? arabic : en),
    local,
    courseName: (course: Course) =>
      course.localizedName
        ? ar
          ? isolateTechnicalText(course.localizedName.ar)
          : course.localizedName.en
        : course.name,
  };
}
export function TechnicalText({ children }: { children: string }) {
  const { ar } = useCopy();
  if (!ar) return children;
  return children.split(technicalTerms).map((part, index) =>
    index % 2 ? (
      <bdi key={index} dir="ltr">
        {part}
      </bdi>
    ) : (
      part
    ),
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45 }}
    >
      {children}
    </motion.div>
  );
}
export function BrainLogo({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`brand-symbol-wrapper ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/brand-icon.svg"
        alt="MindCode Logo"
        className="brand-symbol-img"
        width={size}
        height={size}
        loading="eager"
      />
    </span>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="brand" aria-label="MindCode Academy">
      <BrainLogo size={38} />
      {!compact && (
        <span className="brand-text">
          <span className="brand-title">
            Mind<span className="brand-gradient">Code</span>
          </span>
          <span className="brand-sub">ACADEMY</span>
        </span>
      )}
    </Link>
  );
}
export function SectionTitle({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span /> {eyebrow}
        </p>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {action}
    </div>
  );
}
export function ButtonLink({
  to,
  children,
  secondary = false,
}: {
  to: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={`button ${secondary ? "secondary" : ""}`} to={to}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function TechIcon({ course }: { course: Course }) {
  return (
    <span
      className={`tech-icon tech-${course.slug}`}
      style={{ "--tech": course.color } as CSSProperties}
    >
      {course.slug === "scratchjr" ? (
        <Blocks aria-label="ScratchJr" size={28} />
      ) : course.slug === "scratch" ? (
        <Gamepad2 aria-label="Scratch" size={28} />
      ) : course.slug === "python" ? (
        <Terminal aria-label="Python" size={28} />
      ) : course.slug === "backend" ? (
        <Server aria-label="Back-End" size={28} />
      ) : course.slug === "git-github" ? (
        <GitBranch aria-label="Git" size={28} />
      ) : course.slug === "tailwind-css" ? (
        <Wind aria-label="Tailwind CSS" size={28} />
      ) : (
        course.symbol
      )}
    </span>
  );
}
export function CourseCard({ course }: { course: Course }) {
  const { copy, t, local, courseName } = useCopy();
  const totals = course.slug === "backend" ? courseTotals(course) : undefined;
  return (
    <Reveal className="course-card">
      <div className="course-top">
        <TechIcon course={course} />
        <span className="small-label">{t(course.difficulty)}</span>
      </div>
      <h3>{courseName(course)}</h3>
      <p>
        {course.program ? (
          <TechnicalText>
            {local(course.cardDescription ?? course.description)}
          </TechnicalText>
        ) : (
          local(course.cardDescription ?? course.description)
        )}
      </p>
      <div className="course-facts">
        <span>
          <Layers3 size={14} />
          <span>
            {course.levels.length === 1
              ? copy("1 level", "مستوى واحد")
              : `${course.levels.length} ${t("levels")}`}
          </span>
        </span>
        <span>
          <Radio size={14} />
          {t("live")}
        </span>
        <span>
          <CalendarDays size={14} />
          <span>
            <bdi>{totals?.sessions ?? course.sessions}</bdi>{" "}
            {copy("sessions", "محاضرات")}
            <small>
              {totals
                ? copy("total", "إجمالي")
                : copy("per level", "لكل مستوى")}
            </small>
          </span>
        </span>
        <span>
          <Clock3 size={14} />
          <span>
            <bdi>{totals?.hours ?? course.hours}</bdi> {copy("hours", "ساعات")}
            <small>
              {totals
                ? copy("total", "إجمالي")
                : copy("per level", "لكل مستوى")}
            </small>
          </span>
        </span>
      </div>
      <div className="course-price">
        <small>{copy("Starting at", "يبدأ من")}</small>
        <div>
          <div className="course-price-amounts">
            {course.oldPrice && (
              <del>{course.oldPrice.toLocaleString("en-US")}</del>
            )}
            <strong>
              {course.price.toLocaleString("en-US")}{" "}
              <span>{copy("EGP", "ج.م")}</span>
            </strong>
          </div>
          <small>{t("perLevel")}</small>
        </div>
      </div>
      <Link className="course-link" to={`/courses/${course.slug}`}>
        {t("details")}
        <ArrowUpRight size={17} />
      </Link>
      <Link className="course-ask" to={`/contact?course=${course.slug}`}>
        {t("ask")}
        <ArrowRight size={13} />
      </Link>
    </Reveal>
  );
}
export function Accordion({
  items,
  className = "",
}: {
  items: { q: Localized; a: Localized }[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { local } = useCopy();
  const reduce = useReducedMotion();

  const toggle = (index: number) => {
    // If clicking the currently open item, close it. Otherwise open the new one and close the rest.
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className={`accordion ${className}`}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const id = `faq-accordion-${i}`;
        return (
          <div key={i} className={`accordion-item ${isOpen ? "is-open" : ""}`}>
            <h3>
              <button
                type="button"
                id={`${id}-trigger`}
                aria-expanded={isOpen}
                aria-controls={`${id}-content`}
                onClick={() => toggle(i)}
                className="accordion-trigger"
              >
                <span>{local(item.q)}</span>
                <motion.span
                  className="accordion-icon"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{
                    duration: reduce ? 0 : 0.28,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Plus size={18} />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-content`}
                  role="region"
                  aria-labelledby={`${id}-trigger`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: {
                      duration: reduce ? 0 : 0.32,
                      ease: [0.16, 1, 0.3, 1],
                    },
                    opacity: { duration: reduce ? 0 : 0.25, ease: "easeInOut" },
                  }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="accordion-content">
                    <p>{local(item.a)}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
