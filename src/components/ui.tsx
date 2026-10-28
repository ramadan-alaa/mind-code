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
        src="/logoM.png"
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
