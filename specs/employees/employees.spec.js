const {expect} = require('chai');
const {loginPage, employeesPage, newEmployeePage} = require('../../page_objects');
const {commonUser, urls} = require('../../data');
const {getAnyEmployee, assertion, getCreateEmployeeHelper} = require('../../helpers');

const createEmployeeHelper = getCreateEmployeeHelper(employeesPage, newEmployeePage);

describe('Employees list suite', function () {
  let employee = null;
  let employeeName = null;

  beforeEach(async function () {
    employee = getAnyEmployee();
    employeeName = `${employee.firstName} ${employee.lastName}`;

    await browser.manage().deleteAllCookies();
    await browser.get('/');
    await loginPage.login({name: commonUser.login, pass: commonUser.password});
    await createEmployeeHelper(employee);
  });

  afterEach(async function () {
    await browser.get('/');
    await loginPage.login({name: commonUser.login, pass: commonUser.password});
    await employeesPage.deleteEmployee(employeeName);
  });

  it('Check buttons enabled after employee selected', async function () {
    await employeesPage.clickOnEmployee(employeeName);
    const createButton = await employeesPage.getCreateButton();
    const editButton = await employeesPage.getEditButton();
    const deleteButton = await employeesPage.getDeleteButton();

    for(const {text, enabled} of [createButton, editButton, deleteButton]) {
      await assertion('Check that button enabled', async () => {
        expect(enabled).to.eq(true, `${text} button should be enabled`);
      });
    };
  });

  it('Check create button', async function () {
    await employeesPage.clickOnEmployee(employeeName);
    await employeesPage.clickCreateButton();
    const url = await browser.getCurrentUrl();

    await assertion(`Check "Create" button works`, async () => {
      expect(url).to.equal(urls.createEmployee, `Create new employee page should appear`);      
    });
  });

  it('Check edit button', async function () {
    await employeesPage.clickOnEmployee(employeeName);
    await employeesPage.clickEditButton();
    const url = await browser.getCurrentUrl();
    
    await assertion(`Check "Edit" button works`, async () => {
      expect(url).to.includes('edit', `Edit employee page should appear`);
    });
  });

  it('Check delete button', async function () {
    const alertMessage = `Are you sure you want to delete ${employeeName}?`;

    await employeesPage.clickOnEmployee(employeeName);
    await employeesPage.clickDeleteButton();
    const alertText = await employeesPage.getDeleteEmployeeAlert();
    await employeesPage.declineDeleteEmployee();

    await assertion(`Check "Delete" button works`, async () => {
      expect(alertText).to.eq(alertMessage, `Alert should appear with text "${alertMessage}"`);
    });
  });
});
