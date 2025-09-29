import { test } from "../../core/baseTest";
import { UserCredential } from "../../core/sharedUserData";
import { verifyElementExist } from "../../utils/assertUtils";
import { Information } from "../../constants/Saucedemo";
import {getUserNameFromFileStorage} from "../../utils/splitUtils";

// arrange
const productList = [
  "Sauce Labs Backpack",
  "Sauce Labs Bike Light",
  "Sauce Labs Fleece Jacket",
  "Sauce Labs Bolt T-Shirt",
];

for (const user of [
  UserCredential.STANDARD_USER,
  UserCredential.PROBLEM_USER,
  UserCredential.ERROR_USER,
  UserCredential.VISUAL_USER,
]) {
  test.describe("Add to cart suite >", () => {
    test.use({
      storageState: user,
    });
    // arrange
    test.beforeEach(async ({ inventoryPage }) => {
      await inventoryPage.goTo();
    });
    test.afterEach(async ({ inventoryPage }) => {
      await inventoryPage.resetAppState();
    });

    test(`should add product list via storage with ${getUserNameFromFileStorage(user)}`, async ({
      inventoryPage,
    }) => {
      await inventoryPage.addtoCartWithProductName(productList);
      await verifyElementExist(inventoryPage.cartBadgeLocator);
    });
  });
}

for (const user of [UserCredential.STANDARD_USER, UserCredential.VISUAL_USER]) {
  test.describe("Order suite >", () => {
    test.use({
      storageState: user,
    });
    // arrange
    test.beforeEach(async ({ inventoryPage }) => {
      await inventoryPage.goTo();
    });
    test.afterEach(async ({ completePage }) => {
      await completePage.clickBackHome();
    });

    test(`should order successful via storage with ${getUserNameFromFileStorage(user)}`, async ({
      inventoryPage,
      cartPage,
      informationPage,
      overviewPage,
      completePage,
    }) => {
      await inventoryPage.addtoCartWithProductName(productList);
      await inventoryPage.gotoShopCart();
      await cartPage.clickCheckoutYourCart();
      await informationPage.checkOutYourInformation({
        firstName: Information.FIRST_NAME,
        lastName: Information.LAST_NAME,
        postalCode: Information.POSTAL_CODE,
      });
      await overviewPage.clickFinish();
      await verifyElementExist('test everything');
    });
  });
}
