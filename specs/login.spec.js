const {expect} = require('chai');
const {loginPage, employeesPage, editEmployeePage, newEmployeePage} = require('../page_objects');
const {commonUser, urls} = require('../data');

describe('Login suite', function () {
  beforeEach(async function () {
    await browser.clearState();
    await browser.get('/');
  });

  it('Login to cafe', async function () {
    await loginPage.login({name: commonUser.login, pass: commonUser.password});
    const url = await browser.getCurrentUrl();
    expect(url).to.equal(urls.employees, `After user login Employees page should appear`);
  });
});
