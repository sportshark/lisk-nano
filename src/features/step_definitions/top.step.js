var {defineSupportCode} = require('cucumber');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

const EC = protractor.ExpectedConditions;
const waitTime = 4000;

defineSupportCode(({Given, When, Then}) => {
  Then('I should be on login page', function (callback) {
    waitForElemAndCheckItsText('.login-button', 'LOGIN', callback);
  });
});

function waitForElemAndCheckItsText(selector, text, callback) {
  const elem = element.all(by.css(selector)).get(0);
  browser.wait(EC.presenceOf(elem), waitTime, `waiting for element '${selector}'`);
  expect(elem.getText()).to.eventually.equal(text, `inside element "${selector}"`)
    .and.notify(callback);
}
