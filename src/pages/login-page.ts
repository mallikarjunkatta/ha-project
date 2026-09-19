import {Page} from '@playwright/test'
export class LoginPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async webLogin(){
        await this.
    }


    public async openLoginPage(){
        if(process.env.URL === undefined || process.env.URL?.length ===0){
            process.env.URL = process.env.BASEURL
        }
    }
}