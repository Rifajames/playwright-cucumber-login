const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const config = require('./browserConfig');

Before(async function () {
  this.browser = await chromium.launch({
    headless: config.headless,
    slowMo: config.slowMo
  });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});