const { defineSupportCode } = require('cucumber');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {
  waitForElemAndCheckItsText,
  waitForElemAndClickIt,
  waitForElemAndSendKeys,
  checkAlertDialog,
} = require('../support/util.js');

chai.use(chaiAsPromised);
const expect = chai.expect;

const accounts = {
  genesis: {
    passphrase: 'wagon stock borrow episode laundry kitten salute link globe zero feed marble',
    address: '16313739661670634666L',
  },
  delegate: {
    passphrase: 'recipe bomb asset salon coil symbol tiger engine assist pact pumpkin visit',
    address: '537318935439898807L',
    username: 'genesis_17',
  },
  'empty account': {
    passphrase: 'stay undo beyond powder sand laptop grow gloom apology hamster primary arrive',
    address: '5932438298200837883L',
  },
  'delegate candidate': {
    passphrase: 'right cat soul renew under climb middle maid powder churn cram coconut',
    address: '544792633152563672L',
    username: 'test',
  },
  'second passphrase candidate': {
    passphrase: 'dolphin inhale planet talk insect release maze engine guilt loan attend lawn',
    address: '4264113712245538326L',
  },
};
accounts['any account'] = accounts.genesis;

defineSupportCode(({ Given, When, Then, setDefaultTimeout }) => {
  setDefaultTimeout(20 * 1000);

  When('I fill in "{value}" to "{fieldName}" field', (value, fieldName, callback) => {
    const selectorClass = `.${fieldName.replace(/ /g, '-')}`;
    waitForElemAndSendKeys('input' + selectorClass + ', textarea' + selectorClass, value, callback);
  });

  Then('I should see "{value}" in "{fieldName}" field', (value, fieldName, callback) => {
    const elem = element(by.css(`.${fieldName.replace(/ /g, '-')}`));
    expect(elem.getAttribute('value')).to.eventually.equal(value)
      .and.notify(callback);
  });

  When('I click "{elementName}"', (elementName, callback) => {
    const selector = `.${elementName.replace(/\s+/g, '-')}`;
    waitForElemAndClickIt(selector, callback);
  });

  When('I click tab number {index}', (index, callback) => {
    waitForElemAndClickIt(`main md-tab-item:nth-child(${index})`, callback);
  });

  When('I select option no. {index} from "{selectName}" select', (index, selectName, callback) => {
    waitForElemAndClickIt(`md-select.${selectName}`);
    const optionElem = element.all(by.css('md-select-menu md-option')).get(index - 1);
    browser.wait(EC.presenceOf(optionElem), waitTime);
    optionElem.click().then(callback);
  });

  Then('the option "{optionText}" is selected in "{selectName}" select', (optionText, selectName, callback) => {
    waitForElemAndCheckItsText(`.${selectName} md-select-value .md-text`, optionText, callback);
  });

  Then('I should see toast saying "{text}"', (text, callback) => {
    waitForElemAndCheckItsText('md-toast', text, callback);
  });

  Then('I should see alert dialog with title "{title}" and text "{text}"', (title, text, callback) => {
    checkAlertDialog(title, text, callback);
  });

  Then('I should see table with {lineCount} lines', (lineCount, callback) => {
    browser.sleep(3500);
    expect(element.all(by.css('table tbody tr')).count()).to.eventually.equal(parseInt(lineCount, 10))
      .and.notify(callback);
  });

  Then('I should see "{elementName}"', (elementName, callback) => {
    expect(element.all(by.css(`.${elementName.replace(/ /g, '-')}`)).count()).to.eventually.equal(1)
      .and.notify(callback);
  });

  Then('I should see "{text}" error message', (text, callback) => {
    waitForElemAndCheckItsText('.md-input-message-animation', text, callback);
  });

  Given('I\'m logged in as "{accountName}"', (accountName, callback) => {
    browser.ignoreSynchronization = true;
    browser.driver.manage().window().setSize(1000, 1000);
    browser.driver.get('about:blank');
    browser.get('http://localhost:8080/#/?peerStack=localhost');
    waitForElemAndSendKeys('.passphrase', accounts[accountName].passphrase);
    waitForElemAndClickIt('.md-button.md-primary.md-raised', callback);
  });

  When('I {iterations} times move mouse randomly', (iterations) => {
    /**
     * Generates a sequence of random pairs of x,y coordinates on the screen that simulates
     * the movement of mouse to produce a pass phrase.
     */
    for (let i = 0; i < iterations; i++) {
      browser.actions()
      .mouseMove(element(by.css('body')), {
        x: 500 + (Math.floor((((i % 2) * 2) - 1) * (249 + (Math.random() * 250)))),
        y: 500 + (Math.floor((((i % 2) * 2) - 1) * (249 + (Math.random() * 250)))),
      }).perform();
      browser.sleep(5);
    }
  });

  When('I remember passphrase, click "{nextButtonSelector}", fill in missing word', (nextButtonSelector, callback) => {
    waitForElemAndCheckItsText('.dialog-save h2', 'Save your passphrase in a safe place!');

    element(by.css('.dialog-save textarea.passphrase')).getText().then((passphrase) => {
      // eslint-disable-next-line no-unused-expressions
      expect(passphrase).to.not.be.undefined;
      const passphraseWords = passphrase.split(' ');
      expect(passphraseWords.length).to.equal(12);
      waitForElemAndClickIt(`.${nextButtonSelector.replace(/ /g, '-')}`);

      element.all(by.css('.dialog-save p.passphrase span')).get(0).getText().then((firstPartOfPassphrase) => {
        const missingWordIndex = firstPartOfPassphrase.length ?
          firstPartOfPassphrase.split(' ').length :
          0;
        element(by.css('.dialog-save input')).sendKeys(passphraseWords[missingWordIndex]).then(callback);
      });
    });
  });
});

