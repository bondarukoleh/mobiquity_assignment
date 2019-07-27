const {Button, List, Alert} = require('../elements');
const {HeaderFragment} = require('../fragments');
const {stepDecorator} = require('../../helpers');

const methodsToDecorate = [
  'clickOnEmployee',
  'getEmployees',
  'clickCreateButton',
  'getCreateButton',
  'clickEditButton',
  'getEditButton',
  'clickDeleteButton',
  'getDeleteButton',
  'clickLogoutButton',
  'getLogoutButton',
  'getUserInfo',
  'confirmDeleteEmployee',
  'declineDeleteEmployee',
  'getDeleteEmployeeAlert',
  'deleteEmployee'
];

class EmployeesPage {
  constructor() {
    this.headerFragment = new HeaderFragment();
    this.create = new Button($('#bAdd'));
    this.edit = new Button($('#bEdit'));
    this.delete = new Button($('#bDelete'));
    this.employees = new List($('#employee-list'));
    this.deleteAlert = new Alert();
    stepDecorator(this, methodsToDecorate);
  }

  async clickOnEmployee(employeeName) {
    return this.employees.click(employeeName);
  }

  async getEmployees() {
    return this.employees.getData();
  }

  async clickCreateButton() {
    return this.create.click();
  }

  async getCreateButton() {
    return this.create.getData();
  }

  async clickEditButton() {
    return this.edit.click();
  }

  async getEditButton() {
    return this.edit.getData();
  }

  async clickDeleteButton() {
    return this.delete.click();
  }

  async getDeleteButton() {
    return this.delete.getData();
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

  async confirmDeleteEmployee() {
    await this.deleteAlert.accept();
  }

  async declineDeleteEmployee() {
    await this.deleteAlert.cancel();
  }

  async getDeleteEmployeeAlert() {
    return this.deleteAlert.getText();
  }

  async deleteEmployee(employeeName) {
    await this.clickOnEmployee(employeeName);
    await this.clickDeleteButton();
    await this.confirmDeleteEmployee();
  }
}

module.exports = {EmployeesPage};
