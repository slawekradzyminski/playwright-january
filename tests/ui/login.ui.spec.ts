import { test } from '../fixtures/auth.fixture';
import { FRONTEND_URL } from '../../utils/constants';

test('should successfully login with registered user', async ({ page, registeredUser }) => {
  // given
  await page.goto(`${FRONTEND_URL}/login`);

  // when
  await page.locator('input[name="username"]').fill(registeredUser.username);
  await page.locator('input[name="password"]').fill(registeredUser.password);
  await page.getByRole('button', { name: 'Login' }).click();

  // then
  await page.waitForURL(`${FRONTEND_URL}/`);
  await page.getByRole('heading', { level: 1, name: `Hi ${registeredUser.firstName}!` }).isVisible();
  await page.getByText("You're logged in! Congratulations :)").isVisible();
});
