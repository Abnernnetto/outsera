import { BeforeAll, AfterAll, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { pageFixture } from './pageFixture';

setDefaultTimeout(120_000);

BeforeAll(async () => {
  pageFixture.browser = await chromium.launch({ headless: true });
});

Before(async () => {
  pageFixture.context = await pageFixture.browser.newContext();
  pageFixture.page = await pageFixture.context.newPage();
});

After(async () => {
  await pageFixture.page.close();
  await pageFixture.context.close();
});

AfterAll(async () => {
  await pageFixture.browser.close();
});
