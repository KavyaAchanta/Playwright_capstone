class CheckoutPage {
  constructor(page) {
    this.page = page;

    //  Step 1: Your Information
    this.firstName = '#first-name';
    this.lastName = '#last-name';
    this.postalCode = '#postal-code';
    this.continueButton = '#continue';
    this.errorMessage = '[data-test="error"]';

    //  Step 2: Overview Page
    this.summaryItems = '.cart_item';
    this.itemTotal = '.summary_subtotal_label';
    this.finishButton = '#finish';

    //  Step 3: Confirmation Page
    this.successMessage = '.complete-header';
    this.completeText = '.complete-text';
    this.backHomeButton = '#back-to-products';
  }

  //  Fill checkout form
  async fillCheckoutDetails(first, last, zip) {
    await this.page.fill(this.firstName, first);
    await this.page.fill(this.lastName, last);
    await this.page.fill(this.postalCode, zip);
    await this.page.click(this.continueButton);
  }

  //  Get error message
  async getErrorMessage() {
    return await this.page.locator(this.errorMessage).textContent();
  }

  //  Get number of items in overview page
  async getOverviewItemsCount() {
    return await this.page.locator(this.summaryItems).count();
  }

  //  Get subtotal text (optional advanced)
  async getSubtotalText() {
    return await this.page.locator(this.itemTotal).textContent();
  }

  //  Finish order
  async finishOrder() {
    await this.page.click(this.finishButton);
  }

  // Get success header
  async getSuccessMessage() {
    return await this.page.locator(this.successMessage).textContent();
  }

  //  Get confirmation paragraph
  async getConfirmationText() {
    return await this.page.locator(this.completeText).textContent();
  }

  //  Back to inventory
  async goBackHome() {
    await this.page.click(this.backHomeButton);
  }
}

module.exports = CheckoutPage;
