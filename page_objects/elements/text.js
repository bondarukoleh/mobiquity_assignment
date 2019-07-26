const {waitForVisible} = require('../../helpers');

class Text {
  constructor(root) {
    this.root = root;
  }

  async getText() {
    await waitForVisible(this.root);
    return this.root.getText();
  }
}

module.exports = {Text};