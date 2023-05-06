import {
  signinFormTestIdSelectors,
  signupFormTestIdSelectors,
  weekTestIdSelectors,
} from "calendar-test-ids";
import chance from "chance";
import { test } from "@playwright/test";
import { url } from "./const";
import { signup } from "./api";

test.describe("Sign up", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url("/auth/signup"));
    await page.waitForSelector(signupFormTestIdSelectors.root);
  });

  test("Creates new account and log in", async ({ page }) => {
    const emailInput = await page
      .locator(signupFormTestIdSelectors.emailInput)
      .locator("input");
    const passwordInput = await page
      .locator(signupFormTestIdSelectors.passwordInput)
      .locator("input");
    const email = new chance().email({ length: 10 });
    const password = "PPaa@12345";

    await emailInput.fill(email);
    await passwordInput.fill(password);
    await page.locator(signupFormTestIdSelectors.submitButton).click();

    await test
      .expect(page.locator(weekTestIdSelectors.root).waitFor())
      .resolves.not.toBeNull();
  });

  test("Transits to sign in", async ({ page }) => {
    await page.locator(signupFormTestIdSelectors.link).click();
    await test
      .expect(page.locator(signinFormTestIdSelectors.root).waitFor())
      .resolves.not.toBeNull();
  });

  test("Shows error if email invalid", async ({ page }) => {
    const emailInput = await page
      .locator(signupFormTestIdSelectors.emailInput)
      .locator("input");
    const passwordInput = await page
      .locator(signupFormTestIdSelectors.passwordInput)
      .locator("input");

    await emailInput.fill("mm");
    await passwordInput.fill("2");
    await page.locator(signupFormTestIdSelectors.submitButton).click();
    await test
      .expect(page.locator(signupFormTestIdSelectors.emailError).waitFor())
      .resolves.not.toBeNull();
  });

  test("Shows error if password is empty", async ({ page }) => {
    const emailInput = await page
      .locator(signupFormTestIdSelectors.emailInput)
      .locator("input");

    await emailInput.fill(new chance().email({ length: 10 }));

    await page.locator(signupFormTestIdSelectors.submitButton).click();
    await test
      .expect(page.locator(signupFormTestIdSelectors.passwordError).waitFor())
      .resolves.not.toBeNull();
  });
});

test.describe("Sign in", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url("/auth/signin"));
    await page.waitForSelector(signinFormTestIdSelectors.root);
  });

  test("Signs in", async ({ page }) => {
    const email = new chance().email({ length: 10 });
    const password = "PPaa@12345";

    await signup(email, password);

    const emailInput = page
      .locator(signinFormTestIdSelectors.emailInput)
      .locator("input");

    const passwordInput = page
      .locator(signinFormTestIdSelectors.passwordInput)
      .locator("input");
    
    await emailInput.type(email);
    await passwordInput.type(password);
    await page.locator(signinFormTestIdSelectors.submitButton).click();

    const weekEl = await page.locator(weekTestIdSelectors.root).elementHandle();

    test.expect(weekEl).not.toBeNull();
  });

  test("Shows errors if fields are empty", async ({ page }) => {
    await page.locator(signinFormTestIdSelectors.submitButton).click();
    await test
      .expect(page.locator(signinFormTestIdSelectors.emailError).waitFor())
      .resolves.not.toBeNull();
    await test
      .expect(page.locator(signinFormTestIdSelectors.passwordError).waitFor())
      .resolves.not.toBeNull();
  });
});
