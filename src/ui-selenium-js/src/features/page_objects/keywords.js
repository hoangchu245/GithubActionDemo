// eslint-disable-next-line no-unused-vars
const { By, until, WebElement, Key } = require('selenium-webdriver');
const { promisify } = require('util');
const { TIMEOUT_SHORT, TIMEOUT_MEDIUM } = require('../support/config');
const sleep = promisify(setTimeout);
const chai = require('chai');
const { assert } = chai;
const glob = require('glob');

const self = module.exports = {
    /**
    * Wait until the element is present on DOM.
    * @author Nam Hoang
    * @param {String} xpath The element xpath.
    * @param {String} timeout The waiting time.
    * @return {WebElement} The web element.
    */
    async waitUntilElementLocated(xpath, timeout = TIMEOUT_MEDIUM) {
        return await this.driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
    },

    /**
    * Wait until the elements are present on DOM.
    * @author Nam Hoang
    * @param {String} xpath The element xpath.
    * @param {String} timeout The waiting time.
    * @return {Array<WebElement>} The array of web elements.
    */
    async waitUntilElementsLocated(xpath, timeout = TIMEOUT_MEDIUM) {
        return await this.driver.wait(until.elementsLocated(By.xpath(xpath)), timeout);
    },

    /**
    * Wait until the element is not present on DOM.
    * @author Nam Hoang
    * @param {String} xpath The element xpath.
    * @param {String} timeout The waiting time.
    * @return {Boolean} true if the element is not present on DOM otherwise false.
    */
    async waitUntilStalenessOfElement(xpath, timeout = TIMEOUT_MEDIUM) {
        const element = await self.waitUntilElementLocated.call(this, xpath);
        return await this.driver.wait(until.stalenessOf(element), timeout);
    },

    /**
    * Wait until the element is present on DOM and visible on UI.
    * @author Nam Hoang
    * @param {String} xpath The element xpath.
    * @param {String} timeout The waiting time.
    * @return {WebElement} The web element.
    */
    async waitUntilElementIsVisible(xpath, timeout = TIMEOUT_MEDIUM) {
        const element = await self.waitUntilElementLocated.call(this, xpath);
        return await this.driver.wait(until.elementIsVisible(element), timeout);
    },

    /**
    * Wait for the page is loaded
    * @author Nam Hoang
    * @param {String} xpathLoadingSpinner The element xpath of Loading Spinner.
    * @param {String} timeout The waiting time.
    */
    async waitForPageIsLoaded(xpathLoadingSpinner, timeout = TIMEOUT_MEDIUM) {
        const loadingSpinner = await this.driver.findElements(By.xpath(xpathLoadingSpinner));
        const elementsToWaitFor = [...loadingSpinner];
        for (const element of elementsToWaitFor) {
            await this.driver.wait(until.stalenessOf(element), timeout);
        }
    },

    /**
    * Wait until the element is present on DOM but not visible on UI.
    * @author Nam Hoang
    * @param {String} xpath The element xpath.
    * @param {String} timeout The waiting time.
    * @return {WebElement} The web element.
    */
    async waitUntilElementIsNotVisible(xpath, timeout = TIMEOUT_MEDIUM) {
        const element = await self.waitUntilElementLocated.call(this, xpath);
        return await this.driver.wait(until.elementIsNotVisible(element), timeout);
    },

    /**
    * Wait until the element is clickable.
    * @author Nam Hoang
    * @param {String} xpath The element xpath.
    * @param {String} timeout The waiting time.
    * @return {WebElement} The web element.
    */
    async waitUntilElementIsClickable(xpath, timeout = TIMEOUT_MEDIUM) {
        const element = await self.waitUntilElementIsVisible.call(this, xpath);
        return await this.driver.wait(until.elementIsEnabled(element), timeout);
    },

    /**
    * Sleep and wait for ms milliseconds.
    * @author Nam Hoang
    * @param {String} ms The number of milliseconds to sleep.
    */
    async sleepFor(ms) {
        await sleep(ms);
    },

    /**
    * Refresh current page
    * @author Nam Hoang
    */
    async refresh() {
        await this.driver.navigate().refresh();
    },

    /**
    * Wait until the title is matched.
    * @author Nam Hoang
    * @param {String} title The page title.
    * @param {String} timeout The waiting time.
    */
    async waitUntilTitleIs(title, timeout = TIMEOUT_MEDIUM) {
        return await this.driver.wait(until.titleIs(title), timeout);
    },

    /**
    * Clear text box then input text.
    * @author Nam Hoang
    * @param {String} xpath The text box xpath.
    * @param {String} text The text you want to input.
    */
    async setText(xpath, text) {
        const element = await self.waitUntilElementIsVisible.call(this, xpath);
        await element.sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await element.sendKeys(text);
    },

    /**
    * Clear text box.
    * @author Trang Ngo
    * @param {String} xpath The text box xpath.
    */
    async deleteAllText(xpath) {
        const element = await self.waitUntilElementIsVisible.call(this, xpath);
        await element.sendKeys(Key.CONTROL, 'a', Key.DELETE);
    },

    /**
    * Wait the element to be clickable then click it.
    * @author Nam Hoang
    * @param {String} xpath The element xpath.
    * @param {String} timeout The waiting time.
    */
    async waitClick(xpath, timeout = TIMEOUT_MEDIUM) {
        const element = await self.waitUntilElementIsClickable.call(this, xpath, timeout);
        await element.click();
    },

    /**
    * Wait and get text.
    * @author Nam Hoang
    * @param {String} xpath The element xpath.
    * @param {String} timeout The waiting time.
    * @return {String} Text of element.
    */
    async waitAndGetText(xpath, timeout = TIMEOUT_MEDIUM) {
        const element = await self.waitUntilElementIsVisible.call(this, xpath, timeout);
        const result = await element.getText();
        return result;
    },

    /**
    * Wait and get attribute value.
    * @author Nam Hoang
    * @param {String} xpath The element xpath.
    * @param {String} attribute The element attribute.
    * @param {String} timeout The waiting time.
    * @return {String} Attribute value of the element.
    */
    async waitAndGetAttribute(xpath, attribute, timeout = TIMEOUT_MEDIUM) {
        const element = await self.waitUntilElementLocated.call(this, xpath, timeout);
        const result = await element.getAttribute(attribute);
        return result;
    },

    /**
    * Wait and get CSS value.
    * @author Trang Ngo
    * @param {String} xpath The element xpath.
    * @param {String} propertyName The CSS property name of the element.
    * @param {String} timeout The waiting time.
    * @return {String} CSS value of the element.
    */
    async waitAndGetCSSValue(xpath, propertyName, timeout = TIMEOUT_MEDIUM) {
        const element = await self.waitUntilElementLocated.call(this, xpath, timeout);
        const result = element.getCssValue(propertyName);
        return result;
    },

    /**
    * Click dropdown option by value.
    * @author Nam Hoang
    * @param {String} xpath The element xpath.
    * @param {String} valueExpect The expected value.
    * @param {String} timeout The waiting time.
    */
    async waitAndClickDropdownOptionByValue(xpath, valueExpect, timeout = TIMEOUT_MEDIUM) {
        await self.waitUntilElementIsClickable.call(this, xpath, timeout);
        await driver.findElements(By.xpath(xpath)).then((elements) => {
            elements.forEach(async (element) => {
                const value = await element.getAttribute('value');
                if (value === String(valueExpect)) {
                    await element.click();
                }
            });
        });
    },

    /**
    * Wait and scroll element into view(middle).
    * @author Nam Hoang
    * @param {String} xpath The element xpath.
    * @param {String} timeout The waiting time for scroll to complete.
    */
    async waitAndScrollIntoView(xpath, timeout = TIMEOUT_SHORT) {
        const element = await self.waitUntilElementLocated.call(this, xpath);
        const script = `
            arguments[0].scrollIntoView({
              behavior: 'auto',
              block: 'center',
              inline: 'center'
            });
          `;
        await this.driver.executeScript(script, element);
        await sleep(timeout);
    },

    /**
    * Wait and scroll to top of the page.
    * @author Nam Hoang
    * @param {String} timeout The waiting time for scroll to top complete.
    */
    async waitAndScrollToTop(timeout = TIMEOUT_SHORT) {
        const script = `
            window.focus();
            window.scrollTo(0, 0);
          `;
        await this.driver.executeScript(script);
        await sleep(timeout);
    },

    /**
    * Wait and scroll to bottom of the page.
    * @author Nam Hoang
    * @param {String} timeout The waiting time for scroll to bottom complete.
    */
    async waitAndScrollToBottom(timeout = TIMEOUT_SHORT) {
        const script = `
            window.focus();
            window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
          `;
        await this.driver.executeScript(script);
        await sleep(timeout);
    },

    /**
    * Verify Element is displayed.
    * @author Nam Hoang
    * @param {String} xpath The element xpath.
    * @param {String} timeout The waiting time.
    */
    async verifyElementIsDisplayed(xpath, timeout = TIMEOUT_MEDIUM) {
        const result = await self.isDisplayed.call(this, xpath, timeout);
        assert(result, true);
    },

    /**
  * Wait for Element is NOT present on DOM
  * @author Tuyen Nguyen
  * @param {String} xpath The element xpath.
  * @param {String} timeout The waiting time.
  * @return {Boolean} Element is displayed or not
  */
    async waitForElementIsNotPresent(xpath, timeout = TIMEOUT_MEDIUM) {
        await this.driver.wait(async () => {
            return await this.driver.findElements(By.xpath(xpath)).then((elements) => {
                if (elements.length <= 0) {
                    return true;
                }
                return false;
            });
        }, timeout, 'The element was still present when it should have disappeared.');
    },

    /**
    * Check element is displayed.
    * @author Nam Hoang
    * @param {String} xpath The element xpath.
    * @return {Boolean} Element is displayed or not
    */
    async isDisplayed(xpath) {
        const element = await self.waitUntilElementLocated.call(this, xpath);
        const result = await element.isDisplayed();
        return result;
    },

    /**
    * Check element is existed.
    * @author Nam Hoang
    * @param {String} xpath The element xpath.
    * @return {Boolean} element is existing or not
    */
    async elementIsExisted(xpath) {
        try {
            await this.driver.findElement(By.xpath(xpath));
            return true;
        } catch (err) {
            return false;
        }
    },

    /**
    * Remove attribute of element.
    * @author Nam Hoang
    * @param {String} xpath The element xpath.
    * @param {String} attribute The element attribute.
    */
    async removeAttribute(xpath, attribute) {
        const element = await self.waitUntilElementLocated.call(this, xpath);
        const script = `arguments[0].removeAttribute('${attribute}')`;
        await this.driver.executeScript(script, element);
    },

    /**
    * Move mouse over the element.
    * @author Nam Hoang
    * @param {String} xpath The element xpath.
    */
    async moveMouse(xpath) {
        const element = await self.waitUntilElementIsClickable.call(this, xpath);
        await this.driver.actions().move({ origin: element, x: 0, y: 0 }).perform();
    },

    /**
    * Verify Element include specific text.
    * @author Nam Hoang
    * @param {String} xpath The element xpath.
    * @param {String} text The specific expected text.
    */
    async verifyElementIncludeText(xpath, text) {
        await this.driver.findElements(By.xpath(xpath)).then((elements) => {
            elements.forEach(async (element) => {
                const value = await element.getText();
                assert.include(value, text, `${value} not includes ${text}`);
            });
        });
    },

    /**
    * Switch to the next windowns or tabs.
    * @author Nam Hoang
    */
    async switchNextWindown() {
        const originalWindow = await this.driver.getWindowHandle();
        await this.driver.wait(
            async () => (await this.driver.getAllWindowHandles()).length === 2,
            TIMEOUT_SHORT,
        );
        const windows = await this.driver.getAllWindowHandles();
        windows.forEach(async (handle) => {
            if (handle !== originalWindow) {
                await this.driver.switchTo().window(handle);
            }
        });
    },

    /**
    * Count number of elements having the same xpath value.
    * @author Nam Hoang
    * @param {String} xpath The element xpath.
    * @return {number} Number of elements.
    */
    async countNumberOfElementsByXPath(xpath) {
        const elements = await self.waitUntilElementsLocated.call(this, xpath);
        return parseInt(elements.length);
    },

    /**
    * Wait for file is downloaded
    * @author Hanh Nguyen
    */

    async waitForFileIsDownloaded(filePath, timeout = TIMEOUT_MEDIUM) {
        await this.driver.wait(async function() {
            const files = glob.sync(filePath);
            return files.length > 0;
        }, timeout);
    },

    /**
     * Check element is selected
     * @author Han Hoang
     * @param {String} xpath The element xpath.
     * @param {String} timeout The waiting time.
     * @return {Boolean} Element is selected or not
     */
    async isSelected(xpath, timeout = TIMEOUT_MEDIUM) {
        const element = await self.waitUntilElementLocated.call(this, xpath, timeout);
        return await element.isSelected();
    },

    /**
    * Click the emelemt by provived offset
    * @author Lan Tran
    * @param {String} element
    * @param {Number} xOffset the x offset
    * @param {Number} yOffset the y offset
    */
    async clickElementByOffset(element, xOffset, yOffset) {
        await this.driver.actions().move({ origin: element, x: xOffset, y: yOffset })
            .click()
            .perform();
    },
};
