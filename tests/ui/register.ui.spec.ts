import { test } from '../fixtures/auth.fixture';
import { RegisterPage } from '../pages/register.page';
import { getRandomUser } from '../../generators/userGenerator';

test('should successfully register a new user', async ({ page }) => {
    // given
    const registerPage = new RegisterPage(page);
    const newUser = getRandomUser();
    await registerPage.goto();

    // when
    await registerPage.registerUser(newUser);

    // then
    await registerPage.expectSuccessfulRegistration();
});

test('should show validation errors when fields are too short', async ({ page }) => {
    // given
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    const tooShortInput = '123';

    // when
    await registerPage.fillForm({
        username: tooShortInput,
        password: tooShortInput,
        firstName: tooShortInput,
        lastName: tooShortInput,
        email: 'test@test.com'
    });

    // then
    await registerPage.expectValidationErrors();
});

test('should show error when trying to register with existing username', async ({ page, registeredUser }) => {
    // given
    const registerPage = new RegisterPage(page);
    const newUser = getRandomUser();
    await registerPage.goto();

    // when
    await registerPage.registerUser({
        ...newUser,
        username: registeredUser.username
    });

    // then
    await registerPage.expectDuplicateUserError();
});