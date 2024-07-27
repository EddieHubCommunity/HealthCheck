import { test, expect } from "@playwright/test";
import { login, logout } from "./setup/auth";

test("Guest user cannot access add repo", async ({ browser }) => {
  // fixture: make sure user is logged out
  const context = await logout(browser);
  const page = await context.newPage();
  await page.goto("/account/repo/add");
  await expect(page).toHaveURL(/\//);
});

test("Logged in user can access add repo", async ({ browser }) => {
  // fixture: make sure user is logged in
  const context = await login(browser);
  const page = await context.newPage();
  await page.goto("/account/repo/add");
  await expect(page).toHaveURL(/account\/repo\/add/);
});