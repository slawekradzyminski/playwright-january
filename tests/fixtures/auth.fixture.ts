import { test as base, expect } from '@playwright/test';
import { postSignUp } from '../../http/postSignUp';
import { getRandomUser } from '../../generators/userGenerator';
import type { User } from '../../types/User';

type AuthFixtures = {
  registeredUser: User;
};

export const test = base.extend<AuthFixtures>({
  registeredUser: async ({ request }, use) => {
    const newUser = getRandomUser();
    const { status } = await postSignUp(request, newUser);
    expect(status).toBe(201);
    await use(newUser);
  }
});

export { expect } from '@playwright/test'; 