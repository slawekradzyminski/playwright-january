import { test, expect } from '@playwright/test';
import { getRandomUser } from '../../generators/userGenerator';
import { postSignUp } from '../../http/postSignUp';

test.describe('Register API', () => {
  test('should successfully register a new user', async ({ request }) => {
    // given
    const newUser = getRandomUser();

    // when
    const { response, status } = await postSignUp(request, newUser);

    // then
    expect(status).toBe(201);
    expect(response).toEqual({
      token: expect.any(String)
    });
  });

  const validationTestCases = [
    { field: 'username', value: 'abc', expectedError: 'Minimum username length: 4 characters' },
    { field: 'email', value: 'invalid-email', expectedError: 'must be a well-formed email address' },
    { field: 'password', value: 'abc', expectedError: 'Minimum password length: 4 characters' },
    { field: 'roles', value: [], expectedError: 'Please pick at least one role' },
  ];

  validationTestCases.forEach(({ field, value, expectedError }) => {
    test(`should return 400 when ${field} is invalid`, async ({ request }) => {
      // given
      const newUser = getRandomUser();
      newUser[field] = value;

      // when
      const { response, status } = await postSignUp(request, newUser);

      // then
      expect(status).toBe(400);
      expect(response[field]).toContain(expectedError);
    });
  });

  test('should return 422 when trying to register with admin role', async ({ request }) => {
    // given
    const newUser = getRandomUser();
    newUser.username = 'admin';

    // when
    const { response, status } = await postSignUp(request, newUser);

    // then
    expect(status).toBe(422);
    expect(response).toEqual(expect.objectContaining({
      status: 422,
      error: 'Unprocessable Entity',
      message: 'Username is already in use',
      path: '/users/signup'
    }));
  });
});
