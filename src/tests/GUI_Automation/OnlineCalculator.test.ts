import { test } from "../../core/baseTest";

test.describe("", () => {
  // arrange
  test.beforeEach(async ({ onlineCalculatorPage }) => {
    await onlineCalculatorPage.goTo();
  });

  test(`should clicking 1 + 1"`, async ({ onlineCalculatorPage }) => {
    await onlineCalculatorPage.getCoordinate();
  });
});

/* Get coordinates console
const element = document.querySelector('#canvas');
const rect = element.getBoundingClientRect();
console.log(`Top: ${rect.top}, Left: ${rect.left}, Width: ${rect.width}, Height: ${rect.height}`);
*/
