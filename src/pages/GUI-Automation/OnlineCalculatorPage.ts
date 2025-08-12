import { Page, Locator } from "@playwright/test";
import BasePage from "../BasePage/basePage";
import {waitForResponseWithAction} from "../BasePage/networkUtil";

export class OnlineCalculatorPage extends BasePage {
    constructor(rootPage: Page) {
    super(rootPage);
  }
  
  async goTo(url = 'https://www.online-calculator.com//html5/simple/index.php') {
    await this.browserPage.goto(url);
  }

  async getCoordinate (){
    // Lấy tọa độ của tất cả các nút
    const coordinates = await this.browserPage.evaluate(() => {
      const buttons = document.querySelectorAll(`#dom_overlay_container`);
      return Array.from(buttons).map(button => {
        const rect = button.getBoundingClientRect();
        return {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        };
      });
    });

    // In kết quả
    console.log('Tọa độ của các nút trên máy tính:');
    coordinates.forEach(coord => {
      console.log(`Top: ${coord.top}, Left: ${coord.left}, Width: ${coord.width}, Height: ${coord.height}`);
    });
  }
}