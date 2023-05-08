import { Locator } from "playwright";
import { Element } from "./element";

export class Input extends Element {
  private get input(): Locator {
    return this.locator.locator("input");
  }

  async fill(value: string): Promise<void> {
    await this.input.fill(value);
  }
}
