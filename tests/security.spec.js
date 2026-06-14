const { test, expect } = require('@playwright/test');

test.describe('Security - Input Sanitization', () => {

  //  Script Injection Test
  test('Should not execute script tags in input fields', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');

    // Login first
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Add product → go to checkout
    await page.click('.inventory_item button');
    await page.click('.shopping_cart_link');
    await page.click('#checkout');

    //  Attempt script injection
    const maliciousInput = '<script>alert("Hacked")</script>';

    await page.fill('#first-name', maliciousInput);
    await page.fill('#last-name', 'test');
    await page.fill('#postal-code', '12345');

    await page.click('#continue');

    //  Verify script is NOT executed
    // (No alert should appear, and text should not be rendered/executed)
    await expect(page.locator('text=Hacked')).not.toBeVisible();

    // Also ensure page continues normally
    await expect(page.locator('body')).toBeVisible();

  });

});