import { test, expect } from "@playwright/test";

test.describe.skip("Snapshot suite >", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://playwright.dev/");
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("should snapshot companies", async ({ page }) => {
    const footer = page.locator(
      `//*[@id='__docusaurus_skipToContent_fallback']/main/section[2]`,
    );
    await footer.waitFor();
    await expect(footer).toHaveScreenshot({
      // animations: "disabled",
      // timeout: 10000,
      //Example to mask a specific element to ignore it in the screenshot, because it is dynamic
      mask: [
        page.locator(
          `//*[text()='This improvement is planned for our upcoming release.']`,
        ),
      ],
      maskColor: "rgba(0, 0, 0, 0.5)",
    });
  });

  test("should snapshot browser supported icon", async ({ page }) => {
    const webAppIcon = page.locator(
      `//img[@alt='Browsers (Chromium, Firefox, WebKit)']/parent::div`,
    );
    await webAppIcon.waitFor();
    await expect(page).toHaveScreenshot({
      // animations: "disabled",
      // timeout: 10000,
    });
  });
});
