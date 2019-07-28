const {waitForVisible} = require('../../helpers');

class List {
  constructor(root) {
    this.root = root;
    this.liElements = this.root.$$('li');
  }

  async click(optionName) {
    await waitForVisible(this.root);
    const neededOption = element(by.js((elements, optionName) => {
      /* faster way to click on element. Since Selenium elements collection - is array-like
       we cannot use find on it. That's why I need to Array.prototype.find.call */
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