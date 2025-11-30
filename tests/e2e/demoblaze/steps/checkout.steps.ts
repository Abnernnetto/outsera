import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { fixture } from '../../support/pageFixture';
import { generateOrderData } from '../data/orderData';
import { CartPage } from '../pages/cart.page';

let homePage: HomePage;
let productPage: ProductPage;
let cartPage: CartPage;


Given('que estou na página Home de produtos do DemoBlaze', async function () {
    homePage = new HomePage(fixture.page);
    await homePage.goto();
});


When('eu seleciono o produto {string}', async function (productName: string) {
    await homePage.openProductByName(productName);
});

When('eu adiciono o produto "Samsung galaxy s6" ao carrinho', async function () {
    productPage = new ProductPage(fixture.page);
    await productPage.addToCartAndConfirm();
});

When('eu abro o carrinho para visualizar meus produtos', async function () {
    await fixture.page.getByRole('link', { name: 'Cart', exact: true }).click();
    await expect(fixture.page).toHaveURL(/cart\.html/);
});

When('eu inicio a ordem do pedido', async function () {
    await fixture.page.getByRole('button', { name: 'Place Order' }).click();
    await expect(fixture.page.getByRole('dialog')).toBeVisible();
});

When(
    'eu preencho os meus dados pessoais do formulario para realização da compra',
    async function () {
        const data = generateOrderData();
        cartPage = new CartPage(fixture.page);

        await cartPage.fillOrderForm(data);
        await fixture.page.getByRole('button', { name: 'Purchase' }).click();
    }
);


Then(
    'devo ver a mensagem de sucesso {string} com os dados da compra',
    async function (mensagemEsperada: string) {
        const p = fixture.page;
        const modal = p.locator('.sweet-alert');

        await expect(modal).toBeVisible();
        await expect(
            p.getByRole('heading', { name: new RegExp(mensagemEsperada, 'i') })
        ).toBeVisible();

        const receiptText = (await modal.locator('p').textContent()) ?? '';
        expect(receiptText).toMatch(/Id:\s*\d+/i);
        expect(receiptText).toMatch(/Amount:\s*\d+\s*USD/i);
        expect(receiptText).toMatch(/Card Number:\s*\d{4,}/i);
        expect(receiptText).toMatch(/Name:\s*\S+/i);
        expect(receiptText).toMatch(/Date:\s*.+/i);

        await p.getByRole('button', { name: 'OK' }).click();
        await expect(modal).toBeHidden();
    }
);

When(
    'eu tento finalizar a compra deixando o campo Nome vazio',
    async function () {
        const data = generateOrderData();
        cartPage = new CartPage(fixture.page);

        await cartPage.fillOrderFormWithoutName(data);
        await cartPage.submitExpectingAlert(
            /Please fill out Name and Creditcard\.?/i
        );
    }
);

Then('o pedido não deve ser finalizado', async function () {
    const isSuccess = await cartPage.isSuccessModalVisible();
    const isOrderStillOpen = await cartPage.isOrderModalVisible();

    expect(isSuccess).toBeFalsy();
    expect(isOrderStillOpen).toBeTruthy();
});

When(
    'eu tento finalizar a compra deixando o campo Credit Card vazio',
    async function () {
        const data = generateOrderData();
        cartPage = new CartPage(fixture.page);

        await cartPage.fillOrderFormWithoutCreditCard(data);
        await cartPage.submitExpectingAlert(
            /Please fill out Name and Creditcard\.?/i
        );
    }
);

When('eu informo um ano inferior ao atual', async function () {
    const data = generateOrderData();
    cartPage = new CartPage(fixture.page);

    await cartPage.fillOrderFormOldYear(data);
});

When('removo o produto do carrinho', async function () {
    cartPage = new CartPage(fixture.page);
    await cartPage.removeProductFromCart();
});

Then('o carrinho deve ficar vazio sem nenhum produto', async function () {
    const rows = fixture.page.locator('#tbodyid tr');
    await expect(rows).toHaveCount(0);
});
