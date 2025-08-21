import { Page } from "@playwright/test";
import BasePage from "../BasePage/basePage";
import { waitForResponseWithAction } from "../BasePage/networkUtil";
import { UserCredential, SharedUserData } from "../../core/sharedUserData";

export class SignInPage extends BasePage {
  //temple locator structure
  userName = this.browserPage.locator(`//*[@id='user-name']`);
  passWord = this.browserPage.locator(`//*[@id='password']`);
  btnLogin = this.browserPage.locator(`//*[@id='login-button']`);

  constructor(browserPage: Page) {
    super(browserPage);
  }

  async goTo(url: string = `https://www.saucedemo.com`) {
    await this.browserPage.goto(url);
  }

  async signInWith(account: UserCredential) {
    const acc = SharedUserData.accountMap.get(account);
    console.log("Account signed ==", acc);
    await this.loginSwagLabs(acc?.[0] ?? "", acc?.[1] ?? "");
  }

  async loginSwagLabs(userName: string, passWord: string) {
    await this.userName.fill(userName);
    await this.passWord.fill(passWord);
    await waitForResponseWithAction({
      requestUrlPathToMatch: "submit",
      uiAction: this.browserPage.locator(`//*[@id='login-button']`).click(),
      statusCode: 401,
    });
  }
}
