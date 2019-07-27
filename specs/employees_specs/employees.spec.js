const {expect} = require('chai');
const {loginPage, employeesPage, newEmployeePage} = require('../../page_objects');
const {commonUser, urls} = require('../../data');
const {getAnyEmployee} = require('../../helpers');

async function createEmployeeHelper({fistName, lastName, startDate, email}) {
  await employeesPage.clickCreateButton();
  await newEmployeePage.fillAddForm({fistName, lastName, startDate, email});
  await newEmployeePage.clickAddButton();
}

describe('Employees list suite', function () {
  let employee = null;
  let employeeName = null;

  afterEach(async function (){
    await browser.get('/');
    await loginPage.login({name: commonUser.login, pass: commonUser.password});
    await employeesPage.deleteEmployee(employeeName);    
  });

  beforeEach(async function () {
    await browser.clearState();
    await browser.get('/');
    await loginPage.login({name: commonUser.login, pass: commonUser.password});
    employee = getAnyEmployee();
    employeeName = `${employee.fistName} ${employee.lastName}`;
    await createEmployeeHelper(employee);
  });

  it('Check buttons enabled after employee selected', async function () {
    await employeesPage.clickOnEmployee(employeeName);
    const createButton = await employeesPage.getCreateButton();
    const editButton = await employeesPage.getEditButton();
    const deleteButton = await employeesPage.getDeleteButton();

    [createButton, editButton, deleteButton].forEach(({text, enabled}) => {
      expect(enabled).to.eq(true, `${text} button should be enabled`);
    });
  });

  it('Check create button', async function () {
    await employeesPage.clickOnEmployee(employeeName);
    await employeesPage.clickCreateButton();
    const url = await browser.getCurrentUrl();
    expect(url).to.equal(urls.createEmployee, `Create new employee page should appear`);
  });

  it('Check edit button', async function () {
    await employeesPage.clickOnEmployee(employeeName);
    await employeesPage.clickEditButton();
    const url = await browser.getCurrentUrl();
    expect(url).to.includes('edit', `Edit new employee page should appear`);
  });

  it('Check delete button', async function () {
    const alertMessage = `Are you sure you want to delete ${employeeName}?`;

    await employeesPage.clickOnEmployee(employeeName);
    await employeesPage.clickDeleteButton();
    const alertText = await employeesPage.getDeleteEmployeeAlert();
    await employeesPage.declineDeleteEmployee();

    expect(alertText).to.eq(alertMessage, `Alert should appear with text "${alertMessage}"`);
  });
});
