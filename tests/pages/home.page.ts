import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly userList: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userList = page.locator('ul li');
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
    }

    async expectAtLeastOneUser() {
        await expect(this.userList.first()).toBeVisible();
        const count = await this.userList.count();
        expect(count).toBeGreaterThan(0);
    }

    async logout() {
        await this.logoutLink.click();
    }
} 