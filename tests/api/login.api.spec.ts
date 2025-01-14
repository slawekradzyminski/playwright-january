import { test, expect } from '@playwright/test';
import { BACKEND_URL } from '../../utils/constants';

test.describe('Login API', () => {
  // given
  const loginEndpoint = `${BACKEND_URL}/users/signin`;

  test('should successfully login with valid credentials', async ({ request }) => {
    // when
    const response = await request.post(loginEndpoint, {
      data: {
        username: 'admin',
        password: 'admin'
      }
    });
    const responseBody = await response.json();

    // then
    expect(response.status()).toBe(200);
    expect(responseBody).toEqual({
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
    const response = await request.post(loginEndpoint, {
      data: {
        username: 'a',
        password: 'b'
      }
    });
    const responseBody = await response.json();

    // then
    expect(response.status()).toBe(400);
    expect(responseBody).toEqual({
      password: 'Minimum password length: 4 characters',
      username: 'Minimum username length: 4 characters'
    });
  });

  test('should return 422 for invalid credentials', async ({ request }) => {
    // when
    const response = await request.post(loginEndpoint, {
      data: {
        username: 'nonexistent',
        password: 'wrongpassword'
      }
    });
    const responseBody = await response.json();

    // then
    expect(response.status()).toBe(422);
    expect(responseBody).toEqual(expect.objectContaining({
      status: 422,
      error: 'Unprocessable Entity',
      message: 'Invalid username/password supplied',
      path: '/users/signin'
    }));
  });
});
