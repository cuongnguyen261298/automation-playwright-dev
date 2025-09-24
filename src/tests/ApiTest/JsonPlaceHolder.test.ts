import { test } from "../../core/baseTest";

test.describe("Users suite>", () => {
  // arrange
  test.beforeEach(async ({ }) => {
  });

  test(`should run a simple "post user"`, async ({jsonPlaceHolder}) => {
    await jsonPlaceHolder.createUsers(10);
  });
});

