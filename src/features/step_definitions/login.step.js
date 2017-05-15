var {defineSupportCode} = require('cucumber');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

const EC = protractor.ExpectedConditions;
const waitTime = 4000;

defineSupportCode(({Given, When, Then}) => {
  Given('I\'m on login page', (callback) => {
    browser.ignoreSynchronization = true;
    browser.driver.manage().window().setSize(1000, 1000);
    browser.get('about:blank');
    browser.refresh();
    browser.get('http://localhost:8080/#/?peerStack=localhost').then(callback);
  });

  Then('I should be logged in', function (callback) {
    waitForElemAndCheckItsText('.logout-button', 'LOGOUT', callback);
  });
});

function waitForElemAndCheckItsText(selector, text, callback) {
  const elem = element.all(by.css(selector)).get(0);
  browser.wait(EC.presenceOf(elem), waitTime, `waiting for element '${selector}'`);
  expect(elem.getText()).to.eventually.equal(text, `inside element "${selector}"`)
    .and.notify(callback);
}
