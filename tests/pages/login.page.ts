import { Page, Locator, expect } from '@playwright/test';
import { FRONTEND_URL } from '../../utils/constants';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorAlert: Locator;
    readonly validationErrors: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorAlert = page.locator('.alert-danger');
        this.validationErrors = page.getByText('Required field length is 4 or more');
    }

    async goto() {
        await this.page.goto(`${FRONTEND_URL}/login`);
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectValidationErrors() {
        await expect(this.usernameInput).toHaveClass(/is-invalid/);
        await expect(this.passwordInput).toHaveClass(/is-invalid/);
        await expect(this.validationErrors).toHaveCount(2);
    }

    async expectInvalidCredentialsError() {
        await expect(this.errorAlert).toBeVisible();
        await expect(this.page.getByText('Invalid username/password supplied')).toBeVisible();
    }

    async expectSuccessfulLogin(firstName: string) {
        await this.page.waitForURL(`${FRONTEND_URL}/`);
        await expect(this.page.getByRole('heading', { level: 1, name: `Hi ${firstName}!` })).toBeVisible();
        await expect(this.page.getByText("You're logged in! Congratulations :)")).toBeVisible();
    }
} 