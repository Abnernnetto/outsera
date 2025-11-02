import { Page, expect } from '@playwright/test';


export class HomePage {
    
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('https://www.demoblaze.com/index.html');
        await expect(this.page.getByRole('link', { name: 'Home' })).toBeVisible();
    }

    async openProductByName(name: string) {
        await Promise.all([
            this.page.waitForURL(/prod\.html/),                
            this.page.getByRole('link', { name }).click(),
        ]);    }
    
} 