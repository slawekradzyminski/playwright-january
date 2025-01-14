import { test } from '../fixtures/auth.fixture';
import { FRONTEND_URL } from '../../utils/constants';
import { expect } from '@playwright/test';

test('should successfully login with registered user', async ({ page, registeredUser }) => {
  // given
  await page.goto(`${FRONTEND_URL}/login`);

  // when
  await page.locator('input[name="username"]').fill(registeredUser.username);
  await page.locator('input[name="password"]').fill(registeredUser.password);
  await page.getByRole('button', { name: 'Login' }).click();

  // then
  await page.waitForURL(`${FRONTEND_URL}/`);
  await expect(page.getByRole('heading', { level: 1, name: `Hi ${registeredUser.firstName}!` })).toBeVisible();
  await expect(page.getByText("You're logged in! Congratulations :)")).toBeVisible();
});

test('should show validation errors when credentials are too short', async ({ page }) => {
  // given
  await page.goto(`${FRONTEND_URL}/login`);
  const tooShortInput = '123';

  // when
  await page.locator('input[name="username"]').fill(tooShortInput);
  await page.locator('input[name="password"]').fill(tooShortInput);
  await page.getByRole('button', { name: 'Login' }).click();

  // then
  await expect(page.locator('input[name="username"]')).toHaveClass(/is-invalid/);
  await expect(page.locator('input[name="password"]')).toHaveClass(/is-invalid/);
  await expect(page.getByText('Required field length is 4 or more')).toHaveCount(2);
});

test('should show error message for invalid credentials', async ({ page }) => {
  // given
  await page.goto(`${FRONTEND_URL}/login`);
  const invalidCredentials = {
    username: 'nonexistent',
    password: 'wrongpassword'
  };

  // when
  await page.locator('input[name="username"]').fill(invalidCredentials.username);
  await page.locator('input[name="password"]').fill(invalidCredentials.password);
  await page.getByRole('button', { name: 'Login' }).click();

  // then
  await expect(page.locator('.alert-danger')).toBeVisible();
  await expect(page.getByText('Invalid username/password supplied')).toBeVisible();
});


