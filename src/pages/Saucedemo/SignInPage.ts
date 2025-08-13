import { Page } from "@playwright/test";
import BasePage from "../BasePage/basePage";
import { waitForResponseWithAction } from "../BasePage/networkUtil";

export class SignInPage extends BasePage {
  userNameLocator = this.browserPage.locator(`//*[@id='user-name']`);
  passWordLocator = this.browserPage.locator(`//*[@id='password']`);

  constructor(browserPage: Page) {
    super(browserPage);
  }

  async goTo(url: string = `https://www.saucedemo.com`) {
    await this.browserPage.goto(url);
  }

  async loginSwagLabs(userName: string, passWord: string) {
    await this.userNameLocator.fill(userName);
    await this.passWordLocator.fill(passWord);

    await waitForResponseWithAction({
      requestUrlPathToMatch: "submit",
      uiAction: this.browserPage.locator(`//*[@id='login-button']`).click(),
      statusCode: 401,
    });
  }
}
