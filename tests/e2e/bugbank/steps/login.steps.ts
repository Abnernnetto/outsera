import { Given, When, Then } from "@cucumber/cucumber";
import { BugBankLoginPage } from "../pages/login.page";
import { fixture } from "../../support/pageFixture";

let loginPage: BugBankLoginPage;
let generatedEmail: string;

Given("que estou na página de login", async function () {
  loginPage = new BugBankLoginPage(fixture.page);
  await loginPage.navigate();
});

When("acesso a tela de registro", async function () {
  await loginPage.openRegisterPage();
});

When("eu realizo o registro de um novo usuário", async function () {
  generatedEmail = `inter${Date.now()}@gmail.com`;
  await loginPage.registerUser(generatedEmail, "Inter Teste", "inter");
});

When("faço login com a conta criada", async function () {
  await loginPage.login(generatedEmail, "inter");
});

Then("devo ser redirecionado para o Dashboard", async function () {
  await loginPage.assertDashboard();
});

When("insiro usuário inválido", async function () {
  await loginPage.loginInvalid("inter@gmail.cm", "inter");
});

Then("devo ver uma mensagem de erro", async function () {
  await loginPage.assertLoginError();
});

When("insiro senha inválida", async function () {
  await loginPage.loginInvalid("inter@gmail.com", "senhaErrada123");
});

When("insiro apenas o usuário e não preencho a senha", async function () {
  await loginPage.loginOnlyEmail("inter@gmail.com");
});

Then("devo ver uma mensagem de campo requerido", async function () {
  await loginPage.assertRequiredFieldError();
});

When("insiro apenas a senha e não preencho o usuário", async function () {
  await loginPage.loginOnlyPassword("123456");
});
