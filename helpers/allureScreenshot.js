const ENV_ARGS = process.argv.slice(2);

async function allureScreenShot(title = 'Screenshoot') {
  try {
    const png = await browser.takeScreenshoot();
    return allure.createAttachment(title, Buffer.from(png, 'base64'), 'image/png');
  } catch (e) {
    if (e.toString().includes('window was already closed')) {
      console.log(`Window was already closed, couldn't make screenshot`);
    }
  }
}

const stubScreenshot = () => {};

module.exports = {
  takeScreenshoot : ENV_ARGS.includes('--debug') ? stubScreenshot : allureScreenShot
};




