import { chromium, expect as baseExpect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

const expect = baseExpect.configure({ timeout: 30_000 });
const origin = process.env.TEST_URL || "http://localhost:5173";
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    (process.platform === "win32"
      ? "C:/Program Files/Google/Chrome/Application/chrome.exe"
      : "/usr/bin/google-chrome"),
  headless: true,
});
const context = await browser.newContext({ reducedMotion: "reduce" });
const page = await context.newPage();
const report = {
  passed: false,
  cases: 0,
  errors: [],
  overflow: [],
  accessibility: [],
  comparisons: [],
};
page.on("pageerror", (error) => report.errors.push(error.message));
const expected = [
  ["scratchjr", 700, 900, 4, 8],
  ["scratch", 800, 1000, 4, 8],
  ["python", 1000, 1200, 5, 10],
];
const widths = [360, 390, 768, 1024, 1440];
const cardFor = (slug) =>
  page
    .locator(".course-card")
    .filter({ has: page.locator(`.course-link[href="/courses/${slug}"]`) });
const goto = async (path) => {
  await page.goto(origin + path, { waitUntil: "domcontentloaded" });
  await page.locator("h1").waitFor();
};
const checkOverflow = async (route, width) => {
  if (
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1,
    )
  )
    report.overflow.push({ route, width });
};
const template = () =>
  page
    .locator(".course-detail")
    .evaluate((el) => [...el.children].map((child) => child.className));
const cardStyle = (card) =>
  card.evaluate((el) => {
    const style = getComputedStyle(el),
      icon = el.querySelector(".tech-icon"),
      heading = el.querySelector("h3"),
      cta = el.querySelector(".course-link");
    return {
      padding: style.padding,
      borderRadius: style.borderRadius,
      border: style.borderWidth,
      font: style.fontFamily,
      iconWidth: getComputedStyle(icon).width,
      iconHeight: getComputedStyle(icon).height,
      headingSize: getComputedStyle(heading).fontSize,
      ctaSize: getComputedStyle(cta).fontSize,
      children: [...el.children].map(
        (child) => `${child.tagName}.${child.className}`,
      ),
    };
  });
// Compose genuine browser captures for side-by-side review; no production DOM changes.
async function compare(name, left, right) {
  const comparison = await context.newPage();
  await comparison.setViewportSize({
    width: name.includes("cards") ? 720 : name.endsWith("390") ? 824 : 2880,
    height: 1100,
  });
  await comparison.setContent(
    `<html><body style="margin:0;background:#16171c;color:white;font:18px sans-serif"><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:16px"><figure style="margin:0"><figcaption>Original course</figcaption><img style="width:100%;height:auto" src="data:image/png;base64,${left.toString("base64")}"></figure><figure style="margin:0"><figcaption>Shared template: new course</figcaption><img style="width:100%;height:auto" src="data:image/png;base64,${right.toString("base64")}"></figure></div></body></html>`,
  );
  await comparison
    .locator("img")
    .evaluateAll((images) => Promise.all(images.map((img) => img.decode())));
  const path = `artifacts/ui-consistency-${name}.png`;
  await comparison.screenshot({ path, fullPage: true });
  report.comparisons.push(path);
  await comparison.close();
}

await fs.mkdir("artifacts", { recursive: true });
try {
  await goto("/courses");
  const { courses, academy } = await page.evaluate(async () => ({
    courses: (await import("/src/data/courses.ts")).courses,
    academy: (await import("/src/config/academy.ts")).academy,
  }));
  assert.equal(courses.length, 12);
  assert.equal(new Set(courses.map((course) => course.slug)).size, 12);
  assert.deepEqual(
    courses
      .slice(0, 8)
      .map((c) => [c.slug, c.price, c.oldPrice ?? null, c.sessions, c.hours]),
    [
      ["html", 700, 1000, 4, 8],
      ["css", 900, 1100, 5, 10],
      ["javascript", 1100, 1300, 6, 12],
      ["react", 1300, 1500, 6, 12],
      ["git-github", 700, 1000, 4, 8],
      ["tailwind-css", 900, 1100, 5, 10],
      ["typescript", 1200, 1400, 5, 10],
      ["nextjs", 1600, 1800, 6, 12],
    ],
  );
  for (const [slug, price, originalPrice, sessions, hours] of expected) {
    const course = courses.find((c) => c.slug === slug);
    assert.deepEqual(
      [
        course.price,
        course.oldPrice,
        course.sessions,
        course.hours,
        course.levels.length,
      ],
      [price, originalPrice, sessions, hours, 2],
    );
    assert(!course.proposedOriginalPrice && !course.image);
    for (const [i, level] of course.levels.entries()) {
      assert.equal(level.id, `${slug}-level-${i + 1}`);
      assert.equal(level.slug, `level-${i + 1}`);
      assert.equal(level.price, price);
      assert.equal(level.oldPrice, originalPrice);
      assert.equal(level.proposedOriginalPrice, undefined);
      assert.equal(level.sessions.length, sessions);
      assert.equal(level.hoursPerSession * sessions, hours);
      assert(
        level.project.ar && level.prerequisites.ar && level.outcomes.length,
      );
      assert(
        level.sessions.every(
          (s) =>
            s.title.ar &&
            s.topics.length &&
            s.practiceTask.ar &&
            s.learningObjectives.length,
        ),
      );
    }
  }
  assert.equal(
    new Set(
      courses
        .filter((c) => c.program)
        .flatMap((c) => c.levels.map((level) => level.id)),
    ).size,
    10,
  );

  for (const lang of ["ar", "en"])
    for (const theme of ["dark", "light"]) {
      await page.evaluate(
        ({ lang, theme }) => {
          localStorage.setItem("mindcode-language", lang);
          localStorage.setItem("mindcode-theme", theme);
        },
        { lang, theme },
      );
      for (const width of widths) {
        await page.setViewportSize({ width, height: 1000 });
        await goto("/courses/html");
        const originalTemplate = await template();
        await checkOverflow("/courses/html", width);
        for (const [slug, price, , sessions] of expected)
          for (const n of [1, 2]) {
            const route = `/courses/${slug}/level-${n}`;
            await goto(route);
            assert.deepEqual(await template(), originalTemplate);
            await expect(page.locator(".course-detail")).toHaveAttribute(
              "dir",
              lang === "ar" ? "rtl" : "ltr",
            );
            await expect(page.locator("h1 .heading-sub")).toHaveText(
              lang === "ar" ? "اتقن مهارات حقيقية." : "Master Real Skills.",
            );
            await expect(
              page.locator(".course-enrollment-price strong"),
            ).toHaveText(price.toLocaleString("en-US"));
            await expect(
              page.locator(".course-enrollment-price del"),
            ).toHaveText((price + 200).toLocaleString("en-US"));
            await expect(
              page.locator(".course-enrollment-price del"),
            ).toHaveCSS("text-decoration-line", "line-through");
            await expect(page.locator(".mobile-bar-info del")).toHaveText(
              (price + 200).toLocaleString("en-US"),
            );
            if (width === 390)
              await expect(
                page.locator(".mobile-sticky-enrollment-bar"),
              ).toBeVisible();
            await expect(
              page.locator(".course-enrollment-top .tech-icon svg"),
            ).toHaveCount(1);
            await expect(page.locator(".course-intro img")).toHaveCount(0);
            await expect(page.locator(".curriculum-session")).toHaveCount(
              sessions,
            );
            await expect(
              page.locator(".level-pill-btn").nth(n - 1),
            ).toHaveAttribute("aria-pressed", "true");
            await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
              "href",
              academy.siteUrl + route,
            );
            await expect(
              page.locator('meta[property="og:url"]'),
            ).toHaveAttribute("content", academy.siteUrl + route);
            await expect(page).toHaveTitle(
              new RegExp(`${lang === "ar" ? "المستوى" : "Level"} ${n}`),
            );
            for (const cta of await page
              .locator(
                '.course-intro-actions a[href^="/contact"], .course-enrollment-column a[href^="/contact"], .mobile-sticky-enrollment-bar a',
              )
              .all())
              await expect(cta).toHaveAttribute(
                "href",
                `/contact?course=${slug}&level=${n}`,
              );
            for (const cta of await page
              .locator('.course-detail a[href^="https://wa.me"]')
              .all()) {
              const url = new URL(await cta.getAttribute("href"));
              assert.equal(url.pathname, `/${academy.whatsapp}`);
              assert(
                url.searchParams
                  .get("text")
                  .includes(courses.find((c) => c.slug === slug).name),
              );
              assert(
                url.searchParams
                  .get("text")
                  .includes(`${lang === "ar" ? "المستوى" : "level"} ${n}`),
              );
            }
            await page.locator(".curriculum-toggle-all").click();
            await expect(page.locator(".curriculum-session")).toHaveCount(
              sessions * 2,
            );
            await expect(page.locator(".curriculum-price-tag del")).toHaveCount(
              2,
            );
            for (const regularPrice of await page
              .locator(".curriculum-price-tag del")
              .all()) {
              await expect(regularPrice).toHaveText(
                (price + 200).toLocaleString("en-US"),
              );
              await expect(regularPrice).toHaveCSS(
                "text-decoration-line",
                "line-through",
              );
            }
            await page.locator(".curriculum-session summary").first().focus();
            await page.keyboard.press("Enter");
            await expect(
              page.locator(".session-content").first(),
            ).toBeVisible();
            await checkOverflow(route, width);
            report.cases++;
          }
        await goto("/courses");
        await expect(cardFor("html")).toHaveCount(1);
        // Git uses the existing Lucide icon container; HTML has a deliberate shield override.
        const originalStyle = await cardStyle(cardFor("git-github"));
        for (const [slug, sellingPrice, originalPrice] of expected) {
          assert.deepEqual(await cardStyle(cardFor(slug)), originalStyle);
          await expect(cardFor(slug).locator(".tech-icon svg")).toHaveCount(1);
          await expect(cardFor(slug).locator("img")).toHaveCount(0);
          await expect(cardFor(slug).locator(".course-price del")).toHaveText(
            originalPrice.toLocaleString("en-US"),
          );
          await expect(cardFor(slug).locator(".course-price del")).toHaveCSS(
            "text-decoration-line",
            "line-through",
          );
          await expect(
            cardFor(slug).locator(".course-price strong"),
          ).toContainText(sellingPrice.toLocaleString("en-US"));
        }
        await checkOverflow("/courses", width);
      }
      console.log(`Responsive template checks passed: ${lang}/${theme}`);
    }

  await page.evaluate(() => {
    localStorage.setItem("mindcode-language", "ar");
    localStorage.setItem("mindcode-theme", "dark");
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await goto("/courses");
  await page.evaluate(() => document.fonts.ready);
  const originalCard = await cardFor("git-github").screenshot();
  for (const [slug] of expected)
    await compare(
      `cards-git-github-${slug}`,
      originalCard,
      await cardFor(slug).screenshot(),
    );
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await goto("/courses/html");
    const original = await page.screenshot({ fullPage: true });
    await goto("/courses/python/level-2");
    await compare(
      `details-html-python-${width}`,
      original,
      await page.screenshot({ fullPage: true }),
    );
  }

  for (const [slug] of expected)
    for (const n of [1, 2]) {
      await goto(`/courses/${slug}/level-${n}`);
      await page
        .locator(".level-pill-btn")
        .nth(n === 1 ? 1 : 0)
        .click();
      await expect(page).toHaveURL(
        `${origin}/courses/${slug}/level-${n === 1 ? 2 : 1}`,
      );
      await expect(
        page.locator(".level-pill-btn").nth(n === 1 ? 1 : 0),
      ).toHaveAttribute("aria-pressed", "true");
      await page
        .locator(".level-pill-btn")
        .nth(n - 1)
        .click();
      await expect(page.locator(".level-pill-btn").nth(n - 1)).toHaveAttribute(
        "aria-pressed",
        "true",
      );
      await expect(
        page.locator('.course-enrollment-card a[href^="/contact"]').first(),
      ).toHaveAttribute("href", `/contact?course=${slug}&level=${n}`);
      await page
        .locator('.course-enrollment-card a[href^="/contact"]')
        .first()
        .click();
      await expect(page.locator("#course")).toHaveValue(slug);
      await expect(page.locator("#level")).toHaveValue(String(n));
      await page.reload({ waitUntil: "domcontentloaded" });
      await expect(page.locator("#level")).toHaveValue(String(n));
      await page.locator("#name").fill("Test learner");
      await page.locator("#age").selectOption("18-24");
      await page.locator("#experience").selectOption("none");
      await page.locator("#method").selectOption("whatsapp");
      await page.locator("#phone").fill("+201000000000");
      await page.locator('input[type="checkbox"]').check();
      await page.locator('button[type="submit"]').click();
      const handoff = new URL(
        await page
          .locator('.form-result a[href^="https://wa.me"]')
          .getAttribute("href"),
      );
      assert(handoff.searchParams.get("text").includes(`المستوى ${n}`));
      assert(
        handoff.searchParams
          .get("text")
          .includes(courses.find((c) => c.slug === slug).name),
      );
    }
  for (const theme of ["dark", "light"])
    for (const [slug] of expected) {
      await page.evaluate(
        (theme) => localStorage.setItem("mindcode-theme", theme),
        theme,
      );
      await goto(`/courses/${slug}/level-2`);
      const result = await new AxeBuilder({ page })
        .include(".course-intro")
        .include(".curriculum-container")
        .include(".course-enrollment-column")
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      if (result.violations.length)
        report.accessibility.push({
          slug,
          theme,
          violations: result.violations.map((v) => ({
            id: v.id,
            targets: v.nodes.map((n) => n.target),
          })),
        });
    }
  for (const route of [
    "/courses/python/level-3",
    "/courses/html/level-1",
    "/courses/missing/level-1",
  ]) {
    await goto(route);
    await expect(page.locator(".course-detail")).toHaveCount(0);
  }
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.overflow, []);
  assert.deepEqual(report.accessibility, []);
  report.passed = true;
  console.log(
    `PASS: ${report.cases} responsive cases, shared card/template styles, six curricula, confirmed regular/selling prices on cards/details/curriculum/mobile bar, icons, metadata, six inquiry handoffs and accessibility.`,
  );
} finally {
  await fs.writeFile(
    "artifacts/programming-programs-report.json",
    JSON.stringify(report, null, 2),
  );
  await browser.close();
}
