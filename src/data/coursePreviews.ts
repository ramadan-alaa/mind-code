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
  language: "csharp" | "python";
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

export const coursePreviews: Record<string, CoursePreview[]> = {
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
