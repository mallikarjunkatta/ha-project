import {LoginPage} from './pages/login-page';
import { test as base } from '@playwright/test';
type UIFixtures = {
    loginPage: LoginPage;
}

export const test = base.extend<UIFixtures>({
    loginPage: async({page}, use) => {
        await use (new LoginPage(page))
    }
})