const EC = protractor.ExpectedConditions;
const waitTime = 4000;

function waitForElemAndCheckItsText(selector, text, callback) {
  const elem = element(by.css(selector));
  browser.wait(EC.presenceOf(elem), waitTime, `waiting for element '${selector}'`);
  expect(elem.getText()).to.eventually.equal(text, `inside element "${selector}"`)
    .and.notify(callback);
}

function waitForElemAndClickIt(selector, callback) {
  const elem = element(by.css(selector));
  browser.wait(EC.presenceOf(elem), waitTime, `waiting for element '${selector}'`);
  elem.click();
  if (callback) callback();
}

function waitForElemAndSendKeys(selector, keys, callback) {
  const elem = element(by.css(selector));
  browser.wait(EC.presenceOf(elem), waitTime, `waiting for element '${selector}'`);
  elem.sendKeys(keys);
  if (callback) callback();
}

function checkAlertDialog(title, text, callback) {
  waitForElemAndCheckItsText('md-dialog h2', title);
  waitForElemAndCheckItsText('md-dialog .md-dialog-content-body', text);
  const okButton = element(by.css('md-dialog .md-button.md-ink-ripple'));
  okButton.click();
  browser.sleep(500);
  if (callback) callback();
}

module.exports = {
  waitForElemAndCheckItsText,
  waitForElemAndClickIt,
  waitForElemAndSendKeys,
  checkAlertDialog,
};
