const { devices } = require('@playwright/test');

const config = {
    testDir: "./tests",
    url: "https://netology.ru/?modal=sign_in",
    use: {
      launchOptions: {
        headless: false,
        slowMo: 500,      
      },
    },
    projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
    ]
  };

  module.exports = config;

  
