import { test as base, Page } from '@playwright/test';
import { FRONTEND_URL } from '../../utils/constants';
import type { User } from '../../types/User';
import { createAuthenticatedUser, cleanupUser } from '../../utils/auth.utils';

type AuthenticatedPageFixtures = {
    authenticatedPage: {
        page: Page;
        user: User;
        token: string;
    };
};

export const test = base.extend<AuthenticatedPageFixtures>({
    authenticatedPage: async ({ page }, use) => {
        const { user, token } = await createAuthenticatedUser(page.context().request);
        const { password, ...userWithoutPassword } = user;
        
        await page.context().addInitScript(loginResponse => {
            window.localStorage.setItem('user', JSON.stringify(loginResponse));
        }, { ...userWithoutPassword, token });
        
        await page.goto(FRONTEND_URL);
        
        await use({ 
            page,
            user,
            token
        });

        await cleanupUser(page.context().request, user.username, token);
    }
});

export { expect } from '@playwright/test'; 