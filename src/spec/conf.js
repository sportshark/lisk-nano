// const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  specs: [
    '../features/*.feature',
  ],

  directConnect: true,
  capabilities: {
    browserName: 'chrome',
  },
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  baseURL: 'http://localhost:8080/',

  cucumberOpts: {
    require: '../features/step_definitions/*.js',
    tags: false,
    format: 'pretty',
    profile: false,
    'no-source': true,
  },
  /*
  onPrepare() {
    const env = jasmine.getEnv();

    // FIXME the following like can make the output cleaner
    // but then shell return code is always 0 even if some tests fail.
    // env.clearReporters();

    env.addReporter(new SpecReporter({
      spec: {
        displayStacktrace: false,
        displayDuration: true,
      },
      summary: {
        displayDuration: true,
      },
    }));

    jasmine.getEnv().addReporter({
      specStarted(result) {
        jasmine.getEnv().currentSpec = result;
      },
      specDone() {
        jasmine.getEnv().currentSpec = null;
      },
    });
  },
  */
};
