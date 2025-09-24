import { test } from "../../core/baseTest";
import { verifyElementExist } from "../../utils/assertUtils";

test.describe("Upload suite >", () => {
  // arrange
  test.beforeEach(async ({ practiceUploadPage }) => {
    await practiceUploadPage.goTo();
  });
  test.afterEach(async ({}) => {});
  test(`should upload file`, async ({ practiceUploadPage }) => {
    await practiceUploadPage.uploadSingleFile('vnnmzyvr7nqi1.csv');
    await verifyElementExist(
      practiceUploadPage.txtFileUploaded('vnnmzyvr7nqi1.csv')
    );
  });
});
