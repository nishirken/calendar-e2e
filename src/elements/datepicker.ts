import { Locator, Page } from "playwright";
import { Element } from "./element";
import { testIdPropString } from "test-ids";
import { mkTestIdSelector } from "../helpers";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const dayFormat = (date: Date) =>
  `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

export class Datepicker extends Element {
  constructor(selector: string, parent: Page | Locator) {
    super(selector, parent);
  }

  public get monthYear(): Locator {
    return this.locator.locator(mkTestIdSelector("month-year"));
  }

  public get arrowLeft(): Locator {
    return this.locator.locator(mkTestIdSelector("arrow-left"));
  }

  public get arrowRight(): Locator {
    return this.locator.locator(mkTestIdSelector("arrow-right"));
  }

  public day(date: Date): Locator {
    return this.locator.locator(mkTestIdSelector(`day-${dayFormat(date)}`));
  }

  public async isDaySelected(date: Date): Promise<boolean> {
    const selected = await this.day(date).getAttribute("data-selected");
    return selected === "true";
  }
}
