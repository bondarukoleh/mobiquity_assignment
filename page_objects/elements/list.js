const {waitForVisible} = require('../../helpers');

class List {
  constructor(root) {
    this.root = root;
    this.liElements = this.root.$$('li');
  }

  async click(optionName) {
    await waitForVisible(this.root);
    const neededOption = element(by.js((elements, optionName) => {
      return Array.prototype.find.call(elements, (element) => element.innerText.trim() === optionName);
    }, this.liElements.getWebElements(), optionName));
    return neededOption.click();
  }

  async getData() {
    await waitForVisible(this.root);
    return browser.executeScript(function (elements){
      return Array.prototype.map.call(elements, (element) => element.innerText.trim());
    }, this.liElements.getWebElements());
  }
}

module.exports = {List};