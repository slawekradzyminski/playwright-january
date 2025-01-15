import { test } from '../fixtures/logged-in-user.api.fixture';
import { expect } from '@playwright/test';
import { deleteUser } from '../../http/deleteUser';
import { getUser } from '../../http/getUser';
import { postSignUp } from '../../http/postSignUp';
import { postSignIn } from '../../http/postSignIn';
import { getRandomUser } from '../../generators/userGenerator';

test.describe('Delete User API', () => {
    test('should return 204 when deleting existing user', async ({ request }) => {
        // given
        const userToDelete = getRandomUser();
        const { status: userToDeleteSignUpStatus } = await postSignUp(request, userToDelete);
        expect(userToDeleteSignUpStatus).toBe(201);
        const { response: userToDeleteLoginResponse, status: userToDeleteLoginStatus } = await postSignIn(request, {
            username: userToDelete.username,
            password: userToDelete.password
        });
        expect(userToDeleteLoginStatus).toBe(200);

        // when
        const { status } = await deleteUser(
            request,
            userToDelete.username,
            userToDeleteLoginResponse.token
        );

        // then
        expect(status).toBe(204);
    });

    test('should return 403 when not authorized', async ({ request, registeredUserWithToken }) => {
        // when
        const { response, status } = await deleteUser(
            request,
            registeredUserWithToken.user.username
        );

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
        const { response, status } = await deleteUser(
            request,
            nonExistingUsername,
            registeredUserWithToken.token
        );

        // then
        expect(status).toBe(404);
        expect(response).toEqual(expect.objectContaining({
            status: 404,
            error: 'Not Found',
            message: "The user doesn't exist",
            path: `/users/${nonExistingUsername}`
        }));
    });
}); 