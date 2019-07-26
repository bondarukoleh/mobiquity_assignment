const {waitForVisible} = require('../../helpers');

class Input {
  constructor(root) {
    this.root = root;
  }

  async click() {
    await waitForVisible(this.root);
    await this.root.click();
  }

  async sendKeys(data) {
    await waitForVisible(this.root);
    await this.root.clear();
    return this.root.sendKeys(data);
  }

  async getData() {
    await waitForVisible(this.root);
    return browser.executeScript(function(rootElement){
      return {
        value: rootElement.querySelector('input').value,
        label: rootElement.querySelector('span') ? rootElement.querySelector('span').innerText : '',
      };
    }, this.root.getElement());
  }
}

module.exports = {Input};