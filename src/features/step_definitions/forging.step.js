var {defineSupportCode} = require('cucumber');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var { waitForElemAndCheckItsText } = require('../support/util.js');

chai.use(chaiAsPromised);
var expect = chai.expect;

defineSupportCode(({Given, When, Then}) => {
  Then('I should see forging center', function (callback) {
    waitForElemAndCheckItsText('forging .delegate-name', 'genesis_17', callback);
    waitForElemAndCheckItsText('forging md-card.forged-blocks md-card-title .md-title', 'Forged Blocks', callback);
  });
});
