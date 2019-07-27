const {Button, Input, Text} = require('../elements');
const {stepDecorator} = require('../../helpers');

const methodsToDecorate = [
  'enterUserName',
  'enterPassword',
  'clickLoginButton',
  'login',
  'getErrorMessage'
];

class LoginPage {
  constructor() {
    this.userNameField = new Input(element(by.xpath('//input[@ng-model="user.name"]//parent::label')));
    this.userPasswordField = new Input(element(by.xpath('//input[@ng-model="user.password"]//parent::label')));
    this.loginButton = new Button($('button.main-button'));
    this.errorMessage = new Text($('.error-message'));
    stepDecorator(this, methodsToDecorate);
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

  async login({name = '', pass = ''} = {}) {
    await this.enterUserName(name);
    await this.enterPassword(pass);
    return this.clickLoginButton();
  }

  async getErrorMessage() {
    return this.errorMessage.getText();
  }
}

module.exports = {LoginPage};
