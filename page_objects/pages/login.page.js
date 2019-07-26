const {Button, Input} = require('../elements');

class LoginPage {
  constructor() {
    this.userNameField = new Input($('label [ng-model="user.name"]'));
    this.userPasswordField = new Input($('label [ng-model="user.password"]'));
    this.loginButton = new Button($('button.main-button'));
  }

  async enterUserName(userName) {
    return this.userNameField.sendKeys(userName);
  }

  async enterPassword(userPass) {
    return this.userPasswordField.sendKeys(userPass);
  }

  async clickLoginButton() {
    return this.loginButton.click();
  }

  async login({name, pass}) {
    await this.enterUserName(name);
    await this.enterPassword(pass);
    return this.clickLoginButton();
  }
}

module.exports = {LoginPage};
