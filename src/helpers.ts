import {
  signinFormTestIdSelectors,
  weekTestIdSelectors,
} from "calendar-test-ids";
import { Page } from "playwright";
import { testIdPropString } from "test-ids";
import { AuthCreds, signup } from "./api";
import { url } from "./const";
import { Input } from "./elements/input";

export const setBrowserDate = async (date: Date, page: Page): Promise<void> => {
  await page.addInitScript(`{
        const __DateNowOffset = ${date.getTime()} - Date.now();
        const __DateNow = Date.now;
        Date = class extends Date {
        constructor(...args) {
            if (args.length === 0) {
                super(__DateNow() + __DateNowOffset);
            } else {
                super(...args);
            }
        }
        }
        Date.now = () => __DateNow() + __DateNowOffset;
    }`);
};

export const login = async (
  page: Page,
  authCreds?: AuthCreds
): Promise<AuthCreds> => {
  if (!authCreds) {
    authCreds = await signup();
  }
  await page.goto(url("/auth/signin"));
  await new Input(signinFormTestIdSelectors.emailInput, page).fill(
    authCreds.email
  );
  await new Input(signinFormTestIdSelectors.passwordInput, page).fill(
    authCreds.password
  );
  await page.locator(signinFormTestIdSelectors.submitButton).click();
  await page.locator(weekTestIdSelectors.root).waitFor();
  return authCreds;
};

export const mkTestIdSelector = (testId: string) =>
  `[data-test-id="${testId}"]`;
