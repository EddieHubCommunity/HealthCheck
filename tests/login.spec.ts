import { test, expect } from "@playwright/test";
import { login, logout } from "./setup/auth";

test("Guest user cannot access add repo", async ({ browser }) => {
  // fixture: make sure user is logged out
  const page = await logout(browser);
  await page.goto("/account/repo/add");
  await expect(page).toHaveURL(/\//);
});

test("Logged in user can access add repo", async ({ browser }) => {
  // fixture: make sure user is logged in
  const page = await login(browser);
  await page.goto("/account/repo/add");
  await expect(page).toHaveURL(/account\/repo\/add/);
});
