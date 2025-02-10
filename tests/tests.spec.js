import {test, expect} from '@playwright/test';
import User from '../utils/User.js';

test.describe("Regression Tests @Regression", () => {
    let context;
    let page;
    let browser;

    test("Test Case 1: Register User", async () => {
        const user = User;

        console.log(user);
        await expect(page.locator('//body')).toBeVisible();
        await page.click('text=Signup / Login');
        await expect(page.locator('text=New User Signup!')).toBeVisible();
        await page.locator("//input[@data-qa='signup-name']").fill(user.login);
        await page.locator("//input[@data-qa='signup-email']").fill(user.email);
        await page.locator("//button[@data-qa='signup-button']").click();
        await page.waitForSelector('//*[text()="Enter Account Information"]');
        await expect (page.locator('//*[text()="Enter Account Information"]')).toBeVisible();

        await page.locator(`//input[@value='${user.title}']`).click();
        await page.locator("#password").fill(user.password);

        await page.locator('#days').selectOption(user.birthDate.getDate().toString());
        await page.locator('#months').selectOption(user.birthDate.getMonth().toString());
        await page.locator('#years').selectOption(user.birthDate.getFullYear().toString());

        await page.locator("#newsletter").check();
        await page.locator("#optin").check();

        await page.locator("#first_name").fill(user.firstName);
        await page.locator("#last_name").fill(user.lastName);
        await page.locator("#company").fill(user.company);
        await page.locator("#address1").fill(user.address);
        await page.locator("#address2").fill(user.address2);
        await page.locator("#country").selectOption(user.country);
        await page.locator("#state").fill(user.state);
        await page.locator("#city").fill(user.city);
        await page.locator("#zipcode").fill(user.zipcode);
        await page.locator("#mobile_number").fill(user.mobileNumber);
        await page.getByRole('button', { name: 'Create Account' }).click();
        await page.waitForSelector('//*[text()="Account Created!"]');
        await page.getByRole('link', { name: 'Continue' }).click();
        await page.waitForSelector(`li:has-text("Logged in as ${user.login}")`);
        await page.getByRole('link', { name: 'Delete Account' }).click();
        await page.waitForSelector('//*[text()="Account Deleted!"]');
        await page.getByRole('link', { name: 'Continue' }).click();
    })

    test.beforeAll('Before all test instruction', async ({browser: b}) => {
        browser = b;
        context = await browser.newContext();
        await context.addCookies([{
            name: 'FCCDCF',
            value: '%5Bnull%2Cnull%2Cnull%2C%5B%22CQMdQIAQMdQIAEsACBENBcFoAP_gAEPgABBoINJD7C7FbSFCwH5zaLsAMAhHRsAAQoQAAASBAmABQAKQIAQCgkAYFASgBAACAAAAICRBIQIECAAAAUAAQAAAAAAEAAAAAAAIIAAAgAEAAAAIAAACAIAAEAAIAAAAEAAAmAgAAIIACAAAgAAAAAAAAAAAAAAAAgCAAAAAAAAAAAAAAAAAAQOhSD2F2K2kKFkPCmwXYAYBCujYAAhQgAAAkCBMACgAUgQAgFJIAgCIFAAAAAAAAAQEiCQAAQABAAAIACgAAAAAAIAAAAAAAQQAABAAIAAAAAAAAEAQAAIAAQAAAAIAABEhAAAQQAEAAAAAAAQAAAAAAAAAAABAAA%22%2C%222~70.89.93.108.122.149.196.236.259.311.313.323.358.415.442.486.494.495.540.574.609.864.981.1029.1048.1051.1095.1097.1126.1205.1276.1301.1365.1415.1449.1514.1570.1577.1598.1651.1716.1735.1753.1765.1870.1878.1889.1958.1960.2072.2253.2299.2373.2415.2506.2526.2531.2568.2571.2575.2624.2677.2778~dv.%22%2C%221F17E32C-C75D-433E-996D-2F6C3217E00C%22%5D%5D',
            domain: '.automationexercise.com',
            path: '/',
            expires: 1772657815,
            httpOnly: false,
            secure: false,
            sameSite: 'Lax'
        },
        ]);

        page = await context.newPage();
        page.setDefaultTimeout(5000);
        await page.goto(process.env.URL);
        console.log('set reuqired cookies and naivigate to url');
    })

    test.afterAll('After all test instructions', async () => {
        await context.close();
        await browser.close();
        console.log('close the browser');
    })
})