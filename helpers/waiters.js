const {ExpectedConditions, ElementFinder} = require('protractor');

/**
 * Wait until element to be visible
 * @param {ElementFinder} element 
 * @param {number} timeToWait 
 */
async function waitForVisible(element, timeToWait = 3000) {
  await browser.wait(ExpectedConditions.visibilityOf(element), timeToWait,
    `Element ${element.locator()} should be visible.`);
}

async function waitForAlert(timeToWait = 3000) {
  await browser.wait(ExpectedConditions.alertIsPresent(), timeToWait, `Alert should present`);
}

module.exports = {waitForVisible, waitForAlert};