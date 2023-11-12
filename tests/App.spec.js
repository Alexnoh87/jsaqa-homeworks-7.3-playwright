const { test, expect } = require("@playwright/test");
const user = require("../user");
const config = require('../playwright.config');

test("successful authorization", async ({ page }) => {
  
  //await page.goto("https://netology.ru/?modal=sign_in");
  await page.goto(config.url);
  await page.locator('[placeholder="Email"]').click();
  await page.locator('[placeholder="Email"]').fill(user.emailValid);
  await page.locator('[placeholder="Пароль"]').click();
  await page.locator('[placeholder="Пароль"]').fill(user.passwordValid);
  await page.locator('[data-testid="login-submit-btn"]').click();
  await expect(page.locator("h2")).toContainText(["Моё обучение"], {timeout: 30000});
  await page.screenshot({ path: "screenshot.png" });
});

test("unsuccessful authorization", async ({ page }) => {
     
  //await page.goto("https://netology.ru/?modal=sign_in");
  await page.goto(config.url);
  await page.locator('[placeholder="Email"]').click();
  await page.locator('[placeholder="Email"]').fill(user.emailInvalid);
  await page.locator('[placeholder="Пароль"]').click();
  await page.locator('[placeholder="Пароль"]').fill(user.passwordInvalid);
  await page.locator('[data-testid="login-submit-btn"]').click();
  await expect(page.locator("data-testid=login-error-hint")).toContainText(
    "Вы ввели неправильно логин или пароль"
  );
  await page.screenshot({ path: "screenshotError.png" });
});
