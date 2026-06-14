const { test, expect } = require('@playwright/test');

// ✅ Enable parallel execution
test.describe.configure({ mode: 'parallel' });

test.describe('Parallel Safe Tests', () => {

  // ✅ Test 1: Independent login check
  test('Login page loads', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');

    await expect(page.locator('#login-button')).toBeVisible();
  });

  // ✅ Test 2: Independent inventory check
  test('Inventory page loads independently', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');

    // Fresh login (no dependency)
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  // ✅ Test 3: Independent cart check
  test('Cart opens independently', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');

    // Fresh login again
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.click('.shopping_cart_link');

    await expect(page.locator('.cart_list')).toBeVisible();
  });

  // ✅ Test 4: Checkout independently
  test('Checkout works independently', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');

    // Fresh setup (no shared state)
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.click('.inventory_item button');
    await page.click('.shopping_cart_link');
    await page.click('#checkout');

    await expect(page.locator('#first-name')).toBeVisible();
  });

});