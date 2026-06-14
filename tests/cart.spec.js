const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');
const InventoryPage = require('../src/pages/InventoryPage');
const CartPage = require('../src/pages/CartPage');


//  1. Add multiple products and verify cart
test('add multiple products and verify cart items', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await inventory.addAllProductsToCart();
  await inventory.goToCart();

  const count = await cart.getCartItemCount();

  expect(count).toBeGreaterThan(1);
});


//  2. Verify product names and prices
test('verify product names and prices in cart', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await inventory.addFirstProductToCart();
  await inventory.goToCart();

  const names = await cart.getItemNames();
  const prices = await cart.getItemPrices();

  expect(names.length).toBe(1);
  expect(prices.length).toBe(1);
});


//  3. Remove product
test('remove product from cart', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await inventory.addFirstProductToCart();
  await inventory.goToCart();

  await cart.removeFirstItem();

  const count = await cart.getCartItemCount();

  expect(count).toBe(0);
});


//  4. Cart badge updates
test('verify cart badge updates', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  // Add item
  await inventory.addFirstProductToCart();
  let count = await inventory.getCartCount();
  expect(count).toBe('1');

  // Remove (toggle button)
  await inventory.addFirstProductToCart();

  // Badge disappears
  const badgeCount = await page.locator('.shopping_cart_badge').count();
  expect(badgeCount).toBe(0);
});


//  5. Update quantity (simulate add/remove)
test('update quantity using add/remove', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  // Add
  await inventory.addFirstProductToCart();

  // Remove
  await inventory.addFirstProductToCart();

  // Add again
  await inventory.addFirstProductToCart();

  const cartCount = await inventory.getCartCount();

  expect(cartCount).toBe('1');
});


//  6. Subtotal calculation
test('verify subtotal calculation', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await inventory.addAllProductsToCart();
  await inventory.goToCart();

  const subtotal = await cart.calculateSubtotal();

  console.log('Subtotal:', subtotal);

  expect(subtotal).toBeGreaterThan(0);
});


// 7. Navigate to checkout
test('navigate to checkout from cart', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await inventory.addFirstProductToCart();
  await inventory.goToCart();

  await cart.clickCheckout();

  await expect(page).toHaveURL(/checkout-step-one/);
});