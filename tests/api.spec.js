const { test, expect } = require('@playwright/test');
test('Mock Successful API Response', async ({ page }) => {
   await page.route('**/*', async route => {
       await route.fulfill({
           status: 200,
           contentType: 'application/json',
           body: JSON.stringify({
               message: 'API Mocked Successfully',
               status: 'success'
           })
       });
   });
   try {
       await page.goto(
           'https://www.saucedemo.com/'
       );
       console.log(
           'Mock Success Response Returned'
       );
   } catch (error) {
       console.log(error);
   }
});
test('Mock Failure API Response', async ({ page }) => {
   await page.route('**/*', async route => {
       await route.fulfill({
           status: 500,
           contentType: 'application/json',
           body: JSON.stringify({
               error: 'Internal Server Error'
           })
       });
   });
   try {
       await page.goto(
           'https://www.saucedemo.com/'
       );
       console.log(
           'Mock Failure Response Returned'
       );
   } catch (error) {
       console.log(error);
   }
});