const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');
//valid Login
test('valid login', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/); 
});

// Invalid Login
test('invalid login', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login('invalid_user', 'wrong_password');

  const errorText = await login.getErrorMessage();

  await expect(errorText).toContain('Username and password do not match');
});

//  Locked User
test('locked out user login', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login('locked_out_user', 'secret_sauce');

  const errorText = await login.getErrorMessage();

  await expect(errorText).toContain('Sorry, this user has been locked out');
});


 //Empty Username & Password
test('empty username and password', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login('', '');

  const errorText = await login.getErrorMessage();

  await expect(errorText).toContain('Username is required');
});

// Empty Password Only
test('empty password', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login('standard_user', '');

  const errorText = await login.getErrorMessage();

  await expect(errorText).toContain('Password is required');
});


