const {waitForVisible} = require('../../helpers');

class Button {
  constructor(root) {
    this.root = root;
  }

  async click() {
    await waitForVisible(this.root);
    await this.root.click();
  }

  async getText() {
    await waitForVisible(this.root);
    return this.root.getText();
  }
}

module.exports = {Button};