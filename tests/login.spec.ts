import { test } from '../src/uiFixtures';
import { expect } from '@playwright/test';

test.describe('login', () => {
  test('user can log in with valid credentials', async ({ loginPage, sideBarPage }) => {
    const username = process.env.TEST_USERNAME;
    const password = process.env.TEST_PASSWORD;
    test.skip(!username || !password, 'Set TEST_USERNAME and TEST_PASSWORD to run this test');

    await loginPage.openLoginPage();
    await loginPage.login(username!, password!);

    await expect(sideBarPage.sideBarItems.first()).toBeVisible();
  });
});
