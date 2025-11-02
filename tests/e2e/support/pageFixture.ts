import { Browser, BrowserContext, Page } from '@playwright/test';

export class PageFixture {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
}
export const pageFixture = new PageFixture();
