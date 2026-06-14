const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');
const InventoryPage = require('../src/pages/InventoryPage');
const ProductDetail = require('../src/pages/ProductDetail');


//  1. Verify product count > 0
test('verify product count greater than zero', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  const count = await inventory.getProductCount();

  expect(count).toBeGreaterThan(0);
});


//  2. Verify product title elements
test('verify product tile elements', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await expect(await inventory.isProductNameVisible()).toBeTruthy();
  await expect(await inventory.isProductPriceVisible()).toBeTruthy();
  await expect(await inventory.isProductImageVisible()).toBeTruthy();
  await expect(await inventory.isAddToCartVisible()).toBeTruthy();
});


//  3. Add product to cart
test('add product to cart and verify badge', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await inventory.addFirstProductToCart();

  const cartCount = await inventory.getCartCount();

  expect(cartCount).toBe('1');
});


//  4. Sort products by Price Low to High
test('verify sorting low to high', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await inventory.sortProducts('lohi');

  const prices = await inventory.getAllPrices();

  const sorted = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(sorted);
});

// 5. Product detail validation
test('verify product detail page', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const detail = new ProductDetail(page);
  await login.goto();
  await login.login('standard_user', 'secret_sauce');
  // open detail
  await inventory.openFirstProduct
  ();
  // validations
  expect(await detail.isNameVisible()).toBeTruthy();
  expect(await detail.isDescriptionVisible()).toBeTruthy();
  expect(await detail.isPriceVisible()).toBeTruthy();
  // add to cart
  await detail.addToCart();
  // go back
  await detail.clickBack();
  
  // verify navigation
  const count = await inventory.getProductCount();
  expect(count).toBeGreaterThan(0);
});


