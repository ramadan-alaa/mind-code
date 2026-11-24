import type { Course, CourseLevel, CourseSession, Localized } from "./courses";

const text = (en: string, ar: string): Localized => ({ en, ar });
type Bilingual = [en: string, ar: string];

const session = (
  number: number,
  title: Bilingual,
  topics: Bilingual[],
  practiceTask: Bilingual,
  learningObjectives: Bilingual[],
): CourseSession => ({
  number,
  title: text(...title),
  topics: topics.map(([en, ar]) => text(en, ar)),
  practiceTask: text(...practiceTask),
  learningObjectives: learningObjectives.map(([en, ar]) => text(en, ar)),
});

const level = (
  number: number,
  title: Bilingual,
  overview: Bilingual,
  prerequisites: Bilingual,
  project: Bilingual,
  outcomes: Bilingual[],
  sessions: CourseSession[],
): CourseLevel => ({
  ...text(...title),
  id: `cpp-level-${number}`,
  slug: `level-${number}`,
  price: 1200,
  hoursPerSession: 0,
  overview: text(...overview),
  prerequisites: text(...prerequisites),
  project: text(...project),
  outcomes: outcomes.map(([en, ar]) => text(en, ar)),
  sessions,
});

export const cppProgram: Course = {
  slug: "cpp",
  name: "C++ Programming & Problem Solving",
  localizedName: text(
    "C++ Programming & Problem Solving",
    "البرمجة بلغة C++ وحل المسائل",
  ),
  program: true,
  overviewPage: true,
  scheduleOnRequest: true,
  inquiryLabel: text(
    "Ask about C++ Programming & Problem Solving",
    "استفسر عن البرمجة بلغة C++ وحل المسائل",
  ),
  color: "#66a8fb",
  symbol: "C++",
  price: 1200,
  sessions: 5,
  hours: 0,
  difficulty: "beginner",
  category: "languages",
  audience: text(
    "Learners who want to start C++ from scratch, build problem-solving skills on online judges, and complete a practical console project.",
    "للي عايز يبدأ لغة C++ من الصفر، ويطور مهاراته في حل المسائل على منصات التدريب، ويبني مشروع Console عملي.",
  ),
  cardDescription: text(
    "Learn C++ from your first program, practice solving problems on HackerRank, Codeforces, and LeetCode, and finish by building a small console application.",
    "ابدأ من أول برنامج بلغة C++، واتدرّب على حل المسائل على HackerRank وCodeforces وLeetCode، وفي آخر التراك هتبني برنامج بسيط لإدارة درجات الطلاب.",
  ),
  description: text(
    "Learn C++ from your first program, practice solving problems on HackerRank, Codeforces, and LeetCode, and finish by building a small console application.",
    "ابدأ من أول برنامج بلغة C++، واتدرّب على حل المسائل على HackerRank وCodeforces وLeetCode، وفي آخر التراك هتبني برنامج بسيط لإدارة درجات الطلاب.",
  ),
  prerequisites: text(
    "A computer, stable internet, and basic computer skills. No prior C++ experience is required for level 1; later levels require the previous level or equivalent knowledge.",
    "جهاز كمبيوتر وإنترنت مستقر ومعرفة أساسية باستخدام الكمبيوتر. مش محتاج خبرة سابقة بلغة C++ للمستوى الأول؛ المستويات التالية تحتاج المستوى السابق أو معرفة مكافئة.",
  ),
  progression: text(
    "Follow the three levels in order from C++ fundamentals to problem solving and STL applications, or ask the academy to help you choose a starting level based on your experience.",
    "امشي في المستويات التلاتة بالترتيب من أساسيات C++ لحل المسائل ومكتبة STL، أو اسأل الأكاديمية تساعدك تختار المستوى المناسب حسب خبرتك.",
  ),
  outcomes: [
    text(
      "Write structured C++ programs using variables, conditions, loops, and functions, and solve introductory HackerRank exercises.",
      "تكتب برامج C++ منظمة باستخدام المتغيرات والشروط والحلقات والدوال، وتحل تمارين تمهيدية على HackerRank.",
    ),
    text(
      "Solve Codeforces problems using arrays, strings, vectors, std::sort, frequency arrays, and systematic debugging.",
      "تحل مسائل Codeforces باستخدام المصفوفات والنصوص وvectors وstd::sort ومصفوفات التكرار واكتشاف الأخطاء.",
    ),
    text(
      "Apply C++ STL containers (set, unordered_set, map, unordered_map), binary search, and basic Big O reasoning on LeetCode Easy problems.",
      "تستخدم حاويات مكتبة C++ القياسية (set وunordered_set وmap وunordered_map) والبحث الثنائي ومبادئ Big O في مسائل LeetCode Easy.",
    ),
    text(
      "Build and test a small console Student Grade Manager using a Student class, search, and sorting.",
      "تبني وتختبر برنامج Console بسيط لإدارة درجات الطلاب باستخدام Class للطلاب والبحث والترتيب.",
    ),
  ],
  faq: [
    {
      q: text("How is the C++ track delivered?", "الدراسة في مسار C++ بتكون إزاي؟"),
      a: text(
        "The track is delivered online in small interactive groups, with live explanations, guided problem solving, and instructor review. It has 3 levels with 5 sessions per level (15 sessions total). Ask us about available schedules.",
        "الدراسة أونلاين في مجموعات صغيرة تفاعلية، فيها شرح مباشر وحل مسائل مع المدرب ومراجعة للكود. المسار ٣ مستويات، كل مستوى ٥ محاضرات (بإجمالي ١٥ محاضرة). اسألنا عن المواعيد المتاحة.",
      ),
    },
    {
      q: text("What does each level cost?", "سعر المستوى والمسار كامل كام؟"),
      a: text(
        "Each level costs 1,200 EGP per learner. All three levels cost 3,600 EGP for 15 sessions total. You can inquire about one level at a time.",
        "كل مستوى بـ1,200 جنيه لكل طالب. التلات مستويات بـ3,600 جنيه لإجمالي ١٥ محاضرة. تقدر تستفسر عن مستوى واحد في كل مرة.",
      ),
    },
    {
      q: text(
        "Which practice platforms are used in the track?",
        "إيه منصات التدريب المستخدمة في المسار؟",
      ),
      a: text(
        "Level 1 practices on HackerRank, Level 2 solves guided problems on Codeforces, and Level 3 practices LeetCode Easy problems alongside the final console project.",
        "المستوى الأول بيطبق على HackerRank، والمستوى التاني بيحل مسائل موجهة على Codeforces، والمستوى التالت بيتدرب على مسائل LeetCode Easy مع مشروع الـConsole النهائي.",
      ),
    },
    {
      q: text("Does an inquiry confirm my booking?", "الاستفسار بيأكد الحجز؟"),
      a: text(
        "No. An inquiry does not confirm a booking; the academy team will share available schedules, session details, and booking steps.",
        "لا، إرسال الاستفسار مش تأكيد للحجز. فريق الأكاديمية هيوضحلك المواعيد المتاحة وتفاصيل المحاضرات وخطوات الحجز.",
      ),
    },
  ],
  levels: [
    level(
      1,
      ["C++ Fundamentals", "أساسيات C++"],
      [
        "Write your first C++ programs using cout/cin, variables, conditions, loops, and functions, and practice introductory exercises on HackerRank (Input and Output, Conditional Statements, and Functions).",
        "هتبدأ بأول برامجك بلغة C++ باستخدام cout وcin والمتغيرات والشروط والحلقات والدوال، وتطبق على تمارين HackerRank (Input and Output وConditional Statements وFunctions).",
      ],
      [
        "Basic computer skills; no prior C++ experience needed. We help set up a C++ compiler and editor before starting.",
        "معرفة أساسية بالكمبيوتر؛ مش محتاج خبرة سابقة في C++. بنساعدك تجهز بيئة تشغيل C++ قبل البداية.",
      ],
      [
        "HackerRank Fundamentals Challenge Set: complete guided exercises covering Input and Output, Conditional Statements, and Functions, plus a combined console challenge.",
        "مجموعة تحديات أساسيات HackerRank: حل تمارين موجهة تشمل Input and Output وConditional Statements وFunctions، بالإضافة إلى تحدٍّ يجمع الشروط والحلقات والدوال.",
      ],
      [
        [
          "Write, compile, and run basic C++ console programs with cout and cin.",
          "تكتب وتترجم وتشغّل برامج C++ أساسية باستخدام cout وcin.",
        ],
        [
          "Use variables, data types, arithmetic, modulo, conditions, and loops accurately.",
          "تستخدم المتغيرات وأنواع البيانات والعمليات الحسابية وباقي القسمة والشروط والحلقات بدقة.",
        ],
        [
          "Organize logic into functions and submit working solutions on HackerRank.",
          "تنظم الكود داخل دوال وتسلم حلول شغالة على HackerRank.",
        ],
      ],
      [
        session(
          1,
          [
            "First C++ Program & Basic I/O",
            "أول برنامج بلغة C++ والإدخال والإخراج",
          ],
          [
            [
              "First C++ program structure and basic syntax",
              "هيكل أول برنامج بلغة C++ وقواعد الكتابة الأساسية",
            ],
            [
              "Console output with cout and input with cin",
              "طباعة المخرجات باستخدام cout وقراءة المدخلات باستخدام cin",
            ],
            [
              "Submitting a first exercise on HackerRank (Input and Output)",
              "تسليم أول تمرين على منصة HackerRank (Input and Output)",
            ],
          ],
          [
            "Write a C++ program that reads values with cin, prints formatted output with cout, and submit the HackerRank Input and Output exercise.",
            "اكتب برنامج C++ يقرأ مدخلات بـcin ويطبع نتيجة منسقة بـcout، وسلم تمرين Input and Output على HackerRank.",
          ],
          [
            [
              "Compile and run a first C++ program and verify console input/output on HackerRank.",
              "تترجم وتشغّل أول برنامج C++ وتتحقق من الإدخال والإخراج على HackerRank.",
            ],
          ],
        ),
        session(
          2,
          [
            "Variables, Data Types & Operators",
            "المتغيرات وأنواع البيانات والعمليات",
          ],
          [
            [
              "Variables and core C++ data types (int, double, char, bool, string)",
              "المتغيرات وأنواع البيانات الأساسية في C++ (int وdouble وchar وbool وstring)",
            ],
            [
              "Arithmetic operators and modulo (%)",
              "العمليات الحسابية ومعامل باقي القسمة modulo (%)",
            ],
            [
              "Basic type conversion between numeric types",
              "التحويل الأساسي بين الأنواع العددية (Type Conversion)",
            ],
          ],
          [
            "Build a small calculator that computes sums, averages with type conversion, and remainders using modulo.",
            "اعمل برنامج حسابات صغير يحسب المجموع والمتوسط مع تحويل الأنواع وباقي القسمة باستخدام modulo.",
          ],
          [
            [
              "Choose suitable data types, apply arithmetic and modulo operators, and avoid integer-division surprises.",
              "تختار أنواع بيانات مناسبة وتستخدم العمليات الحسابية وباقي القسمة وتتجنب أخطاء قسمة الأعداد الصحيحة.",
            ],
          ],
        ),
        session(
          3,
          ["Conditions & Logical Operators", "الشروط والعمليات المنطقية"],
          [
            [
              "Comparison operators and if / else branching",
              "عمليات المقارنة والتفرع باستخدام if وelse",
            ],
            [
              "Logical operators (&&, ||, !) for combined conditions",
              "العمليات المنطقية (&& و|| و!) لبناء شروط مركبة",
            ],
            [
              "HackerRank Conditional Statements practice",
              "التطبيق على تمرين Conditional Statements في HackerRank",
            ],
          ],
          [
            "Practice even/odd checks and student grade conditions, then solve HackerRank Conditional Statements.",
            "طبّق على فحص الأعداد الزوجية والفردية وتقديرات الدرجات، وبعدها حل تمرين Conditional Statements على HackerRank.",
          ],
          [
            [
              "Write clear decision branches and handle boundary values cleanly.",
              "تكتب شروط واضحة لاتخاذ القرار وتتعامل مع القيم الحدية بشكل سليم.",
            ],
          ],
        ),
        session(
          4,
          ["Loops & Step-by-Step Tracing", "الحلقات وتتبع التنفيذ خطوة بخطوة"],
          [
            [
              "Repeating work with for and while loops",
              "تكرار الخطوات باستخدام حلقات for وwhile",
            ],
            [
              "Counting, summing, and accumulator patterns",
              "أنماط العد والجمع واستخدام متغيرات التجميع",
            ],
            [
              "Tracing loop variables step by step to catch off-by-one bugs",
              "تتبع قيم متغيرات الحلقة خطوة بخطوة لاكتشاف أخطاء الحدود",
            ],
          ],
          [
            "Write loop exercises for counting and summing sequences, and trace each iteration on paper or console output.",
            "اكتب تمارين للعد والجمع باستخدام الحلقات، وتتبّع كل دورة في الحلقة خطوة بخطوة.",
          ],
          [
            [
              "Choose between for and while loops and trace execution to verify loop bounds.",
              "تختار بين for وwhile وتتتبع تنفيذ الحلقة للتأكد من صحة عدد التكرارات.",
            ],
          ],
        ),
        session(
          5,
          ["Functions & Combined Challenge", "الدوال وتحدّي المستوى"],
          [
            [
              "Defining functions, parameters, and return values",
              "تعريف الدوال والمعاملات (Parameters) والقيم الراجعة (Return Values)",
            ],
            [
              "Breaking a problem into reusable helper functions",
              "تقسيم المسألة إلى دوال مساعدة واضحة وقابلة لإعادة الاستخدام",
            ],
            [
              "HackerRank Functions exercise and combined challenge",
              "تمرين Functions على HackerRank وتحدّي شامل للمستوى",
            ],
          ],
          [
            "Solve HackerRank Functions, then complete a challenge combining conditions, loops, and functions.",
            "حل تمرين Functions على HackerRank، وبعدها نفّذ تحدي يجمع بين الشروط والحلقات والدوال.",
          ],
          [
            [
              "Design small functions with clear inputs and return values to solve multi-step problems.",
              "تصمم دوال صغيرة بمدخلات ومخرجات واضحة لحل مسائل متعددة الخطوات.",
            ],
          ],
        ),
      ],
    ),
    level(
      2,
      ["C++ Problem Solving", "حل المسائل باستخدام C++"],
      [
        "Move from syntax to structured problem solving with arrays, strings, vectors, std::sort, and frequency counting, practicing on Codeforces (71A Way Too Long Words, 158A Next Round, and 339A Helpful Maths).",
        "هتنتقل من أساسيات الكتابة لحل المسائل المنظم باستخدام المصفوفات والنصوص وvectors وstd::sort ومصفوفات التكرار، مع التطبيق على Codeforces (71A Way Too Long Words و158A Next Round و339A Helpful Maths).",
      ],
      [
        "Level 1 or equivalent knowledge of C++ I/O, variables, conditions, loops, and functions.",
        "إكمال المستوى الأول أو معرفة مكافئة بالإدخال والإخراج والمتغيرات والشروط والحلقات والدوال في C++.",
      ],
      [
        "Guided Codeforces Problem Set: solve and debug classic problems including 71A Way Too Long Words, 158A Next Round, and 339A Helpful Maths.",
        "مجموعة مسائل Codeforces موجهة: حل واختبار مسائل شهيرة مثل 71A Way Too Long Words و158A Next Round و339A Helpful Maths.",
      ],
      [
        [
          "Process fixed arrays, dynamic vectors, and strings in C++ problem solving.",
          "تتعامل مع المصفوفات الثابتة وvectors الديناميكية والنصوص في حل المسائل.",
        ],
        [
          "Use std::sort and frequency arrays to simplify counting and ordering tasks.",
          "تستخدم std::sort ومصفوفات التكرار لتبسيط مسائل الترتيب وعدّ التكرارات.",
        ],
        [
          "Read problem constraints, test edge cases, submit on Codeforces, and debug wrong answers.",
          "تقرأ شروط وقيود المسائل وتختبر الحالات الحدية وتسلم الحل على Codeforces وتصلح أخطاء Wrong Answer.",
        ],
      ],
      [
        session(
          1,
          ["Arrays & Traversal Patterns", "المصفوفات وأنماط المرور عليها"],
          [
            [
              "Declaring and indexing fixed-size arrays in C++",
              "تعريف المصفوفات الثابتة والوصول للعناصر في C++",
            ],
            [
              "Finding a maximum value and computing sums across an array",
              "إيجاد أكبر قيمة وحساب المجموع داخل المصفوفة",
            ],
            [
              "Counting elements that satisfy a condition (e.g., 158A Next Round logic)",
              "عدّ العناصر التي تحقق شرطًا محددًا (زي فكرة مسألة 158A Next Round)",
            ],
          ],
          [
            "Traverse an array to find the maximum, calculate the total sum, and count elements matching a threshold condition.",
            "مرّ على مصفوفة لإيجاد أكبر قيمة وحساب المجموع وعدّ العناصر اللي تحقق شرط معين.",
          ],
          [
            [
              "Write safe array loops without out-of-bounds access.",
              "تكتب حلقات آمنة للمرور على المصفوفات من غير الخروج عن حدودها.",
            ],
          ],
        ),
        session(
          2,
          ["Strings & Character Operations", "النصوص والعمليات على الحروف"],
          [
            [
              "Working with std::string length, indexing, and character checks",
              "التعامل مع طول std::string والفهارس وفحص الحروف",
            ],
            [
              "Shortening long words (71A Way Too Long Words pattern)",
              "اختصار الكلمات الطويلة (فكرة مسألة 71A Way Too Long Words)",
            ],
            [
              "Reversing text and transforming characters step by step",
              "عكس النصوص وتعديل الحروف خطوة بخطوة",
            ],
          ],
          [
            "Practice shortening long words and reversing strings, and solve Codeforces 71A Way Too Long Words.",
            "اتدرّب على اختصار الكلمات وعكس النصوص، وحل مسألة 71A Way Too Long Words على Codeforces.",
          ],
          [
            [
              "Manipulate characters and strings cleanly to match exact output formats.",
              "تتعامل مع الحروف والنصوص بدقة عشان تطابق شكل المخرجات المطلوب.",
            ],
          ],
        ),
        session(
          3,
          [
            "Vectors & Runtime-Sized Input",
            "المتجهات Vectors والمدخلات متغيرة الحجم",
          ],
          [
            [
              "Creating std::vector collections sized from runtime input",
              "إنشاء مجموعات std::vector بحجم يتحدد وقت التشغيل",
            ],
            [
              "Reading, appending with push_back, and iterating over vectors",
              "قراءة البيانات وإضافتها بـpush_back والمرور على عناصر vector",
            ],
            [
              "Applying vectors to 158A Next Round",
              "تطبيق vectors في حل مسألة 158A Next Round",
            ],
          ],
          [
            "Read a runtime-sized list of numbers into a vector, compute summary results, and solve Codeforces 158A Next Round.",
            "اقرأ قائمة أرقام بحجم متغير داخل vector، وعالجها، وحل مسألة 158A Next Round على Codeforces.",
          ],
          [
            [
              "Use std::vector whenever input size is not fixed at compile time.",
              "تستخدم std::vector لما يكون حجم المدخلات غير ثابت قبل التشغيل.",
            ],
          ],
        ),
        session(
          4,
          [
            "Sorting with std::sort & Frequency Arrays",
            "الترتيب بـstd::sort ومصفوفات التكرار",
          ],
          [
            [
              "Sorting vectors and arrays with std::sort",
              "ترتيب المصفوفات وvectors باستخدام std::sort",
            ],
            [
              "Frequency counting using a simple array",
              "حساب تكرار القيم باستخدام مصفوفة تكرار بسيطة",
            ],
            [
              "Ordering parsed values (339A Helpful Maths)",
              "ترتيب القيم المستخرجة من النص (مسألة 339A Helpful Maths)",
            ],
          ],
          [
            "Sort numeric inputs with std::sort, count occurrences with a frequency array, and solve Codeforces 339A Helpful Maths.",
            "رتّب أرقام بـstd::sort، واحسب التكرارات بمصفوفة بسيطة، وحل مسألة 339A Helpful Maths على Codeforces.",
          ],
          [
            [
              "Combine std::sort and simple frequency counting to solve ordering and counting problems.",
              "تدمج بين std::sort وعدّ التكرارات لحل مسائل الترتيب والإحصاء البسيط.",
            ],
          ],
        ),
        session(
          5,
          ["Guided Codeforces Challenge & Debugging", "تحدّي Codeforces وتصحيح الأخطاء"],
          [
            [
              "Reading problem statements, input formats, and constraints carefully",
              "قراءة نص المسألة وشكل المدخلات والقيود بدقة",
            ],
            [
              "Designing edge-case tests before submitting",
              "تجهيز اختبارات للحالات الحدية قبل التسليم",
            ],
            [
              "Submitting on Codeforces and debugging a wrong answer",
              "تسليم الحل على Codeforces وتشخيص وإصلاح خطأ Wrong Answer",
            ],
          ],
          [
            "Complete a guided Codeforces challenge: test edge cases locally, submit your solution, and debug a wrong answer with the instructor.",
            "نفّذ تحدّي Codeforces موجه: اختبر الحالات الحدية محليًا، وسلم الحل، واكتشف وصحّح سبب Wrong Answer مع المدرب.",
          ],
          [
            [
              "Follow a repeatable problem-solving workflow from reading constraints to debugging failed test cases.",
              "تتبع خطوات منظمة في حل المسائل من قراءة القيود لحد تصحيح حالات الاختبار الخاطئة.",
            ],
          ],
        ),
      ],
    ),
    level(
      3,
      ["C++ STL & Practical Applications", "مكتبة C++ القياسية وتطبيقاتها"],
      [
        "Use core STL containers (set, unordered_set, map, unordered_map), practice binary search and introductory Big O on LeetCode Easy (Contains Duplicate, Two Sum, Binary Search), learn basic classes, and build a Student Grade Manager console app.",
        "هتستخدم حاويات مكتبة STL الأساسية (set وunordered_set وmap وunordered_map)، وتطبق البحث الثنائي ومقدمة Big O على مسائل LeetCode Easy (Contains Duplicate وTwo Sum وBinary Search)، وتتعلم أساسيات الـClasses، وتبني برنامج Console لإدارة درجات الطلاب.",
      ],
      [
        "Level 2 or equivalent C++ knowledge of arrays, strings, vectors, and std::sort.",
        "إكمال المستوى التاني أو معرفة مكافئة بالمصفوفات والنصوص وvectors وstd::sort في C++.",
      ],
      [
        "Student Grade Manager Console Application: enter student names and grades using a Student class, search for a student, sort results, and verify behavior with varied test inputs.",
        "تطبيق Console لإدارة درجات الطلاب: إدخال أسماء ودرجات الطلاب باستخدام Student Class، والبحث عن طالب، وترتيب النتائج، واختبار البرنامج بمدخلات متنوعة.",
      ],
      [
        [
          "Choose between set, unordered_set, map, and unordered_map for lookup and frequency tasks.",
          "تختار بين set وunordered_set وmap وunordered_map لمهام البحث وعدّ التكرارات.",
        ],
        [
          "Compare linear search, binary search, and nested-loop approaches using simple Big O step counts.",
          "تقارن بين البحث الخطي والبحث الثنائي والحلقات المتداخلة باستخدام فكرة Big O وعدّ الخطوات.",
        ],
        [
          "Define a simple C++ class with a constructor and build a working console grade manager.",
          "تكتب Class بسيط بـConstructor وتبني برنامج Console شغال لإدارة درجات الطلاب.",
        ],
      ],
      [
        session(
          1,
          ["Sets: set & unordered_set", "المجموعات: set وunordered_set"],
          [
            [
              "Storing unique values with std::set and std::unordered_set",
              "تخزين القيم الفريدة باستخدام std::set وstd::unordered_set",
            ],
            [
              "Ordered vs hash-based membership checks",
              "الفرق بين الفحص المرتب والفحص السريع بالتجزئة (Hash)",
            ],
            [
              "LeetCode Easy practice: Contains Duplicate",
              "التطبيق على مسألة LeetCode Easy: Contains Duplicate",
            ],
          ],
          [
            "Detect duplicate values cleanly using unordered_set and solve Contains Duplicate on LeetCode.",
            "اكتشف القيم المكررة بسهولة باستخدام unordered_set وحل مسألة Contains Duplicate على LeetCode.",
          ],
          [
            [
              "Use set and unordered_set to track seen values and check uniqueness.",
              "تستخدم set وunordered_set لمتابعة القيم السابقة واكتشاف التكرار.",
            ],
          ],
        ),
        session(
          2,
          ["Maps: map & unordered_map", "الخرائط: map وunordered_map"],
          [
            [
              "Frequency counting with std::map",
              "عدّ التكرارات المرتب باستخدام std::map",
            ],
            [
              "Fast key-value lookups with std::unordered_map",
              "البحث السريع بالمفتاح والقيمة باستخدام std::unordered_map",
            ],
            [
              "Solving Two Sum and comparing it with nested loops",
              "حل مسألة Two Sum ومقارنة الحل بالحلقات المتداخلة",
            ],
          ],
          [
            "Solve Two Sum on LeetCode with unordered_map and compare its step count against a nested-loop solution.",
            "حل مسألة Two Sum على LeetCode باستخدام unordered_map وقارن عدد خطواته مع حل الحلقات المتداخلة.",
          ],
          [
            [
              "Use map/unordered_map for counting and fast lookup, and explain why it avoids redundant checks.",
              "تستخدم map وunordered_map للعدّ والبحث السريع وتشرح إزاي بتوفر خطوات مكررة.",
            ],
          ],
        ),
        session(
          3,
          [
            "Linear Search, Binary Search & Intro to Big O",
            "البحث الخطي والبحث الثنائي ومقدمة في Big O",
          ],
          [
            [
              "Linear search vs binary search on sorted input",
              "البحث الخطي مقابل البحث الثنائي على بيانات مرتبة",
            ],
            [
              "Introduction to Big O through counting steps as input grows",
              "مقدمة في Big O من خلال عدّ الخطوات مع زيادة حجم البيانات",
            ],
            [
              "LeetCode Easy practice: Binary Search",
              "التطبيق على مسألة LeetCode Easy: Binary Search",
            ],
          ],
          [
            "Implement binary search on a sorted vector, trace low/mid/high pointers, and solve Binary Search on LeetCode.",
            "نفّذ البحث الثنائي على vector مرتب وتتبّع مؤشرات البداية والمنتصف والنهاية، وحل مسألة Binary Search على LeetCode.",
          ],
          [
            [
              "Write a correct binary search loop and estimate step growth using basic Big O notation.",
              "تكتب حلقة بحث ثنائي صحيحة وتقدّر نمو عدد الخطوات باستخدام مبادئ Big O.",
            ],
          ],
        ),
        session(
          4,
          ["Classes, Objects & Constructors", "الفئات Classes والكائنات وConstructors"],
          [
            [
              "Introduction to classes and objects in C++",
              "مقدمة في الفئات (Classes) والكائنات (Objects) في C++",
            ],
            [
              "Data members, member functions, and constructors",
              "الخصائص والدوال داخل الـClass واستخدام Constructors",
            ],
            [
              "Designing and testing a simple Student class",
              "تصميم وتجربة Student Class بسيط",
            ],
          ],
          [
            "Build a Student class with a constructor storing name and grade, plus helper methods to display and compare records.",
            "ابني Student Class بـConstructor يخزن الاسم والدرجة، مع دوال بسيطة لعرض ومقارنة السجلات.",
          ],
          [
            [
              "Model structured records with a C++ class and instantiate objects cleanly.",
              "تمثل بيانات منظمة باستخدام Class في C++ وتنشئ منها كائنات بشكل سليم.",
            ],
          ],
        ),
        session(
          5,
          [
            "Final Console Project: Student Grade Manager",
            "المشروع النهائي: برنامج إدارة درجات الطلاب",
          ],
          [
            [
              "Combining Student objects, vectors, search, and std::sort",
              "دمج كائنات Student وvectors والبحث والترتيب بـstd::sort",
            ],
            [
              "Entering grades, finding a student, and sorting results",
              "إدخال الدرجات والبحث عن طالب وترتيب النتائج",
            ],
            [
              "Testing the application with normal and edge-case inputs",
              "اختبار التطبيق بمدخلات عادية وحالات حدية مختلفة",
            ],
          ],
          [
            "Complete the Student Grade Manager console app with grade entry, student lookup, and sorted output, and test it with multiple inputs.",
            "كمل برنامج إدارة درجات الطلاب بوظائف إدخال الدرجات والبحث عن طالب وترتيب النتائج، واختبره بمدخلات مختلفة.",
          ],
          [
            [
              "Deliver, test, and explain a working C++ console application combining fundamentals, STL, and a custom class.",
              "تسلم وتختبر وتشرح تطبيق C++ Console شغال يجمع بين الأساسيات وSTL وStudent Class.",
            ],
          ],
        ),
      ],
    ),
  ],
};

