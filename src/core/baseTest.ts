import { test as baseTest } from "@playwright/test";
import { SignInPage } from "../pages/Saucedemo/SignInPage";
import { InventoryPage } from "../pages/Saucedemo/InventoryPage";
import { OnlineCalculatorPage } from "../pages/GUI-Automation/OnlineCalculatorPage";

type pages = {
  //   account: UserCredential;
  signInPage: SignInPage;
  onlineCalculatorPage: OnlineCalculatorPage;
  inventoryPage: InventoryPage;
};

export const test = baseTest.extend<pages>({
  // init new instances
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  onlineCalculatorPage: async ({ page }, use) => {
    await use(new OnlineCalculatorPage(page));
  },
  // ensure page is closed after each test
  page: async ({ page }, use) => {
    await use(page);
    await page.close();
  },
});

export { expect } from "@playwright/test";
