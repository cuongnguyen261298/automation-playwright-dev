import { Page } from "@playwright/test";
import BasePage from "../BasePage/basePage";

export class OverviewPage extends BasePage {
  btnFinish = this.browserPage.locator(`//*[@id='finish']`)

  constructor(browserPage: Page) {
    super(browserPage);
  }

  async goTo(url: string = `/`) {
    await this.browserPage.goto(url);
  }

  async clickFinish(){
    await this.btnFinish.click();
  }
}
