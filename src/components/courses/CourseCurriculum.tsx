import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ChevronDown,
  Check,
  Clock3,
  CalendarDays,
  Sparkles,
  Layers,
  Code2,
} from "lucide-react";
import type { Course } from "../../data/courses";
import { useCopy } from "../ui";
import { levelProjectsMap } from "../../data/courseProjects";

export default function CourseCurriculum({ course }: { course: Course }) {
  const [expandedLevels, setExpandedLevels] = useState<number[]>([0]);
  const reduce = useReducedMotion();
  const { copy, t, local } = useCopy();

  const toggleLevel = (index: number) => {
    setExpandedLevels((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const allOpen = expandedLevels.length === course.levels.length;
  const toggleAll = () => {
    if (allOpen) {
      setExpandedLevels([]);
    } else {
      setExpandedLevels(course.levels.map((_, i) => i));
    }
  };

  const levelProjects = levelProjectsMap[course.slug] || [];

  return (
    <div className="curriculum-container">
      <div className="curriculum-header-bar">
        <span className="curriculum-count-badge">
          <Layers size={14} />
          {course.levels.length} {copy("Structured Levels", "مستويات متدرجة")}
        </span>
        <button
          type="button"
          onClick={toggleAll}
          className="curriculum-toggle-all"
        >
          {allOpen
            ? copy("Collapse All", "طي الكل")
            : copy("Expand All", "عرض كل المستويات")}
        </button>
      </div>

      <div className="curriculum-list">
        {course.levels.map((level, index) => {
          const isExpanded = expandedLevels.includes(index);
          const id = `${course.slug}-level-${index + 1}`;
          const project = levelProjects[index];

          // Split topics into distinct bullet points for clarity
          const topicsText = local(level);
          const topicsList = topicsText
            .split(/[,،]/)
            .map((s) => s.trim())
            .filter(Boolean);

          return (
            <motion.article
              className={`curriculum-level ${isExpanded ? "is-expanded" : ""}`}
              key={id}
              initial={false}
              layout
              transition={{ duration: reduce ? 0 : 0.25 }}
            >
              <h3>
                <button
                  id={`${id}-trigger`}
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={id}
                  onClick={() => toggleLevel(index)}
                  className="curriculum-trigger"
                >
                  <span className="curriculum-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="curriculum-title-wrap">
                    <span className="curriculum-title">
                      {t("level")} {index + 1}
                      <span className="curriculum-level-badge">
                        {index === 0
                          ? copy("Foundation", "التأسيس")
                          : index === course.levels.length - 1
                            ? copy("Mastery & Capstone", "الإتقان والتخرج")
                            : copy("Core Skills", "تطوير المهارات")}
                      </span>
                    </span>
                    <small>
                      {index === 0
                        ? copy(
                            "Start from fundamentals with clarity",
                            "البداية من الصفر بكل وضوح وتطبيق",
                          )
                        : index === course.levels.length - 1
                          ? copy(
                              "Real capstone project & portfolio piece",
                              "مشروع تخرج حقيقي يضاف لبورتفوليو أعمالك",
                            )
                          : copy(
                              "Deep dive into real-world workflows",
                              "تعمق في التطبيق وأفضل الممارسات",
                            )}
                    </small>
                  </div>
                  <div className="curriculum-trigger-meta">
                    <span className="curriculum-duration">
                      <Clock3 size={13} />
                      {course.hours} {copy("hrs", "ساعات")}
                    </span>
                    <motion.span
                      className="curriculum-chevron"
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: reduce ? 0 : 0.25 }}
                    >
                      <ChevronDown size={18} />
                    </motion.span>
                  </div>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={id}
                    role="region"
                    aria-labelledby={`${id}-trigger`}
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: reduce ? 0 : 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="curriculum-body">
                      <div className="curriculum-eyebrow">
                        <Code2 size={13} />
                        <span>
                          {copy(
                            "CORE TOPICS & CONCEPTS",
                            "المفاهيم والمهارات المكتسبة",
                          )}
                        </span>
                      </div>

                      <div className="curriculum-topics-grid">
                        {topicsList.map((topic, tIdx) => (
                          <div key={tIdx} className="curriculum-topic-item">
                            <span className="topic-check-icon">
                              <Check size={13} />
                            </span>
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>

                      {project && (
                        <div className="curriculum-project-card">
                          <div className="project-badge">
                            <Sparkles size={13} />
                            <span>
                              {index === course.levels.length - 1
                                ? copy("Capstone Project", "مشروع التخرج")
                                : copy("Level Project", "مشروع هذا المستوى")}
                            </span>
                          </div>
                          <p>{local(project)}</p>
                        </div>
                      )}

                      <div className="curriculum-meta">
                        <span>
                          <CalendarDays size={14} />
                          {course.sessions}{" "}
                          {copy("live sessions", "محاضرات تفاعلية")}
                        </span>
                        <span>
                          <Clock3 size={14} />
                          {course.hours} {copy("hours total", "إجمالي الساعات")}
                        </span>
                        <span className="curriculum-price-tag">
                          {course.price.toLocaleString("en-US")}{" "}
                          {copy(
                            "EGP · per student / level",
                            "ج.م · لكل طالب للمستوى",
                          )}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
