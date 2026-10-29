import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    (process.platform === "win32"
      ? "C:/Program Files/Google/Chrome/Application/chrome.exe"
      : "/usr/bin/google-chrome"),
  headless: true,
  args: ["--no-sandbox"],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const origin = process.env.TEST_URL || "http://localhost:5173";
await fs.mkdir("artifacts", { recursive: true });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.addInitScript(() => {
  localStorage.setItem("mindcode-theme", "dark");
  localStorage.setItem("mindcode-language", "en");
});
await page.goto(origin);
await page.locator("h1").waitFor();
await page.evaluate(() => document.fonts.ready);
await page.screenshot({
  path: "artifacts/home-dark-desktop.png",
  fullPage: true,
});
const overflow = [];
const routes = [
  "/",
  "/courses",
  "/courses/html",
  "/courses/css",
  "/courses/javascript",
  "/courses/react",
  "/courses/git-github",
  "/courses/tailwind-css",
  "/courses/typescript",
  "/courses/nextjs",
  "/about",
  "/contact",
  "/missing",
];
if (process.argv.includes("--accessibility-only")) {
  const previous = JSON.parse(
    await fs.readFile("artifacts/responsive-report.json", "utf8"),
  );
  errors.push(...previous.errors);
  overflow.push(...previous.overflow);
} else {
  for (const lang of ["en", "ar"]) {
    for (const theme of ["dark", "light"]) {
      for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
        await page.setViewportSize({ width, height: 1000 });
        for (const route of routes) {
          await page.goto(origin + route, {
            waitUntil: "domcontentloaded",
          });
          await page.locator("h1").waitFor();
          await page.evaluate(
            ({ lang, theme }) => {
              document.documentElement.dataset.theme = theme;
              localStorage.setItem("mindcode-language", lang);
            },
            { lang, theme },
          );
          if ((await page.locator("html").getAttribute("lang")) !== lang) {
            await page.locator(".language-button").click();
          }
          await page.waitForTimeout(30);
          const over = await page.evaluate(() => {
            const w = document.documentElement.clientWidth;
            return [...document.querySelectorAll("body *")]
              .filter((el) => {
                const r = el.getBoundingClientRect();
                return (
                  r.width > 0 &&
                  (r.right > w + 1 || r.left < -1) &&
                  getComputedStyle(el).position !== "fixed"
                );
              })
              .map((el) => ({
                tag: el.tagName,
                cls: el.className,
                x: Math.round(el.getBoundingClientRect().left),
                w: Math.round(el.getBoundingClientRect().width),
              }))
              .slice(0, 8);
          });
          if (
            await page.evaluate(
              () =>
                document.documentElement.scrollWidth >
                document.documentElement.clientWidth + 1,
            )
          )
            overflow.push({ lang, theme, width, route, elements: over });
        }
      }
    }
  }
}
await page.setViewportSize({ width: 1440, height: 1000 });
await fs.writeFile(
  "artifacts/responsive-report.json",
  JSON.stringify({ errors, overflow }, null, 2),
);
console.log("Responsive matrix complete", JSON.stringify({ errors, overflow }));
const accessibility = [];
for (const lang of ["en", "ar"]) {
  for (const theme of ["dark", "light"]) {
    for (const route of [
      "/",
      "/courses",
      "/courses/react",
      "/about",
      "/contact",
    ]) {
      await page.goto(origin + route, {
        waitUntil: "domcontentloaded",
      });
      await page.locator("h1").waitFor();
      if ((await page.locator("html").getAttribute("lang")) !== lang)
        await page.locator(".language-button").click();
      await page.evaluate(
        (theme) => (document.documentElement.dataset.theme = theme),
        theme,
      );
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 25));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(500);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      if (result.violations.length)
        accessibility.push({
          lang,
          theme,
          route,
          violations: result.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes
              .map((n) => ({ target: n.target, summary: n.failureSummary }))
              .slice(0, 10),
          })),
        });
    }
  }
}
await page.goto(origin);
await page.locator("h1").waitFor();
await page.setViewportSize({ width: 375, height: 812 });
await page.screenshot({ path: "artifacts/home-mobile.png", fullPage: true });
await page.locator(".language-button").click();
await page.locator(".icon-button").first().click();
await page.screenshot({
  path: "artifacts/home-arabic-light.png",
  fullPage: true,
});
await fs.writeFile(
  "artifacts/browser-report.json",
  JSON.stringify({ errors, overflow, accessibility }, null, 2),
);
console.log(JSON.stringify({ errors, overflow, accessibility }, null, 2));
await browser.close();
if (errors.length || overflow.length || accessibility.length)
  process.exitCode = 1;
