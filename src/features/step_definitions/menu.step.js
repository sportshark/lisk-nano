var {defineSupportCode} = require('cucumber');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

const EC = protractor.ExpectedConditions;
const waitTime = 4000;

defineSupportCode(({Given, When, Then}) => {
  When('I click "{itemSelector}" in main menu', function (itemSelector, callback) {
    waitForElemAndClickIt('header .md-icon-button');
    browser.sleep(1000);
    waitForElemAndClickIt('md-menu-item .md-button.' + itemSelector.replace(/ /g, '-'), callback);
  });

  Then('I should see in "{fieldName}" field:', function (fieldName, value, callback) {
    const elem = element(by.css('.' + fieldName.replace(/ /g, '-')));
    expect(elem.getAttribute('value')).to.eventually.equal(value)
      .and.notify(callback);
  });
});


function waitForElemAndClickIt(selector, callback) {
  const elem = element.all(by.css(selector)).get(0);
  browser.wait(EC.presenceOf(elem), waitTime, `waiting for element '${selector}'`);
  elem.click();
  if (callback) callback();
}
