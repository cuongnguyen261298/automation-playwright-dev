import { Page } from "@playwright/test";
import BasePage from "../BasePage/basePage";

interface ProductTest {
  name: string;
  pricing?: string;
  statusInCart?: boolean; //hard coding to distinguish status 'add to cart'||'remove'
}

export class CartPage extends BasePage {
  btnCheckOut = this.browserPage.locator(`//*[@id='checkout']`);

  constructor(browserPage: Page) {
    super(browserPage);
  }

  async goTo(url: string = `https://www.saucedemo.com/cart.html`) {
    await this.browserPage.goto(url);
  }

  async clickCheckoutYourCart(){
    await this.btnCheckOut.click();
  }

}
