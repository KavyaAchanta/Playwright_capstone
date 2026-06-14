const { test, expect } = require('@playwright/test');

test.describe('Visual Smoke Tests', () => {

  //  1. Inventory page loads
  test('Inventory page renders', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');

    // Login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Verify inventory page
    await expect(page.locator('.inventory_list')).toBeVisible();

  });

  //  2. Cart page opens
  test('Cart page renders', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');

    // Login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Go to cart
    await page.click('.shopping_cart_link');

    // Verify cart page
    await expect(page.locator('.cart_list')).toBeVisible();

  });

  //  3. Checkout page opens (MAIN requirement)
  test('Checkout page opens successfully', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');

    // Login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Add product
    await page.click('.inventory_item button');

    // Navigate to checkout
    await page.click('.shopping_cart_link');
    await page.click('#checkout');

    // ✅ Verify checkout page opened
    await expect(page.locator('#first-name')).toBeVisible();

  });

});