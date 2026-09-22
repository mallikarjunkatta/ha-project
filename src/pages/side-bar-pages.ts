
import {Locator, Page} from '@playwright/test'
/**
 * Contains locators and methods for Sidenav items
 */

export class SideBarPage{
    page: Page;
    sideBarItems: Locator;


    constructor(page: Page) {
        this.page = page;
        this.sideBarItems = this.page.locator('.sidebar-items')
    }
    
    /**
     * 
     * @param sideBarChoice 
     * clicks saide bar item passed in as parameter. 
     * 
     */
    public async clickSideBarItems(sideBarChoice: string){
        const ValidChoices = ['Devices', 'Blueprints', 'Library', 'Users'] // add all choices here in the same case as locator
        if(!ValidChoices.includes(sideBarChoice)){
            throw new Error(`Invalid Side bar choice - ${sideBarChoice}. Select from ${ValidChoices.join(',')}`)
        }
        await this.sideBarItems.filter({hasText: sideBarChoice}).click()

    }

}