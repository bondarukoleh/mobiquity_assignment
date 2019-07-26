const {mainUrl} = require('./data');
const ENV_ARGS = process.argv.slice(2);

module.exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumSessionId: '2b2acfdcc1043d8d8c0636e22d498908',
  // directConnect: true,
  framework: 'mocha',
  mochaOpts: {
    timeout: 30 * 1000,
    fullTrace: true,
    reporter: ENV_ARGS.includes('--debug') ? 'spec' : 'mocha-allure-reporter'
  },
  specs: ['./specs/**/*.spec.*'],
  baseUrl: mainUrl,
  allScriptsTimeout: 30 * 1000,
  multiCapabilities: [
    {
      browserName: 'chrome',
      maxInstances: 1,
      version: '70',
      chromeOptions: {
        args: [
          '--no-sandbox',
          '--ignore-certificate-errors'
        ]
      }
    },
  ],
  onPrepare: async () => {
    await browser.manage().window().maximize();
    browser.clearState = async function (){
      await browser.manage().deleteAllCookies();
    };
  },
};
