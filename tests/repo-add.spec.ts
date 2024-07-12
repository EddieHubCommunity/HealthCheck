import { test, expect } from "@playwright/test";

test("test url required", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Add" }).click();
  await page.getByLabel("url").click();
  await page.getByLabel("url").fill("abcdefg");
  await page.getByRole("button", { name: "SAVE" }).click();
  await expect(page.locator("#url-error")).toContainText("Invalid url");
});

test("test valid url navigates to the report page", async ({ page }) => {
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
