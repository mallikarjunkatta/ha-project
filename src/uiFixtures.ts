import {LoginPage} from './pages/login-page';
import { test as base } from '@playwright/test';
import { SideBarPage } from './pages/side-bar-pages';


type UIFixtures = {
    loginPage: LoginPage;
    sideBarPage: SideBarPage
}

export const test = base.extend<UIFixtures>({
    loginPage: async({page}, use) => {
        await use (new LoginPage(page))
    },
    sideBarPage: async({page}, use) => {
        await use (new SideBarPage(page))
    }
})