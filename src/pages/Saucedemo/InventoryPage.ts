import { Locator, Page } from "@playwright/test";
import BasePage from "../BasePage/basePage";
import { verifyElementExist } from "../../utils/assertUtils";

interface ProductTest {
  name: string;
  pricing?: string;
  statusInCart?: boolean; //hard coding to distinguish status 'add to cart'||'remove'
}

export class InventoryPage extends BasePage {
  userNameLocator = this.browserPage.locator(`//*[@id='user-name']`);
  passWordLocator = this.browserPage.locator(`//*[@id='password']`);

  constructor(browserPage: Page) {
    super(browserPage);
  }

  async goTo(url: string = `https://www.saucedemo.com/inventory.html`) {
    await this.browserPage.goto(url);
  }
  getBtnAddtoCartLocator = (productName: string) =>
    this.browserPage.locator(`//*[@id='add-to-cart-${productName}']`);

  async addtoCartWithProductName(productNames: string | string[]) {
    const productArr = Array.isArray(productNames)
      ? productNames
      : [productNames];
    const productNameMapWithLocator = new Map<string, string>([
      ["Sauce Labs Backpack", "sauce-labs-backpack"],
      ["Sauce Labs Bike Light", "sauce-labs-bike-light"],
      ["Sauce Labs Bolt T-Shirt", "sauce-labs-bolt-t-shirt"],
      ["Sauce Labs Fleece Jacket", "sauce-labs-fleece-jacket"],
      ["Sauce Labs Onesie", "sauce-labs-onesie"],
      [
        "Test.allTheThings() T-Shirt (Red)",
        "test.allthethings()-t-shirt-(red)",
      ],
    ]);

    for (const key of productArr) {
      if (productNameMapWithLocator.has(key)) {
        const mappedName = productNameMapWithLocator.get(key)!;
        await this.getBtnAddtoCartLocator(mappedName).click();
      }
    }
  }
}
