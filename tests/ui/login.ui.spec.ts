import { test } from '../fixtures/registered-user.api';
import { LoginPage } from '../pages/login.page';

test('should successfully login with registered user', async ({ page, registeredUser }) => {
    // given
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // when
    await loginPage.login(registeredUser.username, registeredUser.password);

    // then
    await loginPage.expectSuccessfulLogin(registeredUser.firstName);
});

test('should show validation errors when credentials are too short', async ({ page }) => {
    // given
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const tooShortInput = '123';

    // when
    await loginPage.login(tooShortInput, tooShortInput);

    // then
    await loginPage.expectValidationErrors();
});

test('should show error message for invalid credentials', async ({ page }) => {
    // given
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const invalidCredentials = {
        username: 'nonexistent',
        password: 'wrongpassword'
    };

    // when
    await loginPage.login(invalidCredentials.username, invalidCredentials.password);

    // then
    await loginPage.expectInvalidCredentialsError();
});


