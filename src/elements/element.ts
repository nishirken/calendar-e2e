import { Locator, Page } from "playwright";

export abstract class Element {
  public readonly locator: Locator;

  constructor(selector: string, parent: Page | Locator) {
    this.locator = parent.locator(selector);
  }
}
