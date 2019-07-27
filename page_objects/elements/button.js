const {waitForVisible} = require('../../helpers');

class Button {
  constructor(root) {
    this.root = root;
  }

  async click() {
    await waitForVisible(this.root);
    await this.root.click();
  }

  async getData() {
    await waitForVisible(this.root);
    return {
      text: await this.root.getText(),
      enabled: await browser.executeScript(function(root){
        return !root.getAttribute('class').includes('disabled');
      }, this.root.getWebElement())
    };
  }
}

module.exports = {Button};