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

  test.skip(`should aggregate csv files`, async ({ practiceUploadPage }) => {
    const inputDirectory = "src/testData/deDE";
    const outputFile = "src/testData/deDE/aggregated.csv";
    await practiceUploadPage.aggregateFiles(
      inputDirectory,
      outputFile,
      ".csv"
    );
  });
