var {defineSupportCode} = require('cucumber');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

const EC = protractor.ExpectedConditions;
const waitTime = 5000;


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

function waitForElemAndCheckItsText(selector, text, callback) {
  const elem = element.all(by.css(selector)).get(0);
  browser.wait(EC.presenceOf(elem), waitTime, `waiting for element '${selector}'`);
  expect(elem.getText()).to.eventually.equal(text, `inside element "${selector}"`)
    .and.notify(callback);
}

