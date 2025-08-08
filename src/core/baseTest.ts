import {test as baseTest} from '@playwright/test';
import {SignInPage} from '../pages/Saucedemo/SignInPage'

type pages = {
//   account: UserCredential;
  signInPage: SignInPage;
};

export const test = baseTest.extend<pages>({
  // init new instances
  signInPage: async ({page}, use) => {
    await use(new SignInPage(page));
  },
  // ensure page is closed after each test
  page: async ({page}, use) => {
    await use(page);
    await page.close();
  }
});

export {expect} from '@playwright/test';
