var {defineSupportCode} = require('cucumber');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

const EC = protractor.ExpectedConditions;
const waitTime = 5000;

defineSupportCode(({Given, When, Then}) => {
  When('I click checkbox on table row no. {index}', function (index, callback) {
    waitForElemAndClickIt('delegates tr:nth-child(' + index + ') md-checkbox', callback);
  });

  When('Search twice for "{searchTerm}" in vote dialog', function (searchTerm, callback) {
    element.all(by.css('md-autocomplete-wrap input')).get(0).sendKeys(searchTerm);
    waitForElemAndClickIt('md-autocomplete-parent-scope');
    element.all(by.css('md-autocomplete-wrap input')).get(0).sendKeys(searchTerm);
    waitForElemAndClickIt('md-autocomplete-parent-scope', callback);
  });

  Then('I should see delegates list with {count} lines', function (count, callback) {
    expect(element.all(by.css('md-menu-item.vote-list-item')).count())
      .to.eventually.equal(parseInt(count, 10))
      .and.notify(callback);
  });
});

function waitForElemAndClickIt(selector, callback) {
  const elem = element.all(by.css(selector)).get(0);
  browser.wait(EC.presenceOf(elem), waitTime, `waiting for element '${selector}'`);
  elem.click();
  if (callback) callback();
}
