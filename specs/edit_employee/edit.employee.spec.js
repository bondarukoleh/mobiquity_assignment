const {expect} = require('chai');
const {loginPage, employeesPage, newEmployeePage, editEmployeePage} = require('../../page_objects');
const {commonUser, urls} = require('../../data');
const {getAnyEmployee, assertion, getCreateEmployeeHelper} = require('../../helpers');

const createEmployeeHelper = getCreateEmployeeHelper(employeesPage, newEmployeePage);

describe('Edit employee suite', function () {
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
    await employeesPage.clickEditButton();
  });

  afterEach(async function () {
    await browser.get('/');
    await loginPage.login({name: commonUser.login, pass: commonUser.password});
    await employeesPage.deleteEmployee(employeeName);
  });

  it('Cancel edit employee', async function () {
    await editEmployeePage.clickBackButton();
    const url = await browser.getCurrentUrl();
    
    await assertion(`Check cancel button works`, async () => {
      expect(url).to.eq(urls.employees, `Employees page should appear`);
    });
  });

  it(`Edit employee name`, async function () {
    const newEmployeeData = getAnyEmployee();
    const changedEmployee = { // changing name for employee
      ...employee,
      firstName: newEmployeeData.firstName,
      lastName: newEmployeeData.lastName
    };
    employeeName = `${changedEmployee.firstName} ${changedEmployee.lastName}`; // changing name for cleanup

    await editEmployeePage.fillEditForm(changedEmployee);
    await editEmployeePage.clickUpdateButton();
    const employees = await employeesPage.getEmployees();

    await assertion(`Check that user updated`, async () => {
      expect(employees).to.include(employeeName, `Employees list should include updated ${employeeName}`);
    });
  });

  it('Edit employee without name', async function () {
    employee.firstName = '';

    await editEmployeePage.fillEditForm(employee);
    await editEmployeePage.clickUpdateButton();
    const url = await browser.getCurrentUrl();
    
    await assertion(`Check user cannot be updated without name`, async () => {
      expect(url).to.include('edit', `User should stay on Edit employees page`);
    });
  });

  it.only(`Check that not valid update isn't saved`, async function () {
    const emailBeforeUpdate = employee.email;
    employee.email = '';

    await editEmployeePage.fillEditForm(employee);
    await editEmployeePage.clickBackButton();
    await employeesPage.clickOnEmployee(employeeName);
    await employeesPage.clickEditButton();
    const employeeData = await editEmployeePage.getEditForm();

    await assertion(`Check user without email isn't updated`, async () => {
      expect(employeeData.email.value).to.eq(emailBeforeUpdate, `Email should same as before - ${emailBeforeUpdate}`);
    });
  });
});
