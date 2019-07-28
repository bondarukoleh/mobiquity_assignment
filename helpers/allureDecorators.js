const {takeScreenshoot} = require('./allureScreenshot');

const ENV_ARGS = process.argv.slice(2);
const allureAvailable = !ENV_ARGS.includes('--debug');
const allureStartStep = (stepName) => allure._allure.startStep(stepName, Date.now());
const allureEndStep = (status) => allure._allure.endStep(status, Date.now());
const stepStub = () => {};
/**
 * This function helps to decorate steps from test. It helps to debug tests.
 * Also it makes a screenshot on failed step. Of course it can be more powerful.
 * @param {Object} instanceContext "this" of page that we want to decorate
 * @param {Array<string>} methodsNames array of methods from page we want to decorate
 */
function stepDecorator(instanceContext, methodsNames) {
  for (const methodName of methodsNames) {
    const originalFunction = instanceContext[methodName].bind(instanceContext);
    instanceContext[methodName] = async function (...args) {
      try {
        allureAvailable ? allureStartStep(methodName) : stepStub();
        const result = await originalFunction(...args);
        allureAvailable ? allureEndStep('passed') : stepStub();
        return result;
      } catch (e) {
        console.log(`Failed method - "${methodName}" and arguments: ${JSON.stringify(args)}.`);
        allureAvailable ? allureEndStep('failed') : stepStub();
        await takeScreenshoot(methodName);
        throw e;
      }
    };
  }
}


/**
 * Function makes screenshot if assertion fails. Helps to debug tests.
 * Assertion function made async - just for consistency with async assertion decorator.
 * @param {string} assertionName 
 * @param {async () => {}} assertFunction 
 */
async function assertionWithAllure(assertionName, assertFunction) {
  try {
    allureStartStep(assertionName);
    await assertFunction();
    allureEndStep('passed');
  } catch (e) {
    allureEndStep('failed');
    await takeScreenshoot();
    throw e;
  }
}

async function assertionStub(assertionName, assertFunction) {
  await assertFunction();
}

const assertion = allureAvailable ? assertionWithAllure : assertionStub;

module.exports = {stepDecorator, assertion};
