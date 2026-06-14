class InventoryPage {
  constructor(page) {
    this.page = page;

    // Selectors
    this.productItems = '.inventory_item';
    this.productName = '.inventory_item_name';
    this.productPrice = '.inventory_item_price';
    this.productImage = '.inventory_item_img';
    this.addToCartButtons = 'button.btn_inventory';
    this.cartBadge = '.shopping_cart_badge';
    this.cartIcon = '.shopping_cart_link';
    this.sortDropdown = '.product_sort_container';
  }

  //  Get product count
  async getProductCount() {
    return await this.page.locator(this.productItems).count();
  }

  // Check product name is visible
  async isProductNameVisible() {
    return await this.page.locator(this.productName).first().isVisible();
  }

  // Check product price is visible
  async isProductPriceVisible() {
    return await this.page.locator(this.productPrice).first().isVisible();
  }

  //  Check product image is visible
  async isProductImageVisible() {
    return await this.page.locator(this.productImage).first().isVisible();
  }

  //  Check Add to Cart button visible
  async isAddToCartVisible() {
    return await this.page.locator(this.addToCartButtons).first().isVisible();
  }

  //  Add first product to cart
  async addFirstProductToCart() {
    await this.page.locator(this.addToCartButtons).first().click();
  }

  //  Add all products
  async addAllProductsToCart() {
    const count = await this.page.locator(this.addToCartButtons).count();

    for (let i = 0; i < count; i++) {
      await this.page.locator(this.addToCartButtons).nth(i).click();
    }
  }

  //  Get cart count
  async getCartCount() {
    return await this.page.locator(this.cartBadge).textContent();
  }

  // Navigate to cart
  async goToCart() {
    await this.page.click(this.cartIcon);
  }

  //  Select sorting option
  async sortProducts(optionValue) {
    await this.page.selectOption(this.sortDropdown, optionValue);
  }

  //  Get all product prices
  async getAllPrices() {
    const prices = await this.page.locator(this.productPrice).allTextContents();

    // Convert "$29.99" → 29.99
    return prices.map(price => parseFloat(price.replace('$', '')));
  }
  async openFirstProduct() {
    await this.page.locator(this.productName).first().click();
  }

}

module.exports = InventoryPage;