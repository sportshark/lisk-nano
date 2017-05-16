var {defineSupportCode} = require('cucumber');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var {waitForElemAndCheckItsText} = require('../support/util.js');

chai.use(chaiAsPromised);
var expect = chai.expect;

defineSupportCode(({Given, When, Then}) => {
  Then('I should be on login page', function (callback) {
    waitForElemAndCheckItsText('.login-button', 'LOGIN', callback);
  });
});
