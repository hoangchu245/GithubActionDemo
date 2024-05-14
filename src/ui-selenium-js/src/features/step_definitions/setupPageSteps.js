const { When } = require('@cucumber/cucumber');
const setupPage = require('../page_objects/setupPage');

When('A user set up OrangeHRM application system', setupPage.setupPage);
