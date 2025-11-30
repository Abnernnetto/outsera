import { expect, Page } from "@playwright/test";

export class BugBankLoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto("https://bugbank.netlify.app/");
  }

  async openRegisterPage() {
    await this.page.getByRole('button', { name: 'Registrar' }).click();
  }

  async registerUser(email: string, name: string, password: string) {
    const registerForm = this.page
      .locator("form")
      .filter({ hasText: "Voltar ao login" });
  
    await registerForm.getByPlaceholder("Informe seu e-mail").fill(email);
    await registerForm.getByRole("textbox", { name: "Informe seu Nome" }).fill(name);
    await registerForm.getByPlaceholder("Informe sua senha").fill(password);
    await registerForm.getByRole("textbox", { name: "Informe a confirmação da senha" }).fill(password);
  
    await registerForm.getByRole("button", { name: "Cadastrar" }).click();
  
    const modalText = this.page.locator("#modalText");
    await expect(modalText).toBeVisible();
  
    const text = await modalText.innerText();
    const accountNumber = text.match(/\d{4,}/)?.[0] ?? "";
  
    await this.page.getByText("Fechar").click();
  
    return accountNumber;
  }
  

  async login(email: string, password: string) {
    const loginForm = this.page
      .locator("form")
      .filter({ hasText: "Acessar" });
  
    await loginForm.getByPlaceholder("Informe seu e-mail").fill(email);
    await loginForm.getByPlaceholder("Informe sua senha").fill(password);
  
    await loginForm.getByRole("button", { name: "Acessar" }).click();
  }
  

  async assertDashboard() {

    await this.page.waitForURL("**/home", { timeout: 15000 });

    await this.page.waitForSelector("[class*='home__Container']", {
      state: "visible",
      timeout: 15000
    });

    await expect(
      this.page.getByText(/saldo em conta/i)
    ).toBeVisible({ timeout: 15000 });
  }

  async loginInvalid(email: string, password: string) {
    const loginForm = this.page
      .locator("form")
      .filter({ hasText: "Acessar" });
  
    await loginForm.getByPlaceholder("Informe seu e-mail").fill(email);
    await loginForm.getByPlaceholder("Informe sua senha").fill(password);
  
    await loginForm.getByRole("button", { name: "Acessar" }).click();
  }
  
  async assertLoginError() {
    const errorMessage = this.page.getByText("Usuário ou senha inválido.");
  
    await expect(errorMessage).toBeVisible({ timeout: 10000 });
  
    await this.page.getByText("Fechar").click();
  }
  
  async loginOnlyEmail(email: string) {
    const loginForm = this.page
      .locator("form")
      .filter({ hasText: "Acessar" });
  
    await loginForm.getByPlaceholder("Informe seu e-mail").fill(email);
  
    await loginForm.getByRole("button", { name: "Acessar" }).click();
  }
  
  async assertRequiredFieldError() {
    const errorMessage = this.page.getByText("É campo obrigatório");
    await expect(errorMessage).toBeVisible({ timeout: 10000 });
  }
  
  async loginOnlyPassword(password: string) {
    const loginForm = this.page
      .locator("form")
      .filter({ hasText: "Acessar" });
  
    await loginForm.getByPlaceholder("Informe sua senha").fill(password);
  
    await loginForm.getByRole("button", { name: "Acessar" }).click();
  }
  

}
