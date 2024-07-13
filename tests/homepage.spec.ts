import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/HealthCheck/);
});

test("has text coming from Flagsmith", async ({ page }) => {
  await page.goto("/");
  const locator = page.locator("h2");
  await expect(locator).toHaveText("How friendly is your Open Source Repo?");
});

test("has text", async ({ page }) => {
  await page.goto("/");
  const locator = page.locator("h3");
  await expect(locator).toHaveText(/RED, AMBER or GREEN/);
});

test("click flagsmith link", async ({ page }) => {
  await page.goto("/");

  const page2Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Visit their website" }).click();
  const page2 = await page2Promise;
  await expect(page2).toHaveURL(/flagsmith.com/);
});
