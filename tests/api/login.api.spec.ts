import { test, expect } from '@playwright/test';
import { postSignIn } from '../../http/postSignIn';

test.describe('Login API', () => {
  test('should successfully login with valid credentials', async ({ request }) => {
    // when
    const { response, status } = await postSignIn(request, {
      username: 'admin',
      password: 'admin'
    });

    // then
    expect(status).toBe(200);
    expect(response).toEqual({
      username: 'admin',
      roles: ['ROLE_ADMIN', 'ROLE_CLIENT'],
      firstName: 'Slawomir',
      lastName: 'Radzyminski',
      token: expect.any(String),
      email: 'admin@email.com'
    });
  });

  test('should return 400 for credentials that are too short', async ({ request }) => {
    // when
    const { response, status } = await postSignIn(request, {
      username: 'a',
      password: 'b'
    });

    // then
    expect(status).toBe(400);
    expect(response).toEqual({
      password: 'Minimum password length: 4 characters',
      username: 'Minimum username length: 4 characters'
    });
  });

  test('should return 422 for invalid credentials', async ({ request }) => {
    // when
    const { response, status } = await postSignIn(request, {
      username: 'nonexistent',
      password: 'wrongpassword'
    });

    // then
    expect(status).toBe(422);
    expect(response).toEqual(expect.objectContaining({
      status: 422,
      error: 'Unprocessable Entity',
      message: 'Invalid username/password supplied',
      path: '/users/signin'
    }));
  });
});
