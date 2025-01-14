import { test } from '../fixtures/registered-user.fixture';
import { expect } from '@playwright/test';
import { getUser } from '../../http/getUser';

test.describe('User API', () => {
    test('should return user details when authorized', async ({ request, registeredUserWithToken }) => {
        // when
        const { response, status } = await getUser(
            request, 
            registeredUserWithToken.user.username,
            registeredUserWithToken.token
        );

        // then
        expect(status).toBe(200);
        expect(response).toEqual({
            id: expect.any(Number),
            username: registeredUserWithToken.user.username,
            firstName: registeredUserWithToken.user.firstName,
            lastName: registeredUserWithToken.user.lastName,
            email: registeredUserWithToken.user.email,
            roles: registeredUserWithToken.user.roles
        });
    });

    test('should return 403 when not authorized', async ({ request, registeredUserWithToken }) => {
        // when
        const { response, status } = await getUser(request, registeredUserWithToken.user.username);

        // then
        expect(status).toBe(403);
        expect(response).toEqual(expect.objectContaining({
            status: 403,
            error: 'Forbidden',
            message: expect.any(String),
            path: expect.stringContaining('/users/')
        }));
    });

    test('should return 404 when user does not exist', async ({ request, registeredUserWithToken }) => {
        // given
        const nonExistingUsername = 'nonexistentuser123';

        // when
        const { response, status } = await getUser(request, nonExistingUsername, registeredUserWithToken.token);

        // then
        expect(status).toBe(404);
        expect(response).toEqual(expect.objectContaining({
            status: 404,
            error: 'Not Found',
            message: "The user doesn't exist",
            path: `/users/${nonExistingUsername}`,
            timestamp: expect.any(String)
        }));
    });
}); 