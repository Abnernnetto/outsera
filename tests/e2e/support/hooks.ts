import { BeforeAll, AfterAll, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { fixture } from './pageFixture';


setDefaultTimeout(120_000);

BeforeAll(async () => {
  fixture.browser = await chromium.launch({ headless: true });
});

Before(async () => {
  fixture.context = await fixture.browser.newContext();
  fixture.page = await fixture.context.newPage();
});

After(async () => {
  await fixture.page.close();
  await fixture.context.close();
});

AfterAll(async () => {
  await fixture.browser.close();
});
