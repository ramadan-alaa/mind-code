import { chromium, expect as baseExpect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";

const expect = baseExpect.configure({ timeout: 30_000 });
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
const context = await browser.newContext({ reducedMotion: "reduce" });
const page = await context.newPage();
const report = {
  passed: false,
  cases: 0,
  errors: [],
  overflow: [],
  accessibility: [],
  screenshots: [],
  handoffs: [],
};
page.on("pageerror", (error) => report.errors.push(error.message));
const goto = async (path) => {
  await page.goto(origin + path, { waitUntil: "domcontentloaded" });
  await page.locator("h1").waitFor();
};
const cardFor = (slug) =>
  page.locator(".course-card").filter({
    has: page.locator(`.course-link[href="/courses/${slug}"]`),
  });
const checkOverflow = async (route, width, lang, theme) => {
  if (
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1,
    )
  )
    report.overflow.push({ route, width, lang, theme });
};
const styleOf = (locator) =>
  locator.evaluate((el) => {
    const style = getComputedStyle(el);
    return {
      padding: style.padding,
      radius: style.borderRadius,
      border: style.borderWidth,
      shadow: style.boxShadow,
      font: style.fontFamily,
      headingSize: getComputedStyle(el.querySelector("h3")).fontSize,
      iconWidth: getComputedStyle(el.querySelector(".tech-icon")).width,
      iconHeight: getComputedStyle(el.querySelector(".tech-icon")).height,
      children: [...el.children].map(
        (child) => `${child.tagName}.${child.className}`,
      ),
    };
  });
const template = () =>
  page
    .locator(".course-detail")
    .evaluate((el) => [...el.children].map((child) => child.className));
const localized = (value) => {
  assert(value?.en?.trim() && value?.ar?.trim());
  assert.notEqual(
    value.en,
    value.ar,
    "Backend content must have real translations",
  );
};
async function compare(name, left, right, width) {
  const comparison = await context.newPage();
  await comparison.setViewportSize({ width, height: 1100 });
  await comparison.setContent(
    `<html><body style="margin:0;background:#16171c;color:white;font:18px sans-serif"><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:16px"><figure style="margin:0"><figcaption>Python — existing shared component</figcaption><img style="width:100%;height:auto" src="data:image/png;base64,${left.toString("base64")}"></figure><figure style="margin:0"><figcaption>Backend — same shared component</figcaption><img style="width:100%;height:auto" src="data:image/png;base64,${right.toString("base64")}"></figure></div></body></html>`,
  );
  await comparison
    .locator("img")
    .evaluateAll((images) => Promise.all(images.map((img) => img.decode())));
  const path = `artifacts/backend-${name}.png`;
  await comparison.screenshot({ path, fullPage: true });
  report.screenshots.push(path);
  await comparison.close();
}

await fs.mkdir("artifacts", { recursive: true });
try {
  await goto("/courses");
  const { courses, totals, academy } = await page.evaluate(async () => {
    const { courses, courseTotals } = await import("/src/data/courses.ts");
    return {
      courses,
      totals: courseTotals(courses.find((c) => c.slug === "backend")),
      academy: (await import("/src/config/academy.ts")).academy,
    };
  });
  assert.equal(courses.length, 12);
  assert.equal(new Set(courses.map((c) => c.slug)).size, 12);
  // Eight unrelated course records remain unchanged; program translations are now intentional changes.
  assert.equal(
    createHash("sha256")
      .update(JSON.stringify(courses.slice(0, 8)))
      .digest("hex"),
    "7ee51b6ed8b5195ca206cd52b11426df01a50696eb56a470d23ab6baf64af7ee",
    "Unrelated course content and pricing must remain unchanged",
  );
  const course = courses.find((c) => c.slug === "backend");
  assert.deepEqual(totals, { price: 7200, sessions: 24, hours: 48 });
  assert.deepEqual(
    [course.price, course.sessions, course.hours, course.levels.length],
    [1800, 6, 12, 4],
  );
  assert(!course.oldPrice && !course.proposedOriginalPrice && !course.image);
  localized(course.description);
  localized(course.prerequisites);
  localized(course.cardDescription);
  localized(course.audience);
  course.outcomes.forEach(localized);
  const levelNames = [
    "C# Fundamentals & OOP",
    "Advanced C# & SOLID",
    "SQL, LINQ & Entity Framework Core",
    "ASP.NET Core Web API & Authentication",
  ];
  for (const [i, level] of course.levels.entries()) {
    assert.equal(level.id, `backend-level-${i + 1}`);
    assert.equal(level.slug, `level-${i + 1}`);
    assert.equal(level.en, levelNames[i]);
    assert.equal(level.price, 1800);
    assert.equal(level.oldPrice, undefined);
    assert.equal(level.proposedOriginalPrice, undefined);
    assert.equal(level.hoursPerSession, 2);
    assert.equal(level.sessions.length, 6);
    localized(level);
    localized(level.overview);
    localized(level.project);
    localized(level.prerequisites);
    level.outcomes.forEach(localized);
    for (const [j, session] of level.sessions.entries()) {
      assert.equal(session.number, j + 1);
      localized(session.title);
      localized(session.practiceTask);
      assert(session.topics.length >= 2 && session.learningObjectives.length);
      session.topics.forEach(localized);
      session.learningObjectives.forEach(localized);
    }
  }

  const titles = new Set();
  for (const lang of ["ar", "en"])
    for (const theme of ["dark", "light"]) {
      await page.evaluate(
        ({ lang, theme }) => {
          localStorage.setItem("mindcode-language", lang);
          localStorage.setItem("mindcode-theme", theme);
        },
        { lang, theme },
      );
      for (const width of [360, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        await goto("/courses/python/level-1");
        const originalTemplate = await template();
        await goto("/courses");
        assert.deepEqual(
          await styleOf(cardFor("backend")),
          await styleOf(cardFor("python")),
        );
        await expect(cardFor("backend").locator(".tech-icon svg")).toHaveCount(
          1,
        );
        await expect(cardFor("backend").locator("img, del")).toHaveCount(0);
        await expect(cardFor("backend").locator(".course-facts")).toContainText(
          "24",
        );
        await expect(cardFor("backend").locator(".course-facts")).toContainText(
          "48",
        );
        await expect(
          cardFor("backend").locator(".course-price strong"),
        ).toContainText("1,800");
        await checkOverflow("/courses", width, lang, theme);

        for (const n of [0, 1, 2, 3, 4]) {
          const route = `/courses/backend${n ? `/level-${n}` : ""}`;
          await goto(route);
          assert.deepEqual(await template(), originalTemplate);
          await expect(page.locator(".course-detail")).toHaveAttribute(
            "dir",
            lang === "ar" ? "rtl" : "ltr",
          );
          await expect(
            page.locator(".course-enrollment-price strong"),
          ).toHaveText("1,800");
          await expect(
            page.locator(
              ".course-enrollment-price del, .curriculum-price-tag del, .mobile-bar-info del",
            ),
          ).toHaveCount(0);
          await expect(
            page.locator(".course-enrollment-top .tech-icon svg"),
          ).toHaveCount(1);
          await expect(page.locator(".course-intro img")).toHaveCount(0);
          await expect(page.locator(".curriculum-level")).toHaveCount(4);
          await expect(page.locator(".curriculum-session")).toHaveCount(6);
          await expect(
            page.locator(
              `nav[aria-label="${lang === "ar" ? "مستويات البرنامج" : "Program levels"}"] a`,
            ),
          ).toHaveCount(4);
          await expect(page.locator(".course-total-note")).toContainText(
            "7,200",
          );
          await expect(page.locator(".course-total-note")).toContainText("48");
          await expect(page.locator(".course-total-note")).toContainText("24");
          await expect(page.locator(".course-total-note")).not.toContainText(
            "أسبوع",
          );
          await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
            "href",
            academy.siteUrl + route,
          );
          await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
            "content",
            academy.siteUrl + route,
          );
          await expect(
            page.locator('meta[property="og:title"]'),
          ).toHaveAttribute("content", await page.title());
          if (lang === "ar" && theme === "dark" && width === 360)
            titles.add(await page.title());
          if (n) {
            await expect(page.locator("h1")).toContainText(
              `${lang === "ar" ? "المستوى" : "Level"} ${n}`,
            );
            await expect(page.locator(".course-main-desc")).toContainText(
              course.levels[n - 1].overview[lang],
            );
            await expect(page.locator(".course-quick-facts")).toContainText(
              "12",
            );
            await expect(
              page.locator(".level-pill-btn").nth(n - 1),
            ).toHaveAttribute("aria-pressed", "true");
            await expect(
              page.locator(".curriculum-level.is-expanded .curriculum-meta"),
            ).toContainText("12");
          } else {
            await expect(page.locator("h1")).toContainText(
              lang === "ar" ? "٤ مستويات" : "4 levels",
            );
            await expect(page.locator(".course-quick-facts")).toContainText(
              "24",
            );
            await expect(page.locator(".course-quick-facts")).toContainText(
              "48",
            );
            await expect(
              page.locator(".course-quick-facts .fact-label").nth(1),
            ).toHaveText(lang === "ar" ? "إجمالي المحاضرات" : "Total sessions");
            await expect(
              page.locator(".course-quick-facts .fact-label").nth(2),
            ).toHaveText(lang === "ar" ? "إجمالي الساعات" : "Total hours");
            await expect(page.locator(".course-quick-facts")).not.toContainText(
              "/ مستوى",
            );
          }
          for (const cta of await page
            .locator(
              '.course-intro-actions a[href^="/contact"], .course-enrollment-column a[href^="/contact"], .mobile-sticky-enrollment-bar a',
            )
            .all())
            await expect(cta).toHaveAttribute(
              "href",
              `/contact?course=backend&level=${n || 1}`,
            );
          for (const cta of await page
            .locator('.course-detail a[href^="https://wa.me"]')
            .all()) {
            const url = new URL(await cta.getAttribute("href"));
            assert.equal(url.pathname, `/${academy.whatsapp}`);
            assert(
              plain(url.searchParams.get("text")).includes(
                course.localizedName[lang],
              ),
            );
            assert(
              url.searchParams
                .get("text")
                .includes(`${lang === "ar" ? "المستوى" : "level"} ${n || 1}`),
            );
          }
          // Exercise a real keyboard disclosure, then reveal all 24 sessions before overflow measurement.
          const summary = page.locator(".curriculum-session summary").first();
          await summary.focus();
          await page.keyboard.press("Enter");
          await expect(page.locator(".session-content").first()).toBeVisible();
          await expect(page.locator(".session-content").first()).toContainText(
            course.levels[(n || 1) - 1].sessions[0].practiceTask[lang],
          );
          await page.locator(".curriculum-toggle-all").click();
          await expect(page.locator(".curriculum-session")).toHaveCount(24);
          await page.locator(".curriculum-session").evaluateAll((items) =>
            items.forEach((el) => {
              el.open = true;
            }),
          );
          await expect(
            page.locator(".curriculum-level .curriculum-price-tag del"),
          ).toHaveCount(0);
          await checkOverflow(route, width, lang, theme);
          if (width === 390)
            await expect(
              page.locator(".mobile-sticky-enrollment-bar"),
            ).toBeVisible();
          report.cases++;
        }
      }
      console.log(`Backend responsive checks passed: ${lang}/${theme}`);
    }
  assert.equal(titles.size, 5, "Overview and level metadata must be unique");

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => {
    localStorage.setItem("mindcode-language", "ar");
    localStorage.setItem("mindcode-theme", "dark");
  });
  await goto("/courses");
  await page.getByRole("textbox").fill("ASP.NET");
  await expect(page.locator(".course-card")).toHaveCount(1);
  await cardFor("backend").locator(".course-link").click();
  await expect(page).toHaveURL(origin + "/courses/backend");
  await page.locator('nav[aria-label="مستويات البرنامج"] a').first().click();
  for (const n of [1, 2, 3, 4]) {
    await expect(page).toHaveURL(`${origin}/courses/backend/level-${n}`);
    if (n < 4)
      await page
        .getByRole("link", { name: `اكتشف المستوى ${n + 1}`, exact: true })
        .click();
  }
  await page
    .getByRole("link", { name: "راجع المستوى الأول", exact: true })
    .click();
  await expect(page).toHaveURL(`${origin}/courses/backend/level-1`);
  for (const n of [1, 2, 3, 4]) {
    await page
      .locator(".level-pill-btn")
      .nth(n - 1)
      .click();
    await expect(page).toHaveURL(`${origin}/courses/backend/level-${n}`);
    await expect(page.locator(".level-pill-btn").nth(n - 1)).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    const inquiry = page
      .locator('.course-enrollment-card a[href^="/contact"]')
      .first();
    await expect(inquiry).toHaveAttribute(
      "href",
      `/contact?course=backend&level=${n}`,
    );
    await inquiry.click();
    await expect(page.locator("#course")).toHaveValue("backend");
    await expect(page.locator("#level")).toHaveValue(String(n));
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.locator("#level")).toHaveValue(String(n));
    await page.locator("#name").fill("Backend Test Learner");
    await page.locator("#age").selectOption("18-24");
    await page.locator("#experience").selectOption("none");
    await page.locator("#method").selectOption("whatsapp");
    await page.locator("#phone").fill("+201000000000");
    await page.locator('input[type="checkbox"]').check();
    await page.locator('button[type="submit"]').click();
    const url = new URL(
      await page
        .locator('.form-result a[href^="https://wa.me"]')
        .getAttribute("href"),
    );
    assert.equal(url.pathname, `/${academy.whatsapp}`);
    assert(
      plain(url.searchParams.get("text")).includes(course.localizedName.ar),
    );
    assert(url.searchParams.get("text").includes(`المستوى ${n}`));
    report.handoffs.push({
      level: n,
      numberMatchesConfig: true,
      includesCourseAndLevel: true,
    });
    await goto(`/courses/backend/level-${n}`);
  }

  for (const theme of ["dark", "light"]) {
    await page.evaluate(
      (theme) => localStorage.setItem("mindcode-theme", theme),
      theme,
    );
    for (const n of [0, 1, 2, 3, 4]) {
      const route = `/courses/backend${n ? `/level-${n}` : ""}`;
      await goto(route);
      const result = await new AxeBuilder({ page })
        .include(".course-intro")
        .include(".curriculum-container")
        .include(".course-enrollment-column")
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      if (result.violations.length)
        report.accessibility.push({
          theme,
          route,
          violations: result.violations.map((v) => ({
            id: v.id,
            targets: v.nodes.map((n) => n.target),
          })),
        });
    }
  }

  await page.evaluate(() => localStorage.setItem("mindcode-theme", "dark"));
  await goto("/courses");
  await page.evaluate(() => document.fonts.ready);
  await compare(
    "cards-python-comparison",
    await cardFor("python").screenshot(),
    await cardFor("backend").screenshot(),
    720,
  );
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await goto("/courses/python/level-1");
    const original = await page.screenshot({ fullPage: true });
    await goto("/courses/backend/level-1");
    await compare(
      `details-python-comparison-${width}`,
      original,
      await page.screenshot({ fullPage: true }),
      width === 390 ? 824 : 2880,
    );
  }
  for (const route of [
    "/courses/backend/level-0",
    "/courses/backend/level-5",
  ]) {
    await goto(route);
    await expect(page.locator(".course-detail")).toHaveCount(0);
  }
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.overflow, []);
  assert.deepEqual(report.accessibility, []);
  report.passed = true;
  console.log(
    `PASS: ${report.cases} responsive cases; 24 bilingual sessions; 7,200 EGP/48 hours; unchanged existing courses; shared templates; navigation; four WhatsApp handoffs; accessibility.`,
  );
} finally {
  await fs.writeFile(
    "artifacts/backend-program-report.json",
    JSON.stringify(report, null, 2),
  );
  await browser.close();
}
