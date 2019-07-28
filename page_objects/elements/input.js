const {waitForVisible} = require('../../helpers');

class Input {
  constructor(root) {
    this.root = root;
  }

  async click() {
    await waitForVisible(this.root);
    await this.root.$('input').click();
  }

  async sendKeys(data) {
    await waitForVisible(this.root);
    await this.root.$('input').clear();
    return this.root.$('input').sendKeys(data);
  }

  async getData() {
    await waitForVisible(this.root);
    return browser.executeScript(function(rootElement){
      // getting information about input and it's label in one place
      return {
        value: rootElement.querySelector('input').value,
        label: rootElement.querySelector('span') ? rootElement.querySelector('span').innerText : '',
      };
    }, this.root.getWebElement());
  }
}

module.exports = {Input};