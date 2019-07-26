const {expect} = require('chai');
const {loginPage, employeesPage, editEmployeePage, newEmployeePage} = require('../page_objects');
const {commonUser, urls} = require('../data');
const {getAnyEmployee} = require('../helpers');
const faker = require('faker');

describe.skip('Login suite', function () {
  beforeEach(async function () {
    await browser.get('/');
    await loginPage.login({name: commonUser.login, pass: commonUser.password});
  });
  afterEach(async () => browser.clearState());
});
