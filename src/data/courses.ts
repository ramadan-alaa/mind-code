import { professionalCourses } from "./professionalCourses";
export type Localized = { en: string; ar: string };
export interface CourseSession {
  number: number;
  title: Localized;
  topics: Localized[];
  practiceTask: Localized;
  learningObjectives: Localized[];
}
export interface CourseLevel extends Localized {
  id?: string;
  sessions?: CourseSession[];
  hoursPerSession?: number;
  price?: number;
  project?: Localized;
  prerequisites?: Localized;
}
export const courseCategories = {
  fundamentals: { en: "Frontend Fundamentals", ar: "أساسيات الواجهات" },
  frameworks: { en: "Frontend Frameworks", ar: "أطر عمل الواجهات" },
  languages: { en: "Programming Languages", ar: "لغات البرمجة" },
  styling: { en: "Styling Tools", ar: "أدوات التنسيق" },
  tools: { en: "Developer Tools", ar: "أدوات المطور" },
} satisfies Record<string, Localized>;
export type CourseCategory = keyof typeof courseCategories;
export interface Course {
  slug: string;
  name: string;
  color: string;
  symbol: string;
  price: number;
  oldPrice?: number;
  sessions: number;
  hours: number;
  difficulty: "beginner" | "intermediateBeginner" | "intermediate" | "advanced";
  category?: CourseCategory;
  audience?: Localized;
  outcomes?: Localized[];
  progression?: Localized;
  scheduleOnRequest?: boolean;
  collection?: "foundation" | "professional";
  faq?: { q: Localized; a: Localized }[];
  description: Localized;
  prerequisites: Localized;
  levels: CourseLevel[];
}
export const courses: Course[] = [
  {
    slug: "html",
    name: "HTML",
    color: "#ed744c",
    symbol: "5",
    price: 700,
    oldPrice: 1000,
    sessions: 4,
    hours: 8,
    difficulty: "beginner",
    description: {
      en: "Your first step into the web. Turn ideas into well-structured pages.",
      ar: "خطوتك الأولى في عالم الويب. حوّل أفكارك لصفحات منظمة.",
    },
    prerequisites: {
      en: "No coding experience needed. Bring a computer and curiosity.",
      ar: "لا تحتاج خبرة سابقة. فقط جهاز كمبيوتر وحب للتعلم.",
    },
    levels: [
      {
        en: "HTML Basics, Structure, Text, Links, Images, Lists, Tables.",
        ar: "أساسيات HTML، هيكل الصفحة، النصوص، الروابط، الصور، القوائم والجداول.",
      },
      {
        en: "Forms, Semantic HTML, Accessibility Basics, and a Practical Website Project.",
        ar: "النماذج، HTML الدلالي، أساسيات إتاحة الوصول ومشروع موقع عملي.",
      },
    ],
  },
  {
    slug: "css",
    name: "CSS",
    color: "#66a8fb",
    symbol: "3",
    price: 900,
    oldPrice: 1100,
    sessions: 5,
    hours: 10,
    difficulty: "beginner",
    description: {
      en: "Bring your pages to life with beautiful, responsive design.",
      ar: "امنح صفحاتك الحياة بتصميم جميل ومتجاوب.",
    },
    prerequisites: {
      en: "Basic knowledge of HTML.",
      ar: "معرفة أساسية بلغة HTML.",
    },
    levels: [
      {
        en: "Selectors, Colors, Typography, Box Model, Basic Styling.",
        ar: "المحددات، الألوان، الخطوط، نموذج الصندوق والتنسيق الأساسي.",
      },
      {
        en: "Flexbox, Grid, Positioning, Responsive Layouts.",
        ar: "Flexbox، Grid، التموضع والتخطيطات المتجاوبة.",
      },
      {
        en: "Animations, Transitions, Advanced Responsive Design, Complete Website Project.",
        ar: "الحركة، الانتقالات، التصميم المتجاوب المتقدم ومشروع موقع كامل.",
      },
    ],
  },
  {
    slug: "javascript",
    name: "JavaScript",
    color: "#f3d462",
    symbol: "JS",
    price: 1100,
    oldPrice: 1300,
    sessions: 6,
    hours: 12,
    difficulty: "beginner",
    description: {
      en: "Make the web interactive. Think logically, build creatively.",
      ar: "اجعل الويب تفاعليًا. فكّر بمنطق وابنِ بإبداع.",
    },
    prerequisites: {
      en: "Familiarity with HTML and CSS is recommended.",
      ar: "يُفضّل الإلمام بأساسيات HTML وCSS.",
    },
    levels: [
      {
        en: "Variables, Data Types, Conditions, Loops, Functions, Arrays, Objects.",
        ar: "المتغيرات، أنواع البيانات، الشروط، الحلقات، الدوال، المصفوفات والكائنات.",
      },
      {
        en: "DOM Manipulation, Events, Forms, Validation, Interactive Interfaces.",
        ar: "التعامل مع DOM، الأحداث، النماذج، التحقق والواجهات التفاعلية.",
      },
      {
        en: "Modern JavaScript, Async/Await, Promises, Fetch API, Error Handling.",
        ar: "JavaScript الحديثة، Async/Await، Promises، Fetch API ومعالجة الأخطاء.",
      },
      {
        en: "APIs, Local Storage, Modular JavaScript, Practical Application Project.",
        ar: "واجهات API، التخزين المحلي، تقسيم الكود ومشروع تطبيق عملي.",
      },
    ],
  },
  {
    slug: "react",
    name: "React",
    color: "#66d8e9",
    symbol: "⚛",
    price: 1300,
    oldPrice: 1500,
    sessions: 6,
    hours: 12,
    difficulty: "intermediate",
    description: {
      en: "Build modern interfaces, one powerful component at a time.",
      ar: "ابنِ واجهات حديثة باستخدام مكونات قوية قابلة لإعادة الاستخدام.",
    },
    prerequisites: {
      en: "A solid understanding of HTML, CSS, and JavaScript.",
      ar: "فهم جيد للغات HTML وCSS وJavaScript.",
    },
    levels: [
      {
        en: "Components, JSX, Props, State, Events.",
        ar: "المكونات، JSX، Props، الحالة والأحداث.",
      },
      {
        en: "Hooks, Forms, Conditional Rendering, Lists, React Router.",
        ar: "Hooks، النماذج، العرض الشرطي، القوائم وReact Router.",
      },
      {
        en: "API Integration, Custom Hooks, State Management with Zustand.",
        ar: "دمج API، Hooks مخصصة وإدارة الحالة باستخدام Zustand.",
      },
      {
        en: "Application Architecture, Reusable Components, Performance Basics, Final React Project.",
        ar: "هيكلة التطبيقات، المكونات القابلة لإعادة الاستخدام، أساسيات الأداء ومشروع React نهائي.",
      },
    ],
  },
  ...professionalCourses,
];
export const courseCategory = (course: Course): CourseCategory =>
  course.category ??
  (course.slug === "react"
    ? "frameworks"
    : course.slug === "javascript"
      ? "languages"
      : "fundamentals");
export const courseTotals = (course: Course) => ({
  price: course.levels.reduce(
    (sum, level) => sum + (level.price ?? course.price),
    0,
  ),
  sessions: course.levels.reduce(
    (sum, level) => sum + (level.sessions?.length ?? course.sessions),
    0,
  ),
  hours: course.levels.reduce(
    (sum, level) =>
      sum +
      (level.sessions
        ? level.sessions.length * (level.hoursPerSession ?? 2)
        : course.hours),
    0,
  ),
});
export const tracks = [
  {
    en: "Frontend Development",
    ar: "تطوير واجهات الويب",
    icon: "</>",
    available: true,
  },
  {
    en: "Backend Development",
    ar: "تطوير الخوادم",
    icon: "{ }",
    available: false,
  },
  {
    en: "Full Stack Development",
    ar: "تطوير الويب المتكامل",
    icon: "⌘",
    available: false,
  },
  {
    en: "Python Programming",
    ar: "برمجة بايثون",
    icon: "Py",
    available: false,
  },
  {
    en: "AI & Machine Learning",
    ar: "الذكاء الاصطناعي",
    icon: "✧",
    available: false,
  },
];
