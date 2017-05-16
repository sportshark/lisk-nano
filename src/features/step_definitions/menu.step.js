var {defineSupportCode} = require('cucumber');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var { waitForElemAndClickIt } = require('../support/util.js');

chai.use(chaiAsPromised);
var expect = chai.expect;

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
