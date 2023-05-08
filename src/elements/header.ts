import { headerTestIdSelectors } from "calendar-test-ids";
import { Locator, Page } from "playwright";

export class Header {
  public readonly locator: Locator;

  constructor(page: Page) {
    this.locator = page.locator(headerTestIdSelectors.root);
  }

  public get todayButton(): Locator {
    return this.locator.locator(headerTestIdSelectors.todayButton);
  }

  public get arrowLeft(): Locator {
    return this.locator.locator(headerTestIdSelectors.arrowLeft);
  }

  public get arrowRight(): Locator {
    return this.locator.locator(headerTestIdSelectors.arrowRight);
  }

  public get date(): Locator {
    return this.locator.locator(headerTestIdSelectors.date);
  }
}
