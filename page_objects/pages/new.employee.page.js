const {Button, Alert} = require('../elements');
const {HeaderFragment, FormFragment} = require('../fragments');
const {stepDecorator} = require('../../helpers');

const methodsToDecorate = [
  'fillAddForm',
  'getAddForm',
  'clickAddButton',
  'getAddButton',
  'clickCancelButton',
  'getCancelButton',
  'clickLogoutButton',
  'getLogoutButton',
  'getUserInfo',
  'confirmDateAlert',
  'getDateAlert'
];

class NewEmployeePage {
  constructor() {
    this.headerFragment = new HeaderFragment();
    this.addFragment = new FormFragment();
    this.cancel = new Button($('.bCancel'));
    this.dateValidationAlert = new Alert();
    stepDecorator(this, methodsToDecorate);
  }

  async fillAddForm({firstName = '', lastName = '', startDate = '', email = ''} = {}) {
    return this.addFragment.fillForm({firstName, lastName, startDate, email});
  }

  async getAddForm() {
    return this.addFragment.getFormData();
  }

  async clickAddButton() {
    return this.addFragment.clickAdd();
  }

  async getAddButton() {
    return this.addFragment.getAdd();
  }

  async clickCancelButton() {
    return this.cancel.click();
  }

  async getCancelButton() {
    return this.cancel.getData();
  }

  async clickLogoutButton() {
    return this.headerFragment.clickLogout();
  }

  async getLogoutButton() {
    return this.headerFragment.getLogout();
  }

  async getUserInfo() {
    return this.headerFragment.getUserInfo();
  }

  async confirmDateAlert() {
    await this.dateValidationAlert.accept();
  }

  async getDateAlert() {
    return this.dateValidationAlert.getText();
  }
}

module.exports = {NewEmployeePage};
