const {expect} = require('chai');
const {loginPage, employeesPage} = require('../../page_objects');
const {commonUser} = require('../../data');
const {assertion} = require('../../helpers');

describe('Employees list suite', function () {
  beforeEach(async function () {
    await browser.manage().deleteAllCookies();
    await browser.get('/');
    await loginPage.login({name: commonUser.login, pass: commonUser.password});
  });

  it('Check buttons enabled/disabled if no employee selected', async function () {
    const createButton = await employeesPage.getCreateButton();
    const editButton = await employeesPage.getEditButton();
    const deleteButton = await employeesPage.getDeleteButton();

    await assertion(`Check that Create button enabled, and Edit, delete - disabled`, async () => {
      expect(createButton.enabled).to.eq(true, `Create button should be enabled`);
      expect(editButton.enabled).to.eq(false, `Edit button should be disabled`);
      expect(deleteButton.enabled).to.eq(false, `Delete button should be disabled`);
    });
  });

  it('Check User greeting', async function () {
    const userGreeting = `Hello ${commonUser.login}`;

    const userInfo = await employeesPage.getUserInfo();

    await assertion(`Check greeting message`, async () => {
      expect(userInfo).to.eq(userGreeting, `Greeting message should be ${userGreeting}`);
    });
  });
});
