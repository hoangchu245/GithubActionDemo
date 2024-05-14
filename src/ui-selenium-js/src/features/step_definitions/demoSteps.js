const { When } = require('@cucumber/cucumber');
const demoPage = require('../page_objects/demoPage');

When('An user click button {string}', demoPage.clickButtonByName);

When('Add an user with {string} {string} {string}', demoPage.addUser);

When('Add multiple users from CSV file {string}', demoPage.addMultipleUsersFromCSV);
