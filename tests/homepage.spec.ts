import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/HealthCheck/);
});

test("get flagsmith link", async ({ page }) => {
  await page.goto("/");

  // Click the get started link.
  // await page.getByRole("link", { name: "Visit their website" }).click();

  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Visit their website" }).click();
  const page1 = await page1Promise;
  await expect(page1).toHaveURL(/flagsmith.com/);
});
