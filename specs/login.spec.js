const {expect} = require('chai');
const {loginPage, employeesPage} = require('../page_objects');
const {commonUser, urls} = require('../data');

describe('Login suite', () => {
  it('Login to cafe', async () => {
    await browser.get('/');
    await loginPage.login({name: commonUser.login, pass: commonUser.password});
    const url = await browser.getCurrentUrl();
    expect(url).to.equal(urls.employees, `After user login Employees page should appear`);
  });
});
