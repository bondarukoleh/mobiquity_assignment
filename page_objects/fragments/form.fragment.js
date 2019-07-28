const {Button, Input} = require('../elements');

class FormFragment {
  constructor() {
    this.add = new Button(element(by.buttonText('Add')));
    this.delete = new Button($('.formFooter p'));
    this.update = new Button(element(by.buttonText('Update')));
    this.cancel = new Button(element(by.buttonText('Cancel')));
    this.firstName = new Input(element(by.xpath('//input[contains(@ng-model, "firstName")]//parent::label')));
    this.lastName = new Input(element(by.xpath('//input[contains(@ng-model, "lastName")]//parent::label')));
    this.startDate = new Input(element(by.xpath('//input[contains(@ng-model, "startDate")]//parent::label')));
    this.email = new Input(element(by.xpath('//input[contains(@ng-model, "email")]//parent::label')));
  }

  async clickAdd() {
    return this.add.click();
  }

  async getAdd() {
    return this.add.getData();
  }

  async clickUpdate() {
    return this.update.click();
  }

  async getUpdate() {
    return this.update.getData();
  }

  async clickDelete() {
    return this.delete.click();
  }

  async getDelete() {
    return this.delete.getData();
  }

  /**
   * @param {object<firstName, lastName, startDate, email>} fillFormData 
   */
  async fillForm(fillFormData) {
    for (const [fieldName, dataToSend] of Object.entries(fillFormData)) {
      await this[fieldName].sendKeys(dataToSend);
    }
  }

  async getFormData() {
    return {
      firstName: await this.firstName.getData(),
      lastName: await this.lastName.getData(),
      startDate: await this.startDate.getData(),
      email: await this.email.getData()
    };
  }

  async clickUpdate() {
    await this.update.click();
  }

  async clickCreate() {
    await this.update.click();
  }

  async clickCancel() {
    await this.cancel.click();
  }
}

module.exports = {FormFragment};