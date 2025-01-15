import { test as base } from '@playwright/test';
import type { User } from '../../types/User';
import { createAuthenticatedUser, cleanupUser } from '../../utils/auth.utils';

type AuthFixtures = {
  registeredUser: User;
};

export const test = base.extend<AuthFixtures>({
  registeredUser: async ({ request }, use) => {
    const { user, token } = await createAuthenticatedUser(request);
    await use(user);
    await cleanupUser(request, user.username, token);
  }
});

export { expect } from '@playwright/test'; 