const {Button, Alert} = require('../elements');
const {HeaderFragment, FormFragment} = require('../fragments');
const {stepDecorator} = require('../../helpers');

const methodsToDecorate = [
  'fillAddForm',
  'getAddForm',
  'clickAddButton',
  'clickCancelButton',
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

  // destructuring assignment - to have ability to send not all fields data to method
  async fillAddForm({firstName = '', lastName = '', startDate = '', email = ''} = {}) {
    return this.addFragment.fillForm({firstName, lastName, startDate, email});
  }

  async getAddForm() {
    return this.addFragment.getFormData();
  }

  async clickAddButton() {
    return this.addFragment.clickAdd();
  }

  async clickCancelButton() {
    return this.cancel.click();
  }

  async confirmDateAlert() {
    await this.dateValidationAlert.accept();
  }

  async getDateAlert() {
    return this.dateValidationAlert.getText();
  }
}

module.exports = {NewEmployeePage};
