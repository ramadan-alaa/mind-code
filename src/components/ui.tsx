import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Clock3,
  Radio,
  Layers3,
  Plus,
  GitBranch,
  Wind,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
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
      {course.slug === "git-github" ? (
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
