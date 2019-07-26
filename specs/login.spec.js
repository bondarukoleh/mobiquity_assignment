const {expect} = require('chai');
const {loginPage, employeesPage, editEmployeePage, newEmployeePage} = require('../page_objects');
const {commonUser, urls} = require('../data');
const {getAnyEmployee} = require('../helpers');
const faker = require('faker');

describe('Login suite', function () {
  beforeEach(async function () {
    await browser.clearState();
    await browser.get('/');
  });

  it('Login with valid User', async function () {
    await loginPage.login({name: commonUser.login, pass: commonUser.password});
    const url = await browser.getCurrentUrl();
    expect(url).to.equal(urls.employees, `After user login Employees page should appear`);
  });
  
  it('Login without name', async function () {
    await loginPage.login({pass: commonUser.password});
    const url = await browser.getCurrentUrl();
    expect(url).to.equal(urls.login, `User without name should not log in`);
  });

  it('Login without password', async function () {
    await loginPage.login({name: commonUser.name});
    const url = await browser.getCurrentUrl();
    expect(url).to.equal(urls.login, `User without password should not log in`);
  });

  it('Login with wrong name and password', async function () {
    const notExistingUser = getAnyEmployee();
    await loginPage.login({name: notExistingUser.fistName, pass: faker.internet.password()});
    const url = await browser.getCurrentUrl();
    expect(url).to.equal(urls.login, `User with wrong name and password should not log in`);
  });

  it('Logout user', async function () {
    await loginPage.login({name: commonUser.login, pass: commonUser.password});
    await employeesPage.clickLogoutButton();
    const url = await browser.getCurrentUrl();
    expect(url).to.equal(urls.login, `User should log out successfully`);
  });
});
