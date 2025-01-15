import { FRONTEND_URL } from '../../utils/constants';
import { expect, test } from '../fixtures/homepage.ui.fixture';
import { HomePage } from '../pages/home.page';

test('should display at least one user on home page', async ({ authenticatedPage }) => {
    // given
    const homePage = new HomePage(authenticatedPage.page);
    
    // then
    await homePage.expectAtLeastOneUser();
});

test('should redirect to login page after logout', async ({ authenticatedPage }) => {
    // given
    const homePage = new HomePage(authenticatedPage.page);
    
    // when
    await homePage.logout();

    // then
    await expect(authenticatedPage.page).toHaveURL(`${FRONTEND_URL}/login`);
});
