import { expect, test } from '../fixtures/registered-user.api';
import { postSignIn } from '../../http/postSignIn';

test.describe('Login API', () => {
  test('should successfully login with valid credentials', async ({ request, registeredUser }) => {
    // when
    const { response, status } = await postSignIn(request, {
      username: registeredUser.username,
      password: registeredUser.password
    });

    // then
    expect(status).toBe(200);
    expect(response).toEqual({
      username: registeredUser.username,
      roles: registeredUser.roles,
      firstName: registeredUser.firstName,
      lastName: registeredUser.lastName,
      token: expect.any(String),
      email: registeredUser.email
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
