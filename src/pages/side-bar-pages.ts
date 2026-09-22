import { Locator, Page, test } from '@playwright/test';
import { BasePage } from './base-page';

/**
 * Contains locators and methods for Sidenav items
 */
export class SideBarPage extends BasePage {
    sideBarItems: Locator;

    constructor(page: Page) {
        super(page);
        this.sideBarItems = this.page.locator('.sidebar-items');
    }

    /**
     *
     * @param sideBarChoice
     * clicks side bar item passed in as parameter.
     *
     */
    public async clickSideBarItems(sideBarChoice: string) {
        const ValidChoices = ['Devices', 'Blueprints', 'Library', 'Users']; // add all choices here in the same case as locator
        if (!ValidChoices.includes(sideBarChoice)) {
            throw new Error(`Invalid Side bar choice - ${sideBarChoice}. Select from ${ValidChoices.join(',')}`);
        }
        await test.step(`Click sidebar item "${sideBarChoice}"`, async () => {
            // Exact match (not substring) so e.g. "Users" can't also match "Users Admin".
            const item = this.sideBarItems.filter({ hasText: new RegExp(`^${sideBarChoice}$`) });
            await item.click();
        });
    }
}
