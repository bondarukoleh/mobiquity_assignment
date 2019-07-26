const {Button, List} = require('../elements');
const {HeaderFragment} = require('../fragments');

class EmployeesPage {
  constructor() {
    this.headerFragment = new HeaderFragment();
    this.create = new Button($('#bAdd'));
    this.update = new Button($('#bEdit'));
    this.delete = new Button($('#bDelete'));
    this.employees = new List($('#employee-list'));
  }

  async clickOnEmployee(employeeName) {
    return this.employees.click(employeeName);
  }

  async getEmployees() {
    return this.employees.getData();
  }

  async clickCreateButton(){
    return this.create.click();
  }

  async getCreateButton(){
    return this.create.getText();
  }

  async clickUpdateButton(){
    return this.update.click();
  }

  async getUpdateButton(){
    return this.update.getText();
  }

  async clickDeleteButton(){
    return this.delete.click();
  }

  async getUpdateButton(){
    return this.delete.getText();
  }

  async clickLogoutButton(){
    return this.headerFragment.clickLogout();
  }

  async getLogoutButton(){
    return this.headerFragment.getLogout();
  }

  async getUserInfo (){
    return this.headerFragment.getUserInfo();
  }
}

module.exports = {EmployeesPage};
