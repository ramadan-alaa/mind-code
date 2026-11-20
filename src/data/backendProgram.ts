import type { Course, CourseLevel, CourseSession, Localized } from "./courses";

const text = (en: string, ar: string): Localized => ({ en, ar });
const session = (
  number: number,
  title: Localized,
  topics: Localized[],
  practiceTask: Localized,
  learningObjectives: Localized[],
): CourseSession => ({
  number,
  title,
  topics,
  practiceTask,
  learningObjectives,
});
const level = (
  number: number,
  title: Localized,
  overview: Localized,
  prerequisites: Localized,
  project: Localized,
  outcomes: Localized[],
  sessions: CourseSession[],
): CourseLevel => ({
  ...title,
  id: `backend-level-${number}`,
  slug: `level-${number}`,
  price: 1800,
  hoursPerSession: 2,
  overview,
  prerequisites,
  project,
  outcomes,
  sessions,
});

export const backendProgram: Course = {
  slug: "backend",
  name: "Back-End Development with C# & ASP.NET Core",
  localizedName: text(
    "Back-End Development with C# & ASP.NET Core",
    "تطوير الـBack-End باستخدام C# وASP.NET\u00a0Core",
  ),
  program: true,
  color: "#b5a3ef",
  symbol: "C#",
  price: 1800,
  sessions: 6,
  hours: 12,
  difficulty: "beginner",
  category: "languages",
  ageRecommendation: text(
    "Around age 16+ or suitable programming readiness",
    "من ١٦ سنة وطالع، أو حسب الاستعداد البرمجي",
  ),
  audience: text(
    "Learners aged around 16+ or with suitable programming readiness who want a guided introduction to C# backend development.",
    "للطلاب من حوالي ١٦ سنة وطالع، أو اللي عندهم استعداد برمجي مناسب، وعايزين يبدأوا تطوير الـBack-End بـC# بإرشاد المدرب.",
  ),
  cardDescription: text(
    "Back-End development with C# and ASP.NET Core: console apps, databases and a small authenticated API. Live, practical and 100% online; recommended for 16+ or suitable readiness.",
    "تطوير الـ Back-End باستخدام C# وASP.NET Core. من تطبيقات Console لقواعد البيانات وAPI صغيرة بتسجيل دخول. أونلاين 100%، لايف وتطبيق عملي؛ من ١٦ سنة أو حسب الاستعداد.",
  ),
  description: text(
    "Learn Back-End Development with C# & ASP.NET Core in four progressive levels: C# and OOP, modern C# and SOLID, SQL Server and EF Core, then a small authenticated Web API. All sessions are live, interactive, practical and 100% online, with instructor guidance.",
    "تطوير الـ Back-End باستخدام C# وASP.NET Core في ٤ مستويات متدرجة: نبدأ بـC# وOOP، ونحسن تنظيم الكود بـSOLID، ونتعامل مع SQL Server وEF Core، وبعدها نبني Web API صغيرة بتسجيل دخول. الدراسة أونلاين 100%، بمحاضرات مباشرة وتفاعلية فيها شرح وتطبيق ومراجعة مع المدرب.",
  ),
  prerequisites: text(
    "A computer, stable internet and basic computer skills. No previous C# experience is required for level 1. We help prepare the .NET environment and a local SQL Server setup before level 3; later levels require the previous level or equivalent knowledge.",
    "كمبيوتر وإنترنت مستقر ومعرفة أساسية باستخدام الملفات والكيبورد. مش محتاج خبرة سابقة بـC# للمستوى الأول. بنساعدك تجهز بيئة .NET، وتجهيز SQL Server محلي قبل المستوى التالت. كل مستوى بعد الأول محتاج المستوى اللي قبله أو معرفة مكافئة.",
  ),
  outcomes: [
    text(
      "Build small console applications using C#, OOP and collections.",
      "تكتب تطبيقات Console صغيرة بـC# وOOP وCollections.",
    ),
    text(
      "Improve code using SOLID, async workflows and safe null handling.",
      "تحسن تنظيم الكود بـSOLID وتستخدم Async وتتعامل مع Null بشكل آمن.",
    ),
    text(
      "Store and query relational data using SQL Server, LINQ and EF Core.",
      "تخزن البيانات وتسترجعها باستخدام SQL Server وLINQ وEF Core.",
    ),
    text(
      "Build and test a small authenticated ASP.NET Core Web API under instructor guidance.",
      "تبني وتختبر ASP.NET Core Web API صغيرة بتسجيل دخول بإرشاد المدرب؛ المسار تمهيدي ومش ضمان للجاهزية للشغل أو إتقان أمان أنظمة الإنتاج.",
    ),
  ],
  faq: [
    {
      q: text("How is the track delivered?", "الدراسة بتكون إزاي؟"),
      a: text(
        "100% online through live, interactive, practical sessions. Each level has six two-hour sessions. Ask us about available schedules.",
        "أونلاين 100% بمحاضرات لايف تفاعلية، فيها شرح وتطبيق ومراجعة. كل مستوى ٦ محاضرات، كل محاضرة ساعتين. اسألنا عن المواعيد المتاحة.",
      ),
    },
    {
      q: text("What does the track cost?", "سعر المستوى والمسار كامل كام؟"),
      a: text(
        "Each level costs 1,800 EGP per learner. All four levels cost 7,200 EGP for 24 sessions and 48 teaching hours. You can inquire about one level at a time.",
        "كل مستوى بـ1,800 جنيه لكل طالب. الأربع مستويات بـ7,200 جنيه، بإجمالي ٢٤ محاضرة و٤٨ ساعة تدريس. تقدر تستفسر عن كل مستوى بشكل منفصل.",
      ),
    },
    {
      q: text(
        "Is the age recommendation mandatory?",
        "السن المقترح شرط للتسجيل؟",
      ),
      a: text(
        "Around 16+ is a guideline. Placement depends on programming readiness and previous experience, including equivalent knowledge for later levels.",
        "حوالي ١٦ سنة وطالع سن استرشادي. بنختار البداية حسب الاستعداد البرمجي والخبرة، ومعرفة مكافئة للمستويات السابقة لو هتبدأ من مستوى أعلى.",
      ),
    },
    {
      q: text(
        "Will I master production security after level 4?",
        "بعد المستوى الرابع أقدر أبني نظام إنتاج آمن لوحدي؟",
      ),
      a: text(
        "This intensive level covers a small working API with guided authentication exercises. It does not establish production security expertise or job readiness; larger systems need further study and specialist review.",
        "المستوى الرابع مكثف ومركز على API صغيرة شغالة وتدريبات تسجيل دخول بإرشاد المدرب. مش معناه إتقان أمان أنظمة الإنتاج أو الجاهزية للشغل؛ الأنظمة الأكبر محتاجة تعلم إضافي ومراجعة متخصصة.",
      ),
    },
    {
      q: text("Does an inquiry confirm my place?", "الاستفسار بيأكد الحجز؟"),
      a: text(
        "No. The academy team explains available schedules and booking steps after your inquiry.",
        "إرسال الاستفسار مش تأكيد للحجز. فريق الأكاديمية هيوضحلك المواعيد المتاحة وخطوات الحجز.",
      ),
    },
  ],
  levels: [
    level(
      1,
      text("C# Fundamentals & OOP", "أساسيات C# والبرمجة الكائنية OOP"),
      text(
        "Start with console input and programming logic, then use methods, OOP and collections to build a small student manager in 12 teaching hours.",
        "هنبدأ بإدخال البيانات ومنطق البرمجة، وبعدها نستخدم Methods وOOP وCollections عشان نبني برنامج صغير لإدارة الطلاب خلال ١٢ ساعة تدريس.",
      ),
      text(
        "Basic computer skills; no previous C# experience. Prepare the .NET SDK and a suitable editor with our help before the first session.",
        "معرفة بسيطة باستخدام الكمبيوتر؛ مش محتاج خبرة سابقة بـC#. نجهز .NET SDK ومحرر مناسب بمساعدتنا قبل أول محاضرة.",
      ),
      text(
        "Student Management Console Application: add, display, search and update student records using C#, OOP and in-memory collections.",
        "Student Management Console Application — برنامج Console لإدارة الطلاب: إضافة وعرض وبحث وتعديل بيانات الطلاب باستخدام C# وOOP وCollections في الذاكرة.",
      ),
      [
        text(
          "Write small interactive C# console applications.",
          "تكتب تطبيقات Console تفاعلية صغيرة بـC#.",
        ),
        text(
          "Use essential OOP principles and choose suitable collections.",
          "تفهم أساسيات OOP وتختار Collections مناسبة للبيانات.",
        ),
        text(
          "Debug and explain a student management program.",
          "تجرب برنامج إدارة الطلاب وتصلح أخطاءه وتشرح تنظيم الكود.",
        ),
      ],
      [
        session(
          1,
          text("C# Introduction & Fundamentals", "نبدأ بـC# وأساسيات .NET"),
          [
            text(
              "C# and .NET; development environment and running a console project.",
              "مقدمة عن C# و.NET، وبيئة التطوير وتشغيل مشروع Console.",
            ),
            text(
              "Program structure, variables and basic data types.",
              "هيكل البرنامج وVariables وData Types الأساسية.",
            ),
            text(
              "Console input/output and simple input conversion.",
              "إدخال وإخراج البيانات بـConsole وتحويل المدخلات البسيطة.",
            ),
          ],
          text(
            "Build an interactive console app that asks for a learner's name and age and prints a formatted summary.",
            "نبني برنامج Console يسأل عن اسم الطالب وسنه ويعرض ملخص منسق للبيانات.",
          ),
          [
            text(
              "Run a C# program and read and display typed values.",
              "تشغل برنامج C# وتقرأ بيانات وتعرضها باستخدام أنواع مناسبة.",
            ),
          ],
        ),
        session(
          2,
          text("Programming Logic", "منطق البرمجة واتخاذ القرار"),
          [
            text(
              "Arithmetic, comparison and logical operators.",
              "Operators الحسابية والمقارنة والمنطقية.",
            ),
            text(
              "If/Else and Switch for decisions.",
              "اتخاذ القرار باستخدام If/Else وSwitch.",
            ),
            text(
              "For and While loops; tracing simple problem-solving steps.",
              "For وWhile Loops وتتبع خطوات حل مسائل بسيطة.",
            ),
          ],
          text(
            "Extend the console app with a menu that repeats until exit and handles simple invalid choices.",
            "نطور البرنامج لقائمة اختيارات بتتكرر لحد الخروج، ونتعامل مع اختيار غير صحيح.",
          ),
          [
            text(
              "Choose conditions and loops to control a menu-driven program.",
              "تختار شروط وحلقات مناسبة للتحكم في برنامج بقائمة اختيارات.",
            ),
          ],
        ),
        session(
          3,
          text("Methods & OOP Basics", "Methods وأول خطوات OOP"),
          [
            text(
              "Methods, parameters and return values.",
              "Methods وParameters وReturn Values لتقسيم الكود.",
            ),
            text(
              "Classes, objects and properties.",
              "Classes وObjects وProperties لتمثيل البيانات.",
            ),
            text(
              "Constructors and creating valid objects.",
              "Constructors وتجهيز الكائن وقت إنشائه.",
            ),
          ],
          text(
            "Create Student and Course classes with constructors and properties; move repeated menu work into methods.",
            "نكتب Student وCourse Classes بخصائص وConstructors، ونقسم الأجزاء المتكررة من القائمة لـMethods.",
          ),
          [
            text(
              "Model a real-world entity and organize repeated behavior into methods.",
              "تمثل كيان من الواقع بـClass وتنظم السلوك المتكرر في Methods.",
            ),
          ],
        ),
        session(
          4,
          text("OOP Principles", "مبادئ OOP بالتطبيق"),
          [
            text(
              "Encapsulation and protecting object state.",
              "Encapsulation وحماية حالة الكائن.",
            ),
            text(
              "Inheritance and polymorphism through a small class hierarchy.",
              "Inheritance وPolymorphism من خلال مجموعة Classes صغيرة.",
            ),
            text(
              "Abstraction and interfaces; choosing a simple contract.",
              "Abstraction وInterfaces واختيار عقد بسيط للسلوك.",
            ),
          ],
          text(
            "Build a Person/Student hierarchy and an interface for displaying records; extend behavior without duplicating it.",
            "نبني Person وStudent مع Interface لعرض السجلات، ونضيف سلوك جديد من غير تكرار الكود.",
          ),
          [
            text(
              "Explain the core OOP principles using working classes and interfaces.",
              "تشرح مبادئ OOP الأساسية من خلال Classes وInterfaces شغالة.",
            ),
          ],
        ),
        session(
          5,
          text(
            "Generics & Collections",
            "Generics وCollections لتنظيم البيانات",
          ),
          [
            text(
              "Generic types and a simple generic method.",
              "Generic Types ومثال بسيط على Generic Method.",
            ),
            text(
              "List, Dictionary and HashSet.",
              "استخدام List وDictionary وHashSet.",
            ),
            text(
              "Choosing collections for ordered records, keyed lookup and uniqueness.",
              "اختيار Collection حسب ترتيب السجلات أو البحث بالمفتاح أو منع التكرار.",
            ),
          ],
          text(
            "Store students in a List, try a Dictionary lookup and a HashSet of unique IDs, and implement an in-memory search feature.",
            "نخزن الطلاب في List، ونجرب البحث بـDictionary ومنع تكرار الأرقام بـHashSet، وننفذ بحث في الذاكرة.",
          ),
          [
            text(
              "Use typed collections and explain the choice of collection for a feature.",
              "تستخدم Collections بأنواع محددة وتوضح سبب اختيارك لكل واحدة.",
            ),
          ],
        ),
        session(
          6,
          text(
            "Final Project: Student Management Console Application",
            "المشروع النهائي: إدارة الطلاب بـConsole",
          ),
          [
            text(
              "Review and combine OOP, methods and collections.",
              "مراجعة ودمج OOP وMethods وCollections.",
            ),
            text(
              "Debugging, input checks and completing add/display/search/update features.",
              "Debugging ومراجعة المدخلات واستكمال الإضافة والعرض والبحث والتعديل.",
            ),
            text(
              "Project demonstration and practical assessment.",
              "عرض المشروع وتقييم عملي مع المدرب.",
            ),
          ],
          text(
            "Complete and test the Student Management Console Application with add, display, search and update operations.",
            "نكمل Student Management Console Application ونجرب إضافة وعرض وبحث وتعديل بيانات الطلاب.",
          ),
          [
            text(
              "Deliver and explain a small C# application using essential OOP and collections.",
              "تقدم تطبيق C# صغير وتشرح استخدامه لأساسيات OOP وCollections.",
            ),
          ],
        ),
      ],
    ),
    level(
      2,
      text("Advanced C# & SOLID", "C# المتقدمة ومبادئ SOLID"),
      text(
        "Improve the previous console application with practical SOLID refactoring, callbacks, async workflows and safe null handling. The architecture exercise is introductory.",
        "هنحسن برنامج الـConsole اللي بنيناه بتطبيقات SOLID، وCallbacks وAsync والتعامل الآمن مع Null. تدريب تنظيم الطبقات تمهيدي ومش تطبيق Clean Architecture كامل للإنتاج.",
      ),
      text(
        "Level 1 or equivalent knowledge of methods, OOP, interfaces, generics and collections in C#.",
        "إكمال المستوى الأول أو معرفة مكافئة بـMethods وOOP وInterfaces وGenerics وCollections في C#.",
      ),
      text(
        "Clean Architecture-Inspired Console Application: refactor a console app with SOLID, delegates, async operations and safe null handling. This is an introductory architecture exercise, not a complete production Clean Architecture implementation.",
        "Clean Architecture-Inspired Console Application — إعادة تنظيم برنامج Console باستخدام SOLID وDelegates وعمليات Async ومعالجة Null. تدريب مستوحى من فصل المسؤوليات، ومش تطبيق Clean Architecture كامل جاهز للإنتاج.",
      ),
      [
        text(
          "Refactor small C# classes using the five SOLID principles.",
          "تحسن Classes صغيرة بمبادئ SOLID الخمسة.",
        ),
        text(
          "Use delegates, events and simple async workflows.",
          "تستخدم Delegates وEvents وعمليات Async بسيطة.",
        ),
        text(
          "Reduce null-related errors and explain responsibility boundaries.",
          "تقلل أخطاء Null وتوضح حدود مسؤولية كل جزء في الكود.",
        ),
      ],
      [
        session(
          1,
          text("SOLID Part 1", "SOLID — الجزء الأول"),
          [
            text(
              "Clean Code introduction and identifying tightly coupled responsibilities.",
              "مقدمة عن Clean Code وتحديد المسؤوليات المتداخلة في Classes مترابطة زيادة.",
            ),
            text(
              "Single Responsibility Principle (SRP).",
              "Single Responsibility Principle — مسؤولية واضحة لكل Class.",
            ),
            text(
              "Open/Closed Principle (OCP) and practical refactoring.",
              "Open/Closed Principle وتدريب Refactoring عملي.",
            ),
          ],
          text(
            "Refactor a class that manages students and prints reports into separate responsibilities; add a report format through an interface.",
            "نفصل Class بتدير الطلاب وبتطبع تقارير لمسؤوليات واضحة، ونضيف شكل تقرير باستخدام Interface.",
          ),
          [
            text(
              "Identify SRP/OCP violations and make a small behavior-preserving refactor.",
              "تحدد مشاكل SRP وOCP وتعيد تنظيم جزء صغير من غير تغيير سلوكه.",
            ),
          ],
        ),
        session(
          2,
          text("SOLID Part 2", "SOLID — الجزء التاني"),
          [
            text(
              "Liskov Substitution Principle (LSP).",
              "Liskov Substitution Principle واحترام سلوك العقد عند الاستبدال.",
            ),
            text(
              "Interface Segregation Principle (ISP).",
              "Interface Segregation Principle وتقسيم العقود الكبيرة.",
            ),
            text(
              "Dependency Inversion Principle (DIP) and introduction to constructor Dependency Injection.",
              "Dependency Inversion Principle ومقدمة عن Dependency Injection من خلال Constructor.",
            ),
          ],
          text(
            "Improve the existing app with focused interfaces and inject a storage dependency through the constructor.",
            "نطور البرنامج بـInterfaces محددة ونمرر اعتماد التخزين من خلال Constructor بدل ربطه مباشرة.",
          ),
          [
            text(
              "Use small substitutable contracts and distinguish DIP from the injection technique.",
              "تستخدم عقود صغيرة قابلة للاستبدال وتفرق بين مبدأ DIP وطريقة حقن الاعتماد.",
            ),
          ],
        ),
        session(
          3,
          text("Delegates & Events", "Delegates وEvents"),
          [
            text(
              "Delegates and lambda expressions.",
              "Delegates وLambda Expressions في أمثلة بسيطة.",
            ),
            text(
              "Action, Func and Predicate.",
              "استخدام Action وFunc وPredicate حسب المدخلات والقيمة الراجعة.",
            ),
            text(
              "Events and subscribing to notifications.",
              "Events والاشتراك في إشعارات تغيير البيانات.",
            ),
          ],
          text(
            "Add a callback for displaying a report, filter records with a Predicate and raise an event when a student is added.",
            "نضيف Callback لعرض تقرير، ونفلتر سجلات بـPredicate، ونطلق Event لما نضيف طالب.",
          ),
          [
            text(
              "Choose a delegate signature and connect a simple event publisher and subscriber.",
              "تختار توقيع Delegate مناسب وتربط مصدر Event بمستقبل بسيط.",
            ),
          ],
        ),
        session(
          4,
          text("Async Programming", "البرمجة غير المتزامنة بـAsync"),
          [
            text(
              "Synchronous versus asynchronous execution; Task.",
              "الفرق بين التنفيذ المتزامن وغير المتزامن وTask.",
            ),
            text(
              "Async/Await and a simple asynchronous workflow.",
              "Async وAwait وتنظيم خطوات غير متزامنة بسيطة.",
            ),
            text(
              "Awaiting tasks, handling failures and avoiding .Result/.Wait() blocking and unnecessary async void.",
              "انتظار Tasks ومعالجة فشلها، وتجنب التعطيل بـ.Result و.Wait() واستخدام async void من غير داعي.",
            ),
          ],
          text(
            "Add an awaited report-export workflow using async file I/O and show progress while handling expected I/O errors.",
            "نضيف تصدير تقرير بكتابة ملف Async، ونعرض تقدم العملية ونستخدم Await ونتعامل مع أخطاء الملفات المتوقعة.",
          ),
          [
            text(
              "Follow the completion and error path of a small Task-based workflow.",
              "تتبع اكتمال عملية مبنية على Task وتتعامل مع الأخطاء من غير تعطيل غير ضروري.",
            ),
          ],
        ),
        session(
          5,
          text("Nullability & Code Quality", "Nullability وجودة الكود"),
          [
            text(
              "Nullable value types and nullable reference types.",
              "Nullable Value Types وNullable Reference Types.",
            ),
            text(
              "Null checks, null-coalescing (??) and null-conditional (?.) operators.",
              "فحص Null واستخدام Null-Coalescing (??) وNull-Conditional (?.).",
            ),
            text(
              "Compiler warnings, error prevention and focused refactoring.",
              "فهم تحذيرات Compiler وتقليل الأخطاء وRefactoring بسيط.",
            ),
          ],
          text(
            "Make student lookup and optional contact data safer; handle missing records explicitly and resolve nullable warnings thoughtfully.",
            "نخلي البحث وبيانات التواصل الاختيارية أأمن، ونعالج السجل المفقود بوضوح ونراجع تحذيرات Nullable.",
          ),
          [
            text(
              "Represent optional values and handle absence without hiding compiler warnings.",
              "تمثل البيانات الاختيارية وتتعامل مع غيابها من غير إخفاء تحذيرات Compiler.",
            ),
          ],
        ),
        session(
          6,
          text(
            "Final Project: Clean Architecture-Inspired Console Application",
            "المشروع النهائي: تنظيم تطبيق Console",
          ),
          [
            text(
              "Combine SOLID refactoring, interfaces and delegates/events.",
              "دمج Refactoring بمبادئ SOLID مع Interfaces وDelegates وEvents.",
            ),
            text(
              "Complete async operations and safe null handling.",
              "استكمال عمليات Async ومعالجة Null بأمان.",
            ),
            text(
              "Review introductory layer boundaries, debug and assess the app.",
              "مراجعة فصل الطبقات بشكل تمهيدي، وDebugging وتقييم التطبيق.",
            ),
          ],
          text(
            "Refactor and demonstrate the console app with separated responsibilities, an event/callback, awaited I/O and explicit null handling.",
            "نعيد تنظيم برنامج Console ونعرضه بمسؤوليات منفصلة وEvent أو Callback وعمليات I/O باستخدام Await ومعالجة واضحة لـNull.",
          ),
          [
            text(
              "Explain how SOLID and modern C# features improve a small application's maintainability.",
              "تشرح إزاي SOLID وخصائص C# الحديثة بتسهل صيانة تطبيق صغير.",
            ),
          ],
        ),
      ],
    ),
    level(
      3,
      text(
        "SQL, LINQ & Entity Framework Core",
        "SQL وLINQ وEntity Framework Core",
      ),
      text(
        "Move student data from memory into SQL Server: design a small schema, query it with SQL and LINQ, then implement EF Core persistence in 12 teaching hours.",
        "هننقل بيانات الطلاب من الذاكرة لـSQL Server: نصمم قاعدة صغيرة، ونستعلم بـSQL وLINQ، وبعدها ننفذ حفظ واسترجاع بـEF Core خلال ١٢ ساعة تدريس.",
      ),
      text(
        "Level 2 or equivalent C# knowledge including OOP, collections, interfaces, async and nullability. Prepare a working SQL Server instance and tools with our help before the level.",
        "إكمال المستوى التاني أو معرفة مكافئة بـC# تشمل OOP وCollections وInterfaces وAsync وNullability. نجهز SQL Server وأدواته بمساعدتنا قبل بداية المستوى.",
      ),
      text(
        "Database-Backed Student Management Application: use SQL Server, LINQ and EF Core to persist students and courses, with CRUD and a one-to-many relationship.",
        "Database-Backed Student Management Application — برنامج إدارة طلاب مرتبط بـSQL Server، بيستخدم LINQ وEF Core لحفظ واسترجاع البيانات وعمليات CRUD وعلاقة One-to-Many بين الكورسات والطلاب.",
      ),
      [
        text(
          "Design a small relational schema and write basic SQL queries.",
          "تصمم قاعدة بيانات علائقية صغيرة وتكتب استعلامات SQL أساسية.",
        ),
        text(
          "Query collections and database records using LINQ.",
          "تستعلم عن Collections وسجلات قاعدة البيانات باستخدام LINQ.",
        ),
        text(
          "Build a simple C# app that stores and retrieves relational data with EF Core.",
          "تبني تطبيق C# بسيط بيحفظ ويسترجع بيانات علائقية بـEF Core.",
        ),
      ],
      [
        session(
          1,
          text("SQL Fundamentals", "أساسيات SQL وقواعد البيانات"),
          [
            text(
              "Relational databases and SQL Server introduction.",
              "قواعد البيانات العلائقية ومقدمة عن SQL Server.",
            ),
            text(
              "Tables, columns and data types.",
              "Tables وColumns واختيار Data Types.",
            ),
            text(
              "Primary keys, foreign keys and relationships.",
              "Primary Keys وForeign Keys والعلاقات بين الجداول.",
            ),
          ],
          text(
            "Design Students and Courses tables with primary keys and a foreign key for a one-to-many relationship.",
            "نصمم جدولي Students وCourses بمفاتيح أساسية ومفتاح خارجي لعلاقة One-to-Many.",
          ),
          [
            text(
              "Explain table relationships and choose keys and simple column types.",
              "تشرح علاقة الجداول وتختار مفاتيح وأنواع مناسبة للأعمدة.",
            ),
          ],
        ),
        session(
          2,
          text("SQL Queries", "كتابة استعلامات SQL"),
          [
            text(
              "SELECT, INSERT, UPDATE and DELETE.",
              "قراءة وإضافة وتعديل وحذف بـSELECT وINSERT وUPDATE وDELETE.",
            ),
            text(
              "WHERE, ORDER BY and JOIN.",
              "فلترة وترتيب وربط البيانات بـWHERE وORDER BY وJOIN.",
            ),
            text(
              "GROUP BY and aggregate functions such as COUNT and AVG.",
              "GROUP BY وAggregate Functions زي COUNT وAVG.",
            ),
          ],
          text(
            "Query seeded student/course data, edit a selected record using WHERE and summarize student counts per course.",
            "نكتب استعلامات على بيانات تجريبية، ونعدل سجل محدد بـWHERE، ونحسب عدد الطلاب في كل كورس.",
          ),
          [
            text(
              "Write basic CRUD queries and interpret a join and grouped summary.",
              "تكتب CRUD Queries أساسية وتفهم نتيجة JOIN وملخص بيانات مجمعة.",
            ),
          ],
        ),
        session(
          3,
          text("LINQ Fundamentals", "أساسيات LINQ"),
          [
            text(
              "Introduction to LINQ over C# collections.",
              "مقدمة عن LINQ للاستعلام عن Collections في C#.",
            ),
            text(
              "Where, Select, OrderBy, FirstOrDefault and Any.",
              "استخدام Where وSelect وOrderBy وFirstOrDefault وAny.",
            ),
            text(
              "Basic grouping, projections and handling missing results.",
              "Grouping وProjections بسيطة والتعامل مع نتيجة بحث مش موجودة.",
            ),
          ],
          text(
            "Query the in-memory student list for names, sorted results, existence checks and grouped course counts.",
            "نستعلم عن قائمة الطلاب في الذاكرة: أسماء ونتائج مرتبة وفحص وجود وتجميع عدد الطلاب حسب الكورس.",
          ),
          [
            text(
              "Build and explain small LINQ queries while handling nullable search results.",
              "تكتب وتشرح LINQ Queries بسيطة وتتعامل مع نتيجة بحث ممكن تكون Null.",
            ),
          ],
        ),
        session(
          4,
          text(
            "Entity Framework Core",
            "نربط C# بقاعدة البيانات باستخدام EF Core",
          ),
          [
            text(
              "ORM introduction and EF Core basics.",
              "مفهوم ORM وأساسيات EF Core.",
            ),
            text(
              "Entities, DbContext and database configuration.",
              "Entities وDbContext وإعداد الاتصال بقاعدة البيانات.",
            ),
            text(
              "Connect C# to SQL Server; keep connection secrets outside committed source.",
              "ربط C# بـSQL Server، وحفظ بيانات الاتصال الحساسة خارج الكود المرفوع.",
            ),
          ],
          text(
            "Create an EF Core console project with Student and Course entities and a configured DbContext connected to the prepared SQL Server instance.",
            "نجهز مشروع Console فيه Student وCourse Entities وDbContext متصل بـSQL Server المجهز قبل المستوى.",
          ),
          [
            text(
              "Explain the role of entities and DbContext and verify database connectivity.",
              "توضح دور Entities وDbContext وتتأكد إن الاتصال بقاعدة البيانات شغال.",
            ),
          ],
        ),
        session(
          5,
          text("EF Core CRUD & Relationships", "CRUD والعلاقات في EF Core"),
          [
            text(
              "Migrations and applying the small schema to the database.",
              "Migrations وتطبيق تصميم الجداول على قاعدة البيانات.",
            ),
            text(
              "Add, query, update, delete and SaveChangesAsync.",
              "إضافة واستعلام وتعديل وحذف وحفظ باستخدام SaveChangesAsync.",
            ),
            text(
              "One-to-many relationships and basic LINQ with EF Core.",
              "علاقات One-to-Many واستعلامات LINQ أساسية مع EF Core.",
            ),
          ],
          text(
            "Create and apply a migration, implement student CRUD and retrieve each student's course using the one-to-many relationship.",
            "نعمل Migration ونطبقها، وننفذ CRUD للطلاب ونسترجع كورس كل طالب باستخدام علاقة One-to-Many.",
          ),
          [
            text(
              "Persist related records and distinguish pending changes from saved changes.",
              "تحفظ سجلات مرتبطة وتفرق بين التغييرات في الذاكرة والتغييرات اللي اتحفظت.",
            ),
          ],
        ),
        session(
          6,
          text(
            "Final Project: Database-Backed Student Management Application",
            "المشروع النهائي: إدارة طلاب بقاعدة بيانات",
          ),
          [
            text(
              "Integrate SQL Server, LINQ and EF Core in the existing student manager.",
              "دمج SQL Server وLINQ وEF Core في برنامج إدارة الطلاب.",
            ),
            text(
              "Complete CRUD, verify persistence after restart and debug common data issues.",
              "استكمال CRUD وتجربة استمرار البيانات بعد إعادة التشغيل وحل أخطاء البيانات الشائعة.",
            ),
            text(
              "Demonstration and practical assessment.",
              "عرض المشروع وتقييم عملي مع المدرب.",
            ),
          ],
          text(
            "Complete the database-backed student manager and demonstrate adding, finding, updating and deleting persisted student data.",
            "نكمل برنامج إدارة الطلاب المرتبط بقاعدة البيانات ونجرب إضافة وبحث وتعديل وحذف بيانات محفوظة فعليًا.",
          ),
          [
            text(
              "Build and explain a simple C# application that stores and retrieves relational data.",
              "تبني وتشرح تطبيق C# بسيط بيخزن ويسترجع بيانات من قاعدة علائقية.",
            ),
          ],
        ),
      ],
    ),
    level(
      4,
      text(
        "ASP.NET Core Web API & Authentication",
        "ASP.NET Core Web API وتسجيل الدخول",
      ),
      text(
        "An intensive 12-hour introduction to a small working API: reuse the previous database and instructor-provided scaffolding to add endpoints, layers and a guided token workflow. This does not establish production security expertise or job readiness.",
        "مستوى مكثف في ١٢ ساعة لبناء API صغيرة شغالة. هنستخدم قاعدة البيانات السابقة وهيكل تدريبي مجهز مع المدرب، ونضيف Endpoints وتنظيم الطبقات وتدفق Tokens موجه. ده مش إتقان لأمان أنظمة الإنتاج ولا ضمان للجاهزية للشغل.",
      ),
      text(
        "Level 3 or equivalent C#, async, SQL, LINQ and EF Core CRUD knowledge. Reuse the prepared student database and complete the instructor's setup before the level.",
        "إكمال المستوى التالت أو معرفة مكافئة بـC# وAsync وSQL وLINQ وEF Core CRUD. هنستخدم قاعدة بيانات الطلاب المجهزة ونكمل تجهيزات المدرب قبل بداية المستوى.",
      ),
      text(
        "Authenticated Student Management Web API: basic CRUD, SQL Server, EF Core, a service layer, repository/unit-of-work concepts where useful, JWT access tokens, refresh rotation/revocation, protected endpoints and API tests, under instructor guidance.",
        "Authenticated Student Management Web API — API صغيرة لإدارة الطلاب بإرشاد المدرب: CRUD وSQL Server وEF Core وService Layer، ومفاهيم Repository وUnit of Work حسب الحاجة، وJWT Access Tokens وتجديدها مع Rotation وRevocation، وحماية أساسية للـEndpoints واختبار الـAPI.",
      ),
      [
        text(
          "Create and test basic ASP.NET Core CRUD endpoints connected to EF Core.",
          "تنشئ وتختبر CRUD Endpoints أساسية بـASP.NET Core ومتصلة بـEF Core.",
        ),
        text(
          "Explain service/repository boundaries and when DbContext already provides unit-of-work behavior.",
          "تشرح حدود Service وRepository وإمتى DbContext بيغطي سلوك Unit of Work بالفعل.",
        ),
        text(
          "Understand and build a small authenticated API with a guided access/refresh-token workflow.",
          "تفهم وتبني API صغيرة بتسجيل دخول وتدفق Access وRefresh Tokens بإرشاد المدرب، مع إدراك حدود المثال التدريبي.",
        ),
      ],
      [
        session(
          1,
          text("Web API Fundamentals", "أساسيات Web API"),
          [
            text(
              "Backend overview; HTTP, REST and HTTP methods.",
              "دور الـBackend ومقدمة عن HTTP وREST وHTTP Methods.",
            ),
            text(
              "Status codes and JSON request/response bodies.",
              "Status Codes وJSON في الطلبات والردود.",
            ),
            text(
              "ASP.NET Core Web API, controllers and routing.",
              "مقدمة عن ASP.NET Core Web API وControllers وRouting.",
            ),
          ],
          text(
            "Create an ASP.NET Core controller with GET endpoints returning sample students as JSON and appropriate status codes.",
            "ننشئ Controller فيه GET Endpoints بترجع بيانات طلاب تجريبية بصيغة JSON وStatus Codes مناسبة.",
          ),
          [
            text(
              "Trace an HTTP request through routing to a controller response.",
              "تتبع طلب HTTP من Routing لحد رد الـController.",
            ),
          ],
        ),
        session(
          2,
          text(
            "CRUD APIs & Dependency Injection",
            "CRUD APIs وDependency Injection",
          ),
          [
            text(
              "GET, POST, PUT and DELETE endpoints.",
              "تنفيذ GET وPOST وPUT وDELETE Endpoints.",
            ),
            text(
              "DTOs, basic validation and appropriate responses.",
              "DTOs والتحقق الأساسي من المدخلات والردود المناسبة.",
            ),
            text(
              "Dependency Injection and connecting endpoints to EF Core.",
              "Dependency Injection وربط الـEndpoints بـEF Core.",
            ),
          ],
          text(
            "Build student CRUD endpoints using DTOs and basic validation, with a scoped EF Core DbContext supplied by DI.",
            "نبني CRUD للطلاب باستخدام DTOs وفحص مدخلات بسيط، ونوصل EF Core DbContext بعمر Scoped عن طريق DI.",
          ),
          [
            text(
              "Test basic resource operations and reject invalid input without exposing entity internals.",
              "تختبر العمليات الأساسية وترفض المدخلات غير الصالحة باستخدام DTOs واضحة.",
            ),
          ],
        ),
        session(
          3,
          text("Repository & Unit of Work", "Repository وUnit of Work"),
          [
            text(
              "Repository Pattern, Service Layer, interfaces and separation of concerns.",
              "Repository Pattern وService Layer وInterfaces وفصل المسؤوليات.",
            ),
            text(
              "Unit of Work Pattern and DbContext's existing unit-of-work behavior.",
              "Unit of Work Pattern وسلوك Unit of Work الموجود أصلًا في DbContext.",
            ),
            text(
              "When extra abstractions help and when direct DbContext access is sufficient.",
              "إمتى Abstractions إضافية بتفيد وإمتى استخدام DbContext مباشرة بيكون كفاية.",
            ),
          ],
          text(
            "Move student behavior into a service; compare direct DbContext use with a small repository interface and an optional unit-of-work boundary.",
            "ننقل منطق الطلاب لـService، ونقارن استخدام DbContext مباشرة بمثال Repository Interface وحدود Unit of Work اختيارية حسب الحاجة.",
          ),
          [
            text(
              "Explain the tradeoff of additional layers without treating them as mandatory EF Core wrappers.",
              "توضح فايدة وتكلفة الطبقات الإضافية من غير اعتبارها تغليف إلزامي لـEF Core.",
            ),
          ],
        ),
        session(
          4,
          text("JWT Authentication", "تسجيل الدخول بـJWT"),
          [
            text(
              "Authentication versus authorization; JWT structure, claims and access tokens.",
              "الفرق بين Authentication وAuthorization، وتركيب JWT وClaims وAccess Tokens.",
            ),
            text(
              "Supported ASP.NET Core JWT bearer authentication, token validation and protected endpoints.",
              "آليات JWT Bearer المدعومة في ASP.NET Core والتحقق من الـToken وحماية Endpoints.",
            ),
            text(
              "Validate signature, issuer, audience and expiry; HTTPS, managed password hashing and secrets outside source code.",
              "التحقق من التوقيع وIssuer وAudience والصلاحية، واستخدام HTTPS وPassword Hashing بآليات جاهزة وأسرار خارج الكود.",
            ),
          ],
          text(
            "Use instructor-provided authentication scaffolding with supported password hashing and JWT bearer validation; protect student endpoints and test valid, missing and invalid access tokens. Keep signing secrets outside source code.",
            "نستخدم هيكل تسجيل دخول تدريبي بآليات Password Hashing جاهزة وJWT Bearer Validation، ونحمي Endpoints الطلاب ونجرب Token صالح ومفقود وغير صالح. أسرار التوقيع خارج الكود.",
          ),
          [
            text(
              "Explain the limits of JWT claims and distinguish successful authentication from permission to access a resource.",
              "تفهم حدود Claims في JWT وتفرق بين إثبات الهوية والسماح بالوصول لمورد.",
            ),
          ],
        ),
        session(
          5,
          text("Refresh Tokens", "تجديد الدخول بـRefresh Tokens"),
          [
            text(
              "Access-token expiration, refresh tokens and a refresh endpoint.",
              "انتهاء صلاحية Access Token وفكرة Refresh Token وRefresh Endpoint.",
            ),
            text(
              "Rotation, revocation, expiry and rejecting reused tokens.",
              "Token Rotation وRevocation وانتهاء الصلاحية ورفض إعادة استخدام Token مستهلك.",
            ),
            text(
              "Secure storage considerations: hash stored refresh tokens, protect browser cookies, consider CSRF and avoid hardcoded secrets or insecure browser storage as a production recommendation.",
              "اعتبارات التخزين الآمن: حفظ Hash للـRefresh Token على الخادم، وحماية Cookies في المتصفح ومراعاة CSRF، من غير أسرار ثابتة أو تقديم تخزين متصفح غير آمن كأفضل ممارسة للإنتاج.",
            ),
            text(
              "Authorization basics and checking who may access a protected resource.",
              "أساسيات Authorization والتحقق من صلاحية الوصول للمورد المحمي.",
            ),
          ],
          text(
            "Implement a guided refresh endpoint using high-entropy tokens and hashed server-side records; rotate atomically, revoke on logout and reject expired, revoked or reused tokens. Review HttpOnly/Secure/SameSite cookie tradeoffs for browser clients.",
            "ننفذ Refresh Endpoint موجه بـTokens عشوائية قوية وسجلات Hash على الخادم، ونجددها بشكل ذري ونلغيها عند الخروج ونرفض المنتهي أو الملغي أو المعاد استخدامه. نراجع اعتبارات Cookies مع HttpOnly وSecure وSameSite لعملاء المتصفح.",
          ),
          [
            text(
              "Trace a security-conscious refresh flow and explain why rotation, revocation and storage choices matter.",
              "تتبع تدفق تجديد بيراعي الأمان وتشرح دور Rotation وRevocation واختيار طريقة التخزين.",
            ),
          ],
        ),
        session(
          6,
          text(
            "Final Backend Project: Authenticated Student Management Web API",
            "المشروع النهائي: Student Management Web API بتسجيل دخول",
          ),
          [
            text(
              "Complete CRUD, SQL Server/EF Core integration and service boundaries; use repository/unit-of-work concepts where helpful.",
              "استكمال CRUD وربط SQL Server وEF Core وحدود Service Layer، واستخدام مفاهيم Repository وUnit of Work حسب الحاجة.",
            ),
            text(
              "Verify JWT protection, refresh rotation, revocation and authorization basics.",
              "مراجعة حماية JWT وتجديد Tokens وإلغائها وأساسيات Authorization.",
            ),
            text(
              "API testing, invalid-input and unauthenticated cases, debugging and practical assessment.",
              "اختبار الـAPI والمدخلات غير الصالحة وطلبات بدون تسجيل دخول، وDebugging وتقييم عملي.",
            ),
          ],
          text(
            "Complete and test the small Authenticated Student Management Web API with CRUD, persistence, a service layer, JWT access tokens and a refresh flow; demonstrate denied access and revoked/reused-token rejection.",
            "نكمل ونختبر Authenticated Student Management Web API صغيرة فيها CRUD وحفظ بيانات وService Layer وJWT وتدفق Refresh، ونجرب رفض الوصول غير المسموح وTokens الملغية أو المعاد استخدامها.",
          ),
          [
            text(
              "Demonstrate and explain a small authenticated API under instructor guidance, including the limits of the training implementation.",
              "تعرض وتشرح API صغيرة بتسجيل دخول بإرشاد المدرب وتوضح حدود التطبيق التدريبي.",
            ),
          ],
        ),
      ],
    ),
  ],
};
