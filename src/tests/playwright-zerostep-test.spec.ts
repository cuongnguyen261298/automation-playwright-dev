import { test, expect } from '@playwright/test';
// TOKEN in zerostep.config.js, please create and write
import { ai } from '@zerostep/playwright';

//test failed
// test.skip('Sign in successful to integration grid', async ({ page }) => {
//   await page.goto("https://integration.gridly.com/");
//   await ai('Focus to the Enter your the email to continue field', { page, test });
//   await ai(`Input 'cnp@gridly.com' into the Enter your the email to continue field`, {page, test});
//   await ai('Focus to the Enter your password field', { page, test });
//   await ai(`Input '@7Nghinla3nghinxoi' into the Enter your password field`, {page, test});
//   await ai(`Click 'Sign in' Button`, {page, test});
//   await ai(`Click 'Back' button`, {page, test});
// });

//test passed
// test.skip('Sign in successful to https://www.saucedemo.com and add to cart', async ({ page }) => {
//   await page.goto("https://www.saucedemo.com/");
//   await ai(`Input 'standard_user' into the username field`, {page, test});
//   await ai(`Input 'secret_sauce' into the password field`, {page, test});
//   await ai(`Click Login Button`, {page, test});
//   await ai(`Add to cart 1st product`, {page, test});
//   await ai(`Add to cart product is "Sauce Labs Onesie"`, {page, test});
//   await ai(`Click on element "data-test = 'shopping-cart-link'" to go to the cart page`, { page, test });
//   await ai('Click on checkout', { page, test });
// });
