import { Page, expect } from '@playwright/test';


export class ProductPage {

    constructor(private page: Page) {}
   

    get addToCart() {
        return this.page.getByRole('link', { name: 'Add to cart' });
    }

    async addToCartAndConfirm() {
        await expect(this.addToCart).toBeVisible({ timeout: 10000 });
        const [dialog] = await Promise.all([
          this.page.waitForEvent('dialog'),   
          this.addToCart.click(),
        ]);

        await dialog.accept();
      }    

      get clickPlaceOrder() {
        return this.page.getByRole('link', { name: 'Place Order' });
      }
    

}