module.exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // seleniumSessionId: ,
  directConnect: true,
  framework: 'mocha',
  mochaOpts: {
    timeout: 30 * 1000,
    fullTrace: true,
    reporter: 'mocha-allure-reporter'
  },
  specs: ['./specs/**/*.spec.*'],
  baseUrl: 'http://www.google.com',
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
    browser.ignoreSynchronization = true;
  },
}
