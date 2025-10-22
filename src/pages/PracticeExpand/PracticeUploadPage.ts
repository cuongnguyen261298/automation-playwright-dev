import { Page } from "@playwright/test";
import BasePage from "../BasePage/basePage";
import path from "path";
import fs from "fs/promises";

export class PracticeUploadPage extends BasePage {
  fileInputLocator = this.browserPage.getByTestId("file-input");
  fileSubmitLocator = this.browserPage.getByTestId("file-submit");
  txtFileUploaded = (fileName: string) =>
    this.browserPage.locator(`//*[contains(text(), '${fileName}')]`);

  constructor(browserPage: Page) {
    super(browserPage);
  }

  async goTo(url: string = `https://practice.expandtesting.com/upload`) {
    await this.browserPage.goto(url);
  }

  async uploadSingleFile(fileName: string) {
    const filePath = path.join("src", "testData", fileName);
    await Promise.all([
      // this.browserPage.waitForEvent('filechooser'),
      this.fileInputLocator.setInputFiles(filePath),
    ]);
    await this.fileSubmitLocator.click();
  }

  async aggregateFiles(inputDir: string, outputFile: string, fileExtension = ".csv") {
    try {
        const files = await fs.readdir(inputDir);
        const csvFiles = files.filter(file => file.endsWith(fileExtension));
        if (csvFiles.length === 0) {
            console.log(`Không tìm thấy file ${fileExtension} nào trong ${inputDir}`);
            return;
        }

        const outputContent = [];
        let isFirstFile = true;

        for (const file of csvFiles) {
            const filePath = path.join(inputDir, file);
            const stats = await fs.stat(filePath);
            if (stats.isFile()) {
                const content = await fs.readFile(filePath, 'utf-8');
                if (isFirstFile) {
                    outputContent.push(`${content}`);
                    isFirstFile = false;
                } else {
                    outputContent.push(`${content}`);
                }
            }
        }

        await fs.writeFile(outputFile, outputContent.join(''), 'utf-8');
        console.log(`Tất cả file ${fileExtension} đã được gộp vào ${outputFile}`);
    } catch (error) {
        console.error(`Đã xảy ra lỗi: ${error}`);
    }
  }
}
