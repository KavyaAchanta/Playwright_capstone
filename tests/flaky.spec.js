const { test, expect } = require('@playwright/test');

test.describe('Flaky Test Handling', () => {

  //  Mark entire file retries (ONLY for flaky tests)
  test.describe.configure({ retries: 2 });

  //  Example 1: Flaky test with retry
  test('Flaky test with retry', async ({ page }) => {

    // Mark this test as flaky (for reporting)
    test.info().annotations.push({
      type: 'flaky',
      description: 'Intermittent UI delay issue'
    });

    await page.goto('https://www.saucedemo.com');

    await expect(page.locator('#login-button')).toBeVisible();
  });

  //  Example 2: Another flaky scenario
  test('Flaky login scenario', async ({ page }) => {

    test.info().annotations.push({
      type: 'flaky',
      description: 'Slow response sometimes'
    });

    await page.goto('https://www.saucedemo.com');

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page.locator('.inventory_list')).toBeVisible();
  });

});