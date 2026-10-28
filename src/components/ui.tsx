import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Clock3,
  Radio,
  Layers3,
  Plus,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import type { Course, Localized } from "../data/courses";
export function useCopy() {
  const { i18n, t } = useTranslation();
  const ar = i18n.language === "ar";
  return {
    ar,
    t,
    copy: (en: string, arabic: string) => (ar ? arabic : en),
    local: (value: Localized) => value[ar ? "ar" : "en"],
  };
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
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="brand" aria-label="MindCode Academy">
      <BrainLogo />
      {!compact && (
        <span>
          mindcode<span className="brand-sub">ACADEMY</span>
        </span>
      )}
    </Link>
  );
}
export function BrainLogo() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <g
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M29 12c-6-6-14-1-14 6-8 0-11 10-7 15-6 7-1 17 7 17 1 9 13 10 17 3V15c0-7 11-8 15-1 8-1 12 6 10 12 7 4 7 13 2 17 2 9-6 15-13 12-5 6-14 3-14-3" />
        <path d="M17 18c-1 5 1 8 6 9m-15 6 9 1m-2 16c-1-6 2-10 7-11m25-25c-5 3-6 7-3 11m13 1-8 5m10 12-9-2m-4 14c2-5 0-9-4-11" />
        <path d="m26 29-7 5 7 5m12-10 7 5-7 5" />
      </g>
    </svg>
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
      {course.symbol}
    </span>
  );
}
export function CourseCard({ course }: { course: Course }) {
  const { copy, t, local } = useCopy();
  return (
    <Reveal className="course-card">
      <div className="course-top">
        <TechIcon course={course} />
        <span className="small-label">{t(course.difficulty)}</span>
      </div>
      <h3>{course.name}</h3>
      <p>{local(course.description)}</p>
      <div className="course-facts">
        <span>
          <Layers3 size={14} />
          {course.levels.length} {t("levels")}
        </span>
        <span>
          <Radio size={14} />
          {t("live")}
        </span>
        <span>
          <Clock3 size={14} />
          {course.sessions} {t("sessions")}
        </span>
        <span>
          {course.hours} {t("hours")}
        </span>
      </div>
      <div className="course-price">
        <small>{copy("Starting at", "يبدأ من")}</small>
        <div>
          <strong>
            {course.price.toLocaleString("en-US")}{" "}
            <span>{copy("EGP", "ج.م")}</span>
          </strong>
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
}: {
  items: { q: Localized; a: Localized }[];
}) {
  const { local } = useCopy();
  return (
    <div className="accordion">
      {items.map((item, i) => (
        <details key={i}>
          <summary>
            {local(item.q)}
            <Plus size={18} />
          </summary>
          <p>{local(item.a)}</p>
        </details>
      ))}
    </div>
  );
}
