import { test as base, expect } from '@playwright/test';
import { postSignUp } from '../../http/postSignUp';
import { getRandomUser } from '../../generators/userGenerator';
import type { User } from '../../types/User';
import { postSignIn } from '../../http/postSignIn';
import { deleteUser } from '../../http/deleteUser';

type AuthFixtures = {
  registeredUser: User;
};

export const test = base.extend<AuthFixtures>({
  registeredUser: async ({ request }, use) => {
    const newUser = getRandomUser();
    const { status } = await postSignUp(request, newUser);
    expect(status).toBe(201);
    await use(newUser);

    // Cleanup after test
    const { response: loginResponse, status: loginStatus } = await postSignIn(request, {
      username: newUser.username,
      password: newUser.password
    });
    expect(loginStatus).toBe(200);
    const { status: deleteStatus } = await deleteUser(request, newUser.username, loginResponse.token);
    expect(deleteStatus).toBe(204);
  }
});

export { expect } from '@playwright/test'; 