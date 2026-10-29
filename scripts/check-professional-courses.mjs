import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";

const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    (process.platform === "win32"
      ? "C:/Program Files/Google/Chrome/Application/chrome.exe"
      : "/usr/bin/google-chrome"),
  headless: true,
});
const origin = process.env.TEST_URL || "http://localhost:5173";
const context = await browser.newContext({ reducedMotion: "reduce" });
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
await fs.mkdir("artifacts", { recursive: true });
const expected = [
  ["git-github", 1, 4, 8, 700, 700, 8],
  ["tailwind-css", 1, 5, 10, 900, 900, 10],
  ["typescript", 2, 5, 10, 1200, 2400, 20],
  ["nextjs", 3, 6, 12, 1600, 4800, 36],
];
await page.goto(origin + "/courses");
await page.locator("h1").waitFor();
const data = await page.evaluate(async () => {
  const { courses, courseTotals } = await import("/src/data/courses.ts");
  return courses.map((course) => ({ ...course, totals: courseTotals(course) }));
});
assert.equal(data.length, 8);
assert.deepEqual(
  data
    .slice(0, 4)
    .map((c) => [c.slug, c.levels.length, c.price, c.sessions, c.hours]),
  [
    ["html", 2, 700, 4, 8],
    ["css", 3, 900, 5, 10],
    ["javascript", 4, 1100, 6, 12],
    ["react", 4, 1300, 6, 12],
  ],
);
for (const [
  slug,
  levels,
  sessions,
  hours,
  price,
  totalPrice,
  totalHours,
] of expected) {
  const course = data.find((course) => course.slug === slug);
  assert.deepEqual(
    [
      course.levels.length,
      course.sessions,
      course.hours,
      course.price,
      course.totals.price,
      course.totals.hours,
    ],
    [levels, sessions, hours, price, totalPrice, totalHours],
  );
  for (const level of course.levels) {
    assert.equal(level.sessions.length, sessions);
    assert.equal(level.hoursPerSession, 2);
    assert.equal(level.price, price);
    for (const session of level.sessions) {
      assert(
        session.title.en &&
          session.title.ar &&
          session.practiceTask.ar &&
          session.learningObjectives.length,
      );
      assert(session.topics.every((topic) => topic.en && topic.ar));
    }
  }
  await page.getByRole("textbox", { name: "Search courses" }).fill(course.name);
  assert.equal(await page.locator(".course-card").count(), 1);
}
await page.getByRole("textbox", { name: "Search courses" }).fill("");
for (const [category, count] of [
  ["fundamentals", 2],
  ["frameworks", 2],
  ["languages", 2],
  ["styling", 1],
  ["tools", 1],
]) {
  await page.getByLabel("Category", { exact: true }).selectOption(category);
  assert.equal(await page.locator(".course-card").count(), count);
}
const overflow = [];
let cases = 0;
for (const lang of ["en", "ar"]) {
  for (const theme of ["dark", "light"]) {
    await page.evaluate(
      ({ lang, theme }) => {
        localStorage.setItem("mindcode-language", lang);
        localStorage.setItem("mindcode-theme", theme);
      },
      { lang, theme },
    );
    for (const width of [320, 375, 430, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 950 });
      for (const [slug, levels, sessions] of expected) {
        await page.goto(`${origin}/courses/${slug}`);
        await page.locator(".curriculum-trigger").first().waitFor();
        await expect(page.locator("html")).toHaveAttribute("lang", lang);
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        await expect
          .poll(() => page.title())
          .toContain(data.find((course) => course.slug === slug).name);
        await expect(page.locator('meta[name="description"]')).toHaveAttribute(
          "content",
          data.find((course) => course.slug === slug).description[lang],
        );
        if (levels > 1) await page.locator(".curriculum-toggle-all").click();
        await expect(page.locator(".curriculum-session")).toHaveCount(
          levels * sessions,
        );
        const firstSession = page.locator(".curriculum-session").first();
        await firstSession.locator("summary").focus();
        await page.keyboard.press("Enter");
        await expect(firstSession.locator(".session-content")).toBeVisible();
        const isOverflow = await page.evaluate(
          () =>
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth + 1,
        );
        if (isOverflow) overflow.push({ slug, lang, theme, width });
        cases++;
        if (slug === "nextjs" && [375, 1440].includes(width)) {
          await page.locator("#course-fit").scrollIntoViewIfNeeded();
          await page.locator("#faq").scrollIntoViewIfNeeded();
          await page.screenshot({
            path: `artifacts/nextjs-${lang}-${theme}-${width}.png`,
            fullPage: true,
          });
        }
      }
    }
  }
}
await page.setViewportSize({ width: 1440, height: 950 });
await page.evaluate(() => {
  localStorage.setItem("mindcode-language", "en");
});
for (const [slug, levels] of expected) {
  await page.goto(`${origin}/courses/${slug}`);
  await page.locator(".level-pill-btn").last().click();
  const link = page
    .locator('.course-enrollment-card a[href^="/contact"]')
    .first();
  assert.equal(
    await link.getAttribute("href"),
    `/contact?course=${slug}&level=${levels}`,
  );
  await link.click();
  assert.equal(await page.locator("#course").inputValue(), slug);
  assert.equal(await page.locator("#level").inputValue(), String(levels));
  assert(
    (await page.locator(".schedule-card").innerText()).includes(
      "Schedule on request",
    ),
  );
  await page.reload();
  assert.equal(await page.locator("#level").inputValue(), String(levels));
}
await page.locator("#course").selectOption("git-github");
assert.equal(await page.locator("#level").inputValue(), "1");
await page.goto(`${origin}/contact?course=nextjs&level=99`);
assert.equal(await page.locator("#level").inputValue(), "1");
// Simulate a configured handoff only in the browser; never send a message.
await page.route("**/src/config/academy.ts", async (route) => {
  const response = await route.fetch();
  await route.fulfill({
    response,
    body: (await response.text()).replace(
      'whatsapp: ""',
      'whatsapp: "201000000000"',
    ),
  });
});
await page.goto(`${origin}/contact?course=nextjs&level=3`);
await page.locator("#name").fill("Course test learner");
await page.locator("#age").selectOption("18-24");
await page.locator("#experience").selectOption("experienced");
await page.locator("#method").selectOption("whatsapp");
await page.locator("#phone").fill("+201000000000");
await page.locator('input[type="checkbox"]').check();
await page.getByRole("button", { name: "Review inquiry" }).click();
const handoff = page.getByRole("link", { name: "Continue to WhatsApp" });
await handoff.waitFor();
const message = new URL(await handoff.getAttribute("href")).searchParams.get(
  "text",
);
assert(message.includes("Next.js") && message.includes("Level 3"));
const accessibility = [];
for (const lang of ["en", "ar"]) {
  for (const theme of ["dark", "light"]) {
    await page.evaluate(
      ({ lang, theme }) => {
        localStorage.setItem("mindcode-language", lang);
        localStorage.setItem("mindcode-theme", theme);
      },
      { lang, theme },
    );
    await page.goto(`${origin}/courses/nextjs`);
    await page.locator(".curriculum-trigger").first().waitFor();
    await page.locator(".curriculum-session summary").first().click();
    const result = await new AxeBuilder({ page })
      .include(".session-list")
      .include(".course-path-card")
      .include(".course-total-note")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    if (result.violations.length)
      accessibility.push({
        lang,
        theme,
        violations: result.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      });
  }
}
await fs.writeFile(
  "artifacts/professional-courses-report.json",
  JSON.stringify(
    { cases, errors, overflow, accessibility, pricing: expected },
    null,
    2,
  ),
);
await browser.close();
assert.deepEqual(errors, []);
assert.deepEqual(overflow, []);
assert.deepEqual(accessibility, []);
console.log(
  `PASS: ${cases} responsive course cases, bilingual curricula, pricing/totals, filters, keyboard expansion, level inquiry, reload, configured WhatsApp message and accessibility.`,
);
