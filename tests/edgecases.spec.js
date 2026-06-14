const { test, expect } = require('@playwright/test');

test.describe('Edge Case Testing', () => {

  //  1. Network Failure Simulation
  test('Network failure simulation', async ({ page }) => {

    // Block image requests (safe failure simulation)
    await page.route('**/*.png', route => route.abort());

    await page.goto('https://www.saucedemo.com');

    // Verify page still loads core element
    await expect(page.locator('#login-button')).toBeVisible();
  });

  //  2. Slow Loading Scenario
  test('Slow loading with performance_glitch_user', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');

    await page.fill('#user-name', 'performance_glitch_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Waits until products load (handles delay automatically)
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  //  3. Mobile Viewport Check
  test('Mobile viewport validation', async ({ page }) => {

    // Set mobile screen size
    await page.setViewportSize({
      width: 375,
      height: 667
    });

    await page.goto('https://www.saucedemo.com');

    // Verify login button is visible in mobile view
    await expect(page.locator('#login-button')).toBeVisible();
  });

});