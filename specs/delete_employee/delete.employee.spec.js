const {expect} = require('chai');
const {loginPage, employeesPage, newEmployeePage, editEmployeePage} = require('../../page_objects');
const {commonUser} = require('../../data');
const {getAnyEmployee, assertion, getCreateEmployeeHelper} = require('../../helpers');

const createEmployeeHelper = getCreateEmployeeHelper(employeesPage, newEmployeePage);

describe('Delete employee suite', function () {
  let employee = null;
  let employeeName = null;

  beforeEach(async function () {
    employee = getAnyEmployee();
    employeeName = `${employee.firstName} ${employee.lastName}`;

    await browser.manage().deleteAllCookies();
    await browser.get('/');
    await loginPage.login({name: commonUser.login, pass: commonUser.password});
    await createEmployeeHelper(employee);
    await employeesPage.clickOnEmployee(employeeName);
  });

  it('Delete employee via "Delete" button on employees page', async function () {
    await employeesPage.clickDeleteButton();
    await employeesPage.confirmDeleteEmployee();
    await employeesPage.clickCreateButton(); // to change the list state
    await newEmployeePage.clickCancelButton();
    const employees = await employeesPage.getEmployees();

    await assertion(`Check that deleted employee isn't in list`, async () => {
      expect(employees).to.not.include(employeeName, `Employees list should not include deleted ${employeeName}`);
    });
  });

  it(`Delete employee via "Delete" button on edit employees page`, async function () {
    await employeesPage.clickEditButton();
    await editEmployeePage.clickDeleteButton();
    await employeesPage.confirmDeleteEmployee();
    const employees = await employeesPage.getEmployees();

    await assertion(`Check that deleted employee isn't in list`, async () => {
      expect(employees).to.not.include(employeeName, `Employees list should not include deleted ${employeeName}`);
    });
  });
});
