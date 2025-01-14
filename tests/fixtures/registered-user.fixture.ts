import { test as base, expect } from '@playwright/test';
import { postSignUp } from '../../http/postSignUp';
import { postSignIn } from '../../http/postSignIn';
import { getRandomUser } from '../../generators/userGenerator';
import type { User } from '../../types/User';

type RegisteredUserFixtures = {
    registeredUserWithToken: {
        user: User;
        token: string;
    };
};

export const test = base.extend<RegisteredUserFixtures>({
    registeredUserWithToken: async ({ request }, use) => {
        const newUser = getRandomUser();
        const { status } = await postSignUp(request, newUser);
        expect(status).toBe(201);
        const { response, status: loginStatus } = await postSignIn(request, {
            username: newUser.username,
            password: newUser.password
        });
        expect(loginStatus).toBe(200);
        
        await use({
            user: newUser,
            token: response.token
        });
    }
});

export { expect } from '@playwright/test'; 