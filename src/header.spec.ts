import test from "@playwright/test";
import {
  headerTestIdSelectors,
  sidebarTestIdSelectors,
} from "calendar-test-ids";
import { url } from "./const";
import { Datepicker } from "./elements/datepicker";
import { Header } from "./elements/header";
import { login, setBrowserDate } from "./helpers";
import { subWeeks, addWeeks } from "date-fns";

test.describe("Header actions", () => {
  let header: Header;
  let datepicker: Datepicker;
  const date = new Date("2023-05-18T00:00:00Z");

  test.beforeEach(async ({ page }) => {
    await login(page);
    await setBrowserDate(date, page);
    await page.goto(url("/week/2023/05/18"));
    await page.waitForSelector(headerTestIdSelectors.root);
    header = new Header(page);
    datepicker = new Datepicker(sidebarTestIdSelectors.datepicker, page);
  });

  test("Arrow left changes selected day in datepicker", async () => {
    await test.expect(datepicker.isDaySelected(date)).resolves.toBeTruthy();
    await header.arrowLeft.click();
    await test
      .expect(datepicker.isDaySelected(subWeeks(date, 1)))
      .resolves.toBeTruthy();
  });

  test("Arrow right changes selected day in datepicker", async () => {
    await test.expect(datepicker.isDaySelected(date)).resolves.toBeTruthy();
    await header.arrowRight.click();
    await test
      .expect(datepicker.isDaySelected(addWeeks(date, 1)))
      .resolves.toBeTruthy();
  });

  test("Today button changes selected day in datepicker", async ({ page }) => {
    await datepicker.day(subWeeks(date, 1)).click();
    await header.todayButton.click();
    await test.expect(datepicker.isDaySelected(date)).resolves.toBeTruthy();
  });

  test("Day click in datepicker changes date text in header", async () => {
    await datepicker.day(addWeeks(date, 1)).click();
    await test.expect(header.date.innerText()).resolves.toBe("May 21 - May 27");
  });
});
