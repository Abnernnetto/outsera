import { Page, expect } from '@playwright/test';
import type { OrderData } from '../data/orderData';


export class CartPage {

    private modal;
    private purchaseBtn;

    constructor(private page: Page) {   
        this.modal = this.page.locator('#orderModal'); 
        this.purchaseBtn = this.modal.getByRole('button', { name: 'Purchase' });
    }
   
    async goto() {
        return this.page.goto('https://www.demoblaze.com/cart.html');
    }

    get clickCart() {
        return this.page.getByRole('link', { name: 'Cart' });
    }

    get clickPlaceOrder() {
        return this.page.getByRole('button', { name: 'Place Order' });
    }

    async fillOrderForm(orderData: OrderData) {
        await this.page.fill('#name',   orderData.name);
        await this.page.fill('#country',orderData.country);
        await this.page.fill('#city',   orderData.city);
        await this.page.fill('#card',   orderData.card.replace(/\s+/g, ''));
        await this.page.fill('#month',  orderData.month);
        await this.page.fill('#year',   orderData.year);
    }

    async fillOrderFormWithoutName(orderData: OrderData) {    
        await this.page.fill('#country',orderData.country);
        await this.page.fill('#city',   orderData.city);
        await this.page.fill('#card',   orderData.card.replace(/\s+/g, ''));
        await this.page.fill('#month',  orderData.month);
        await this.page.fill('#year',   orderData.year);
    }  

    async fillOrderFormWithoutCreditCard(orderData: OrderData) {   
        await this.page.fill('#name',   orderData.name);
        await this.page.fill('#country',orderData.country);
        await this.page.fill('#city',   orderData.city);
        await this.page.fill('#month',  orderData.month);
        await this.page.fill('#year',   orderData.year);
    }

    async fillOrderFormOldYear(orderData: OrderData) {
        await this.page.fill('#name',   orderData.name);
        await this.page.fill('#country',orderData.country);
        await this.page.fill('#city',   orderData.city);
        await this.page.fill('#card',   orderData.card.replace(/\s+/g, ''));
        await this.page.fill('#month',  orderData.month);
        await this.page.fill('#year',   '2024');
    }

    private async waitOrderModalOpen() {
        await expect(this.modal).toBeVisible();
        await expect(this.modal).toHaveClass(/show/);   // Bootstrap terminou animação
        await expect(this.modal).toHaveCSS('opacity', '1'); // modal está estável
    }
    
    async submitExpectingAlert(expectedMessage: string | RegExp) {
        await expect(this.modal).toBeVisible();
        await expect(this.modal).toHaveClass(/show/);
        await expect(this.modal).toHaveCSS('opacity', '1');
      
        await this.purchaseBtn.waitFor({ state: 'visible' });
        await expect(this.purchaseBtn).toBeEnabled();
        await this.page.waitForTimeout(80); 
      
        const dialogPromise = new Promise<string>((resolve) => {
          this.page.once('dialog', async (dialog) => {
            const msg = dialog.message();
            await dialog.accept(); 
            resolve(msg);
          });
        });
      
        const clickPromise = this.purchaseBtn.evaluate((btn: HTMLButtonElement) => btn.click());
      
        const timeoutMs = 7000;
        const msg = await Promise.race<string>([
          (async () => {
            await clickPromise; 
            return await dialogPromise; 
          })(),
          (async () => {
            await this.page.waitForTimeout(timeoutMs);
            throw new Error(`Nenhum alert() apareceu após clicar em Purchase dentro de ${timeoutMs}ms`);
          })(),
        ]);
      
        if (typeof expectedMessage === 'string') {
          expect(msg).toBe(expectedMessage);
        } else {
          expect(msg).toMatch(expectedMessage);
        }
    }     

    async isSuccessModalVisible() {
        return await this.page.locator('.sweet-alert').isVisible();
    }

    async isOrderModalVisible() {
        return this.modal.isVisible();
    }  

    get clickPurchaseOLD() {
        return this.page.getByRole('button', { name: 'Purchase' });
    }

    get clickPurchase() {
        return this.purchaseBtn;
      }

      async removeProductFromCart() {
        const deleteButton = this.page.getByRole('link', { name: 'Delete' });        
        await expect(deleteButton).toBeVisible();
      
        await Promise.all([
          this.page.waitForResponse(response =>
            response.url().includes('delete') && response.status() === 200
          ),
          deleteButton.click()
        ]);
      
        await expect(this.page.locator('tr.success')).toHaveCount(0);
      }

}