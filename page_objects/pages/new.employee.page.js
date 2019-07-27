const {Button} = require('../elements');
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
  'getUserInfo'
];

class NewEmployeePage {
  constructor() {
    this.headerFragment = new HeaderFragment();
    this.addFragment = new FormFragment();
    this.cancel = new Button($('.bCancel'));
    stepDecorator(this, methodsToDecorate);
  }

  async fillAddForm({fistName, lastName, startDate, email}) {
    return this.addFragment.fillForm({fistName, lastName, startDate, email});
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
}

module.exports = {NewEmployeePage};
