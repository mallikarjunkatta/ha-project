import { test } from "./../src/uiFixtures";

test.describe("sample test", () => {
  test("Filter by Devices type", async ({ loginPage }) => {
    await loginPage.openLoginPage();
  });
});
