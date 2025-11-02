import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { pageFixture } from '../../support/pageFixture';

let loginPage: LoginPage;

Given('que estou na página de login', async function () {
  loginPage = new LoginPage(pageFixture.page);
  await loginPage.goto();
});

When('insiro credenciais válidas', async function () {
  await loginPage.login('Admin', 'admin123');
});

Then('OLD devo ser redirecionado para o Dashboard', async function () {
  await expect(pageFixture.page).toHaveURL(/dashboard/);
});

Then('devo ser redirecionado para o Dashboard', async function () {
  await loginPage.assertOnDashboard();
});


When('insiro usuário inválido', async function () {
    await loginPage.login('userinvalido', 'admin123');
  });
  
Then('devo ver uma mensagem de erro', async function () {
    const errorMessage = await pageFixture.page.locator('.oxd-alert-content-text');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Invalid credentials');
  });

When('insiro senha inválida', async function () {
    await loginPage.login('Admin', '123456');
  });

When('insiro credenciais inválidas', async function () {
    await loginPage.login('userinvalido', '123456');
  });

When('insiro apenas o usuário e não preencho a senha', async function () {
    await loginPage.login('Admin', '');
  });

Then('devo ver uma mensagem de campo requirido', async function () {
    const errorMessage = await pageFixture.page.locator('.oxd-input-field-error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Required');
  });

When('insiro apenas a senha e não preencho o usuário', async function () {
    await loginPage.login('', 'admin123');
  });
