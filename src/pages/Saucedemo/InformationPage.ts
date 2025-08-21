import { Page } from "@playwright/test";
import BasePage from "../BasePage/basePage";

interface Information {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export class InformationPage extends BasePage {
  firstNameLocator = this.browserPage.locator(`//*[@id='first-name']`);
  lastNameLocator = this.browserPage.locator(`//*[@id='last-name']`);
  postalCodeLocator = this.browserPage.locator(`//*[@id='postal-code']`);
  btnContinue = this.browserPage.locator(`//*[@id='continue']`);

  constructor(browserPage: Page) {
    super(browserPage);
  }

  async goTo(url: string = `/`) {
    await this.browserPage.goto(url);
  }

  async checkOutYourInformation(info: Information) {
    // Hard-coding
    // const { firstName, lastName, postalCode }: Information = {
    //   firstName: 'default',
    //   lastName: 'default',
    //   postalCode: '70000',
    // };

    const { firstName, lastName, postalCode } = info;
    await this.firstNameLocator.fill(firstName);
    //hard-coding
    await this.browserPage.waitForTimeout(1000);
    await this.lastNameLocator.fill(lastName);
    //hard-coding
    await this.browserPage.waitForTimeout(1000);
    await this.postalCodeLocator.fill(postalCode);
    //hard-coding
    await this.browserPage.waitForTimeout(1000);
    await this.btnContinue.click();
  }
}
