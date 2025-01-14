import { Page, Locator, expect } from '@playwright/test';
import { FRONTEND_URL } from '../../utils/constants';
import type { User } from '../../types/User';

export class RegisterPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly registerButton: Locator;
    readonly validationErrors: Locator;
    readonly errorAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]');
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.firstNameInput = page.locator('input[name="firstName"]');
        this.lastNameInput = page.locator('input[name="lastName"]');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.validationErrors = page.getByText('Required field length is 4 or more');
        this.errorAlert = page.locator('.alert-danger');
    }

    async goto() {
        await this.page.goto(`${FRONTEND_URL}/register`);
    }

    async registerUser(user: User) {
        await this.usernameInput.fill(user.username);
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.registerButton.click();
    }

    async fillForm(data: { 
        username?: string, 
        email?: string, 
        password?: string, 
        firstName?: string, 
        lastName?: string 
    }) {
        if (data.username) await this.usernameInput.fill(data.username);
        if (data.email) await this.emailInput.fill(data.email);
        if (data.password) await this.passwordInput.fill(data.password);
        if (data.firstName) await this.firstNameInput.fill(data.firstName);
        if (data.lastName) await this.lastNameInput.fill(data.lastName);
        await this.registerButton.click();
    }

    async expectSuccessfulRegistration() {
        await this.page.waitForURL(`${FRONTEND_URL}/login`);
        await expect(this.page.getByText('Registration successful')).toBeVisible();
    }

    async expectValidationErrors() {
        await expect(this.usernameInput).toHaveClass(/is-invalid/);
        await expect(this.passwordInput).toHaveClass(/is-invalid/);
        await expect(this.firstNameInput).toHaveClass(/is-invalid/);
        await expect(this.lastNameInput).toHaveClass(/is-invalid/);
        await expect(this.validationErrors).toHaveCount(4);
    }

    async expectDuplicateUserError() {
        await expect(this.errorAlert).toBeVisible();
        await expect(this.page.getByText('Username is already in use')).toBeVisible();
    }
} 