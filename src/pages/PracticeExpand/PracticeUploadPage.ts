import { Page } from "@playwright/test";
import BasePage from "../BasePage/basePage";
import path from "path";


export class PracticeUploadPage extends BasePage {
  fileInputLocator = this.browserPage.getByTestId('file-input');
  fileSubmitLocator = this.browserPage.getByTestId('file-submit');
  txtFileUploaded = (fileName: string) => this.browserPage.locator(`//*[contains(text(), '${fileName}')]`)

  constructor(browserPage: Page) {
    super(browserPage);
  }

  async goTo(url: string = `https://practice.expandtesting.com/upload`) {
    await this.browserPage.goto(url);
  }

  async uploadSingleFile(fileName: string){
    const filePath = path.join('src', 'testData', fileName);
    await Promise.all([
      // this.browserPage.waitForEvent('filechooser'),
      this.fileInputLocator.setInputFiles(filePath)
    ]);
    await this.fileSubmitLocator.click()
  }

}
