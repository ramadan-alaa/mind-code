import type { Localized } from "./courses";

export interface CourseProject {
  title: Localized;
  description: Localized;
  tag: Localized;
  highlight?: boolean;
}

export const courseProjectsMap: Record<string, CourseProject[]> = {
  html: [
    {
      title: {
        en: "Personal Developer Portfolio",
        ar: "موقع شخصي وبورتفوليو للمطور",
      },
      description: {
        en: "Build a clean, semantic personal portfolio showcasing your biography, skills, projects, and contact links.",
        ar: "ابنِ موقعك الشخصي بتنسيق دلالي نظيف يعرض سيرتك الذاتية ومهاراتك ومشاريعك وروابط التواصل.",
      },
      tag: { en: "Level 1 Project", ar: "مشروع المستوى 1" },
      highlight: true,
    },
    {
      title: {
        en: "Product Landing Page with Accessible Forms",
        ar: "صفحة هبوط تسويقية ونماذج متكاملة",
      },
      description: {
        en: "Craft a multi-section landing page with interactive tables, media embeds, and accessible registration forms.",
        ar: "صمم صفحة هبوط متعددة الأقسام مع جداول منظمة، وسائط مدمجة، ونماذج تسجيل مطابقة للمعايير القياسية.",
      },
      tag: { en: "Capstone Project", ar: "مشروع التخرج" },
    },
  ],
  css: [
    {
      title: {
        en: "Responsive E-Commerce Storefront",
        ar: "واجهة متجر إلكتروني متجاوبة بالكامل",
      },
      description: {
        en: "Design modern responsive product grids using Flexbox, CSS Grid, media queries, and fluid typography.",
        ar: "صمم شبكات منتجات عصرية متجاوبة بالكامل باستخدام Flexbox وCSS Grid وتنسيقات مرنة لكل الشاشات.",
      },
      tag: { en: "Grid & Flexbox", ar: "تصميم متجاوب" },
      highlight: true,
    },
    {
      title: {
        en: "Modern SaaS Dashboard & Glassmorphism UI",
        ar: "لوحة تحكم SaaS بتأثيرات الزجاج والمود الداكن",
      },
      description: {
        en: "Build a dark/light mode dashboard with sleek glassmorphism, micro-interactions, CSS variables, and keyframe animations.",
        ar: "ابنِ لوحة تحكم تدعم المود الليلي والنهاري مع تأثيرات Glassmorphism وانتقالات ناعمة ومتغيرات CSS.",
      },
      tag: { en: "Capstone Project", ar: "مشروع التخرج" },
    },
  ],
  javascript: [
    {
      title: {
        en: "Interactive Task & Habit Tracker",
        ar: "تطبيق تفاعلي لإدارة المهام والعادات اليومية",
      },
      description: {
        en: "Create a rich CRUD application with DOM events, filtering, priority flags, and persistent LocalStorage.",
        ar: "أنشئ تطبيقاً تفاعلياً لإدارة المهام مع تصنيفات وفلاتر وحفظ دائم للبيانات في الذاكرة المحلية LocalStorage.",
      },
      tag: { en: "DOM & LocalStorage", ar: "تطبيق تفاعلي" },
      highlight: true,
    },
    {
      title: {
        en: "Live Weather & Currency Intelligence Hub",
        ar: "منصة بيانات الطقس والعملات عبر Rest API",
      },
      description: {
        en: "Fetch live data with async/await, handle loading and error states gracefully, and present real-time visual metrics.",
        ar: "اربط واجهات برمجة التطبيقات API باستخدام Async/Await مع معالجة احترافية لحالات التحميل والأخطاء.",
      },
      tag: { en: "Async & REST APIs", ar: "ربط واجهات API" },
    },
    {
      title: {
        en: "Interactive Speed Typing Challenge",
        ar: "لعبة تفاعلية لاختبار سرعة ودقة الكتابة",
      },
      description: {
        en: "Build a real-time typing game measuring words-per-minute (WPM), accuracy, high scores, and sound feedback.",
        ar: "ابنِ لعبة حية تحسب سرعة الكلمات بالدقيقة ودقة الكتابة مع حفظ أعلى الأرقام القياسية والتفاعل الصوتي.",
      },
      tag: { en: "Capstone Project", ar: "مشروع التخرج" },
    },
  ],
  react: [
    {
      title: {
        en: "Dynamic Course & Learning Hub",
        ar: "منصة كورسات تفاعلية مع سلة ومفضلة",
      },
      description: {
        en: "Build reusable UI components, custom hooks, dynamic routing, search & filter system, and persistent state.",
        ar: "ابنِ منصة تعليمية متكاملة بمكونات قابلة لإعادة الاستخدام، راوتر متقدم، نظام بحث وتصفية، وإدارة حالة نظيفة.",
      },
      tag: { en: "Components & Hooks", ar: "مكونات وHooks" },
      highlight: true,
    },
    {
      title: {
        en: "Modern Analytics Dashboard with Global State",
        ar: "لوحة تحكم وتحليلات متقدمة مع Zustand",
      },
      description: {
        en: "Craft a scalable dashboard with Zustand state management, API integration, data visualizations, and dark mode.",
        ar: "طور لوحة تحكم بمقاييس ورسوم بيانية وإدارة الحالة العالمية باستخدام Zustand والربط مع خادم خارجي.",
      },
      tag: { en: "Zustand & APIs", ar: "إدارة الحالة" },
    },
    {
      title: {
        en: "Full-Stack Ready SaaS Platform",
        ar: "تطبيق ويب SaaS متكامل ومجهز للإنتاج",
      },
      description: {
        en: "Design architecture, optimized code-splitting, custom design system, and deployment ready production build.",
        ar: "هيكلة معمارية كاملة للتطبيق مع تقسيم الكود لتحسين السرعة، ونظام تصميم متكامل جاهز للنشر على السحابة.",
      },
      tag: { en: "Capstone Project", ar: "مشروع التخرج" },
    },
  ],
};

export const levelProjectsMap: Record<string, Localized[]> = {
  html: [
    {
      en: "Hands-on Project: Personal Bio & Portfolio Page",
      ar: "المشروع العملي: موقع شخصي متكامل وصفحة سيرة ذاتية",
    },
    {
      en: "Capstone Project: Modern Landing Page with Accessible Forms",
      ar: "مشروع التخرج: صفحة هبوط تسويقية ونماذج تسجيل قياسية",
    },
  ],
  css: [
    {
      en: "Hands-on Project: Typographic Article & Component Library",
      ar: "المشروع العملي: مكتبة مكونات ومقالة بتنسيق تايبوغرافي فائق الجمال",
    },
    {
      en: "Hands-on Project: Responsive E-Commerce Product Catalog",
      ar: "المشروع العملي: كتالوج منتجات متجر متجاوب بالكامل مع Flex & Grid",
    },
    {
      en: "Capstone Project: Modern SaaS Dashboard with Dark Mode & Animations",
      ar: "مشروع التخرج: لوحة تحكم متكاملة تدعم الوضع الليلي وانتقالات احترافية",
    },
  ],
  javascript: [
    {
      en: "Hands-on Project: Interactive Calculator & Logic Games",
      ar: "المشروع العملي: آلة حاسبة ذكية وتطبيقات تدريبية على المنطق البرمجي",
    },
    {
      en: "Hands-on Project: Dynamic Todo & Task Tracker with LocalStorage",
      ar: "المشروع العملي: تطبيق إدارة مهام تفاعلي مع حفظ محلي LocalStorage",
    },
    {
      en: "Hands-on Project: Live Weather App with REST APIs & Async/Await",
      ar: "المشروع العملي: تطبيق طقس حي متصل بواجهات REST API وAsync/Await",
    },
    {
      en: "Capstone Project: Modular Web Application with Data Persistence",
      ar: "مشروع التخرج: تطبيق ويب متكامل بتقسيم معياري للكود وقواعد بيانات محلية",
    },
  ],
  react: [
    {
      en: "Hands-on Project: Interactive Flashcards & Quiz App",
      ar: "المشروع العملي: تطبيق بطاقات تعليمية واختبارات تفاعلية بالمكونات والحالة",
    },
    {
      en: "Hands-on Project: Multi-page Movie Explorer with React Router",
      ar: "المشروع العملي: منصة استكشاف أفلام متعددة الصفحات بـ React Router",
    },
    {
      en: "Hands-on Project: E-Commerce Store with Zustand Global Cart",
      ar: "المشروع العملي: متجر إلكتروني مع سلة تسوق وإدارة حالة بـ Zustand",
    },
    {
      en: "Capstone Project: Production-Ready SaaS Application",
      ar: "مشروع التخرج: تطبيق ويب تجاري متكامل ومحسن للأداء العالي",
    },
  ],
};
