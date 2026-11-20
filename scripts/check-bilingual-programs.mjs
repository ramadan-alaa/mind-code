import { chromium, expect as baseExpect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";

const expect = baseExpect.configure({ timeout: 15_000 });
const plain = (value) => value.replace(/[\u2066-\u2069]/g, "");
const origin = process.env.TEST_URL || "http://localhost:5173";
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    (process.platform === "win32"
      ? "C:/Program Files/Google/Chrome/Application/chrome.exe"
      : "/usr/bin/google-chrome"),
  headless: true,
});
const context = await browser.newContext({
  reducedMotion: "reduce",
  permissions: ["clipboard-read", "clipboard-write"],
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const report = {
  passed: false,
  cases: 0,
  routes: [],
  errors: [],
  overflow: [],
  accessibility: [],
  screenshots: [],
  handoffs: 0,
  pythonExamplesExecuted: 0,
  csharpValidation:
    "Reviewed valid top-level C# and ASP.NET Core Web-template examples; .NET SDK is not installed for compilation.",
};
page.on("pageerror", (error) => report.errors.push(error.message));
const goto = async (path) => {
  await page.goto(origin + path, { waitUntil: "domcontentloaded" });
  await page.locator("h1").waitFor();
};
const language = async (lang) => {
  if ((await page.locator("html").getAttribute("lang")) !== lang)
    await page.locator(".language-button").click();
  await expect(page.locator("html")).toHaveAttribute("lang", lang);
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem("mindcode-language")))
    .toBe(lang);
};
const theme = async (value) => {
  if ((await page.locator("html").getAttribute("data-theme")) !== value)
    await page.locator(".header-actions .icon-button").first().click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", value);
};
const hash = (value) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
const frameStyle = () =>
  page.locator(".course-code-editor-card").evaluate((el) => {
    const s = getComputedStyle(el);
    return {
      background: s.backgroundColor,
      radius: s.borderRadius,
      border: s.borderWidth,
      shadow: s.boxShadow,
      padding: s.padding,
      width: Math.round(el.getBoundingClientRect().width),
    };
  });
function verifyTranslations(value) {
  if (!value || typeof value !== "object") return;
  if (typeof value.en === "string" && typeof value.ar === "string") {
    assert(
      value.en.trim() && value.ar.trim(),
      "Both translations must be present",
    );
    assert(
      !/[\u0600-\u06ff]/.test(value.en),
      `Arabic leaked into an English field: ${value.en}`,
    );
    if (/[\u0600-\u06ff]/.test(value.ar)) assert.notEqual(value.en, value.ar);
  }
  Object.values(value).forEach(verifyTranslations);
}
await fs.mkdir("artifacts", { recursive: true });
try {
  await goto("/courses");
  const { courses, previews, academy } = await page.evaluate(async () => ({
    courses: (await import("/src/data/courses.ts")).courses,
    previews: (await import("/src/data/coursePreviews.ts")).coursePreviews,
    academy: (await import("/src/config/academy.ts")).academy,
  }));
  const programs = courses.filter((c) => c.program);
  assert.equal(programs.length, 4);
  assert.equal(
    programs.reduce((n, c) => n + c.levels.length, 0),
    10,
  );
  assert.equal(
    hash(courses.slice(0, 8)),
    "7ee51b6ed8b5195ca206cd52b11426df01a50696eb56a470d23ab6baf64af7ee",
    "Unrelated courses must remain unchanged",
  );
  const pricing = courses.map((c) => ({
    slug: c.slug,
    price: c.price,
    oldPrice: c.oldPrice,
    proposedOriginalPrice: c.proposedOriginalPrice,
    sessions: c.sessions,
    hours: c.hours,
    levels: c.levels.map((l) => ({
      price: l.price,
      oldPrice: l.oldPrice,
      proposedOriginalPrice: l.proposedOriginalPrice,
      sessions: l.sessions?.length,
      hoursPerSession: l.hoursPerSession,
    })),
  }));
  assert.equal(
    hash(pricing),
    "fa0fc05a53835f4f4f69f8f0efcdfd1c1c64a5ea6d23167ba70aa387970b3cab",
    "Every price, original price, discount and teaching-hour configuration must be preserved",
  );
  programs.forEach(verifyTranslations);
  Object.values(previews).forEach(verifyTranslations);
  for (const lang of ["en", "ar"]) {
    await language(lang);
    for (const course of programs) {
      const query = (course.localizedName?.[lang] ?? course.name).replace(
        /\u00a0/g,
        " ",
      );
      await page.getByRole("textbox").fill(query);
      const card = page
        .locator(".course-card")
        .filter({
          has: page.locator(`.course-link[href="/courses/${course.slug}"]`),
        });
      await expect(card).toHaveCount(1);
      await expect(card.locator("p")).toHaveText(course.cardDescription[lang]);
      if (course.slug === "backend")
        await expect(page.locator(".course-card")).toHaveCount(1);
    }
  }
  for (const preview of previews.python) {
    const output = execFileSync(
      process.env.PYTHON_PATH || "python",
      ["-c", preview.code.join("\n")],
      { input: "Mona\n", encoding: "utf8" },
    )
      .replaceAll("\r\n", "\n")
      .trim();
    // Piped stdin is not echoed like terminal input; the preview includes that sample input explicitly.
    const prompt = preview.output[0].replace(/Mona$/, "");
    assert.equal(output, prompt + preview.output.slice(1).join("\n"));
    report.pythonExamplesExecuted++;
  }
  const frames = [];
  await goto("/courses/html");
  await language("en");
  await theme("dark");
  const reference = await frameStyle();
  frames.push({
    label: "Original HTML editor",
    png: await page.locator(".course-code-editor-card").screenshot(),
  });

  for (const course of programs) {
    for (const [index, level] of course.levels.entries()) {
      const route = `/courses/${course.slug}/${level.slug}`;
      report.routes.push(route);
      await goto(route);
      for (const lang of ["en", "ar"]) {
        await language(lang);
        await page.reload({ waitUntil: "domcontentloaded" });
        await expect(page.locator(".course-detail")).toHaveAttribute(
          "dir",
          lang === "ar" ? "rtl" : "ltr",
        );
        await expect(page.locator(".course-detail")).toHaveAttribute(
          "lang",
          lang,
        );
        await expect(page.locator("h1")).toContainText(
          `${lang === "ar" ? "المستوى" : "Level"} ${index + 1}`,
        );
        await expect(page.locator(".course-main-desc")).toContainText(
          level.overview[lang],
        );
        if (lang === "ar" && course.slug === "backend") {
          const heading = await page
            .locator(".course-name-highlight")
            .textContent();
          assert(
            heading.includes("\u2066C#\u2069"),
            "C# punctuation must stay LTR inside the Arabic title",
          );
          assert(
            heading.includes("\u2066ASP.NET\u00a0Core\u2069"),
            "The framework name must retain its word order",
          );
        }
        await expect(page.locator(".course-fit-grid")).toContainText(
          course.audience[lang],
        );
        await expect(page.locator(".course-fit-grid")).toContainText(
          level.prerequisites[lang],
        );
        await expect(
          page.locator(".course-enrollment-price strong"),
        ).toHaveText(level.price.toLocaleString("en-US"));
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
          "href",
          academy.siteUrl + route,
        );
        await expect(page).toHaveTitle(
          new RegExp(`${lang === "ar" ? "المستوى" : "Level"} ${index + 1}`),
        );
        if (lang === "en") {
          assert(
            !/[\u0600-\u06ff]/.test(await page.locator("body").innerText()),
            `Arabic visible on English route ${route}`,
          );
          assert(
            !/[\u0600-\u06ff]/.test(
              await page
                .locator('meta[name="description"]')
                .getAttribute("content"),
            ),
          );
        }
        await expect(page.locator(".course-code-editor-card")).toHaveAttribute(
          "dir",
          "ltr",
        );
        const preview = previews[course.slug][index];
        await expect(page.locator(".program-hero-preview")).toHaveAttribute(
          "data-language",
          preview.kind === "code" ? preview.language : preview.kind,
        );
        if (preview.kind === "code") {
          await expect(page.locator(".editor-tabs")).toContainText(
            preview.fileName,
          );
          assert.deepEqual(
            await page
              .locator(".program-hero-preview .line-text")
              .allTextContents(),
            preview.code.map((line) => line || " "),
          );
          await expect(page.locator(".program-example-output")).toContainText(
            preview.output.join("\n"),
          );
          await expect(
            page
              .locator('.program-hero-preview span[class^="syntax-"]')
              .first(),
          ).toBeVisible();
          for (const pre of await page
            .locator(".program-hero-preview pre")
            .all()) {
            await expect(pre).toHaveAttribute("dir", "ltr");
            await expect(pre).toHaveCSS("text-align", "left");
          }
        } else {
          await expect(page.locator(".program-block")).toHaveCount(
            preview.blocks.length,
          );
          for (const [n, block] of preview.blocks.entries())
            await expect(page.locator(".program-block").nth(n)).toContainText(
              block.label[lang],
            );
          await expect(page.locator(".program-hero-preview pre")).toHaveCount(
            0,
          );
        }
        await page.locator(".editor-tabs [role=tab]").first().focus();
        await page.keyboard.press("ArrowRight");
        await expect(
          page.locator(".editor-tabs [role=tab]").nth(1),
        ).toHaveAttribute("aria-selected", "true");
        await expect(page.locator(".program-preview-caption")).toHaveText(
          preview.caption[lang],
        );
        await page.keyboard.press("Home");
        await expect(
          page.locator(".editor-tabs [role=tab]").first(),
        ).toHaveAttribute("aria-selected", "true");
        await page.locator(".editor-copy-btn").click();
        const expectedCopy =
          preview.kind === "code"
            ? preview.code.join("\n")
            : preview.blocks.map((b) => b.label[lang]).join("\n");
        await expect
          .poll(() =>
            page.evaluate(async () =>
              (await navigator.clipboard.readText()).replaceAll("\r\n", "\n"),
            ),
          )
          .toBe(expectedCopy);

        await page.locator(".curriculum-toggle-all").click();
        const sessions = course.levels.flatMap((l) => l.sessions);
        await expect(page.locator(".curriculum-session")).toHaveCount(
          sessions.length,
        );
        await page.locator(".curriculum-session").evaluateAll((items) =>
          items.forEach((item) => {
            item.open = true;
          }),
        );
        if (lang === "ar" && course.slug === "backend")
          await expect(
            page
              .locator('.curriculum-container bdi[dir="ltr"]')
              .filter({ hasText: /^C#$/ })
              .first(),
          ).toBeVisible();
        for (const [n, session] of sessions.entries()) {
          const element = page.locator(".curriculum-session").nth(n);
          await expect(element.locator("summary")).toContainText(
            session.title[lang],
          );
          for (const item of [
            ...session.topics,
            ...session.learningObjectives,
            session.practiceTask,
          ])
            await expect(element).toContainText(item[lang]);
        }
        for (const item of level.outcomes)
          await expect(page.locator("#course-fit")).toContainText(item[lang]);
        await expect(page.locator("#projects")).toContainText(
          level.project[lang],
        );
        for (const [n, item] of course.faq.entries()) {
          await expect(
            page.locator(".course-accordion .accordion-trigger").nth(n),
          ).toContainText(item.q[lang]);
          await page
            .locator(".course-accordion .accordion-trigger")
            .nth(n)
            .click();
          await expect(
            page.locator(".course-accordion .accordion-content"),
          ).toContainText(item.a[lang]);
        }
        for (const appearance of ["dark", "light"]) {
          await theme(appearance);
          for (const width of [360, 390, 768, 1024, 1440]) {
            await page.setViewportSize({ width, height: 1000 });
            await page.evaluate(() => new Promise(requestAnimationFrame));
            if (
              await page.evaluate(
                () =>
                  document.documentElement.scrollWidth >
                  document.documentElement.clientWidth + 1,
              )
            )
              report.overflow.push({ route, lang, theme: appearance, width });
            assert(
              !/\[object Object\]|undefined|translation\./.test(
                await page.locator(".course-detail").innerText(),
              ),
            );
            report.cases++;
          }
          const result = await new AxeBuilder({ page })
            .include(".course-intro")
            .include(".curriculum-container")
            .include(".course-enrollment-column")
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze();
          if (result.violations.length)
            report.accessibility.push({
              route,
              lang,
              theme: appearance,
              violations: result.violations.map((v) => ({
                id: v.id,
                targets: v.nodes.map((n) => n.target),
              })),
            });
        }
        if (index === course.levels.length - 1) {
          await theme("dark");
          for (const width of [390, 1440]) {
            await page.setViewportSize({
              width,
              height: width === 390 ? 1800 : 1100,
            });
            await page.evaluate(() => document.fonts.ready);
            await page.evaluate(() => {
              document.activeElement?.blur();
              window.scrollTo(0, 0);
            });
            const path = `artifacts/bilingual-${course.slug}-${lang}-${width}.png`;
            await page.screenshot({ path });
            report.screenshots.push(path);
          }
          assert.deepEqual(
            await frameStyle(),
            reference,
            "Editor frame styling must match the original",
          );
          if (lang === "en")
            frames.push({
              label: course.name,
              png: await page.locator(".course-code-editor-card").screenshot(),
            });
        }
        const inquiry = page
          .locator('.course-enrollment-card a[href^="/contact"]')
          .first();
        await expect(inquiry).toHaveAttribute(
          "href",
          `/contact?course=${course.slug}&level=${index + 1}`,
        );
        const direct = new URL(
          await page.locator(".whatsapp-quick-btn").getAttribute("href"),
        );
        assert.equal(direct.pathname, `/${academy.whatsapp}`);
        assert(
          plain(direct.searchParams.get("text")).includes(
            course.localizedName?.[lang] ?? course.name,
          ),
        );
        assert(
          direct.searchParams
            .get("text")
            .includes(`${lang === "ar" ? "المستوى" : "level"} ${index + 1}`),
        );
        await inquiry.click();
        await expect(page.locator("#course")).toHaveValue(course.slug);
        await expect(page.locator("#level")).toHaveValue(String(index + 1));
        if (lang === "ar" && level.ar.includes("C#")) {
          const label = await page
            .locator(`#level option[value="${index + 1}"]`)
            .textContent();
          assert(
            label.includes("\u2066C#\u2069"),
            "Native option labels must preserve technical punctuation",
          );
        }
        await expect(page.locator("html")).toHaveAttribute("lang", lang);
        await page.locator("#name").fill("Preview Test Learner");
        await page.locator("#age").selectOption("18-24");
        await page.locator("#experience").selectOption("none");
        await page.locator("#method").selectOption("whatsapp");
        await page.locator("#phone").fill("+201000000000");
        await page.locator("input[type=checkbox]").check();
        await page.locator("button[type=submit]").click();
        const handoff = new URL(
          await page
            .locator('.form-result a[href^="https://wa.me"]')
            .getAttribute("href"),
        );
        assert.equal(handoff.pathname, `/${academy.whatsapp}`);
        assert(
          plain(handoff.searchParams.get("text")).includes(
            course.localizedName?.[lang] ?? course.name,
          ),
        );
        assert(
          handoff.searchParams
            .get("text")
            .includes(`${lang === "ar" ? "المستوى" : "Level"} ${index + 1}`),
        );
        report.handoffs++;
        await goto(route);
      }
      console.log(`Bilingual page verified: ${route}`);
    }
  }
  const comparison = await context.newPage();
  await comparison.setViewportSize({ width: 1200, height: 900 });
  await comparison.setContent(
    `<html><body style="margin:0;padding:16px;background:#16171c;color:white;font:16px sans-serif;display:grid;grid-template-columns:1fr 1fr;gap:16px">${frames.map((frame) => `<figure style="margin:0"><figcaption>${frame.label}</figcaption><img style="width:100%;height:auto" src="data:image/png;base64,${frame.png.toString("base64")}"></figure>`).join("")}</body></html>`,
  );
  await comparison
    .locator("img")
    .evaluateAll((items) => Promise.all(items.map((img) => img.decode())));
  await comparison.screenshot({
    path: "artifacts/bilingual-editor-comparison.png",
    fullPage: true,
  });
  report.screenshots.push("artifacts/bilingual-editor-comparison.png");
  await comparison.close();
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.overflow, []);
  assert.deepEqual(report.accessibility, []);
  assert.equal(report.cases, 200);
  assert.equal(report.handoffs, 20);
  report.passed = true;
  console.log(
    "PASS: 10 levels in both languages, 200 responsive cases, all educational fields, 20 inquiry handoffs, level-aware previews, Python execution, unchanged prices and unrelated courses, editor styling and accessibility.",
  );
} finally {
  await fs.writeFile(
    "artifacts/bilingual-programs-report.json",
    JSON.stringify(report, null, 2),
  );
  await browser.close();
}
