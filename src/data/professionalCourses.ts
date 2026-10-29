import type { Course, CourseLevel, CourseSession, Localized } from "./courses";

const l = (en: string, ar: string): Localized => ({ en, ar });
interface StructuredLevel extends CourseLevel {
  id: string;
  sessions: CourseSession[];
  hoursPerSession: number;
  price: number;
  project: Localized;
}
// Topic lists stay paired by index; both languages are authored together.
function session(
  number: number,
  title: Localized,
  en: string,
  ar: string,
  practiceTask: Localized,
): CourseSession {
  const english = en.split(" | ");
  const arabic = ar.split(" | ");
  if (english.length !== arabic.length)
    throw new Error(`Unpaired topics: ${title.en}`);
  return {
    number,
    title,
    topics: english.map((topic, i) => l(topic, arabic[i])),
    practiceTask,
    learningObjectives: [practiceTask],
  };
}
function level(
  id: string,
  title: Localized,
  price: number,
  project: Localized,
  sessions: CourseSession[],
  prerequisites?: Localized,
): StructuredLevel {
  return {
    ...title,
    id,
    price,
    project,
    sessions,
    hoursPerSession: 2,
    prerequisites,
  };
}
function professionalCourse(
  data: Omit<
    Course,
    | "price"
    | "sessions"
    | "hours"
    | "outcomes"
    | "faq"
    | "levels"
    | "progression"
  > & { levels: StructuredLevel[]; progression: Localized },
): Course {
  const first = data.levels[0];
  const sessions = first.sessions.length;
  return {
    ...data,
    collection: "professional",
    price: first.price,
    sessions,
    hours: sessions * first.hoursPerSession,
    outcomes: data.levels.map((item) => item.project),
    faq: [
      {
        q: l(
          `What should I know before ${data.name}?`,
          `ما المتطلبات السابقة لكورس ${data.name}؟`,
        ),
        a: data.prerequisites,
      },
      {
        q: l("Is the fee for the entire course?", "هل السعر للكورس بالكامل؟"),
        a: l(
          "Fees are per student, per level. Each level is paid separately. One live two-hour session runs each week; schedules are arranged on request.",
          "السعر لكل طالب ولكل مستوى، ويُدفع كل مستوى بشكل منفصل. محاضرة مباشرة أسبوعيًا مدتها ساعتان، والمواعيد تُحدّد حسب الطلب.",
        ),
      },
      {
        q: l("What will I build?", "ما المشروع الذي سأبنيه؟"),
        a: data.levels[data.levels.length - 1].project,
      },
      {
        q: l("What can I learn next?", "ما الخطوة التالية في التعلم؟"),
        a: data.progression,
      },
    ],
  };
}

export const professionalCourses: Course[] = [
  professionalCourse({
    slug: "git-github",
    oldPrice: 1000,
    name: "Git & GitHub",
    color: "#ed744c",
    symbol: "Git",
    category: "tools",
    difficulty: "beginner",
    scheduleOnRequest: true,
    description: l(
      "Track changes, collaborate confidently, and manage real projects with Git & GitHub.",
      "تتبّع التغييرات وتعاون بثقة وأدِر مشاريع حقيقية باستخدام Git وGitHub.",
    ),
    prerequisites: l(
      "Basic HTML knowledge and familiarity with a code editor.",
      "معرفة أساسية بـ HTML واستخدام محرر الأكواد.",
    ),
    audience: l(
      "Students and new developers ready to track their work and collaborate on a shared repository.",
      "الطلاب والمطورون الجدد الراغبون في تنظيم عملهم والتعاون داخل مستودع مشترك.",
    ),
    progression: l(
      "Start after basic HTML, and use Git alongside CSS, JavaScript, and React. Advanced CI/CD is outside this introductory course. Demonstrated skills can replace a separate paid tools course.",
      "ابدأ بعد أساسيات HTML واستخدم Git أثناء تعلم CSS وJavaScript وReact. خطوط CI/CD المتقدمة خارج نطاق هذا الكورس التمهيدي. إثبات المهارة يغني عن شراء كورس أدوات منفصل.",
    ),
    levels: [
      level(
        "git-1",
        l(
          "Version Control & Collaboration",
          "إدارة الإصدارات والتعاون البرمجي",
        ),
        700,
        l(
          "Manage a small multi-page website in GitHub using branches, meaningful commits, pull requests, and documented changes.",
          "أدِر موقعًا صغيرًا متعدد الصفحات على GitHub باستخدام الفروع وعمليات commit الواضحة وطلبات الدمج وتوثيق التغييرات.",
        ),
        [
          session(
            1,
            l("Git Fundamentals", "أساسيات Git"),
            "Version control | Git vs GitHub | Installation and configuration | Repositories and working directory | git init, status, add, commit, log | Understanding changes and commits",
            "إدارة الإصدارات | الفرق بين Git وGitHub | التثبيت والإعداد | المستودعات ومجلد العمل | أوامر git init وstatus وadd وcommit وlog | فهم التغييرات وعمليات commit",
            l(
              "Track an HTML project in Git.",
              "تتبّع مشروع HTML باستخدام Git.",
            ),
          ),
          session(
            2,
            l("Branches & Local Workflows", "الفروع وسير العمل المحلي"),
            "Branches and HEAD | git branch and switch | Merging changes | Merge conflicts | git diff and restore | Undoing mistakes safely",
            "الفروع ومؤشر HEAD | أوامر git branch وswitch | دمج التغييرات | تعارضات الدمج | أوامر git diff وrestore | التراجع الآمن عن الأخطاء",
            l(
              "Build two features on separate branches and merge them.",
              "ابنِ ميزتين في فرعين منفصلين ثم ادمجهما.",
            ),
          ),
          session(
            3,
            l("GitHub & Remote Collaboration", "GitHub والتعاون عن بُعد"),
            "Creating GitHub repositories | SSH/HTTPS authentication overview | git clone, remote, push, pull, fetch | README and .gitignore | Pull requests and code reviews | GitHub Issues basics",
            "إنشاء مستودعات GitHub | نظرة على المصادقة عبر SSH وHTTPS | أوامر git clone وremote وpush وpull وfetch | ملفات README و.gitignore | طلبات الدمج ومراجعة الكود | أساسيات GitHub Issues",
            l(
              "Collaborate through a documented pull request.",
              "تعاون مع زميل من خلال طلب دمج موثّق.",
            ),
          ),
          session(
            4,
            l(
              "Professional Workflow & Final Project",
              "سير العمل الاحترافي والمشروع النهائي",
            ),
            "Feature branch workflow | Reviewing pull requests | Resolving merge conflicts | GitHub Actions introduction | Basic repository security | Final collaborative project",
            "سير العمل بفروع الميزات | مراجعة طلبات الدمج | حل تعارضات الدمج | مقدمة في GitHub Actions | أساسيات أمان المستودع | المشروع التعاوني النهائي",
            l(
              "Review and merge the team website with a clear change history.",
              "راجع موقع الفريق وادمجه مع توثيق واضح لسجل التغييرات.",
            ),
          ),
        ],
      ),
    ],
  }),
  professionalCourse({
    slug: "tailwind-css",
    oldPrice: 1100,
    name: "Tailwind CSS",
    color: "#38bdf8",
    symbol: "≈",
    category: "styling",
    difficulty: "intermediateBeginner",
    scheduleOnRequest: true,
    description: l(
      "Apply your CSS skills to responsive, reusable interfaces with Tailwind CSS v4.",
      "طبّق مهارات CSS لبناء واجهات متجاوبة وقابلة لإعادة الاستخدام باستخدام Tailwind CSS v4.",
    ),
    prerequisites: l(
      "HTML, CSS fundamentals, Flexbox, Grid, and responsive design.",
      "HTML وأساسيات CSS وFlexbox وGrid والتصميم المتجاوب.",
    ),
    audience: l(
      "Learners comfortable with CSS who want a consistent utility-first workflow for modern interfaces.",
      "متعلمون يجيدون CSS ويريدون أسلوبًا منظمًا لبناء واجهات حديثة بفئات الأدوات.",
    ),
    progression: l(
      "Take after CSS; continue to JavaScript and React. This optional styling course applies existing CSS knowledge rather than repeating the box model or responsive theory. Equivalent skills are welcome.",
      "ابدأ بعد CSS ثم واصل إلى JavaScript وReact. هذا كورس تنسيق اختياري يطبّق معرفة CSS، دون إعادة شرح نموذج الصندوق أو نظرية التجاوب. يمكنك الاعتماد على مهاراتك المكافئة.",
    ),
    levels: [
      level(
        "tailwind-1",
        l(
          "Modern UI Development with Tailwind",
          "بناء واجهات حديثة باستخدام Tailwind",
        ),
        900,
        l(
          "Create a responsive landing page with light/dark modes and reusable Tailwind components.",
          "أنشئ صفحة هبوط متجاوبة بوضعين فاتح وداكن ومكونات Tailwind قابلة لإعادة الاستخدام.",
        ),
        [
          session(
            1,
            l("Tailwind Fundamentals", "أساسيات Tailwind"),
            "Utility-first styling | Tailwind v4 with Vite and @tailwindcss/vite | Utility classes | Spacing and sizing | Colors and typography | States and variants",
            "التنسيق بفئات الأدوات | إعداد Tailwind v4 مع Vite وإضافة @tailwindcss/vite | فئات الأدوات | المسافات والأحجام | الألوان والخطوط | الحالات والمتغيرات",
            l(
              "Convert a CSS component into Tailwind using the v4 CSS import.",
              "حوّل مكون CSS إلى Tailwind باستخدام استيراد CSS الخاص بالإصدار الرابع.",
            ),
          ),
          session(
            2,
            l("Layouts & Responsive Design", "التخطيطات والتصميم المتجاوب"),
            "Flexbox utilities | Grid utilities | Breakpoints | Mobile-first styling | Container and width utilities | Responsive navigation",
            "أدوات Flexbox | أدوات Grid | نقاط التوقف | التنسيق بدءًا من الهاتف | أدوات الحاويات والعرض | التنقل المتجاوب",
            l(
              "Build a responsive page structure and navigation.",
              "ابنِ هيكل صفحة وقائمة تنقل متجاوبين.",
            ),
          ),
          session(
            3,
            l(
              "Components & Reusable Patterns",
              "المكونات والأنماط القابلة لإعادة الاستخدام",
            ),
            "Buttons and cards | Forms and inputs | Navigation components | State-based styles | Component extraction | Avoiding repeated utility strings",
            "الأزرار والبطاقات | النماذج وحقول الإدخال | مكونات التنقل | التنسيق حسب الحالة | استخراج المكونات | تقليل تكرار سلاسل فئات الأدوات",
            l(
              "Create a small reusable component collection.",
              "أنشئ مجموعة صغيرة من المكونات القابلة لإعادة الاستخدام.",
            ),
          ),
          session(
            4,
            l("Theming & Advanced Styling", "الثيمات والتنسيق المتقدم"),
            "Theme tokens with @theme | CSS variables | Dark mode | Hover, focus, active states | Transitions and animations | Accessible color contrast",
            "رموز الثيم باستخدام @theme | متغيرات CSS | الوضع الداكن | حالات hover وfocus وactive | الانتقالات والحركة | تباين الألوان المناسب لإتاحة الوصول",
            l(
              "Build a consistent light/dark interface with visible focus states.",
              "ابنِ واجهة متناسقة بوضعين فاتح وداكن وحالات تركيز واضحة.",
            ),
          ),
          session(
            5,
            l("Final Practical Project", "المشروع العملي النهائي"),
            "Complete responsive website | Reusable components | Multi-section layout | Mobile navigation | Theme consistency | Accessibility checks | Final code review",
            "موقع متجاوب متكامل | مكونات قابلة لإعادة الاستخدام | تخطيط متعدد الأقسام | قائمة تنقل للهاتف | اتساق الثيم | فحوص إتاحة الوصول | مراجعة الكود النهائية",
            l(
              "Deliver and review the responsive landing page.",
              "سلّم صفحة الهبوط المتجاوبة وراجع الكود.",
            ),
          ),
        ],
      ),
    ],
  }),
  professionalCourse({
    slug: "typescript",
    oldPrice: 1400,
    name: "TypeScript",
    color: "#66a8fb",
    symbol: "TS",
    category: "languages",
    difficulty: "intermediate",
    scheduleOnRequest: true,
    description: l(
      "Add type safety to JavaScript, then build confidently typed React applications.",
      "أضف أمان الأنواع إلى JavaScript ثم ابنِ تطبيقات React بأنواع واضحة وموثوقة.",
    ),
    prerequisites: l(
      "Solid JavaScript: functions, objects, arrays, modules, and async programming. Level 2 also requires Level 1 and React fundamentals.",
      "إتقان JavaScript: الدوال والكائنات والمصفوفات والوحدات والبرمجة غير المتزامنة. المستوى الثاني يتطلب المستوى الأول وأساسيات React.",
    ),
    audience: l(
      "JavaScript developers ready to model data safely, and React developers who want to type an existing skill set.",
      "مطورو JavaScript الراغبون في نمذجة البيانات بأمان، ومطورو React الراغبون في تطبيق الأنواع على مهاراتهم الحالية.",
    ),
    progression: l(
      "JavaScript → TypeScript Level 1. React + TypeScript Level 1 → Level 2, then Next.js. Static types do not validate external runtime data: validate API responses explicitly. JSX and introductory Hooks are prerequisites, not repeated lessons.",
      "JavaScript ثم المستوى الأول من TypeScript. React مع المستوى الأول يؤهلان للمستوى الثاني ثم Next.js. الأنواع الساكنة لا تتحقق من البيانات الخارجية وقت التشغيل؛ يجب التحقق من استجابات API صراحةً. JSX وHooks التمهيدية متطلبات سابقة ولا تُعاد دراستها.",
    ),
    levels: [
      level(
        "ts-1",
        l("TypeScript Fundamentals", "أساسيات TypeScript"),
        1200,
        l(
          "Build a typed task-management data module with domain models, utility functions, and safe API parsing.",
          "ابنِ وحدة بيانات لإدارة المهام بنماذج نطاق ودوال مساعدة ذات أنواع واضحة وتحليل آمن لبيانات API.",
        ),
        [
          session(
            1,
            l("Introduction & Type System", "المقدمة ونظام الأنواع"),
            "Why TypeScript? | Compilation | tsconfig basics | Type inference | Primitive types | Arrays and tuples | Type annotations",
            "لماذا TypeScript؟ | الترجمة | أساسيات tsconfig | استنتاج الأنواع | الأنواع الأولية | المصفوفات والصفوف الثابتة | توصيف الأنواع",
            l(
              "Compile typed exercises and explain inferred types.",
              "ترجم تمارين ذات أنواع محددة واشرح الأنواع المستنتجة.",
            ),
          ),
          session(
            2,
            l("Objects & Type Modeling", "الكائنات ونمذجة الأنواع"),
            "Object types | Type aliases | Interfaces | Optional and readonly properties | Union types | Literal types | Type narrowing",
            "أنواع الكائنات | الأسماء البديلة للأنواع | الواجهات | الخصائص الاختيارية وللقراءة فقط | الأنواع الاتحادية | الأنواع الحرفية | تضييق الأنواع",
            l(
              "Model application data with unions and interfaces.",
              "نمذج بيانات تطبيق باستخدام الأنواع الاتحادية والواجهات.",
            ),
          ),
          session(
            3,
            l("Functions & Generics", "الدوال والأنواع العامة"),
            "Typed parameters and returns | Optional and default parameters | Function signatures | Generics | Generic constraints | Reusable utilities",
            "أنواع المعاملات والقيم المعادة | المعاملات الاختيارية والافتراضية | تواقيع الدوال | الأنواع العامة Generics | قيود الأنواع العامة | أدوات قابلة لإعادة الاستخدام",
            l(
              "Write typed reusable utility functions.",
              "اكتب دوال مساعدة ذات أنواع واضحة وقابلة لإعادة الاستخدام.",
            ),
          ),
          session(
            4,
            l("Advanced Type Safety", "أمان الأنواع المتقدم"),
            "Discriminated unions | keyof and indexed access | Utility types | Partial, Pick, Omit, Record | unknown vs any | Type guards",
            "الأنواع الاتحادية المميزة | keyof والوصول بالفهرس | الأنواع المساعدة | Partial وPick وOmit وRecord | الفرق بين unknown وany | حراس الأنواع",
            l(
              "Create type-safe application models with type guards.",
              "أنشئ نماذج تطبيق آمنة باستخدام حراس الأنواع.",
            ),
          ),
          session(
            5,
            l("Practical TypeScript Project", "مشروع TypeScript العملي"),
            "Typed modules | Data models | Safe API handling and runtime parsing | Compiler errors | Refactoring JavaScript | Final assessment",
            "وحدات ذات أنواع واضحة | نماذج البيانات | التعامل الآمن مع API والتحقق وقت التشغيل | أخطاء المترجم | إعادة هيكلة JavaScript | التقييم النهائي",
            l(
              "Deliver the task data module and reject malformed API data at runtime.",
              "سلّم وحدة بيانات المهام وارفض بيانات API غير الصالحة وقت التشغيل.",
            ),
          ),
        ],
      ),
      level(
        "ts-2",
        l("TypeScript with React", "TypeScript مع React"),
        1200,
        l(
          "Create a React + TypeScript project-management dashboard with a typed API layer and strongly typed state management.",
          "أنشئ لوحة لإدارة المشاريع باستخدام React وTypeScript مع طبقة API وإدارة حالة ذات أنواع دقيقة.",
        ),
        [
          session(
            1,
            l(
              "React Components with TypeScript",
              "مكونات React باستخدام TypeScript",
            ),
            "React TypeScript setup | Component prop types | Children and composition | Typed events | Optional props",
            "إعداد React مع TypeScript | أنواع خصائص المكونات | Children وتركيب المكونات | أنواع الأحداث | الخصائص الاختيارية",
            l(
              "Type reusable React components without repeating JSX fundamentals.",
              "أضف الأنواع إلى مكونات React قابلة لإعادة الاستخدام دون إعادة أساسيات JSX.",
            ),
          ),
          session(
            2,
            l("Hooks & State", "أنواع Hooks والحالة"),
            "Typed useState | Typed useReducer | Typed useRef | Custom typed hooks | Generic hooks",
            "أنواع useState | أنواع useReducer | أنواع useRef | Hooks مخصصة ذات أنواع واضحة | Hooks عامة",
            l(
              "Build typed forms and state transitions.",
              "ابنِ نماذج وانتقالات حالة ذات أنواع واضحة.",
            ),
          ),
          session(
            3,
            l("API Integration", "دمج API"),
            "API response types | Async state models | Error and loading states | Runtime input validation | Typed API services",
            "أنواع استجابات API | نماذج الحالة غير المتزامنة | حالات الخطأ والتحميل | التحقق من المدخلات وقت التشغيل | خدمات API ذات أنواع واضحة",
            l(
              "Implement a data-driven React feature with validated API responses.",
              "نفّذ ميزة React تعتمد على البيانات مع التحقق من استجابات API.",
            ),
          ),
          session(
            4,
            l("Typed Application Architecture", "هيكلة التطبيقات ذات الأنواع"),
            "Feature-based types | Shared interfaces | Typed context | Typed Zustand stores | Generic reusable components | Maintainable structure",
            "أنواع منظمة حسب الميزة | واجهات مشتركة | Context ذو أنواع واضحة | مخازن Zustand ذات أنواع واضحة | مكونات عامة قابلة لإعادة الاستخدام | بنية سهلة الصيانة",
            l(
              "Organize dashboard types, context, and a Zustand store.",
              "نظّم أنواع لوحة التحكم وContext ومخزن Zustand.",
            ),
          ),
          session(
            5,
            l(
              "Final React + TypeScript Project",
              "المشروع النهائي باستخدام React وTypeScript",
            ),
            "Typed React features | API integration | Typed state management | Error handling | Refactoring and review",
            "ميزات React ذات أنواع واضحة | دمج API | إدارة الحالة بالأنواع | معالجة الأخطاء | إعادة الهيكلة ومراجعة الكود",
            l(
              "Deliver the project-management dashboard with safe async states.",
              "سلّم لوحة إدارة المشاريع بحالات غير متزامنة آمنة.",
            ),
          ),
        ],
        l(
          "TypeScript Level 1 and React fundamentals are required.",
          "يشترط إتمام المستوى الأول من TypeScript وإتقان أساسيات React.",
        ),
      ),
    ],
  }),
  professionalCourse({
    slug: "nextjs",
    oldPrice: 1800,
    name: "Next.js",
    color: "#b5a3ef",
    symbol: "N",
    category: "frameworks",
    difficulty: "advanced",
    scheduleOnRequest: true,
    description: l(
      "Build modern App Router applications, add focused full-stack features, and prepare them for production.",
      "ابنِ تطبيقات حديثة باستخدام App Router وأضف ميزات متكاملة محددة وجهّزها للإنتاج.",
    ),
    prerequisites: l(
      "React fundamentals, React Router concepts, and JavaScript async programming. TypeScript fundamentals are recommended.",
      "أساسيات React ومفاهيم React Router والبرمجة غير المتزامنة في JavaScript. يُنصح بأساسيات TypeScript.",
    ),
    audience: l(
      "React developers ready for server rendering, secure full-stack features, and production delivery.",
      "مطورو React المستعدون للتصيير على الخادم وإضافة ميزات متكاملة آمنة وتجهيز التطبيقات للإنتاج.",
    ),
    progression: l(
      "React + TypeScript → Next.js. Git and Tailwind are optional supporting skills, not mandatory paid prerequisites. Backend topics stay focused on Next.js. Build the capstone incrementally across all three levels; the final session is for presentation and review, not building a commercial LMS from scratch.",
      "React مع TypeScript ثم Next.js. Git وTailwind مهارات مساعدة اختيارية وليسا كورسين مدفوعين إلزاميين. موضوعات الخادم محددة باحتياجات Next.js. يُبنى المشروع تدريجيًا خلال المستويات الثلاثة، والمحاضرة الأخيرة للعرض والمراجعة وليست لبناء منصة تجارية من الصفر.",
    ),
    levels: [
      level(
        "next-1",
        l("Next.js Fundamentals", "أساسيات Next.js"),
        1600,
        l(
          "Build a multi-page academy course catalog with dynamic course details.",
          "ابنِ دليل كورسات لأكاديمية متعدد الصفحات مع تفاصيل ديناميكية لكل كورس.",
        ),
        [
          session(
            1,
            l("Introduction & Architecture", "المقدمة والهيكلة"),
            "React vs Next.js | Framework overview | Project structure | App Router | Development setup | Layouts and pages",
            "الفرق بين React وNext.js | نظرة على إطار العمل | هيكل المشروع | App Router | إعداد التطوير | التخطيطات والصفحات",
            l(
              "Create your first App Router application.",
              "أنشئ تطبيقك الأول باستخدام App Router.",
            ),
          ),
          session(
            2,
            l("Routing & Navigation", "التوجيه والتنقل"),
            "File-system routing | Dynamic routes | Nested layouts | Navigation | Route parameters | Not-found pages",
            "التوجيه حسب الملفات | المسارات الديناميكية | التخطيطات المتداخلة | التنقل | معاملات المسار | صفحات عدم العثور",
            l(
              "Build a multi-page course website with async route parameters.",
              "ابنِ موقع كورسات متعدد الصفحات بمعاملات مسارات غير متزامنة.",
            ),
          ),
          session(
            3,
            l("Server & Client Components", "مكونات الخادم والعميل"),
            "Server Components | Client Components | Component boundaries | Client-side state decisions | Rendering considerations",
            "مكونات الخادم | مكونات العميل | الحدود بين المكونات | اختيار موضع حالة العميل | اعتبارات التصيير",
            l(
              "Compose a hybrid page with a small interactive client boundary.",
              "ركّب صفحة هجينة بحدود واضحة لجزء تفاعلي صغير على العميل.",
            ),
          ),
          session(
            4,
            l("Data Fetching", "جلب البيانات"),
            "Async Server Components | Server-side data access | Loading and error states | Request handling | Explicit caching and revalidation concepts",
            "مكونات خادم غير متزامنة | الوصول إلى البيانات على الخادم | حالات التحميل والخطأ | معالجة الطلبات | التخزين المؤقت الصريح ومفاهيم إعادة التحقق",
            l(
              "Build a course listing backed by sample data.",
              "ابنِ قائمة كورسات تعتمد على بيانات تجريبية.",
            ),
          ),
          session(
            5,
            l(
              "Styling, Metadata & Assets",
              "التنسيق والبيانات الوصفية والأصول",
            ),
            "Tailwind integration | Fonts and images | Metadata APIs | SEO basics | Responsive layout | Accessibility",
            "دمج Tailwind | الخطوط والصور | واجهات البيانات الوصفية | أساسيات SEO | التخطيط المتجاوب | إتاحة الوصول",
            l(
              "Create a production-style course page with metadata.",
              "أنشئ صفحة كورس احترافية ببيانات وصفية مناسبة.",
            ),
          ),
          session(
            6,
            l("Level Project", "مشروع المستوى"),
            "Layouts and routing integration | Server/client composition | Data fetching | Loading states | SEO | Project review",
            "دمج التخطيطات والتوجيه | تركيب مكونات الخادم والعميل | جلب البيانات | حالات التحميل | SEO | مراجعة المشروع",
            l(
              "Integrate and review the academy course catalog.",
              "ادمج دليل كورسات الأكاديمية وراجعه.",
            ),
          ),
        ],
      ),
      level(
        "next-2",
        l("Full-Stack Features in Next.js", "ميزات الويب المتكاملة في Next.js"),
        1600,
        l(
          "Build a simple authenticated student portal with persistent enrollment data.",
          "ابنِ بوابة طلاب بسيطة بتسجيل دخول وبيانات تسجيل محفوظة.",
        ),
        [
          session(
            1,
            l("Route Handlers", "معالجات المسارات"),
            "Route handlers | HTTP methods | Request and response | Input validation | Error handling",
            "معالجات المسارات | طرق HTTP | الطلب والاستجابة | التحقق من المدخلات | معالجة الأخطاء",
            l(
              "Implement basic API endpoints with validated input.",
              "نفّذ نقاط API أساسية بمدخلات يتم التحقق منها.",
            ),
          ),
          session(
            2,
            l("Forms & Mutations", "النماذج وتعديل البيانات"),
            "Server Actions | Form handling | Validation | Pending and error states | Revalidation",
            "إجراءات الخادم Server Actions | معالجة النماذج | التحقق | حالات الانتظار والخطأ | إعادة التحقق",
            l(
              "Build a validated enrollment form with server-side authorization.",
              "ابنِ نموذج تسجيل مع تحقق وصلاحيات على الخادم.",
            ),
          ),
          session(
            3,
            l("Database Integration", "دمج قاعدة البيانات"),
            "Database connectivity | PostgreSQL overview | Database access layer | Server-only environment variables | Secure data access",
            "الاتصال بقواعد البيانات | نظرة على PostgreSQL | طبقة الوصول للبيانات | متغيرات بيئة خاصة بالخادم | الوصول الآمن للبيانات",
            l(
              "Persist enrollment data through a server-only data layer.",
              "احفظ بيانات التسجيل عبر طبقة بيانات خاصة بالخادم.",
            ),
          ),
          session(
            4,
            l("Authentication Fundamentals", "أساسيات المصادقة"),
            "Authentication vs authorization | Sessions and cookies | Trusted auth solutions | Protected routes | Server-side access control",
            "المصادقة مقابل الصلاحيات | الجلسات وملفات الارتباط | حلول مصادقة موثوقة | المسارات المحمية | التحكم في الوصول على الخادم",
            l(
              "Protect a student account page and its underlying data.",
              "احمِ صفحة حساب الطالب والبيانات المرتبطة بها.",
            ),
          ),
          session(
            5,
            l("Application Security", "أمان التطبيقات"),
            "Server-side validation | Authorization checks | Sensitive data protection | Environment configuration | Rate-limiting basics | Secure API design",
            "التحقق على الخادم | فحص الصلاحيات | حماية البيانات الحساسة | إعداد البيئة | أساسيات تحديد معدل الطلبات | تصميم API آمن",
            l(
              "Review portal access rules and reject unauthorized mutations.",
              "راجع قواعد الوصول وارفض تعديلات البيانات غير المصرح بها.",
            ),
          ),
          session(
            6,
            l("Level Project", "مشروع المستوى"),
            "Persistent data | Authentication | Secure forms | Protected resources | Application flow testing",
            "البيانات المحفوظة | المصادقة | النماذج الآمنة | الموارد المحمية | اختبار تدفقات التطبيق",
            l(
              "Integrate and test the authenticated student portal.",
              "ادمج بوابة الطلاب واختبرها بعد تسجيل الدخول.",
            ),
          ),
        ],
        l(
          "Next.js Level 1 or equivalent App Router skills.",
          "المستوى الأول من Next.js أو مهارات مكافئة في App Router.",
        ),
      ),
      level(
        "next-3",
        l("Professional Next.js & Deployment", "Next.js الاحترافي والنشر"),
        1600,
        l(
          "Incrementally build and deploy an MVP learning platform with course catalogs, enrollment, authenticated student access, and a small instructor interface. Present the completed work in the final session.",
          "ابنِ تدريجيًا وانشر نسخة أولية محدودة من منصة تعلم تضم دليل كورسات وتسجيلًا ودخولًا محميًا للطلاب وواجهة مبسطة للمدرس. اعرض العمل المكتمل في المحاضرة الأخيرة.",
        ),
        [
          session(
            1,
            l("Rendering & Caching", "التصيير والتخزين المؤقت"),
            "Static vs dynamic rendering | Explicit caching strategies | Revalidation | Performance implications | Debugging stale data",
            "التصيير الثابت والديناميكي | استراتيجيات التخزين المؤقت الصريح | إعادة التحقق | أثر الأداء | تشخيص البيانات القديمة",
            l(
              "Optimize data-driven pages and verify cache invalidation.",
              "حسّن الصفحات المعتمدة على البيانات وتحقق من إبطال التخزين المؤقت.",
            ),
          ),
          session(
            2,
            l("Performance Optimization", "تحسين الأداء"),
            "Image optimization | Font optimization | Bundle awareness | Code splitting | Lazy loading | Core Web Vitals basics",
            "تحسين الصور | تحسين الخطوط | فهم حجم الحزمة | تقسيم الكود | التحميل الكسول | أساسيات مؤشرات أداء الويب",
            l(
              "Measure and improve the platform's performance.",
              "قِس أداء المنصة وحسّنه.",
            ),
          ),
          session(
            3,
            l("Advanced App Architecture", "هيكلة التطبيق المتقدمة"),
            "Route groups | Shared layouts | Error boundaries | Reusable modules | Server/client separation | Maintainability",
            "مجموعات المسارات | التخطيطات المشتركة | حدود الأخطاء | الوحدات القابلة لإعادة الاستخدام | فصل الخادم والعميل | قابلية الصيانة",
            l(
              "Refactor into a feature-based architecture with an instructor interface.",
              "أعد التنظيم حسب الميزات مع واجهة مبسطة للمدرس.",
            ),
          ),
          session(
            4,
            l("Testing & Reliability", "الاختبار والاعتمادية"),
            "Unit testing overview | Component testing | End-to-end testing | Error states | Accessibility testing",
            "نظرة على اختبارات الوحدات | اختبار المكونات | الاختبارات الشاملة | حالات الأخطاء | اختبار إتاحة الوصول",
            l(
              "Test critical enrollment and account flows.",
              "اختبر تدفقات التسجيل والحساب الأساسية.",
            ),
          ),
          session(
            5,
            l("Deployment & Production", "النشر والإنتاج"),
            "Production builds | Vercel deployment | Environment variables | Deployment configuration | Monitoring concepts | Logging and troubleshooting",
            "بناء الإنتاج | النشر على Vercel | متغيرات البيئة | إعداد النشر | مفاهيم المراقبة | السجلات واستكشاف الأخطاء",
            l(
              "Deploy and verify the MVP with production environment settings.",
              "انشر النسخة الأولية وتحقق من إعدادات بيئة الإنتاج.",
            ),
          ),
          session(
            6,
            l("Capstone Presentation", "عرض مشروع التخرج"),
            "Final integration | Production verification | Performance audit | Accessibility review | Live demonstration | Project evaluation",
            "الدمج النهائي | التحقق من الإنتاج | مراجعة الأداء | مراجعة إتاحة الوصول | العرض المباشر | تقييم المشروع",
            l(
              "Present the MVP built across the course and document its scope and limitations.",
              "اعرض النسخة الأولية المبنية خلال الكورس ووثّق نطاقها وحدودها.",
            ),
          ),
        ],
        l(
          "Next.js Levels 1–2 or equivalent practical experience.",
          "المستويان الأول والثاني من Next.js أو خبرة عملية مكافئة.",
        ),
      ),
    ],
  }),
];
