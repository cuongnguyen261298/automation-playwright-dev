import { Page } from "@playwright/test";
import BasePage from "../BasePage/basePage";

export class CompletePage extends BasePage {
  btnBackHome = this.browserPage.locator(`//*[@id='back-to-products']`);
  txtOrdered = this.browserPage.getByText('Thank you for your order!');

  constructor(browserPage: Page) {
    super(browserPage);
  }

  async goTo(url: string = `/`) {
    await this.browserPage.goto(url);
  }

  async clickBackHome(){
    await this.btnBackHome.click();
  }
}
