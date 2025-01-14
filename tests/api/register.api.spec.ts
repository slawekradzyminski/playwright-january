import { test, expect } from '@playwright/test';
import { BACKEND_URL } from '../../utils/constants';
import { getRandomUser } from '../../generators/userGenerator';

test.describe('Register API', () => {
  // given
  const registerEndpoint = `${BACKEND_URL}/users/signup`;

  test('should successfully register a new user', async ({ request }) => {
    // given
    const newUser = getRandomUser();

    // when
    const response = await request.post(registerEndpoint, {
      data: newUser
    });
    const responseBody = await response.json();

    // then
    expect(response.status()).toBe(201);
    expect(responseBody).toEqual({
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
      const response = await request.post(registerEndpoint, { data: newUser });
      const responseBody = await response.json();

      // then
      expect(response.status()).toBe(400);
      expect(responseBody[field]).toContain(expectedError);
    });
  });

  test('should return 422 when trying to register with admin role', async ({ request }) => {
    // given
    const newUser = getRandomUser();
    newUser.username = 'admin';

    // when
    const response = await request.post(registerEndpoint, {
      data: newUser
    });
    const responseBody = await response.json();

    // then
    expect(response.status()).toBe(422);
    expect(responseBody).toEqual(expect.objectContaining({
      status: 422,
      error: 'Unprocessable Entity',
      message: 'Username is already in use',
      path: '/users/signup'
    }));
  });
});
