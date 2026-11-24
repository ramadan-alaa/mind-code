import type { Course, CourseLevel, CourseSession, Localized } from "./courses";

const text = (en: string, ar: string): Localized => ({ en, ar });
type Bilingual = [en: string, ar: string];
const session = (
  title: Bilingual,
  topics: Bilingual[],
  practice: Bilingual,
): Omit<CourseSession, "number"> => ({
  title: text(...title),
  topics: topics.map(([en, ar]) => text(en, ar)),
  practiceTask: text(...practice),
  learningObjectives: [text(...practice)],
});
const level = (
  title: Bilingual,
  overview: Bilingual,
  project: Bilingual,
  outcomes: Bilingual[],
  sessions: Omit<CourseSession, "number">[],
): CourseLevel => ({
  ...text(...title),
  overview: text(...overview),
  project: text(...project),
  outcomes: outcomes.map(([en, ar]) => text(en, ar)),
  // The existing academy programs use two-hour live sessions. Counts here are proposals.
  hoursPerSession: 2,
  sessions: sessions.map((item, index) => ({ ...item, number: index + 1 })),
});

const track = (
  config: Pick<
    Course,
    | "slug"
    | "name"
    | "localizedName"
    | "color"
    | "symbol"
    | "price"
    | "oldPrice"
    | "category"
    | "description"
    | "audience"
    | "prerequisites"
    | "sessionCountsProposed"
  >,
  levels: CourseLevel[],
): Course => {
  const sessionCountsProposed = config.sessionCountsProposed ?? false;
  const sessionsPerLevel = levels[0].sessions!.length;
  const totalSessions = levels.reduce(
    (sum, item) => sum + item.sessions!.length,
    0,
  );
  const totalHours = levels.reduce(
    (sum, item) => sum + item.sessions!.length * (item.hoursPerSession ?? 2),
    0,
  );
  return {
    ...config,
    program: true,
    inquiryLabel: text(
      `Ask about ${config.name}`,
      `استفسر عن ${config.localizedName!.ar}`,
    ),
    overviewPage: true,
    sessionCountsProposed,
    scheduleOnRequest: true,
    difficulty: "beginner",
    category: config.category,
    sessions: sessionsPerLevel,
    hours: sessionsPerLevel * levels[0].hoursPerSession!,
    cardDescription: config.description,
    outcomes: levels.flatMap((item) => item.outcomes ?? []),
    progression: text(
      "Follow the levels in order, or ask the academy to help you choose a starting level based on your previous experience.",
      "امشي في المستويات بالترتيب، أو اسأل الأكاديمية تساعدك تختار نقطة البداية حسب خبرتك السابقة.",
    ),
    faq: [
      sessionCountsProposed
        ? {
            q: text("Are the session counts confirmed?", "عدد المحاضرات مؤكد؟"),
            a: text(
              "The session counts shown are proposed for local preview and await academy approval. Sessions follow the academy’s two-hour format; ask us about available schedules and placement.",
              "أعداد المحاضرات المعروضة مقترحة للمعاينة المحلية ومستنية موافقة الأكاديمية. المحاضرة ساعتين حسب نظام الأكاديمية؛ اسألنا عن المواعيد المتاحة والمستوى المناسب ليك.",
            ),
          }
        : {
            q: text(
              "How many sessions are in each level?",
              "كام محاضرة في كل مستوى؟",
            ),
            a: text(
              `Each level has ${sessionsPerLevel} live two-hour sessions (${sessionsPerLevel * 2} hours per level). All ${levels.length} levels total ${totalSessions} sessions and ${totalHours} teaching hours. Ask us about available schedules and placement.`,
              `كل مستوى ${sessionsPerLevel} محاضرات لايف، كل محاضرة ساعتين (${sessionsPerLevel * 2} ساعة للمستوى). المسار بالكامل ${totalSessions} محاضرة و${totalHours} ساعة تدريس على ${levels.length} مستويات. اسألنا عن المواعيد المتاحة والمستوى المناسب ليك.`,
            ),
          },
      {
        q: text("Is the price for the whole track?", "السعر ده للمسار كله؟"),
        a: text(
          `The current price is ${config.price.toLocaleString("en-US")} EGP per learner per level, reduced from ${config.oldPrice!.toLocaleString("en-US")} EGP. You can inquire about one level at a time. An inquiry does not confirm a booking.`,
          `السعر الحالي ${config.price.toLocaleString("en-US")} جنيه لكل طالب لكل مستوى، بدل ${config.oldPrice!.toLocaleString("en-US")} جنيه. تقدر تستفسر عن مستوى واحد في كل مرة. الاستفسار مش تأكيد للحجز.`,
        ),
      },
      {
        q: text("How does learning work?", "التعلم بيكون إزاي؟"),
        a: text(
          "Live online in small groups, with explanations, practical exercises and instructor review. The listed tools are part of the curriculum.",
          "أونلاين مباشر في مجموعات صغيرة، مع شرح وتمارين عملية ومراجعة مع المدرب. الأدوات المذكورة جزء من المنهج اللي هنتعلمه.",
        ),
      },
    ],
    levels: levels.map((item, index) => ({
      ...item,
      id: `${config.slug}-level-${index + 1}`,
      slug: `level-${index + 1}`,
      price: config.price,
      oldPrice: config.oldPrice,
      prerequisites:
        index === 0
          ? config.prerequisites
          : text(
              `Complete level ${index} of this track, or discuss equivalent knowledge with the academy.`,
              `تكون خلصت المستوى ${index} من المسار، أو تتفق مع الأكاديمية على معرفة سابقة مكافئة.`,
            ),
    })),
  };
};

// Repository-managed catalog: stable slugs and level IDs; no seed or remote writes.
export const learningTracks: Course[] = [
  track(
    {
      slug: "python-programming",
      category: "languages",
      name: "Python Programming",
      localizedName: text("Python Programming", "البرمجة بلغة بايثون"),
      color: "#74b9e8",
      symbol: "Py",
      price: 1200,
      oldPrice: 1400,
      description: text(
        "A structured three-level path from Python fundamentals through files, modules and an introduction to OOP, with practical exercises and mini projects.",
        "مسار من ٣ مستويات، من أساسيات بايثون للتعامل مع الملفات والوحدات البرمجية ومقدمة في OOP، مع تمارين عملية ومشاريع صغيرة.",
      ),
      audience: text(
        "Learners who want a structured path in Python, from fundamentals to practical programs and an introduction to OOP.",
        "للي عايز مسار منظم في بايثون، من الأساسيات لبرامج عملية ومقدمة في البرمجة كائنية التوجه.",
      ),
      prerequisites: text(
        "Basic computer and file skills; no previous Python experience needed for level 1.",
        "معرفة بسيطة باستخدام الكمبيوتر والملفات؛ مش محتاج خبرة سابقة في بايثون للمستوى الأول.",
      ),
    },
    [
      level(
        ["Python Fundamentals", "أساسيات بايثون"],
        [
          "Write small interactive Python programs using types, input, operators and conditions, and learn to debug them.",
          "هتكتب برامج بايثون تفاعلية صغيرة باستخدام أنواع البيانات والإدخال والعمليات والشروط، وتتعلم تصلح أخطاءها.",
        ],
        [
          "Build and debug a small interactive calculator with input conversion and conditions.",
          "ابني آلة حاسبة تفاعلية صغيرة بتحويل المدخلات والشروط، وجربها وصلح أخطاءها.",
        ],
        [
          [
            "Write and debug simple Python programs.",
            "تكتب برامج بايثون بسيطة وتصلح أخطاءها.",
          ],
          [
            "Read input, convert types and make decisions with conditions.",
            "تقرأ المدخلات وتحول أنواعها وتستخدم الشروط لاتخاذ قرارات.",
          ],
        ],
        [
          session(
            ["First Python code", "أول كود بايثون"],
            [["Syntax", "قواعد كتابة الكود"]],
            [
              "Run a short Python script and correct its syntax.",
              "شغل كود بايثون قصير وصلح طريقة كتابته.",
            ],
          ),
          session(
            ["Variables and types", "المتغيرات وأنواع البيانات"],
            [
              ["Variables", "المتغيرات"],
              ["Data Types", "أنواع البيانات"],
            ],
            [
              "Store values and identify their types.",
              "خزن قيم وحدد نوع كل قيمة.",
            ],
          ),
          session(
            ["Input and output", "الإدخال والإخراج"],
            [["Input and Output (I/O)", "إدخال وإخراج البيانات (I/O)"]],
            [
              "Read a value and display a response.",
              "اقرأ قيمة من المستخدم واعرض رد عليها.",
            ],
          ),
          session(
            ["Operators and conversion", "العمليات وتحويل الأنواع"],
            [
              ["Operators", "العمليات"],
              ["Type Casting", "تحويل أنواع البيانات"],
            ],
            [
              "Convert numeric input and calculate a result.",
              "حول المدخلات لأرقام واحسب نتيجة.",
            ],
          ),
          session(
            ["Conditions", "الشروط"],
            [["Conditions", "الشروط"]],
            [
              "Choose a response using if and else.",
              "اختار الرد باستخدام if وelse.",
            ],
          ),
          session(
            ["Debugging practice", "تطبيق على إصلاح الأخطاء"],
            [["Debugging", "اكتشاف الأخطاء وإصلاحها"]],
            [
              "Test and debug the interactive calculator.",
              "جرب الآلة الحاسبة التفاعلية وصلح أخطاءها.",
            ],
          ),
        ],
      ),
      level(
        [
          "Core Python and Problem Solving",
          "أساسيات بايثون التطبيقية وحل المشكلات",
        ],
        [
          "Use loops, collections and functions to organize code and solve small programming problems.",
          "هتستخدم الحلقات ومجموعات البيانات والدوال عشان تنظم الكود وتحل مشكلات برمجية صغيرة.",
        ],
        [
          "Build an in-memory quiz that uses collections, loops and reusable functions.",
          "ابني اختبار أسئلة في الذاكرة باستخدام مجموعات البيانات والحلقات ودوال قابلة لإعادة الاستخدام.",
        ],
        [
          [
            "Choose suitable Python collections and iterate over them.",
            "تختار مجموعات بيانات مناسبة في بايثون وتستخدم الحلقات معاها.",
          ],
          [
            "Break a problem into reusable functions.",
            "تقسم المشكلة لدوال تقدر تستخدمها تاني.",
          ],
        ],
        [
          session(
            ["Loops", "الحلقات"],
            [["Loops", "الحلقات"]],
            [
              "Repeat steps with for and while.",
              "كرر خطوات باستخدام for وwhile.",
            ],
          ),
          session(
            ["Strings", "النصوص"],
            [["Strings", "النصوص"]],
            ["Search and format a short text.", "ابحث في نص قصير ونسقه."],
          ),
          session(
            ["Lists and tuples", "القوائم والمجموعات الثابتة"],
            [
              ["Lists", "القوائم"],
              ["Tuples", "المجموعات الثابتة (Tuples)"],
            ],
            [
              "Add, update and traverse list items, and represent fixed values with a tuple.",
              "ضيف عناصر لقائمة وعدلها ومر عليها، ومثل قيم ثابتة باستخدام Tuple.",
            ],
          ),
          session(
            ["Dictionaries and sets", "القواميس والمجموعات الفريدة"],
            [
              ["Dictionaries", "القواميس"],
              ["Sets", "المجموعات الفريدة (Sets)"],
            ],
            [
              "Look up values by key in a dictionary and remove duplicates using a set.",
              "دور على قيم بالمفتاح في Dictionary وشيل القيم المتكررة باستخدام Set.",
            ],
          ),
          session(
            ["Functions", "الدوال"],
            [["Functions", "الدوال"]],
            [
              "Write and reuse a function with a return value.",
              "اكتب دالة بترجع قيمة واستخدمها أكتر من مرة.",
            ],
          ),
          session(
            ["Problem solving", "حل المشكلات"],
            [["Problem Solving", "حل المشكلات"]],
            [
              "Combine functions and collections in the quiz.",
              "اجمع الدوال ومجموعات البيانات في اختبار الأسئلة.",
            ],
          ),
        ],
      ),
      level(
        [
          "Practical Python and Intro to OOP",
          "تطبيقات بايثون ومقدمة في البرمجة كائنية التوجه",
        ],
        [
          "Work with files and structured data, handle exceptions, organize modules and packages, and take your first steps with OOP.",
          "هتتعامل مع الملفات والبيانات المنظمة والاستثناءات، وتنظم الكود بوحدات وحزم، وتبدأ أول خطواتك في OOP.",
        ],
        [
          "Create a small record manager that saves CSV or JSON data, handles errors and uses a simple class.",
          "اعمل برنامج صغير لإدارة سجلات بيحفظ بيانات CSV أو JSON، ويتعامل مع الأخطاء ويستخدم Class بسيط.",
        ],
        [
          [
            "Read and save structured files and handle exceptions.",
            "تقرأ ملفات منظمة وتحفظها وتتعامل مع الاستثناءات.",
          ],
          [
            "Organize a mini project using modules and a simple class.",
            "تنظم مشروع صغير باستخدام وحدات برمجية وClass بسيط.",
          ],
        ],
        [
          session(
            ["Files", "الملفات"],
            [["File Handling", "التعامل مع الملفات"]],
            ["Read and write a text file.", "اقرأ ملف نصي واكتب فيه."],
          ),
          session(
            ["CSV and JSON", "CSV وJSON"],
            [["CSV and JSON", "ملفات CSV وJSON"]],
            [
              "Save and load a small set of records.",
              "احفظ مجموعة سجلات صغيرة واقرأها تاني.",
            ],
          ),
          session(
            ["Exceptions", "الاستثناءات"],
            [["Exceptions", "الاستثناءات"]],
            [
              "Handle invalid input and missing files.",
              "اتعامل مع المدخلات الغلط والملفات الناقصة.",
            ],
          ),
          session(
            ["Modules and packages", "الوحدات والحزم"],
            [
              ["Modules", "الوحدات البرمجية"],
              ["Packages", "الحزم البرمجية"],
            ],
            [
              "Split helpers into modules inside a package.",
              "قسم الدوال المساعدة لوحدات داخل حزمة.",
            ],
          ),
          session(
            ["First steps with OOP", "أول خطوة في OOP"],
            [
              [
                "Introduction to Object-Oriented Programming (OOP)",
                "مقدمة في البرمجة كائنية التوجه (OOP)",
              ],
            ],
            [
              "Define a simple class and create objects.",
              "عرف Class بسيط واعمل منه كائنات.",
            ],
          ),
          session(
            ["Mini projects", "مشاريع صغيرة"],
            [["Mini Projects", "مشاريع صغيرة"]],
            [
              "Finish and explain the record manager.",
              "كمل برنامج إدارة السجلات واشرحه.",
            ],
          ),
        ],
      ),
    ],
  ),
  track(
    {
      slug: "ai-machine-learning",
      category: "ai",
      name: "AI & Machine Learning",
      localizedName: text(
        "AI & Machine Learning",
        "الذكاء الاصطناعي وتعلّم الآلة",
      ),
      color: "#b5a3ef",
      symbol: "AI",
      price: 1600,
      oldPrice: 1800,
      sessionCountsProposed: false,
      description: text(
        "Four levels from AI fundamentals and supervised learning to model improvement, NLP, computer vision and a generative AI chatbot project.",
        "٤ مستويات من أساسيات الذكاء الاصطناعي والتعلّم الخاضع للإشراف لتحسين النماذج ومعالجة اللغة والرؤية الحاسوبية ومشروع شات بوت بالذكاء الاصطناعي التوليدي.",
      ),
      audience: text(
        "Learners who want to explore AI concepts and progress to guided machine learning and chatbot projects.",
        "للي عايز يفهم مفاهيم الذكاء الاصطناعي ويتدرج لتطبيقات تعلّم الآلة والشات بوت بإرشاد المدرب.",
      ),
      prerequisites: text(
        "Basic computer skills for level 1. Python fundamentals are recommended before the coding work in later levels; ask the academy about placement.",
        "معرفة بسيطة بالكمبيوتر للمستوى الأول. يُفضل أساسيات بايثون قبل التطبيق بالكود في المستويات التالية؛ اسأل الأكاديمية عن نقطة البداية المناسبة.",
      ),
    },
    [
      level(
        ["AI Fundamentals", "أساسيات الذكاء الاصطناعي"],
        [
          "Explore how training examples and classification work with Teachable Machine, and discuss responsible use of AI.",
          "هتفهم دور أمثلة التدريب والتصنيف باستخدام Teachable Machine، وتناقش الاستخدام المسؤول للذكاء الاصطناعي.",
        ],
        [
          "Create a small Teachable Machine classifier and explain its limitations and ethical considerations.",
          "اعمل نموذج تصنيف صغير بـTeachable Machine واشرح حدوده والاعتبارات الأخلاقية لاستخدامه.",
        ],
        [
          [
            "Explain the role of training data in classification.",
            "تشرح دور بيانات التدريب في التصنيف.",
          ],
          [
            "Try a simple classifier and discuss AI ethics.",
            "تجرب نموذج تصنيف بسيط وتناقش أخلاقيات الذكاء الاصطناعي.",
          ],
        ],
        [
          session(
            ["Meet AI", "نتعرف على الذكاء الاصطناعي"],
            [["AI Fundamentals", "أساسيات الذكاء الاصطناعي"]],
            [
              "Describe familiar examples of AI.",
              "اشرح أمثلة مألوفة للذكاء الاصطناعي.",
            ],
          ),
          session(
            ["Training examples", "أمثلة التدريب"],
            [["Training Data", "بيانات التدريب"]],
            [
              "Organize example data with clear labels.",
              "نظم أمثلة بيانات بتصنيفات واضحة.",
            ],
          ),
          session(
            ["Classification", "التصنيف"],
            [["Classification Concepts", "مفاهيم التصنيف"]],
            [
              "Assign examples to defined classes.",
              "وزع أمثلة على فئات محددة.",
            ],
          ),
          session(
            ["Teachable Machine", "نبدأ بـTeachable Machine"],
            [["Teachable Machine", "أداة Teachable Machine"]],
            [
              "Train a small classifier with guided examples.",
              "درب نموذج تصنيف صغير بأمثلة مع المدرب.",
            ],
          ),
          session(
            ["Classifier practice", "تطبيق على نموذج التصنيف"],
            [],
            [
              "Try new examples and describe where the classifier struggles.",
              "جرب أمثلة جديدة واشرح الحالات اللي النموذج بيغلط فيها.",
            ],
          ),
          session(
            ["AI ethics", "أخلاقيات الذكاء الاصطناعي"],
            [["AI Ethics", "أخلاقيات الذكاء الاصطناعي"]],
            [
              "Discuss bias, privacy and responsible use in your classifier.",
              "ناقش التحيز والخصوصية والاستخدام المسؤول في نموذجك.",
            ],
          ),
        ],
      ),
      level(
        ["Supervised Learning", "التعلّم الخاضع للإشراف"],
        [
          "Build guided classification and regression examples with KNN, decision trees and Scikit-learn, then evaluate predictions.",
          "هتبني أمثلة موجهة للتصنيف والانحدار باستخدام KNN وأشجار القرار وScikit-learn، وبعدها تقيم التوقعات.",
        ],
        [
          "Compare small supervised models on a labeled dataset and explain evaluation results.",
          "قارن نماذج تعلّم خاضع للإشراف على بيانات مصنفة واشرح نتائج التقييم.",
        ],
        [
          [
            "Distinguish classification from regression and fit simple models.",
            "تميز بين التصنيف والانحدار وتدرب نماذج بسيطة.",
          ],
          [
            "Evaluate and compare supervised model predictions.",
            "تقيم توقعات نماذج التعلّم الخاضع للإشراف وتقارنها.",
          ],
        ],
        [
          session(
            ["Supervised learning", "التعلّم الخاضع للإشراف"],
            [["Supervised Learning", "التعلّم الخاضع للإشراف"]],
            [
              "Identify inputs and labeled targets.",
              "حدد المدخلات والنتائج المصنفة.",
            ],
          ),
          session(
            ["Classification and regression", "التصنيف والانحدار"],
            [
              ["Classification", "التصنيف"],
              ["Regression", "الانحدار"],
            ],
            [
              "Set up a small classification task and predict a numeric value in a guided example.",
              "جهز مسألة تصنيف صغيرة وتوقع قيمة رقمية في مثال مع المدرب.",
            ],
          ),
          session(
            ["Nearest neighbors", "أقرب الجيران"],
            [["KNN", "خوارزمية KNN"]],
            [
              "Compare predictions using nearby examples.",
              "قارن التوقعات باستخدام أمثلة قريبة.",
            ],
          ),
          session(
            ["Decision trees", "أشجار القرار"],
            [["Decision Trees", "أشجار القرار"]],
            [
              "Trace the decisions in a small tree.",
              "تتبع القرارات في شجرة صغيرة.",
            ],
          ),
          session(
            ["Scikit-learn", "نستخدم Scikit-learn"],
            [["Scikit-learn", "مكتبة Scikit-learn"]],
            [
              "Fit and predict with a guided Scikit-learn model.",
              "درب نموذج موجه بـScikit-learn واستخدمه للتوقع.",
            ],
          ),
          session(
            ["Model evaluation and comparison", "تقييم النماذج ومقارنتها"],
            [["Model Evaluation", "تقييم النماذج"]],
            [
              "Evaluate predictions against held-out examples, compare the models and explain their errors.",
              "قيم التوقعات على أمثلة منفصلة عن التدريب، وقارن النماذج واشرح أخطاءها.",
            ],
          ),
        ],
      ),
      level(
        [
          "Model Improvement, NLP, and Computer Vision",
          "تحسين النماذج ومعالجة اللغة الطبيعية والرؤية الحاسوبية",
        ],
        [
          "Improve models, recognize overfitting, explore K-Means, and try text and image tasks with pre-trained models.",
          "هتحسن النماذج وتتعرف على فرط التعلّم وتجرب K-Means ومهام النصوص والصور باستخدام نماذج مدربة مسبقًا.",
        ],
        [
          "Present guided text and image experiments and compare model behavior before and after improvement.",
          "اعرض تجارب موجهة للنصوص والصور وقارن سلوك النموذج قبل التحسين وبعده.",
        ],
        [
          [
            "Recognize overfitting and try a model improvement.",
            "تتعرف على فرط التعلّم وتجرب تحسين نموذج.",
          ],
          [
            "Explore clustering, text classification and image tasks.",
            "تجرب التجميع وتصنيف النصوص ومهام الصور.",
          ],
        ],
        [
          session(
            ["Model improvement and overfitting", "تحسين النماذج وفرط التعلّم"],
            [
              ["Model Improvement", "تحسين النماذج"],
              ["Overfitting", "فرط التعلّم"],
            ],
            [
              "Compare training and evaluation behavior and test a guided improvement against a baseline.",
              "قارن أداء التدريب والتقييم وجرب تحسين نموذج مبدئي مع المدرب.",
            ],
          ),
          session(
            ["K-Means", "التجميع بـK-Means"],
            [["K-Means", "خوارزمية K-Means"]],
            [
              "Group similar examples and describe clusters.",
              "جمع الأمثلة المتشابهة واشرح المجموعات.",
            ],
          ),
          session(
            ["Language data", "بيانات اللغة"],
            [["NLP", "معالجة اللغة الطبيعية (NLP)"]],
            [
              "Prepare short text examples for a language task.",
              "جهز أمثلة نصية قصيرة لمهمة لغوية.",
            ],
          ),
          session(
            ["Text classification", "تصنيف النصوص"],
            [["Text Classification", "تصنيف النصوص"]],
            [
              "Classify short text examples and review classification mistakes.",
              "صنف أمثلة نصية قصيرة وراجع أخطاء التصنيف.",
            ],
          ),
          session(
            ["Computer vision", "الرؤية الحاسوبية"],
            [["Computer Vision", "الرؤية الحاسوبية"]],
            [
              "Explore a small image classification task.",
              "جرب مهمة صغيرة لتصنيف الصور.",
            ],
          ),
          session(
            ["Pre-trained models and review", "نماذج مدربة مسبقًا ومراجعة التجارب"],
            [["Pre-trained Models", "نماذج مدربة مسبقًا"]],
            [
              "Try a pre-trained model on guided examples and present the text and image experiments with their limitations.",
              "جرب نموذج مدرب مسبقًا على أمثلة مع المدرب واعرض تجارب النصوص والصور وحدود نتائجها.",
            ],
          ),
        ],
      ),
      level(
        [
          "Generative AI and Chatbot Development",
          "الذكاء الاصطناعي التوليدي وتطوير الشات بوت",
        ],
        [
          "Explore generative AI and LLMs, practice prompts and AI API calls, then build a guided chatbot interface with Streamlit.",
          "هتتعرف على الذكاء الاصطناعي التوليدي وLLMs، وتتدرب على التعليمات وAI APIs، وتبني واجهة شات بوت بـStreamlit مع المدرب.",
        ],
        [
          "Build and present a small Streamlit chatbot using an AI API, documenting prompts and limitations.",
          "ابني واعرض شات بوت صغير بـStreamlit باستخدام AI API، ووثق التعليمات وحدود التطبيق.",
        ],
        [
          [
            "Write prompts and make guided AI API requests.",
            "تكتب تعليمات وتنفذ طلبات AI API بإرشاد المدرب.",
          ],
          [
            "Build and explain a small Streamlit chatbot.",
            "تبني شات بوت صغير بـStreamlit وتشرح طريقة عمله.",
          ],
        ],
        [
          session(
            ["Generative AI and LLMs", "الذكاء الاصطناعي التوليدي ونماذج اللغة"],
            [
              ["Generative AI", "الذكاء الاصطناعي التوليدي"],
              ["LLMs", "نماذج اللغة الكبيرة (LLMs)"],
            ],
            [
              "Compare generated content, describe model inputs and responses, and note limitations.",
              "قارن محتوى مولد، واشرح مدخلات النموذج والردود وحدودها.",
            ],
          ),
          session(
            ["Prompt engineering", "هندسة التعليمات"],
            [["Prompt Engineering", "هندسة التعليمات"]],
            [
              "Compare prompts with clear context and constraints.",
              "قارن تعليمات فيها سياق وحدود واضحة.",
            ],
          ),
          session(
            ["AI APIs", "واجهات AI APIs"],
            [["AI APIs", "واجهات برمجة الذكاء الاصطناعي (AI APIs)"]],
            [
              "Make a guided API request and inspect the response.",
              "نفذ طلب API مع المدرب وافحص الرد.",
            ],
          ),
          session(
            ["Chatbot development", "تطوير الشات بوت"],
            [["Chatbot Development", "تطوير الشات بوت"]],
            ["Organize a simple conversation flow.", "نظم خطوات محادثة بسيطة."],
          ),
          session(
            ["Streamlit", "واجهة بـStreamlit"],
            [["Streamlit", "أداة Streamlit"]],
            [
              "Build a simple input and response interface.",
              "ابني واجهة بسيطة للمدخلات والردود.",
            ],
          ),
          session(
            ["Capstone project and presentation", "مشروع التخرج والعرض"],
            [["Capstone Project", "مشروع التخرج"]],
            [
              "Connect and test the chatbot components, then present the chatbot and document its limitations.",
              "اربط مكونات الشات بوت وجربها، واعرض الشات بوت ووثق حدوده.",
            ],
          ),
        ],
      ),
    ],
  ),
  track(
    {
      slug: "data-science-data-analysis",
      category: "data",
      name: "Data Science & Data Analysis",
      localizedName: text(
        "Data Science & Data Analysis",
        "علم البيانات وتحليلها",
      ),
      color: "#6ed4b0",
      symbol: "Data",
      price: 1600,
      oldPrice: 1800,
      description: text(
        "Four levels from data fundamentals, Google Sheets and Excel to Python analysis, SQL, Power BI and a dashboard capstone.",
        "٤ مستويات من أساسيات البيانات وGoogle Sheets وExcel لتحليل البيانات ببايثون وSQL وPower BI ومشروع لوحة معلومات.",
      ),
      audience: text(
        "Learners who want to collect, clean, analyze and present data through guided spreadsheet, Python and dashboard projects.",
        "للي عايز يجمع البيانات وينضفها ويحللها ويعرضها، بمشاريع موجهة للجداول وبايثون ولوحات المعلومات.",
      ),
      prerequisites: text(
        "Basic computer and file skills for level 1. Python fundamentals are recommended before level 3; ask the academy about placement.",
        "معرفة بسيطة بالكمبيوتر والملفات للمستوى الأول. يُفضل أساسيات بايثون قبل المستوى الثالث؛ اسأل الأكاديمية عن المستوى المناسب ليك.",
      ),
    },
    [
      level(
        [
          "Data Fundamentals and Google Sheets",
          "أساسيات البيانات وGoogle Sheets",
        ],
        [
          "Collect a small dataset, organize it in Google Sheets, sort and filter it, then present basic charts.",
          "هتجمع بيانات بسيطة وتنظمها في Google Sheets، وترتبها وتفلترها وتعرضها برسوم بيانية أساسية.",
        ],
        [
          "Create a Google Sheets table with collected data, filters and a basic chart.",
          "اعمل جدول في Google Sheets ببيانات جمعتها، مع فلاتر ورسم بياني بسيط.",
        ],
        [
          [
            "Collect and organize a small dataset.",
            "تجمع مجموعة بيانات صغيرة وتنظمها.",
          ],
          [
            "Sort, filter and chart data in Google Sheets.",
            "ترتب البيانات وتفلترها وترسمها في Google Sheets.",
          ],
        ],
        [
          session(
            ["Data fundamentals", "أساسيات البيانات"],
            [["Data Fundamentals", "أساسيات البيانات"]],
            [
              "Identify data types in a small example.",
              "حدد أنواع البيانات في مثال صغير.",
            ],
          ),
          session(
            ["Collect data", "نجمع بيانات"],
            [["Data Collection", "جمع البيانات"]],
            [
              "Collect a small consistent dataset.",
              "اجمع بيانات صغيرة بطريقة متسقة.",
            ],
          ),
          session(
            ["Google Sheets", "نبدأ بـGoogle Sheets"],
            [["Google Sheets", "جداول Google Sheets"]],
            [
              "Organize rows, columns and headers.",
              "نظم الصفوف والأعمدة والعناوين.",
            ],
          ),
          session(
            ["Sorting data", "ترتيب البيانات"],
            [["Sorting", "الترتيب"]],
            [
              "Sort rows by numeric, date and text columns in Google Sheets.",
              "رتب الصفوف حسب الأرقام والتواريخ والنصوص في Google Sheets.",
            ],
          ),
          session(
            ["Filtering data", "تصفية البيانات"],
            [["Filtering", "التصفية"]],
            [
              "Filter relevant records using conditions and custom filters.",
              "فلتر السجلات المطلوبة باستخدام الشروط والفلاتر.",
            ],
          ),
          session(
            ["Basic charts", "رسوم بيانية أساسية"],
            [["Basic Charts", "رسوم بيانية أساسية"]],
            [
              "Choose a basic chart and explain it.",
              "اختار رسم بياني بسيط واشرحه.",
            ],
          ),
        ],
      ),
      level(
        [
          "Excel and Data Analysis Fundamentals",
          "أساسيات تحليل البيانات باستخدام Excel",
        ],
        [
          "Use Excel formulas, clean data and apply basic statistics, pivot tables and visualization to answer simple questions.",
          "هتستخدم معادلات Excel وتنضف البيانات وتطبق إحصاء بسيط وجداول محورية ورسوم بيانية للإجابة على أسئلة واضحة.",
        ],
        [
          "Create an Excel analysis workbook with cleaned data, formulas, pivot tables and charts.",
          "اعمل ملف تحليل في Excel ببيانات نظيفة ومعادلات وجداول محورية ورسوم بيانية.",
        ],
        [
          [
            "Clean spreadsheet data and use formulas and basic statistics.",
            "تنضف بيانات الجداول وتستخدم المعادلات والإحصاء الأساسي.",
          ],
          [
            "Summarize findings with pivot tables and charts.",
            "تلخص النتائج بجداول محورية ورسوم بيانية.",
          ],
        ],
        [
          session(
            ["Excel formulas", "معادلات Excel"],
            [["Excel Formulas", "معادلات Excel"]],
            [
              "Calculate summaries using cell references and formulas.",
              "احسب ملخصات باستخدام مراجع الخلايا والمعادلات.",
            ],
          ),
          session(
            ["Clean data", "تنضيف البيانات"],
            [["Data Cleaning", "تنضيف البيانات"]],
            [
              "Find duplicates and inconsistent entries, then review and correct the sample workbook.",
              "اكتشف التكرار والقيم غير المتسقة، وراجع ملف التدريب وصحح بياناته.",
            ],
          ),
          session(
            ["Basic statistics", "إحصاء أساسي"],
            [["Basic Statistics", "مبادئ الإحصاء"]],
            [
              "Calculate and interpret simple summary statistics.",
              "احسب إحصاءات بسيطة واشرح معناها.",
            ],
          ),
          session(
            ["Pivot tables", "الجداول المحورية"],
            [["Pivot Tables", "الجداول المحورية"]],
            [
              "Summarize categories with a pivot table.",
              "لخص الفئات بجدول محوري.",
            ],
          ),
          session(
            ["Data visualization", "عرض البيانات بصريًا"],
            [["Data Visualization", "عرض البيانات بصريًا"]],
            [
              "Choose charts that answer a clear question.",
              "اختار رسوم بيانية بتجاوب على سؤال واضح.",
            ],
          ),
          session(
            ["Workbook review", "مراجعة ملف التحليل"],
            [],
            [
              "Explain the workbook, pivot tables, charts and findings.",
              "اشرح ملف التحليل والجداول المحورية والرسوم والنتائج اللي وصلت لها.",
            ],
          ),
        ],
      ),
      level(
        ["Data Analysis with Python", "تحليل البيانات باستخدام بايثون"],
        [
          "Use NumPy, Pandas and DataFrames to explore data, visualize it with Matplotlib and Seaborn, and examine correlation.",
          "هتستخدم NumPy وPandas وDataFrames لاستكشاف البيانات، وترسمها بـMatplotlib وSeaborn، وتفهم الارتباط بينها.",
        ],
        [
          "Create a small exploratory analysis with cleaned DataFrames, charts and a careful interpretation of correlation.",
          "اعمل تحليل استكشافي صغير بـDataFrames نظيفة ورسوم بيانية وتفسير دقيق للارتباط.",
        ],
        [
          [
            "Explore tabular data using NumPy, Pandas and DataFrames.",
            "تستكشف بيانات الجداول باستخدام NumPy وPandas وDataFrames.",
          ],
          [
            "Visualize patterns and explain correlation without assuming causation.",
            "تعرض الأنماط بصريًا وتشرح الارتباط من غير ما تفترض إنه سبب ونتيجة.",
          ],
        ],
        [
          session(
            ["NumPy", "نبدأ بـNumPy"],
            [["NumPy", "مكتبة NumPy"]],
            [
              "Calculate with small numeric arrays.",
              "اعمل حسابات على مصفوفات أرقام صغيرة.",
            ],
          ),
          session(
            ["Pandas and DataFrames", "Pandas وجداول DataFrames"],
            [
              ["Pandas", "مكتبة Pandas"],
              ["DataFrames", "جداول DataFrames"],
            ],
            [
              "Load a small table with Pandas, then select, filter and clean rows and columns.",
              "اقرأ جدول صغير باستخدام Pandas، واختار صفوف وأعمدة وفلترها ونضفها.",
            ],
          ),
          session(
            ["Matplotlib", "رسوم بـMatplotlib"],
            [["Matplotlib", "مكتبة Matplotlib"]],
            ["Create and label a chart.", "اعمل رسم بياني وضيف له عناوين."],
          ),
          session(
            ["Seaborn", "رسوم بـSeaborn"],
            [["Seaborn", "مكتبة Seaborn"]],
            [
              "Compare distributions visually.",
              "قارن توزيعات البيانات بصريًا.",
            ],
          ),
          session(
            ["Exploratory analysis", "التحليل الاستكشافي"],
            [
              [
                "Exploratory Data Analysis (EDA)",
                "التحليل الاستكشافي للبيانات (EDA)",
              ],
            ],
            [
              "Ask questions and investigate data patterns.",
              "اطرح أسئلة واستكشف أنماط البيانات.",
            ],
          ),
          session(
            ["Correlation and analysis review", "الارتباط ومراجعة التحليل"],
            [["Correlation", "الارتباط"]],
            [
              "Examine correlation, explain its limits, and present a short exploratory data analysis.",
              "افحص الارتباط واشرح حدوده، واعرض تحليل استكشافي قصير للبيانات.",
            ],
          ),
        ],
      ),
      level(
        ["SQL, Power BI, and Dashboards", "SQL وPower BI ولوحات المعلومات"],
        [
          "Query data with SQL, prepare it in Power Query and build a Power BI dashboard with KPIs and a clear data story.",
          "هتستعلم عن البيانات بـSQL وتجهزها في Power Query، وتبني لوحة معلومات في Power BI فيها مؤشرات أداء وقصة واضحة من البيانات.",
        ],
        [
          "Build a Power BI dashboard from queried and prepared data, with KPIs and a short findings presentation.",
          "ابني لوحة معلومات بـPower BI من بيانات استعلمت عنها وجهزتها، مع مؤشرات أداء وعرض قصير للنتائج.",
        ],
        [
          [
            "Query and prepare data with SQL and Power Query.",
            "تستعلم عن البيانات وتجهزها باستخدام SQL وPower Query.",
          ],
          [
            "Build a dashboard and communicate KPIs in a data story.",
            "تبني لوحة معلومات وتشرح مؤشرات الأداء بقصة مبنية على البيانات.",
          ],
        ],
        [
          session(
            ["SQL", "نبدأ بـSQL"],
            [["SQL", "لغة SQL"]],
            [
              "Write simple queries to select and filter data and answer small questions.",
              "اكتب استعلامات بسيطة لاختيار البيانات وتصفيتها والإجابة على أسئلة صغيرة.",
            ],
          ),
          session(
            ["Power Query", "نجهز البيانات بـPower Query"],
            [["Power Query", "أداة Power Query"]],
            [
              "Prepare a repeatable data-cleaning sequence.",
              "جهز خطوات تنضيف بيانات تقدر تكررها.",
            ],
          ),
          session(
            ["Power BI", "نبدأ بـPower BI"],
            [["Power BI", "أداة Power BI"]],
            [
              "Load prepared data and create visuals.",
              "اقرأ البيانات المجهزة واعمل رسوم توضيحية.",
            ],
          ),
          session(
            ["Dashboards and KPIs", "لوحات المعلومات ومؤشرات الأداء"],
            [
              ["Dashboards", "لوحات المعلومات"],
              ["KPIs", "مؤشرات الأداء الرئيسية (KPIs)"],
            ],
            [
              "Arrange related visuals into a dashboard and display relevant KPIs.",
              "رتب الرسوم المرتبطة في لوحة معلومات واعرض مؤشرات الأداء المناسبة.",
            ],
          ),
          session(
            ["Data storytelling", "نحكي قصة بالبيانات"],
            [["Data Storytelling", "سرد قصة بالبيانات"]],
            [
              "Connect findings to a clear question.",
              "اربط النتائج بسؤال واضح.",
            ],
          ),
          session(
            ["Capstone project and presentation", "مشروع التخرج والعرض"],
            [["Capstone Project", "مشروع التخرج"]],
            [
              "Assemble the analysis dashboard, check queries and KPIs, and present the data story.",
              "جمع لوحة معلومات التحليل وراجع الاستعلامات ومؤشرات الأداء، واعرض القصة اللي بتوضحها البيانات.",
            ],
          ),
        ],
      ),
    ],
  ),
];
