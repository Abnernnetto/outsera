import { Browser, BrowserContext, Page } from "@playwright/test";

class PageFixture {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
}

export const fixture = new PageFixture();
