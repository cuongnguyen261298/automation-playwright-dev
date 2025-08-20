import { test } from "../../core/baseTest";
import { UserCredential } from "../../core/sharedUserData";

test.describe("Add to cart suite>", () => {
  // arrange
  const productList = [
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
    "Sauce Labs Fleece Jacket",
    "Sauce Labs Bolt T-Shirt",
  ];

  const userListHaveTest = [
    UserCredential.STANDARD_USER,
    UserCredential.LOCKED_OUT_USER,
    UserCredential.PROBLEM_USER,
    UserCredential.ERROR_USER,
    UserCredential.VISUAL_USER,
  ];

  test.beforeEach(async ({ signInPage }) => {
    await signInPage.goTo();
    await signInPage.signInWith(userListHaveTest[0]);
  });

  test(`should add product list`, async ({ inventoryPage }) => {
    await inventoryPage.addtoCartWithProductName(productList);
  });
});
