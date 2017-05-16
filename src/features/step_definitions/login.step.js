var {defineSupportCode} = require('cucumber');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var {waitForElemAndCheckItsText} = require('../support/util.js');

chai.use(chaiAsPromised);
var expect = chai.expect;

const EC = protractor.ExpectedConditions;
const waitTime = 4000;

defineSupportCode(({Given, When, Then}) => {
  Given('I\'m on login page', (callback) => {
    browser.ignoreSynchronization = true;
    browser.driver.manage().window().setSize(1000, 1000);
    browser.driver.get("about:blank");
    browser.get('http://localhost:8080/#/?peerStack=localhost').then(callback);
  });

  Then('I should be logged in', function (callback) {
    waitForElemAndCheckItsText('.logout-button', 'LOGOUT', callback);
  });
});

