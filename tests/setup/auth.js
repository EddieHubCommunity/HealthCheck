import { expect } from "@playwright/test";

const login = async (page) => {
  // check if already logged in
  const isLoggedIn = await page
    .getByRole("button", { name: "Sign out" })
    .isVisible();
  if (isLoggedIn) {
    return page;
  }

  // go to login url
  const url =
    "http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F";
  await page.goto(url);
  await expect(page).toHaveURL(/\/api\/auth\/signin/);

  // click login
  await page.getByRole("button", { name: "Sign in with GitHub" }).click();
  await expect(page).toHaveURL("/");

  return page;
};

const logout = async (page) => {
  // visit sign out page
  await page.goto("/api/auth/signout");

  // click sign out
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL("/");

  return page;
};

export { login, logout };
