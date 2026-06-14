const { test, expect } = require('@playwright/test');

test.describe('Accessibility Basic Checks', () => {

  //  1. Check all images have alt text
  test('Images should have alt text', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');

    // Login to reach inventory page
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const altText = await images.nth(i).getAttribute('alt');

      //  Verify alt attribute exists
      expect(altText).not.toBeNull();
    }

  });

  // 2. Check input fields (labels/accessibility presence)
  test('Input fields should be present and usable', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');

    // Login page inputs
    await expect(page.locator('#user-name')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();

    // Navigate to checkout page
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.click('.inventory_item button');
    await page.click('.shopping_cart_link');
    await page.click('#checkout');

    // Checkout form inputs
    await expect(page.locator('#first-name')).toBeVisible();
    await expect(page.locator('#last-name')).toBeVisible();
    await expect(page.locator('#postal-code')).toBeVisible();

  });

});