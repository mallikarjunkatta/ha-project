import {test} from './../src/uiFixtures'

test.describe('Library test', () => {
    test('Filter by Devices type', async({loginPage}) => {
      await loginPage.openLoginPage()
    })
 
});