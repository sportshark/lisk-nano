var {defineSupportCode} = require('cucumber');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var { waitForElemAndCheckItsText } = require('../support/util.js');

chai.use(chaiAsPromised);
var expect = chai.expect;

defineSupportCode(({Given, When, Then}) => {
  Then('I should see forging center', function (callback) {
    // FIXME: there is some bug in forging center that makes it really slow to load
    // should be fixed by @alihaghighatkhah in #174
    //browser.sleep(10000);

    waitForElemAndCheckItsText('forging md-card .title', 'genesis_17');
    waitForElemAndCheckItsText('forging md-card md-card-title .md-title', 'Forged Blocks');
    callback();
  });
});
