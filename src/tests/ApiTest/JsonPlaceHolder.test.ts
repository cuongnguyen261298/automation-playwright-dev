import { test } from "../../core/baseTest";

test.describe("API test suite >", () => {
  // arrange
  test.beforeEach(async ({ }) => {
  });

  test(`should create simple user`, async ({jsonPlaceHolder}) => {
    await jsonPlaceHolder.createUsers(10);
  });
    test(`should create simple todo`, async ({jsonPlaceHolder}) => {
    await jsonPlaceHolder.createTodos(20);
  });
});
