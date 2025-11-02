const { REFUSED } = require("dns");

module.exports = {
    default: {
      require: [
        'tests/e2e/**/steps/**/*.ts',
        'tests/e2e/support/**/*.ts'
      ],
      format: [
        'progress',
        'html:reports/cucumber-report.html',
        'json:allure-results/allure-cucumber.json'

      ],
      requireModule: ['ts-node/register'],
      publishQuiet: true,
      worldParameters: {},
      parallel: 1,
      retry: process.env.CI ? 2 : 0
    },
    orange: {
      paths: ['tests/e2e/orangehrm/features/**/*.feature'],
      parallel: 1,
      retry: 1
    },
  
    demoblaze: {
      paths: ['tests/e2e/demoblaze/features/**/*.feature'],
      parallel: 1,
      retry: 1
    }
  };
  