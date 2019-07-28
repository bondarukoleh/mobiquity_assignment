const {expect} = require('chai');
const {loginPage, employeesPage} = require('../../page_objects');
const {commonUser, urls} = require('../../data');
const {getAnyUser, assertion} = require('../../helpers');

describe('Login suite', function () {
  beforeEach(async function () {
    await browser.manage().deleteAllCookies();
    await browser.get('/');
  });

  it('Login with valid User', async function () {
    await loginPage.login({name: commonUser.login, pass: commonUser.password});
    const url = await browser.getCurrentUrl();

    await assertion(`Check that user is logged in`, async () => {
      expect(url).to.equal(urls.employees, `After user login Employees page should appear`);
    });
  });
  
  it('Login without name', async function () {
    await loginPage.login({pass: commonUser.password});
    const url = await browser.getCurrentUrl();

    await assertion(`Check that user cannot login without name`, async () => {
      expect(url).to.equal(urls.login, `User without name should not log in`);
    });
  });

  it('Login without password', async function () {
    await loginPage.login({name: commonUser.name});
    const url = await browser.getCurrentUrl();

    await assertion(`Check that user cannot login without password`, async () => {
      expect(url).to.equal(urls.login, `User without password should not log in`);
    });
  });

  it('Login with wrong name and password', async function () {
    const notExistingUser = getAnyUser();
    const errorMessage = 'Invalid username or password!';
    
    await loginPage.login({name: notExistingUser.name, pass: notExistingUser.password});
    const message = await loginPage.getErrorMessage();

    await assertion(`Check that user cannot login with wrong login/password`, async () => {
      expect(message).to.equal(errorMessage, `Message with text "${errorMessage}" should be shown`);
    });
  });

  it('Logout user', async function () {
    await loginPage.login({name: commonUser.login, pass: commonUser.password});
    await employeesPage.clickLogoutButton();
    const url = await browser.getCurrentUrl();

    await assertion(`Check that user can logout`, async () => {
      expect(url).to.equal(urls.login, `User should log out successfully`);
    });
  });
});
