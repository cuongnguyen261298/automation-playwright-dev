import { test } from "../../core/baseTest";
import { UserCredential } from "../../core/sharedUserData";

const userListHaveTest = [
  UserCredential.STANDARD_USER,
  // UserCredential.LOCKED_OUT_USER,
  UserCredential.PROBLEM_USER,
  UserCredential.ERROR_USER,
  UserCredential.VISUAL_USER,
];

for (const user of userListHaveTest) {
  test.describe("Login suite - approach 1 >", () => {
    test.use({
      storageState: user,
    });
    // arrange
    test.beforeEach(async ({ inventoryPage }) => {
      await inventoryPage.goTo();
    });
    test.afterEach(async ({}) => {});
    test(`should login successful with storage ${user}`, async ({}) => {});
  });
}

[
  { account: UserCredential.STANDARD_USER },
  // { account: UserCredential.LOCKED_OUT_USER },
  { account: UserCredential.PROBLEM_USER },
  { account: UserCredential.ERROR_USER },
  { account: UserCredential.VISUAL_USER },
].forEach(({ account }) => {
  test.describe("Login suite - approach 2 >", () => {
    test.use({
      storageState: account,
    });

    test.beforeEach(async ({ inventoryPage }) => {
      await inventoryPage.goTo();
    });

    test.afterEach(async ({}) => {});
    test(`should login successful with storage ${account}`, async ({}) => {});
  });
});
