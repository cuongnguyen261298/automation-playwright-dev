import { Page, Locator } from "@playwright/test";
import BasePage from "../BasePage/basePage";
import {waitForResponseWithAction} from "../BasePage/networkUtil";

export class SignInPage extends BasePage {

    constructor(rootPage: Page) {
    super(rootPage);
  }

  async goTo(url = 'https://integration.gridly.com/signin') {
    await this.browserPage.goto(url);
  }

  async clickForgotPassword() {
    await waitForResponseWithAction({
      requestUrlPathToMatch: '',
      uiAction: this.browserPage.getByText('Forgot your password?').click(),
      statusCode: 200,
      requestMethod: '',
    });
  }
}