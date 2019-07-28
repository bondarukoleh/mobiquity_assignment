const {mainUrl} = require('./data');
const ENV_ARGS = process.argv.slice(2);

module.exports.config = {
  // seleniumAddress: 'http://localhost:4444/wd/hub', /*You can run selenium standalone by yourself.*/
  directConnect: false,
  framework: 'mocha',
  mochaOpts: {
    timeout: 30 * 1000,
    fullTrace: true,
    reporter: ENV_ARGS.includes('--debug') ? 'spec' : 'mocha-allure-reporter'
  },
  specs: ['./specs/**/*.spec.*'],
  baseUrl: mainUrl,
  allScriptsTimeout: 30 * 1000,
  capabilities: {
    browserName: 'chrome',
    unexpectedAlertBehaviour: 'accept',
    count: 2,
    version: '70',
    chromeOptions: {
      args: [
        '--no-sandbox',
        '--ignore-certificate-errors',
        '--disable-gpu',
        '--disable-gpu-program-cache',
        '--disable-gpu-shader-disk-cache',
        '--process-per-tab',
        '--process-per-site'
      ]
    }
  },
  onPrepare: async () => {
    await browser.manage().window().maximize();
  },
};
