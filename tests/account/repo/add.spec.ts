import { test, expect } from "@playwright/test";

import { login, logout } from "../../setup/auth";

test("Guest user cannot access add repo", async ({ browser }) => {
  const page = await logout(browser);
  await page.goto("/account/repo/add");
  await expect(page).toHaveURL(/\//);
});

test("Logged in user can access add repo", async ({ browser }) => {
  const page = await login(browser);
  await page.goto("/account/repo/add");
  await expect(page).toHaveURL(/account\/repo\/add/);
});

test("Logged in user can see add user nav button", async ({ browser }) => {
  const page = await login(browser);
  await page.goto("/");
  await page.getByRole("link", { name: "Add" }).click();
  await expect(page).toHaveURL(/account\/repo\/add/);
});

test("test url required", async ({ browser }) => {
  const page = await login(browser);
  await page.goto("/account/repo/add");
  await page.getByLabel("url").fill("abcdefg");
  await page.getByRole("button", { name: "SAVE" }).click();
  await expect(page.locator("#url-error")).toContainText("Invalid url");
});

test("test valid url navigates to the check list page", async ({ browser }) => {
  const page = await login(browser);
  await page.goto("/account/repo/add");

  await page
    .getByLabel("url")
    .fill("https://github.com/EddieHubCommunity/HealthCheck");
  await page.getByRole("button", { name: "SAVE" }).click();
  await expect(page).toHaveURL(/account\/repo\/list/);
  await expect(page.getByRole("main")).toContainText(
    "EddieHubCommunity / HealthCheck",
  );
});
