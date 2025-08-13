import { test } from "../../core/baseTest";

test.describe("Login suite", () => {
  // arrange
  test.beforeEach(async ({ signInPage }) => {
    await signInPage.goTo();
  });

  test(`should login successful with "${process.env.STANDART_USER}"`, async ({
    signInPage,
  }) => {
    await signInPage.loginSwagLabs(
      `${process.env.STANDART_USER}`,
      `${process.env.PASSWORD_FOR_ALL}`,
    );
    //assert: should verify rely on permission of user
  });
});
