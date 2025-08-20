import { chromium } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { SignInPage } from "../pages/Saucedemo/SignInPage";
import { UserCredential, SharedUserData } from "../core/sharedUserData";

const logger = console;

dotenv.config({
  //Based on loaded variables in .NODE_ENV, else based on loaded variables in .production file
  path: `src/env/.env.${process.env.NODE_ENV || "production"}`,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setUpCookie() {
  logger.info("Setup Cookie is running...");
  logger.info("__dirname is:", __dirname);
  const users = [
    {
      name: 'STANDARD_USER',
      authFile: path.join(
        __dirname,
        `../.auth/${process.env.STANDARD_USER}.json`
      ),
    },
    {
      name: 'LOCKED_OUT_USER',
      authFile: path.join(
        __dirname,
        `../.auth/${process.env.LOCKED_OUT_USER}.json`
      ),
    },
    {
      name: 'PROBLEM_USER',
      authFile: path.join(
        __dirname,
        `../.auth/${process.env.PROBLEM_USER}.json`
      ),
    },
    {
      name:'ERROR_USER',
      authFile: path.join(__dirname, `../.auth/${process.env.ERROR_USER}.json`),
    },
    {
      name: 'VISUAL_USER',
      authFile: path.join(
        __dirname,
        `../.auth/${process.env.VISUAL_USER}.json`
      ),
    },
  ];
  const browser = await chromium.launch({ headless: true });
  console.log("Logger have user:", users);

  for (const user of users) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const signInPage = new SignInPage(page);

    await signInPage.goTo(`${process.env.SAUCEDEMO_URL}`);
    await signInPage.signInWith(UserCredential[user.name]);
    console.log("signInWith: ", UserCredential[user.name])

    await context.storageState({ path: user.authFile });
    await context.close();
    logger.info(`Saved cookie for ${user.name}`);
  }

  await browser.close();
}

async function globalSetup() {
  if (process.env.PWDEBUG) return;
  await setUpCookie();
}

export default globalSetup;
