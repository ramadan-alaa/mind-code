import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const origin = process.env.TEST_URL || "http://localhost:5173";
const results = [];
await page.goto(origin + "/courses");
await page.locator("h1").waitFor();
assert.equal(await page.locator(".course-card").count(), 4);
assert.equal(await page.locator(".upcoming-card").count(), 4);
await page.getByRole("textbox", { name: "Search courses" }).fill("React");
assert.equal(await page.locator(".course-card").count(), 1);
await page.getByRole("textbox", { name: "Search courses" }).fill("no-match");
assert.equal(await page.locator(".course-card").count(), 0);
await page.getByRole("button", { name: "Reset filters" }).click();
assert.equal(await page.locator(".course-card").count(), 4);
await page
  .getByLabel("Difficulty", { exact: true })
  .selectOption("intermediate");
assert.equal(await page.locator(".course-card").count(), 1);
await page.getByLabel("Difficulty", { exact: true }).selectOption("all");
await page.getByLabel("Availability", { exact: true }).selectOption("soon");
assert.equal(await page.locator(".course-card").count(), 0);
assert.equal(await page.locator(".upcoming-card").count(), 4);
results.push(
  "Catalog search, empty state, reset, difficulty and availability filters pass",
);
await page.goto(origin + "/courses/react");
await page.locator("h1").waitFor();
assert.equal(await page.locator(".level-list details").count(), 4);
await page.locator(".level-list details").nth(2).locator("summary").click();
assert(
  (await page.locator(".level-list details").nth(2).getAttribute("open")) !==
    null,
);
await page.getByRole("link", { name: "Ask about course" }).first().click();
await page.locator("#course").waitFor();
assert.equal(await page.locator("#course").inputValue(), "react");
results.push("Course levels expand and inquiry preselects course");
await page.getByRole("button", { name: "Review inquiry" }).click();
assert((await page.locator(".field-error").count()) >= 5);
await page.locator("#name").fill("Test learner");
await page.locator("#age").selectOption("12-17");
await page.locator("#experience").selectOption("none");
await page.locator("#method").selectOption("whatsapp");
await page.locator("#phone").fill("+201000000000");
await page.locator("input[type=checkbox]").check();
await page.getByRole("button", { name: "Review inquiry" }).click();
await page.waitForTimeout(50);
assert(await page.locator("#guardian-error").isVisible());
await page.locator("#guardian").fill("Test guardian");
await page.getByRole("button", { name: "Review inquiry" }).click();
await page.locator(".form-result").waitFor();
assert(
  await page
    .getByRole("button", { name: "WhatsApp not configured", exact: true })
    .isDisabled(),
);
assert.equal(await page.locator('a[href*="wa.me"]').count(), 0);
results.push(
  "Required validation, minor guardian requirement, consent and disabled unconfigured handoff pass",
);
await page.locator("#name").fill("");
await page.getByRole("button", { name: "Review inquiry" }).click();
await page.locator("#name-error").waitFor();
await page.locator(".language-button").click();
await page.waitForFunction(() =>
  document.querySelector("#name-error")?.textContent?.includes("اكتب"),
);
assert.equal(await page.locator("html").getAttribute("dir"), "rtl");
assert.equal(await page.locator("html").getAttribute("lang"), "ar");
assert((await page.title()).includes("التواصل"));
await page.reload();
await page.locator("h1").waitFor();
assert.equal(await page.locator("html").getAttribute("lang"), "ar");
const oldTheme = await page.locator("html").getAttribute("data-theme");
await page.locator(".header-actions .icon-button").first().click();
const newTheme = await page.locator("html").getAttribute("data-theme");
assert.notEqual(oldTheme, newTheme);
await page.reload();
await page.locator("h1").waitFor();
assert.equal(await page.locator("html").getAttribute("data-theme"), newTheme);
results.push("Arabic RTL, localized SEO and persistent language/theme pass");
await page.setViewportSize({ width: 375, height: 812 });
await page.getByRole("button", { name: "فتح أو إغلاق القائمة" }).click();
assert(await page.locator("#mobile-nav").isVisible());
await page.keyboard.press("Escape");
assert.equal(await page.locator("#mobile-nav").count(), 0);
await page.getByRole("button", { name: "فتح أو إغلاق القائمة" }).click();
await page.locator("#mobile-nav a").nth(1).click();
assert.equal(new URL(page.url()).pathname, "/courses");
assert.equal(await page.locator("#mobile-nav").count(), 0);
results.push("Mobile menu navigation and Escape close pass");
await page.goto(origin + "/");
await page.locator("h1").waitFor();
const summary = page.locator(".accordion summary").first();
await summary.focus();
await page.keyboard.press("Enter");
assert(
  (await page.locator(".accordion details").first().getAttribute("open")) !==
    null,
);
results.push("FAQ keyboard expansion passes");
// Test an explicitly simulated configuration without writing a real business number to source.
await page.route("**/src/config/academy.ts", async (route) => {
  const response = await route.fetch();
  const body = (await response.text()).replace(
    'whatsapp: ""',
    'whatsapp: "201000000000"',
  );
  await route.fulfill({ response, body });
});
await page.goto(origin + "/contact?course=html");
await page.locator("#name").waitFor();
if ((await page.locator("html").getAttribute("lang")) === "ar")
  await page.locator(".language-button").click();
await page.locator("#name").fill("Test learner");
await page.locator("#age").selectOption("18-24");
await page.locator("#experience").selectOption("none");
await page.locator("#method").selectOption("whatsapp");
await page.locator("#phone").fill("+201000000000");
await page.locator("input[type=checkbox]").check();
await page.getByRole("button", { name: "Review inquiry" }).click();
const handoff = page.getByRole("link", { name: "Continue to WhatsApp" });
await handoff.waitFor();
const url = new URL(await handoff.getAttribute("href"));
assert.equal(url.hostname, "wa.me");
assert.equal(url.pathname, "/201000000000");
assert(url.searchParams.get("text").includes("Test learner"));
assert(url.searchParams.get("text").includes("HTML"));
results.push(
  "Simulated configured WhatsApp generates correctly encoded inquiry; no message sent",
);
console.log(results.join("\n"));
await browser.close();
