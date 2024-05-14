const { setWorldConstructor, setDefaultTimeout } = require('@cucumber/cucumber');
const webdriver = require('selenium-webdriver');
require('newmsedgedriver');
require('chromedriver');
require('geckodriver');
const config = require('./config');

console.log('You are running on env:', process.env.BROWSER);

let capabilities;

switch (process.env.BROWSER) {
case 'edge':
    capabilities = {
        'browserName': 'MicrosoftEdge',
        'javascriptEnabled': true,
        'acceptInsecureCerts': true,
        'ms:edgeOptions': {
            args: ['--allow-insecure-localhost', '--ignore-certificate-errors',
                '--disable-gpu', '--headless', '--window-size=1920,1080'],
        },
    };
    break;

case 'firefox':
    capabilities = {
        'browserName': 'firefox',
        'acceptInsecureCerts': true,
        'moz:firefoxOptions': {
            args: ['--allow-insecure-localhost', '--ignore-certificate-errors',
                '--disable-gpu', '--headless', '--window-size=1920,1080'],
        },
    };
    break;

default:
    capabilities = {
        'browserName': 'chrome',
        'acceptInsecureCerts': true,
        'goog:chromeOptions': {
            args: ['--allow-insecure-localhost', '--ignore-certificate-errors',
                '--disable-gpu', '--headless', '--window-size=1920,1080'],
            extensions: [],
        },
    };
    break;
}
/**
* https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/world.md
* World, is an isolated scope for each scenario, exposed to the steps and
* most hooks as this. It allows you to set variables in one step and
* recall them in a later step.
* All variables set this way are discarded when the scenario concludes.
* @param {object} worldParameters The worldParameters configuration option
* allows you to provide this information to Cucumber.
*/
function CustomWorld({ attach, parameters }) {
    this.attach = attach;
    this.parameters = parameters;
    this.driver = new webdriver.Builder()
        .withCapabilities(capabilities)
        .build();
}

setDefaultTimeout(config.TIMEOUT_LONG);
setWorldConstructor(CustomWorld);
