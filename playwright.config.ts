import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  reporter: [['list'],
   ['html', { outputFolder: 'report', open: 'never' }],
   ['json', { outputFile: 'report/test-results.json' }], 
   ['junit',{ outputFile: 'report/junit-results.xml' } 
  ]],
  use: {
    baseURL: 'https://petstore.swagger.io/v2/',
    extraHTTPHeaders: {
      'Content-Type': 'application/json'
    }

  }

});
