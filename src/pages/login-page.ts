import {Page} from '@playwright/test'
export class LoginPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async openLoginPage(){
        await this.page.goto(process.env.BASEURL)
    }
}