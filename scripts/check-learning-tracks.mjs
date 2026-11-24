import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { execFileSync } from "node:child_process";
import ts from "typescript";

const origin = process.env.TEST_URL || "http://localhost:5173";
const plain = (value) => value.replace(/[\u2066-\u2069]/g, "");
const expected = [
  {
    slug: "python-programming",
    name: ["Python Programming", "البرمجة بلغة بايثون"],
    price: 1200,
    oldPrice: 1400,
    counts: [6, 6, 6],
    proposed: false,
    titles: [
      "Python Fundamentals",
      "Core Python and Problem Solving",
      "Practical Python and Intro to OOP",
    ],
    topics: [
      "Syntax|Variables|Data Types|Input and Output (I/O)|Operators|Type Casting|Conditions|Debugging",
      "Loops|Strings|Lists|Tuples|Dictionaries|Sets|Functions|Problem Solving",
      "File Handling|CSV and JSON|Exceptions|Modules|Packages|Introduction to Object-Oriented Programming (OOP)|Mini Projects",
    ],
  },
  {
    slug: "ai-machine-learning",
    name: ["AI & Machine Learning", "الذكاء الاصطناعي وتعلّم الآلة"],
    price: 1600,
    oldPrice: 1800,
    counts: [6, 6, 6, 6],
    proposed: false,
    titles: [
      "AI Fundamentals",
      "Supervised Learning",
      "Model Improvement, NLP, and Computer Vision",
      "Generative AI and Chatbot Development",
    ],
    topics: [
      "AI Fundamentals|Training Data|Classification Concepts|Teachable Machine|AI Ethics",
      "Supervised Learning|Classification|Regression|KNN|Decision Trees|Scikit-learn|Model Evaluation",
      "Model Improvement|Overfitting|K-Means|NLP|Text Classification|Computer Vision|Pre-trained Models",
      "Generative AI|LLMs|Prompt Engineering|AI APIs|Chatbot Development|Streamlit|Capstone Project",
    ],
  },
  {
    slug: "data-science-data-analysis",
    name: ["Data Science & Data Analysis", "علم البيانات وتحليلها"],
    price: 1600,
    oldPrice: 1800,
    counts: [6, 6, 6, 6],
    proposed: false,
    titles: [
      "Data Fundamentals and Google Sheets",
      "Excel and Data Analysis Fundamentals",
      "Data Analysis with Python",
      "SQL, Power BI, and Dashboards",
    ],
    topics: [
      "Data Fundamentals|Data Collection|Google Sheets|Sorting|Filtering|Basic Charts",
      "Excel Formulas|Data Cleaning|Basic Statistics|Pivot Tables|Data Visualization",
      "NumPy|Pandas|DataFrames|Matplotlib|Seaborn|Exploratory Data Analysis (EDA)|Correlation",
      "SQL|Power Query|Power BI|Dashboards|KPIs|Data Storytelling|Capstone Project",
    ],
  },
];
const originalModule = async (path) => {
  const source = execFileSync("git", ["show", `HEAD:${path}`], {
    encoding: "utf8",
  });
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext },
  });
  return import(
    `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
  );
};
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
  headless: true,
});
const context = await browser.newContext({
  reducedMotion: "reduce",
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const report = {
  passed: false,
  responsiveCases: 0,
  inquiryHandoffs: 0,
  errors: [],
  overflow: [],
  accessibility: [],
  screenshots: [],
  preserved: [],
};
page.on("pageerror", (error) => report.errors.push(error.message));
page.on("requestfailed", (request) =>
  console.error("Request failed:", request.url(), request.failure()?.errorText),
);
// Inspect hrefs only. Any accidental attempt to open WhatsApp fails the check.
await context.route(
  /https:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//,
  async (route) => {
    report.errors.push("Unexpected WhatsApp navigation");
    await route.abort();
  },
);
const goto = async (path) => {
  const response = await page.goto(origin + path, {
    waitUntil: "domcontentloaded",
  });
  assert.equal(response.status(), 200);
  try {
    await page.locator("h1").waitFor();
  } catch (error) {
    console.error(
      "Navigation failed:",
      path,
      await page.title(),
      await page.locator("body").innerText(),
    );
    throw error;
  }
};
const preference = async (lang, theme = "dark") => {
  await page.evaluate(
    ({ lang, theme }) => {
      localStorage.setItem("mindcode-language", lang);
      localStorage.setItem("mindcode-theme", theme);
    },
    { lang, theme },
  );
};
const localized = (value) => {
  if (!value || typeof value !== "object") return;
  if ("en" in value && "ar" in value) {
    assert(value.en.trim() && value.ar.trim());
    assert(!/[\u0600-\u06ff]/.test(value.en), value.en);
    assert(/[\u0600-\u06ff]/.test(value.ar), `Missing Arabic: ${value.ar}`);
  }
  Object.values(value).forEach(localized);
};
const card = (slug) =>
  page
    .locator(".course-card")
    .filter({ has: page.locator(`.course-link[href="/courses/${slug}"]`) });
await fs.mkdir("artifacts", { recursive: true });
try {
  await goto("/courses");
  const { courses, totals, academy, previews } = await page.evaluate(
    async () => {
      const { courses, courseTotals } = await import("/src/data/courses.ts");
      return {
        courses,
        totals: Object.fromEntries(
          courses.map((c) => [c.slug, courseTotals(c)]),
        ),
        academy: (await import("/src/config/academy.ts")).academy,
        previews: (await import("/src/data/coursePreviews.ts")).coursePreviews,
      };
    },
  );
  assert.equal(courses.length, 15);
  assert.equal(new Set(courses.map((c) => c.slug)).size, 15);
  const { programmingPrograms } = await originalModule(
    "src/data/programmingPrograms.ts",
  );
  for (const original of programmingPrograms) {
    const current = { ...courses.find((c) => c.slug === original.slug) };
    if (original.slug === "python") delete current.localizedName;
    assert.deepEqual(
      current,
      original,
      `${original.slug} content must remain intact`,
    );
    report.preserved.push(original.slug);
  }
  const originalBackend = (await originalModule("src/data/backendProgram.ts"))
    .backendProgram;
  const currentBackend = courses.find((c) => c.slug === "backend");
  assert.equal(currentBackend.price, 1600);
  assert.equal(currentBackend.oldPrice, 1800);
  assert.equal(currentBackend.levels.length, originalBackend.levels.length);
  report.preserved.push("backend");
  for (const spec of expected) {
    const c = courses.find((c) => c.slug === spec.slug);
    localized(c);
    assert.deepEqual([c.localizedName.en, c.localizedName.ar], spec.name);
    assert.equal(c.sessionCountsProposed, spec.proposed ?? true);
    assert.equal(c.ageRecommendation, undefined);
    assert.equal(c.levels.length, spec.counts.length);
    assert.deepEqual(
      c.levels.map((l) => l.en),
      spec.titles,
    );
    assert.equal(previews[c.slug].length, c.levels.length);
    assert.deepEqual(totals[c.slug], {
      price: spec.price * spec.counts.length,
      sessions: spec.counts.reduce((a, b) => a + b, 0),
      hours: spec.counts.reduce((a, b) => a + b, 0) * 2,
    });
    for (const [i, l] of c.levels.entries()) {
      assert.equal(l.id, `${c.slug}-level-${i + 1}`);
      assert.equal(l.slug, `level-${i + 1}`);
      assert.equal(l.sessions.length, spec.counts[i]);
      assert.deepEqual([l.price, l.oldPrice], [spec.price, spec.oldPrice]);
      assert.deepEqual(
        l.sessions.flatMap((s) => s.topics.map((t) => t.en)),
        spec.topics[i].split("|"),
      );
      assert.deepEqual(
        l.sessions.map((s) => s.number),
        Array.from({ length: spec.counts[i] }, (_, i) => i + 1),
      );
    }
  }
  // Both catalog locales, including Python disambiguation, categories and discount styling.
  for (const lang of ["en", "ar"]) {
    await preference(lang);
    await goto("/courses");
    await expect(page.locator(".course-card")).toHaveCount(15);
    await expect(page.locator(".upcoming-card")).toHaveCount(0);
    await expect(card("python").locator("h3")).toHaveText(
      lang === "en" ? "Introduction to Python" : "مقدمة في بايثون",
    );
    for (const spec of expected) {
      await expect(card(spec.slug).locator("h3")).toHaveText(
        spec.name[lang === "en" ? 0 : 1],
      );
      await expect(card(spec.slug).locator(".course-price del")).toHaveText(
        spec.oldPrice.toLocaleString("en-US"),
      );
      await expect(
        card(spec.slug).locator(".course-price strong"),
      ).toContainText(spec.price.toLocaleString("en-US"));
      await page.getByRole("textbox").fill(spec.name[lang === "en" ? 0 : 1]);
      await expect(card(spec.slug)).toHaveCount(1);
      await page.getByRole("textbox").fill("");
    }
    await page.getByRole("combobox").first().selectOption("ai");
    await expect(page.locator(".course-card")).toHaveCount(1);
    await expect(card("ai-machine-learning")).toHaveCount(1);
    await page.getByRole("combobox").first().selectOption("data");
    await expect(card("data-science-data-analysis")).toHaveCount(1);
    await page.getByRole("combobox").first().selectOption("all");
  }
  for (const lang of ["en", "ar"])
    for (const theme of ["dark", "light"])
      for (const width of [390, 1440]) {
        await preference(lang, theme);
        await page.setViewportSize({ width, height: 1000 });
        for (const spec of expected) {
          const c = courses.find((c) => c.slug === spec.slug);
          for (const selected of [-1, ...c.levels.map((_, i) => i)]) {
            const route = `/courses/${c.slug}${selected < 0 ? "" : `/level-${selected + 1}`}`;
            await goto(route);
            await expect(page.locator("html")).toHaveAttribute(
              "dir",
              lang === "ar" ? "rtl" : "ltr",
            );
            await expect(page.locator("h1")).toContainText(
              spec.name[lang === "en" ? 0 : 1],
            );
            const factIndex =
              selected < 0 ? totals[c.slug].sessions : spec.counts[selected];
            await expect(
              page.locator(".quick-fact-card").nth(1).locator("strong"),
            ).toHaveText(String(factIndex));
            await expect(
              page.locator(".course-enrollment-price del"),
            ).toHaveText(spec.oldPrice.toLocaleString("en-US"));
            await expect(
              page.locator(".course-enrollment-price strong"),
            ).toHaveText(spec.price.toLocaleString("en-US"));
            await expect(page.locator(".curriculum-level")).toHaveCount(
              spec.counts.length,
            );
            await page.locator(".curriculum-toggle-all").click();
            await page.locator(".curriculum-session").evaluateAll((items) => {
              items.forEach((item) => {
                item.open = true;
              });
            });
            await expect(page.locator(".curriculum-session")).toHaveCount(
              totals[c.slug].sessions,
            );
            const renderedLevels = await page
              .locator(".curriculum-level")
              .evaluateAll((levels) =>
                levels.map((level) => ({
                  meta: level.querySelector(".curriculum-meta").textContent,
                  sessions: [...level.querySelectorAll("details")].map(
                    (item) => ({
                      title: item.querySelector("summary").textContent,
                      topics: [...item.querySelectorAll("li")].map(
                        (topic) => topic.textContent,
                      ),
                    }),
                  ),
                })),
              );
            for (const [i, level] of c.levels.entries()) {
              assert(renderedLevels[i].meta.includes(String(spec.counts[i])));
              assert.equal(renderedLevels[i].sessions.length, spec.counts[i]);
              for (const [j, session] of level.sessions.entries()) {
                assert(
                  plain(renderedLevels[i].sessions[j].title).includes(
                    session.title[lang],
                  ),
                );
                assert.deepEqual(
                  renderedLevels[i].sessions[j].topics.map(plain),
                  session.topics.map((t) => t[lang]),
                );
              }
            }
            if (selected === -1 && theme === "dark" && width === 1440) {
              const first = page.locator(".curriculum-session").first();
              await first.locator("summary").press("Enter");
              await expect(first).not.toHaveAttribute("open", "");
              await first.locator("summary").press("Enter");
              await expect(first).toHaveAttribute("open", "");
            }
            await expect
              .poll(async () => plain(await page.title()))
              .toContain(
                selected < 0 ? c.localizedName[lang] : c.levels[selected][lang],
              );
            await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
              "href",
              academy.siteUrl + route,
            );
            if (
              await page.evaluate(
                () =>
                  document.documentElement.scrollWidth >
                  document.documentElement.clientWidth + 1,
              )
            )
              report.overflow.push({ route, width, lang, theme });
            report.responsiveCases++;
            if (
              theme === "dark" &&
              (selected === -1 ||
                (c.slug === "ai-machine-learning" && selected === 2))
            ) {
              await page.evaluate(() => window.scrollTo(0, 0));
              const path = `artifacts/learning-${c.slug}${selected < 0 ? "" : "-level-3"}-${lang}-${width}.png`;
              await page.screenshot({ path });
              report.screenshots.push(path);
            }
            if (width === 1440 && theme === "dark" && selected === -1) {
              const results = await new AxeBuilder({ page })
                .include("main")
                .withTags(["wcag2a", "wcag2aa"])
                .analyze();
              report.accessibility.push(
                ...results.violations.map((v) => ({
                  route,
                  lang,
                  id: v.id,
                  nodes: v.nodes.length,
                })),
              );
            }
          }
        }
        // Separate existing courses still use the same template and enrollment destination.
        for (const slug of ["python", "html"]) {
          await goto(`/courses/${slug}`);
          const c = courses.find((c) => c.slug === slug);
          await expect(
            page.locator(".course-enrollment-price strong"),
          ).toHaveText(c.price.toLocaleString("en-US"));
          await expect(
            page.locator(".course-enrollment-card a[href^='/contact']").first(),
          ).toHaveAttribute("href", `/contact?course=${slug}&level=1`);
          if (
            await page.evaluate(
              () =>
                document.documentElement.scrollWidth >
                document.documentElement.clientWidth + 1,
            )
          )
            report.overflow.push({ slug, width, lang, theme });
          report.responsiveCases++;
        }
      }
  // Every level, in each language: selection changes URL, survives reload, and prepares the right handoff.
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const lang of ["en", "ar"]) {
    await preference(lang);
    for (const spec of expected)
      for (const [i] of spec.counts.entries()) {
        const c = courses.find((c) => c.slug === spec.slug);
        await goto(`/courses/${c.slug}`);
        await page.locator(".level-pill-btn").nth(i).click();
        await expect(page).toHaveURL(
          `${origin}/courses/${c.slug}/level-${i + 1}`,
        );
        await page.reload({ waitUntil: "domcontentloaded" });
        await expect(page.locator(".level-pill-btn").nth(i)).toHaveAttribute(
          "aria-pressed",
          "true",
        );
        const directHref = await page
          .locator(".whatsapp-quick-btn")
          .getAttribute("href");
        const direct = new URL(directHref);
        assert.equal(direct.pathname, `/${academy.whatsapp}`);
        assert(
          plain(direct.searchParams.get("text")).includes(
            c.localizedName[lang],
          ),
        );
        assert(direct.searchParams.get("text").includes(String(i + 1)));
        await page
          .locator(".course-enrollment-card a[href^='/contact']")
          .first()
          .click();
        await expect(page.locator("#course")).toHaveValue(c.slug);
        await expect(page.locator("#level")).toHaveValue(String(i + 1));
        await page.reload({ waitUntil: "domcontentloaded" });
        await expect(page.locator("#level")).toHaveValue(String(i + 1));
        await page.locator("#name").fill("Local Test Learner");
        await page.locator("#phone").fill("01000000000");
        await page.locator("#age").selectOption("25+");
        await page.locator("#experience").selectOption("none");
        await page.locator("#method").selectOption("whatsapp");
        await page.locator("input[type=checkbox]").check();
        await page.locator("form button[type=submit]").click();
        const handoff = page.locator(".form-result a");
        await expect(handoff).toBeVisible();
        const url = new URL(await handoff.getAttribute("href"));
        assert.equal(url.origin, "https://wa.me");
        assert.equal(url.pathname, `/${academy.whatsapp}`);
        const message = plain(url.searchParams.get("text"));
        assert(message.includes(c.localizedName[lang]));
        assert(message.includes(c.levels[i][lang]));
        assert(
          message.includes(`${lang === "ar" ? "المستوى" : "Level"} ${i + 1}`),
        );
        report.inquiryHandoffs++;
      }
  }
  // Switch language on a direct level URL, keeping the selected level.
  await goto("/courses/ai-machine-learning/level-3");
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.locator(".level-pill-btn").nth(2)).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.getByRole("button", { name: "Switch to Arabic" }).click();
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  for (const route of [
    "/courses/python-programming/level-4",
    "/courses/ai-machine-learning/level-5",
    "/courses/data-science-data-analysis/level-5",
  ]) {
    await goto(route);
    await expect(page.locator(".course-detail")).toHaveCount(0);
  }
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.overflow, []);
  assert.deepEqual(report.accessibility, []);
  report.passed = true;
  console.log(
    `PASS: exact ordered curricula, 3/4/4 levels, 20/32/30 sessions, pricing, preserved original programs, ${report.responsiveCases} responsive cases and ${report.inquiryHandoffs} bilingual inquiry handoffs. No message sent.`,
  );
} finally {
  await fs.writeFile(
    "artifacts/learning-tracks-report.json",
    JSON.stringify(report, null, 2),
  );
  await browser.close();
}
