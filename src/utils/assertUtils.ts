import { expect, Locator, Page} from "playwright/test";
import { getPage } from "../utils/pageUtils";



export async function verifyElementNotExist(
  element: Locator | string,
  exactText = false,
) {
  let locator: Locator;
  if (typeof element === "string") {
    locator = getPage().getByText(element, { exact: exactText });
  } else {
    locator = element;
  }
  await expect.soft(locator).toBeHidden();
}

export async function verifyElementExist(element: Locator | string) {
  let locator: Locator;
  if (typeof element === "string") {
    locator = getPage().getByText(element);
  } else {
    locator = element;
  }
  await expect.soft(locator).toBeVisible();
}

export async function verifyElementListExist(
  elements: Locator[] | string[],
  exactText = false,
) {
  if (typeof elements[0] === "string") {
    for (const element of elements) {
      await expect
        .soft(getPage().getByText(element as string, { exact: exactText }))
        .toBeVisible();
    }
  } else {
    for (const element of elements) {
      await expect.soft(element as Locator).toBeVisible();
    }
  }
}

export async function verifyElementHaveText(element: Locator, content: string) {
  await expect.soft(element).toHaveText(content);
}

export async function verifyElementContainText(
  element: Locator,
  content: string,
) {
  await expect.soft(element).toContainText(content);
}

export async function verifyElementDisabled(element: Locator) {
  await expect.soft(element).toBeDisabled();
}

export async function verifyToHaveURL(page: Page, url: string) {
  await expect.soft(page).toHaveURL(url);
}
