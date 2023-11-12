const { test, expect, chromium } = require("@playwright/test");
const user = require("../user");

test("test", async ({ page }) => {

  const browser = await chromium.launch({
    headless: false,
    slowMo: 500,
  });
  
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.locator('[placeholder="Email"]').click();
  await page.locator('[placeholder="Email"]').fill(user.emailValid);
  await page.locator('[placeholder="Пароль"]').click();
  await page.locator('[placeholder="Пароль"]').fill(user.passwordValid);
  await page.locator('[data-testid="login-submit-btn"]').click();
  await expect(page.locator("h2")).toContainText(["Моё обучение"]);
  await page.screenshot({ path: "screenshot.png" });
  browser.close();
});

test("unsuccessful authorization", async ({ page }) => {

  const browser = await chromium.launch({
    headless: false,
    slowMo: 500,
  });
     
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.locator('[placeholder="Email"]').click();
  await page.locator('[placeholder="Email"]').fill(user.emailInvalid);
  await page.locator('[placeholder="Пароль"]').click();
  await page.locator('[placeholder="Пароль"]').fill(user.passwordInvalid);
  await page.locator('[data-testid="login-submit-btn"]').click();
  await expect(page.locator("data-testid=login-error-hint")).toContainText(
    "Вы ввели неправильно логин или пароль"
  );
  await page.screenshot({ path: "screenshotError.png" });
  browser.close();
});
