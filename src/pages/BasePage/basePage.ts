import { Page, Locator } from "@playwright/test";
import { setPage } from "./pageUtil";

export default abstract class BasePage {
  readonly browserPage: Page;

  constructor(browserPage: Page) {
    this.browserPage = browserPage;
    setPage(browserPage);
  }

  async goTo(url: string) {
    await this.browserPage.goto(url);
  }

  locator(selector: string): Locator {
    return this.browserPage.locator(selector);
  }
}
