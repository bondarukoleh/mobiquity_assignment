const {waitForAlert} = require('../../helpers');

class Alert {
  async accept() {
    await waitForAlert();
    await browser.switchTo().alert().accept();
  }

  async cancel() {
    await waitForAlert();
    await browser.switchTo().alert().dismiss();
  }

  async getText() {
    await waitForAlert();
    return browser.switchTo().alert().getText();
  }
}

module.exports = {Alert};