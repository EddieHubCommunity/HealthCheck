import { test, expect } from "@playwright/test";

// marking tests as skipped as need to be logged into to access this page
// mocking login with playwright will be added soon

test.skip("test url required", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Add" }).click();
  await page.getByLabel("url").click();
  await page.getByLabel("url").fill("abcdefg");
  await page.getByRole("button", { name: "SAVE" }).click();
  await expect(page.locator("#url-error")).toContainText("Invalid url");
});

test.skip("test valid url navigates to the report page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Add" }).click();
  await page.getByLabel("url").click();
  await page
    .getByLabel("url")
    .fill("https://github.com/EddieHubCommunity/HealthCheck");
  await page.getByRole("button", { name: "SAVE" }).click();
  await expect(page.getByRole("main")).toContainText(
    "EddieHubCommunity/BioDrop"
  );
});
