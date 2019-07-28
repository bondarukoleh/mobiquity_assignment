const {expect} = require('chai');
const {loginPage, employeesPage, newEmployeePage} = require('../../page_objects');
const {commonUser, urls} = require('../../data');
const {getAnyEmployee, assertion} = require('../../helpers');

describe('Create employee suite', function () {
  beforeEach(async function () {
    await browser.manage().deleteAllCookies();
    await browser.get('/');
    await loginPage.login({name: commonUser.login, pass: commonUser.password});
    await employeesPage.clickCreateButton();
  });

  it('Cancel creation employee', async function () {
    await newEmployeePage.clickCancelButton();
    const url = await browser.getCurrentUrl();
    
    await assertion('Check that cancel button works', async () => {
      expect(url).to.eq(urls.employees, `Employees page should appear`);
    });
  });

  it('Create employee', async function () {
    const employee = getAnyEmployee();
    const employeeName = `${employee.firstName} ${employee.lastName}`;

    await newEmployeePage.fillAddForm(employee);
    await newEmployeePage.clickAddButton();
    const employees = await employeesPage.getEmployees();

    await assertion('Check employee is created', async () => {
      expect(employees).to.include(employeeName, `Employees list should include ${employeeName}`);
    });

    // Cleanup
    await employeesPage.deleteEmployee(employeeName);
  });

  it('Create employee without name', async function () {
    const employee = getAnyEmployee();
    employee.firstName = '';

    await newEmployeePage.fillAddForm(employee);
    await newEmployeePage.clickAddButton();
    const url = await browser.getCurrentUrl();

    await assertion(`Check that employee isn't created`, async () => {
      expect(url).to.include(urls.createEmployee, `User should stay on "New employees page"`);
    });
  });

  it('Create employee with not valid date', async function () {
    const employee = getAnyEmployee();
    const validationMessage = `Error trying to create a new employee: {"start_date":["can't be blank"]})`;

    employee.startDate = employee.lastName; // making date not valid
    await newEmployeePage.fillAddForm(employee);
    await newEmployeePage.clickAddButton();
    const dateValidationMessage = await newEmployeePage.getDateAlert();

    await assertion(`Check validation message appeared`, async () => {
      expect(dateValidationMessage).to.eq(validationMessage, `Validation message should be ${validationMessage}`);
    });
  });
});
