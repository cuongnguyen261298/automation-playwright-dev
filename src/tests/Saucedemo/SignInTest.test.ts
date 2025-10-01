import { test } from "../../core/baseTest";
import { verifyToHaveURL } from "../../utils/assertUtils";
import { UserCredential } from "../../core/sharedUserData";

// Apply data-driven testing for different user accounts
const users = [
  {
    name: "Standard User",
    account: UserCredential.STANDARD_USER,
    expectedUrl: "/inventory.html",
  },
  {
    name: "Problem User",
    account: UserCredential.PROBLEM_USER,
    expectedUrl: "/inventory.html",
  },
  {
    name: "Error User",
    account: UserCredential.ERROR_USER,
    expectedUrl: "/inventory.html",
  },
  {
    name: "Visual User",
    account: UserCredential.VISUAL_USER,
    expectedUrl: "/inventory.html",
  },
];

users.forEach(({ name, account, expectedUrl }) => {
  test.describe(`Login suite > user: ${name}`, () => {
    test.use({
      storageState: account,
    });

    test.beforeEach(async ({ inventoryPage }) => {
      await inventoryPage.goTo();
    });

    test(`should login successful ${name}`, async ({ page }) => {
      await verifyToHaveURL(page, expectedUrl);
    });
  });
});
