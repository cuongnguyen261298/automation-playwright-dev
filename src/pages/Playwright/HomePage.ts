import { Page, Locator } from "@playwright/test";
import BasePage from "../BasePage/basePage";
import { waitForResponseWithAction } from "../BasePage/networkUtil";

export class HomePage extends BasePage {
  constructor(rootPage: Page) {
    super(rootPage);
  }
  async goTo(url = "https://playwright.dev") {
    await this.browserPage.goto(url);
  }
}
