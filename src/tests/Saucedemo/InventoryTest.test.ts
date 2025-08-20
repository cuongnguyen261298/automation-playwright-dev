import { test } from "../../core/baseTest";
import { UserCredential } from "../../core/sharedUserData";

// arrange
const productList = [
  "Sauce Labs Backpack",
  "Sauce Labs Bike Light",
  "Sauce Labs Fleece Jacket",
  "Sauce Labs Bolt T-Shirt",
];

const userListHaveTest = [
  UserCredential.STANDARD_USER,
  // UserCredential.LOCKED_OUT_USER,
  UserCredential.PROBLEM_USER,
  UserCredential.ERROR_USER,
  UserCredential.VISUAL_USER,
];

for (const user of userListHaveTest) {
  test.describe("Add to cart suite >", () => {
    test.use({
      storageState: user,
    });
    // arrange
    test.beforeEach(async ({ inventoryPage }) => {
      await inventoryPage.goTo();
    });
    test.afterEach(async ({}) => {});

    test(`should add product list with storage ${user}`, async ({
      inventoryPage,
    }) => {
      await inventoryPage.addtoCartWithProductName(productList);
    });
  });
}
