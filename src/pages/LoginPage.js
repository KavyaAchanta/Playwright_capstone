class LoginPage {
  constructor(page) {
    this.page = page;

    // Selectors
    this.usernameInput = '#user-name';
    this.passwordInput = '#password';
    this.loginButton = '#login-button';
    this.errorMessage = '[data-test="error"]';
  }

  // Navigate to login page
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // Perform login
  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  // Get error message text
  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }
}

module.exports = LoginPage;
``