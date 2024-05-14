const { Before, AfterStep, After, Status } = require('@cucumber/cucumber');

Before(function() {
    return this.driver.manage().window().maximize();
});

AfterStep(async function({ result }) {
    const world = this;
    if (result.status === Status.FAILED) {
        await this.driver.takeScreenshot().then((screenShot) => {
            world.attach(screenShot, 'base64:image/png');
        });
    }
});

After(function() {
    return this.driver.quit();
});
