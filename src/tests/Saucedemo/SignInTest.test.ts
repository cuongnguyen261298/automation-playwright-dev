import { test } from "../../core/baseTest";
import { UserCredential } from "../../core/sharedUserData";

const userListHaveTest = [
  UserCredential.STANDARD_USER,
  UserCredential.LOCKED_OUT_USER,
  UserCredential.PROBLEM_USER,
  UserCredential.ERROR_USER,
  UserCredential.VISUAL_USER,
];
for (const user of userListHaveTest) {
  test.describe("Login suite >", () => {
    test.use({
      storageState: user,
    });
    // arrange
    test.beforeEach(async ({ signInPage }) => {
      await signInPage.goTo();
      await signInPage.signInWith(user);
    });
    test.afterEach(async ({}) => {});

    test(`should login successful with ${user}`, async ({ signInPage }) => {
    });
  });
}
