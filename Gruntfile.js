module.exports = function (grunt) {
  require('jit-grunt')(grunt); // eslint-disable-line import/no-extraneous-dependencies

  grunt.initConfig({
    eslint: {
      options: {
        configFile: '.eslintrc.json',
        format: 'codeframe',
        fix: false,
      },
      all: {
        src: ['src/**/*.js', 'e2e-test/**/*.js', 'test/**/*.js', 'app/main.js', '*.js'],
      },
    },
  });

  grunt.registerTask('test', ['newer:eslint']);
  grunt.registerTask('travis', ['test']);
  grunt.registerTask('default', ['test']);

  grunt.registerTask('eslint-fix', 'Run eslint and fix formatting', () => {
    grunt.config.set('eslint.options.fix', true);
    grunt.task.run('newer:eslint');
  });
};
