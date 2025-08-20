import { PlaywrightTestConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({
  //Based on loaded variables in .NODE_ENV, else based on loaded variables in .production file
  path: `src/env/.env.${process.env.NODE_ENV || "production"}`,
});

const config: PlaywrightTestConfig = {
  globalSetup: 'src/core/globalSetup.ts',
  timeout: 120_000,
  testDir: "src/tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["line"], ["allure-playwright"]],
  use: {
    trace: "on-first-retry",
    headless: true,
    viewport: null,
    launchOptions: {
      args: ["--start-maximized"],
    },
    // screenshot: 'only-on-failure'
  },

  snapshotPathTemplate: "src/tests/snapshots/{testFilePath}/{testName}{ext}",
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
};

export default config;
