import {Page} from 'playwright';

let page: Page;

export function getPage(): Page {
  return page;
}

export function setPage(pageInstance: Page): void {
  page = pageInstance;
}
