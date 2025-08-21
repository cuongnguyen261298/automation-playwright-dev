import { Page } from "@playwright/test";
import BasePage from "../BasePage/basePage";

export class InventoryPage extends BasePage {
  userNameLocator = this.browserPage.locator(`//*[@id='user-name']`);
  passWordLocator = this.browserPage.locator(`//*[@id='password']`);
  cartBadgeLocator = this.browserPage.locator(
    `//*[@data-test='shopping-cart-badge']`
  );
  burgerMenuLocator = this.browserPage.locator(
    `//*[@id='react-burger-menu-btn']`
  );
  resetAppStateLocator = this.browserPage.locator(
    `//*[@id='reset_sidebar_link']`
  );
  shopCartLocator = this.browserPage.locator(
    `//*[@id='shopping_cart_container']`
  );

  constructor(browserPage: Page) {
    super(browserPage);
  }

  async goTo(url: string = `https://www.saucedemo.com/inventory.html`) {
    await this.browserPage.goto(url);
  }

  getBtnAddtoCartLocator = (productName: string) =>
    this.browserPage.locator(`//*[@id='add-to-cart-${productName}']`);

  async resetAppState() {
    await this.burgerMenuLocator.click();
    await this.resetAppStateLocator.click();
  }

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

  async gotoShopCart() {
    await this.shopCartLocator.click();
  }
}
