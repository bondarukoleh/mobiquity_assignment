const {Button, Alert} = require('../elements');
const {HeaderFragment, FormFragment} = require('../fragments');
const {stepDecorator} = require('../../helpers');

const methodsToDecorate = [
  'fillEditForm',
  'getEditForm',
  'clickUpdateButton',
  'getUpdateButton',
  'clickDeleteButton',
  'getDeleteButton',
  'clickLogoutButton',
  'getLogoutButton',
  'getUserInfo',
  'clickBackButton',
  'getBackButton',
  'confirmDeleteEmployee'
];

class EditEmployeePage {
  constructor() {
    this.headerFragment = new HeaderFragment();
    this.formFragment = new FormFragment();
    this.back = new Button($('.bBack'));
    this.deleteAlert = new Alert();
    stepDecorator(this, methodsToDecorate);
  }

  async fillEditForm({firstName = '', lastName = '', startDate = '', email = ''} = {}) {
    return this.formFragment.fillForm({firstName, lastName, startDate, email});
  }

  async getEditForm() {
    return this.formFragment.getFormData();
  }

  async clickUpdateButton() {
    return this.formFragment.clickUpdate();
  }

  async getUpdateButton() {
    return this.formFragment.getUpdateButton();
  }

  async clickDeleteButton() {
    return this.formFragment.clickDelete();
  }

  async getDeleteButton() {
    return this.formFragment.getDelete();
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

  async clickBackButton() {
    await this.back.click();
  }

  async getBackButton() {
    await this.back.getData();
  }

  async confirmDeleteEmployee() {
    await this.deleteAlert.accept();
  }
}

module.exports = {EditEmployeePage};
