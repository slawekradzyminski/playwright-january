import { test } from '../fixtures/registered-user.fixture';
import { expect } from '@playwright/test';
import { getUsers } from '../../http/getUsers';

test.describe('Users API', () => {
    test('should return users list when authorized', async ({ request, registeredUserWithToken }) => {
        // when
        const { response, status } = await getUsers(request, registeredUserWithToken.token);

        // then
        expect(status).toBe(200);
        expect(Array.isArray(response)).toBe(true);
        expect(response.length).toBeGreaterThan(0);
        expect(response).toContainEqual(expect.objectContaining({
            username: registeredUserWithToken.user.username,
            firstName: registeredUserWithToken.user.firstName,
            lastName: registeredUserWithToken.user.lastName,
            email: registeredUserWithToken.user.email
        }));
    });

    test('should return 403 when not authorized', async ({ request }) => {
        // when
        const { response, status } = await getUsers(request);

        // then
        expect(status).toBe(403);
        expect(response).toEqual(expect.objectContaining({
            status: 403,
            error: 'Forbidden',
            message: expect.any(String),
            path: '/users'
        }));
    });
}); 