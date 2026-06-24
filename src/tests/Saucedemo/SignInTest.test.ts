import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { test, expect } from "../../core/baseTest";
import { verifyElementExist, verifyToHaveURL } from "../../utils/assertUtils";
import { UserCredential } from "../../core/sharedUserData";


/**
 * Parse Saucedemo_account.csv and return an array of { name, username, password }.
 * The CSV has no header row; each line is: username,password
 */
function loadAccountsFromCsv(csvPath: string) {
  const content = fs.readFileSync(csvPath, "utf-8");
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const [username, password] = line.split(",");
      return { name: username, username, password };
    });
}

// Resolve the CSV path relative to this test file (ES module compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csvFilePath = path.resolve(__dirname, "../../testData/Saucedemo_account.csv");
const accounts = loadAccountsFromCsv(csvFilePath);

//locked_out_user should be fail login
for (const { name, username, password } of accounts) {
  test.describe.serial(`Login suite with Saucedemo_account.csv> ${name}`, () => {
    const authStatePath = `src/.auth/${name}.json`;

    // Use the saved auth state for this user (created by globalSetup)
    test.use({ storageState: authStatePath });

    // ── Hooks ──

    test.beforeAll(async () => {
      console.log(`[beforeAll] Preparing test suite for user: ${name}`);
    });

    test.beforeEach(async ({ inventoryPage }) => {
      // Navigate to the inventory page before each test
      await inventoryPage.goTo();
    });

    test.afterEach(async ({ page }) => {
      // Save the authentication state/session for subsequent tests
      await page.context().storageState({ path: authStatePath });
      // Close the page after each test
      await page.close();
    });

    test.afterAll(async ({ browser }) => {
      // Close all browser contexts after all tests in this serial suite
      // Note: We close contexts rather than browser.close() to avoid
      // killing the shared browser instance used by subsequent serial suites
      for (const context of browser.contexts()) {
        await context.close();
      }
    });

    // ── Test Case ──

    test(`should login successfully and see header for ${name}`, async ({ page }) => {
      // Verify that the header container element is visible
      const headerContainer = page.locator('//*[@id="header_container"]');
      await verifyElementExist(headerContainer);
    });
  });
}

//-- Object data --//
// Apply data-driven testing for different user accounts
const users = [
  {
    name: "Standard User",
    account: UserCredential.STANDARD_USER,
    expectedUrl: "/inventory.html",
  },
  {
    name: "Problem User",
    account: UserCredential.PROBLEM_USER,
    expectedUrl: "/inventory.html",
  },
  {
    name: "Error User",
    account: UserCredential.ERROR_USER,
    expectedUrl: "/inventory.html",
  },
  {
    name: "Visual User",
    account: UserCredential.VISUAL_USER,
    expectedUrl: "/inventory.html",
  },
];

users.forEach(({ name, account, expectedUrl }) => {
  test.describe(`Login suite with Object data > user: ${name}`, () => {
    test.use({
      storageState: account,
    });

    test.beforeEach(async ({ inventoryPage }) => {
      await inventoryPage.goTo();
    });

    test(`should login successful ${name}`, async ({ page }) => {
      await verifyToHaveURL(page, expectedUrl);
    });
  });
});


