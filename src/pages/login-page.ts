import { Locator, Page, test } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
    // Best-guess selectors - confirm against the real login form and adjust as needed.
    // Role/label locators are tried first (accessible, resilient to markup changes);
    // the CSS list is a fallback until the real form is inspected.
    usernameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = this.page
            .getByLabel(/username|email/i)
            .or(this.page.locator('input[name="username"], input[type="email"], #username, #email'))
            .first();
        this.passwordInput = this.page
            .getByLabel(/password/i)
            .or(this.page.locator('input[name="password"], input[type="password"], #password'))
            .first();
        this.loginButton = this.page
            .getByRole('button', { name: /log in|sign in/i })
            .or(this.page.locator('button[type="submit"]'))
            .first();
    }

    public async openLoginPage() {
        await test.step('Open login page', async () => {
            await this.page.goto(process.env.BASEURL);
        });
    }

    public async login(username: string, password: string) {
        await test.step(`Log in as "${username}"`, async () => {
            await this.usernameInput.fill(username);
            await this.passwordInput.fill(password);
            await this.loginButton.click();
        });
    }
}
