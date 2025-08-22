const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Given('I am on the login page', async function () {
  await this.page.goto('https://practicetestautomation.com/practice-test-login/');
});

When('I fill in username {string} and password {string}', async function (username, password) {
  await this.page.fill('#username', username);
  await this.page.fill('#password', password);
});

When('I click the login button', async function () {
  await this.page.click('#submit');
});

Then('I should see the success message {string}', async function (message) {
  const text = await this.page.locator('.post-title').textContent();
  assert(text.includes(message));
});

Then('I should see the error message {string}', async function (message) {
  const text = await this.page.locator('#error').textContent();
  assert(text.includes(message));
});