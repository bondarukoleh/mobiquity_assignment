const {Button} = require('../elements');
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
  'getBackButton'
];

class EditEmployeePage {
  constructor() {
    this.headerFragment = new HeaderFragment();
    this.formFragment = new FormFragment();
    this.back = new Button($('.bBack'));
    stepDecorator(this, methodsToDecorate);
  }

  async fillEditForm({fistName, lastName, startDate, email}) {
    return this.formFragment.fillForm({fistName, lastName, startDate, email});
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
}

module.exports = {EditEmployeePage};
