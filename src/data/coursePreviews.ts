import type { Localized } from "./courses";

type BlockIcon =
  | "start"
  | "move"
  | "turn"
  | "repeat"
  | "finish"
  | "score"
  | "send"
  | "receive";
export interface PreviewBlock {
  category: "event" | "motion" | "control" | "variable" | "message";
  icon: BlockIcon;
  label: Localized;
  depth?: number;
}
interface PreviewBase {
  fileName: string;
  caption: Localized;
}
export interface CodePreview extends PreviewBase {
  kind: "code";
  language: "csharp" | "python" | "cpp";
  code: string[];
  output: string[];
}
export interface BlocksPreview extends PreviewBase {
  kind: "scratch" | "scratchjr";
  title: Localized;
  blocks: PreviewBlock[];
  result: Localized;
}
export type CoursePreview = CodePreview | BlocksPreview;
const text = (en: string, ar: string): Localized => ({ en, ar });
const illustration = text(
  "Illustrative sequence, not a live editor or executable project.",
  "تسلسل توضيحي؛ مش محرر مباشر ولا مشروع قابل للتشغيل هنا.",
);

// Examples stay inside the established editor banner; they do not run in the site.
const pythonExample = (
  fileName: string,
  code: string[],
  output: string[],
  caption: Localized,
): CodePreview => ({
  kind: "code",
  language: "python",
  fileName,
  code,
  output,
  caption,
});

export const coursePreviews: Record<string, CoursePreview[]> = {
  "python-programming": [
    pythonExample(
      "fundamentals.py",
      [
        'score = "12"',
        "total = int(score) + 3",
        "if total >= 10:",
        '    print("Goal reached:", total)',
      ],
      ["Goal reached: 15"],
      text(
        "Types, conversion and conditions in a small Python example.",
        "مثال بايثون صغير على الأنواع والتحويل والشروط.",
      ),
    ),
    pythonExample(
      "practice.py",
      [
        "def passed(scores):",
        "    return [score for score in scores if score >= 50]",
        "",
        "print(passed([42, 65, 81]))",
      ],
      ["[65, 81]"],
      text(
        "A function filters a list using a loop and a condition.",
        "دالة بتفلتر قائمة باستخدام حلقة وشرط.",
      ),
    ),
    pythonExample(
      "records.py",
      [
        "import json",
        "",
        "class Record:",
        "    def __init__(self, title):",
        "        self.title = title",
        "",
        'record = Record("Practice")',
        'print(json.dumps({"title": record.title}))',
      ],
      ['{"title": "Practice"}'],
      text(
        "A simple class and JSON serialization; an introductory OOP example.",
        "Class بسيط وتحويل بيانات لـJSON؛ مثال تمهيدي على OOP.",
      ),
    ),
  ],
  "ai-machine-learning": [
    pythonExample(
      "labels.py",
      [
        'labels = ["cat", "dog", "cat"]',
        'print("Training examples:", len(labels))',
        'print("Classes:", sorted(set(labels)))',
      ],
      ["Training examples: 3", "Classes: ['cat', 'dog']"],
      text(
        "Illustrative labels for a classification dataset, not a trained model.",
        "تصنيفات توضيحية لبيانات تدريب؛ ده مش نموذج مدرب.",
      ),
    ),
    pythonExample(
      "classifier.py",
      [
        "from sklearn.tree import DecisionTreeClassifier",
        "",
        "model = DecisionTreeClassifier(random_state=0)",
        "model.fit([[0], [1], [8], [9]], [0, 0, 1, 1])",
        "print(model.predict([[7]]).tolist())",
      ],
      ["[1]"],
      text(
        "A tiny decision tree example; requires Scikit-learn.",
        "مثال صغير لشجرة قرار؛ محتاج مكتبة Scikit-learn.",
      ),
    ),
    pythonExample(
      "text_examples.py",
      [
        'texts = ["helpful lesson", "clear example"]',
        "for text in texts:",
        "    print(text.split())",
      ],
      ["['helpful', 'lesson']", "['clear', 'example']"],
      text(
        "Preparing short text examples for an NLP exercise.",
        "تجهيز أمثلة نصية قصيرة لتدريب على NLP.",
      ),
    ),
    pythonExample(
      "chatbot.py",
      [
        "import streamlit as st",
        "",
        'st.title("Chatbot practice")',
        'prompt = st.chat_input("Your question")',
        "if prompt:",
        '    st.write("Next: connect a guided AI API call.")',
      ],
      ["Illustrative Streamlit interface; run with streamlit run chatbot.py."],
      text(
        "An interface scaffold for the chatbot project; API integration is taught in the course.",
        "هيكل واجهة لمشروع الشات بوت؛ ربط AI API جزء من المنهج.",
      ),
    ),
  ],
  "data-science-data-analysis": [
    pythonExample(
      "data_example.py",
      [
        'rows = [{"item": "Book", "count": 3},',
        '        {"item": "Pen", "count": 8}]',
        'for row in sorted(rows, key=lambda row: row["count"]):',
        '    print(row["item"], row["count"])',
      ],
      ["Book 3", "Pen 8"],
      text(
        "Illustrative tabular data; level 1 practices sorting in Google Sheets.",
        "مثال توضيحي لبيانات جدول؛ تطبيق الترتيب في المستوى الأول بيكون في Google Sheets.",
      ),
    ),
    pythonExample(
      "summary_example.py",
      [
        "values = [10, 20, 30]",
        'print("Total:", sum(values))',
        'print("Mean:", sum(values) / len(values))',
      ],
      ["Total: 60", "Mean: 20.0"],
      text(
        "A numeric summary illustration; level 2 uses Excel formulas and charts.",
        "مثال توضيحي لملخص أرقام؛ المستوى الثاني بيستخدم معادلات Excel ورسومه البيانية.",
      ),
    ),
    pythonExample(
      "analysis.py",
      [
        "import pandas as pd",
        "",
        'data = pd.DataFrame({"score": [60, 80, 100]})',
        'print("Mean:", data["score"].mean())',
      ],
      ["Mean: 80.0"],
      text(
        "A small DataFrame summary; requires Pandas.",
        "ملخص صغير لجدول DataFrame؛ محتاج مكتبة Pandas.",
      ),
    ),
    pythonExample(
      "kpi_example.py",
      [
        "sales = [100, 150, 200]",
        "target = 400",
        "total = sum(sales)",
        'print("Sales:", total)',
        'print("Target met:", total >= target)',
      ],
      ["Sales: 450", "Target met: True"],
      text(
        "A KPI illustration; level 4 prepares data with SQL and Power Query and builds Power BI dashboards.",
        "مثال توضيحي لمؤشر أداء؛ المستوى الرابع بيجهز البيانات بـSQL وPower Query ويبني لوحات Power BI.",
      ),
    ),
  ],
  cpp: [
    {
      kind: "code",
      language: "cpp",
      fileName: "main.cpp",
      code: [
        "#include <iostream>",
        "using namespace std;",
        "",
        "int main() {",
        "    int score = 85;",
        '    cout << (score >= 50 ? "Pass" : "Try again") << endl;',
        "    return 0;",
        "}",
      ],
      output: ["Pass"],
      caption: text(
        "A first C++ program using cout and a condition.",
        "أول برنامج C++ باستخدام cout وشرط بسيط.",
      ),
    },
    {
      kind: "code",
      language: "cpp",
      fileName: "solve.cpp",
      code: [
        "#include <algorithm>",
        "#include <iostream>",
        "#include <vector>",
        "using namespace std;",
        "",
        "int main() {",
        "    vector<int> nums = {3, 1, 2};",
        "    sort(nums.begin(), nums.end());",
        '    for (int x : nums) cout << x << " ";',
        "}",
      ],
      output: ["1 2 3"],
      caption: text(
        "Sorting a vector of numbers with std::sort.",
        "ترتيب عناصر vector باستخدام std::sort.",
      ),
    },
    {
      kind: "code",
      language: "cpp",
      fileName: "grades.cpp",
      code: [
        "#include <iostream>",
        "#include <string>",
        "#include <unordered_map>",
        "using namespace std;",
        "",
        "int main() {",
        '    unordered_map<string, int> grades = {{"Mona", 92}, {"Ali", 88}};',
        '    cout << "Mona: " << grades["Mona"] << endl;',
        "}",
      ],
      output: ["Mona: 92"],
      caption: text(
        "Fast student grade lookup with unordered_map.",
        "بحث سريع عن درجة طالب باستخدام unordered_map.",
      ),
    },
  ],
  backend: [
    {
      kind: "code",
      language: "csharp",
      fileName: "Program.cs",
      code: [
        "using System;",
        "",
        'string course = "Backend Development";',
        'Console.WriteLine($"Welcome to {course}!");',
      ],
      output: ["Welcome to Backend Development!"],
      caption: text(
        "Example console output from this C# program.",
        "مثال لناتج تشغيل برنامج C# في Console.",
      ),
    },
    {
      kind: "code",
      language: "csharp",
      fileName: "Program.cs",
      code: [
        "using System;",
        "using System.Threading.Tasks;",
        "",
        "Func<int, int> doubleScore = score => score * 2;",
        "await Task.Delay(100);",
        "Console.WriteLine(doubleScore(5));",
      ],
      output: ["10"],
      caption: text(
        "A delegate and a short awaited task; sample console output.",
        "مثال على Delegate وTask باستخدام Await، ومعاه ناتج Console توضيحي.",
      ),
    },
    {
      kind: "code",
      language: "csharp",
      fileName: "Program.cs",
      code: [
        "using System;",
        "using System.Linq;",
        "",
        "var scores = new[] { 65, 82, 91 };",
        "var passed = scores.Where(score => score >= 70);",
        'Console.WriteLine(string.Join(", ", passed));',
      ],
      output: ["82, 91"],
      caption: text(
        "LINQ filters the scores; example console output.",
        "LINQ بتفلتر الدرجات؛ ده مثال للناتج في Console.",
      ),
    },
    {
      kind: "code",
      language: "csharp",
      fileName: "Program.cs",
      code: [
        "var builder = WebApplication.CreateBuilder(args);",
        "var app = builder.Build();",
        "",
        'app.MapGet("/students", () =>',
        '    Results.Ok(new[] { new { Id = 1, Name = "Mona" } }));',
        "app.Run();",
      ],
      output: ["GET /students: 200 OK", '[{"id":1,"name":"Mona"}]'],
      caption: text(
        "Illustrative response; run this example in an ASP.NET Core Web project.",
        "استجابة توضيحية؛ المثال بيتشغل داخل مشروع ASP.NET Core Web.",
      ),
    },
  ],
  python: [
    {
      kind: "code",
      language: "python",
      fileName: "main.py",
      code: ['name = input("What\'s your name? ")', 'print(f"Hello, {name}!")'],
      output: ["What's your name? Mona", "Hello, Mona!"],
      caption: text(
        "Sample input: Mona. The greeting uses the name entered by the learner.",
        "إدخال تجريبي: Mona. رسالة الترحيب بتستخدم الاسم اللي الطالب بيدخله.",
      ),
    },
    {
      kind: "code",
      language: "python",
      fileName: "main.py",
      code: [
        'name = input("What\'s your name? ")',
        "",
        "def greet(name):",
        '    return f"Hello, {name}!"',
        "",
        "print(greet(name))",
      ],
      output: ["What's your name? Mona", "Hello, Mona!"],
      caption: text(
        "Sample input: Mona. A function returns the greeting before print displays it.",
        "إدخال تجريبي: Mona. الدالة بترجع رسالة الترحيب، وprint بتعرضها.",
      ),
    },
  ],
  scratch: [
    {
      kind: "scratch",
      fileName: "Scratch",
      title: text("Scratch blocks", "بلوكات Scratch"),
      caption: illustration,
      blocks: [
        {
          category: "event",
          icon: "start",
          label: text("When green flag clicked", "لما نضغط على العلم الأخضر"),
        },
        {
          category: "motion",
          icon: "move",
          label: text("Move 10 steps", "اتحرك 10 خطوات"),
        },
        {
          category: "control",
          icon: "repeat",
          label: text("Repeat 10 times", "كرر 10 مرات"),
        },
        {
          category: "motion",
          icon: "turn",
          depth: 1,
          label: text("Turn 15 degrees", "لف 15 درجة"),
        },
      ],
      result: text(
        "An event starts movement, then a repeated turn changes the sprite’s direction.",
        "حدث بيبدأ الحركة، وبعدها دوران متكرر بيغير اتجاه الشخصية.",
      ),
    },
    {
      kind: "scratch",
      fileName: "Scratch",
      title: text("Scratch blocks", "بلوكات Scratch"),
      caption: illustration,
      blocks: [
        {
          category: "event",
          icon: "start",
          label: text("When green flag clicked", "لما نضغط على العلم الأخضر"),
        },
        {
          category: "variable",
          icon: "score",
          label: text("Set score to 0", "خلي النقاط 0"),
        },
        {
          category: "control",
          icon: "repeat",
          label: text("Repeat 10 times", "كرر 10 مرات"),
        },
        {
          category: "motion",
          icon: "move",
          depth: 1,
          label: text("Move 10 steps", "اتحرك 10 خطوات"),
        },
        {
          category: "variable",
          icon: "score",
          depth: 1,
          label: text("Change score by 1", "زود النقاط 1"),
        },
      ],
      result: text(
        "The score starts at 0 and reaches 10 after ten repetitions.",
        "النقاط بتبدأ من 0 وبتوصل لـ10 بعد عشر تكرارات.",
      ),
    },
  ],
  scratchjr: [
    {
      kind: "scratchjr",
      fileName: "ScratchJr",
      title: text("ScratchJr blocks", "بلوكات ScratchJr"),
      caption: illustration,
      blocks: [
        { category: "event", icon: "start", label: text("Start", "ابدأ") },
        { category: "motion", icon: "move", label: text("Move", "اتحرك") },
        { category: "motion", icon: "turn", label: text("Turn", "لف") },
        { category: "control", icon: "repeat", label: text("Repeat", "كرر") },
        { category: "event", icon: "finish", label: text("Finish", "انتهى") },
      ],
      result: text(
        "A simple start, movement, turn and repeat sequence ends the scene.",
        "تسلسل بسيط بيبدأ بحركة ودوران وتكرار، وبعدها المشهد بينتهي.",
      ),
    },
    {
      kind: "scratchjr",
      fileName: "ScratchJr",
      title: text("ScratchJr blocks", "بلوكات ScratchJr"),
      caption: illustration,
      blocks: [
        { category: "event", icon: "start", label: text("Start", "ابدأ") },
        { category: "motion", icon: "move", label: text("Move", "اتحرك") },
        { category: "message", icon: "send", label: text("Send", "ابعت") },
        {
          category: "message",
          icon: "receive",
          label: text("Receive", "استقبل"),
        },
        { category: "event", icon: "finish", label: text("Finish", "انتهى") },
      ],
      result: text(
        "Character 1 moves and sends a message; character 2 receives it to continue the scene.",
        "الشخصية 1 بتتحرك وبتبعت رسالة؛ الشخصية 2 بتستقبلها عشان تكمل المشهد.",
      ),
    },
  ],
};
