const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');
const InventoryPage = require('../src/pages/InventoryPage');
const CartPage = require('../src/pages/CartPage');
const CheckoutPage = require('../src/pages/CheckoutPage');


//  1. Checkout with EMPTY CART
test('checkout with empty cart', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await inventory.goToCart();

  await page.click('#checkout');

  await expect(page).toHaveURL(/checkout-step-one/);
});


//  2. Error handling (all fields empty)
test('checkout validation - empty fields', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await inventory.addFirstProductToCart();
  await inventory.goToCart();
  await cart.clickCheckout();

  await checkout.fillCheckoutDetails('', '', '');

  const error = await checkout.getErrorMessage();
  expect(error).toContain('First Name is required');
});


//  3. Invalid / missing fields
test('checkout validation - missing last name', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await inventory.addFirstProductToCart();
  await inventory.goToCart();
  await cart.clickCheckout();

  await checkout.fillCheckoutDetails('Kavya', '', '600001');

  const error = await checkout.getErrorMessage();
  expect(error).toContain('Last Name is required');
});


//  4. Successful checkout flow
test('complete checkout successfully', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await inventory.addFirstProductToCart();
  await inventory.goToCart();
  await cart.clickCheckout();

  await checkout.fillCheckoutDetails('Kavya', 'Sri', '600001');

  //  Verify overview items
  const itemCount = await checkout.getOverviewItemsCount();
  expect(itemCount).toBeGreaterThan(0);

  await checkout.finishOrder();

  //  Validate success message
  const successText = await checkout.getSuccessMessage();
  expect(successText).toContain('Thank you for your order');

  //  Validate URL
  await expect(page).toHaveURL(/checkout-complete/);
});


//  5. Order confirmation content
test('verify order confirmation content', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await inventory.addFirstProductToCart();
  await inventory.goToCart();
  await cart.clickCheckout();

  await checkout.fillCheckoutDetails('Kavya', 'Sri', '600001');
  await checkout.finishOrder();

  const header = await checkout.getSuccessMessage();
  const description = await checkout.getConfirmationText();

  expect(header).toContain('Thank you for your order');
  expect(description).toContain('Your order has been dispatched');
});


//  6. Back to products after order
test('navigate back to inventory after checkout', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await inventory.addFirstProductToCart();
  await inventory.goToCart();
  await cart.clickCheckout();

  await checkout.fillCheckoutDetails('Kavya', 'Sri', '600001');
  await checkout.finishOrder();

  await checkout.goBackHome();

  await expect(page).toHaveURL(/inventory/);
});