import { test as baseTest } from "@playwright/test";
import { SignInPage } from "../pages/Saucedemo/SignInPage";
import { InventoryPage } from "../pages/Saucedemo/InventoryPage";
import { CartPage } from "../pages/Saucedemo/CartPage";
import { InformationPage } from "../pages/Saucedemo/InformationPage";
import { OverviewPage } from "../pages/Saucedemo/OverviewPage";
import { CompletePage } from "../pages/Saucedemo/CompletePage";
import { OnlineCalculatorPage } from "../pages/GUI-Automation/OnlineCalculatorPage";
import { UserCredential } from "../core/sharedUserData";
import {PracticeUploadPage} from "../pages/PracticeExpand/PracticeUploadPage"

type pages = {
  account: UserCredential;
  signInPage: SignInPage;
  onlineCalculatorPage: OnlineCalculatorPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  informationPage: InformationPage;
  overviewPage: OverviewPage;
  completePage: CompletePage;
  practiceUploadPage: PracticeUploadPage;
};

export const test = baseTest.extend<pages>({
  // init new instances
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  informationPage: async ({ page }, use) => {
    await use(new InformationPage(page));
  },

  overviewPage: async ({ page }, use) => {
    await use(new OverviewPage(page));
  },

  completePage: async ({ page }, use) => {
    await use(new CompletePage(page));
  },

  onlineCalculatorPage: async ({ page }, use) => {
    await use(new OnlineCalculatorPage(page));
  },

  practiceUploadPage: async({page}, use)=>{
    await use(new PracticeUploadPage(page));
  },
  
  // ensure page is closed after each test
  page: async ({ page }, use) => {
    await use(page);
    await page.close();
  },
});

export { expect } from "@playwright/test";
