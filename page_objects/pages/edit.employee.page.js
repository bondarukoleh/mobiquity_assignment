const {Button, Alert} = require('../elements');
const {HeaderFragment, FormFragment} = require('../fragments');
const {stepDecorator} = require('../../helpers');

const methodsToDecorate = [
  'fillEditForm',
  'getEditForm',
  'clickUpdateButton',
  'clickDeleteButton',
  'clickLogoutButton',
  'clickBackButton',
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

  // destructuring assignment - to have ability to send not all fields data to method
  async fillEditForm({firstName = '', lastName = '', startDate = '', email = ''} = {}) {
    return this.formFragment.fillForm({firstName, lastName, startDate, email});
  }

  async getEditForm() {
    return this.formFragment.getFormData();
  }

  async clickUpdateButton() {
    return this.formFragment.clickUpdate();
  }

  async clickDeleteButton() {
    return this.formFragment.clickDelete();
  }

  async clickLogoutButton() {
    return this.headerFragment.clickLogout();
  }

  async clickBackButton() {
    await this.back.click();
  }

  async confirmDeleteEmployee() {
    await this.deleteAlert.accept();
  }
}

module.exports = {EditEmployeePage};
