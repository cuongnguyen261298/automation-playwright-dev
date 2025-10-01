import { test } from "../../core/baseTest";
import { UserCredential } from "../../core/sharedUserData";
import { verifyElementExist } from "../../utils/assertUtils";
import { Information } from "../../constants/Saucedemo";

const users = [
  {
    name: "Standard User",
    account: UserCredential.STANDARD_USER,
    productAddToCart: [
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
      "Sauce Labs Fleece Jacket",
      "Sauce Labs Bolt T-Shirt",
    ],
  },
  {
    name: "Problem user",
    account: UserCredential.PROBLEM_USER,
    productAddToCart: ["Sauce Labs Backpack", "Sauce Labs Bike Light"],
  },
  {
    name: "Error user",
    account: UserCredential.ERROR_USER,
    productAddToCart: ["Sauce Labs Backpack"],
  },
  {
    name: "Visual user",
    account: UserCredential.VISUAL_USER,
    productAddToCart: [
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
      "Sauce Labs Bolt T-Shirt",
    ],
  },
];

users.forEach(({ name, account, productAddToCart }) => {
  test.describe(`Add to cart suite > user: ${name}`, () => {
    test.use({
      storageState: account,
    });
    // arrange
    test.beforeEach(async ({ inventoryPage }) => {
      await inventoryPage.goTo();
    });
    test.afterEach(async ({ inventoryPage }) => {
      await inventoryPage.resetAppState();
    });

    test(`should add product list via storage with ${name}`, async ({
      inventoryPage,
    }) => {
      await inventoryPage.addtoCartWithProductName(productAddToCart);
      await verifyElementExist(inventoryPage.cartBadgeLocator);
    });
  });
});

users.forEach(({ name, account, productAddToCart }) => {
  const shouldSkippedUsers = name === "Problem user" || name === "Error user";
  test.describe(`Order suite > user: ${name}`, () => {
    test.use({
      storageState: account,
    });
    // arrange
    test.beforeEach(async ({ inventoryPage }) => {
      await inventoryPage.goTo();
    });
    test.afterEach(async ({ completePage }) => {
      await completePage.clickBackHome();
    });

    test(`should order successful with ${name}`, async ({
      inventoryPage,
      cartPage,
      informationPage,
      completePage,
    }) => {
      test.skip(shouldSkippedUsers);
      await inventoryPage.addtoCartWithProductName(productAddToCart);
      await inventoryPage.gotoShopCart();
      await cartPage.clickCheckoutYourCart();
      await informationPage.checkOutYourInformation({
        firstName: Information.FIRST_NAME,
        lastName: Information.LAST_NAME,
        postalCode: Information.POSTAL_CODE,
      });
      // await overviewPage.clickFinish();
      await verifyElementExist(completePage.txtOrdered);
    });
  });
});

