class CartPage {
  constructor(page) {
    this.page = page;

    // Selectors
    this.cartItems = '.cart_item';
    this.itemNames = '.inventory_item_name';
    this.itemPrices = '.inventory_item_price';
    this.removeButtons = 'button.cart_button';
    this.checkoutButton = '#checkout';
  }

  // ✅ Get number of items in cart
  async getCartItemCount() {
    return await this.page.locator(this.cartItems).count();
  }

  // ✅ Get all product names
  async getItemNames() {
    return await this.page.locator(this.itemNames).allTextContents();
  }

  // ✅ Get all product prices (string)
  async getItemPrices() {
    return await this.page.locator(this.itemPrices).allTextContents();
  }

  // ✅ Convert prices into numbers
  async getPricesAsNumbers() {
    const prices = await this.getItemPrices();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }

  // ✅ Calculate subtotal
  async calculateSubtotal() {
    const prices = await this.getPricesAsNumbers();
    return prices.reduce((total, price) => total + price, 0);
  }

  // ✅ Remove first product
  async removeFirstItem() {
    await this.page.locator(this.removeButtons).first().click();
  }

  // ✅ Click checkout
  async clickCheckout() {
    await this.page.click(this.checkoutButton);
  }
}

module.exports = CartPage;