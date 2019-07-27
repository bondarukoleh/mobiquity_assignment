const {expect} = require('chai');
const {loginPage, employeesPage} = require('../../page_objects');
const {commonUser} = require('../../data');

describe('Employees list suite', function () {
  beforeEach(async function () {
    await browser.clearState();
    await browser.get('/');
    await loginPage.login({name: commonUser.login, pass: commonUser.password});
  });

  it('Check buttons enabled/disabled if no employee selected', async function(){
    const createButton = await employeesPage.getCreateButton();
    const editButton = await employeesPage.getEditButton();
    const deleteButton = await employeesPage.getDeleteButton();
    
    expect(createButton.enabled).to.eq(true, `Create button should be enabled`);
    expect(editButton.enabled).to.eq(false, `Edit button should be disabled`);
    expect(deleteButton.enabled).to.eq(false, `Delete button should be disabled`);
  });
});
