import { test } from "../../core/baseTest";

test.describe("Login suite", () => {
  // arrange
  const productList = [
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
    "Sauce Labs Fleece Jacket",
    "Sauce Labs Bolt T-Shirt",
  ];

  test.beforeEach(async ({ signInPage }) => {
    await signInPage.goTo();
    await signInPage.loginSwagLabs(
      `${process.env.STANDART_USER}`,
      `${process.env.PASSWORD_FOR_ALL}`,
    );
  });

  test(`should add product list`, async ({ inventoryPage }) => {
    await inventoryPage.addtoCartWithProductName(productList);
  });
});
