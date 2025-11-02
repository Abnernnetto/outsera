import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await this.waitAppReady();
  }

  get usernameInput() {
    return this.page.getByRole('textbox', { name: 'Username' });
  }

  get passwordInput() {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  async assertOnDashboard() {
    await this.waitSpinnerGone();
    await expect(this.page).toHaveURL(/dashboard/), { timeout: 20000 };
    await expect(this.page.locator('header .oxd-topbar-header-breadcrumb')).toBeVisible();
  }

  private async waitSpinnerGone() {
    await this.page.locator('.oxd-loading-spinner').waitFor({ state: 'detached', timeout: 15000 }).catch(() => {});
  }

  private async waitAppReady() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.waitSpinnerGone();
  }

  

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  get userInvalid(){
    return this.page.getByText('Invalid credentials')
  }

  get passwordRequired(){
    return this.page.getByText('Required')
  }

}
