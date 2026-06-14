class ProductDetailPage {
  constructor(page) {
    this.page = page;

    this.productName = '.inventory_details_name';
    this.productDesc = '.inventory_details_desc';
    this.productPrice = '.inventory_details_price';
    this.addToCartButton = 'button.btn_inventory';
    this.backButton = '#back-to-products';
  }

  async isNameVisible() {
    return await this.page.locator(this.productName).isVisible();
  }

  async isDescriptionVisible() {
    return await this.page.locator(this.productDesc).isVisible();
  }

  async isPriceVisible() {
    return await this.page.locator(this.productPrice).isVisible();
  }

  async addToCart() {
    await this.page.locator(this.addToCartButton).click();
  }

  async clickBack() {
    await this.page.click(this.backButton);
  }
}

module.exports = ProductDetailPage;