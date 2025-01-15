import { test as base, expect, Page } from '@playwright/test';
import { postSignUp } from '../../http/postSignUp';
import { postSignIn } from '../../http/postSignIn';
import { FRONTEND_URL } from '../../utils/constants';
import { getRandomUser } from '../../generators/userGenerator';
import type { User } from '../../types/User';
import { deleteUser } from '../../http/deleteUser';

type AuthenticatedPageFixtures = {
    authenticatedPage: {
        page: Page;
        user: User;
        token: string;
    };
};

export const test = base.extend<AuthenticatedPageFixtures>({
    authenticatedPage: async ({ page }, use) => {
        const newUser = getRandomUser();
        const { status } = await postSignUp(page.context().request, newUser);
        expect(status).toBe(201);

        const { response: loginResponse, status: loginStatus } = await postSignIn(page.context().request, {
            username: newUser.username,
            password: newUser.password
        });
        expect(loginStatus).toBe(200);
        
        await page.context().addInitScript(loginResponse => {
            window.localStorage.setItem('user', JSON.stringify(loginResponse));
        }, loginResponse);
        
        await page.goto(FRONTEND_URL);
        
        await use({ 
            page,
            user: newUser,
            token: loginResponse.token
        });

        // Cleanup after test
        const { status: deleteStatus } = await deleteUser(page.context().request, newUser.username, loginResponse.token);
        expect(deleteStatus).toBe(204);
    }
});

export { expect } from '@playwright/test'; 