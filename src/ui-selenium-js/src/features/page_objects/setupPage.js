const keywords = require('./keywords');
const common = require('./common');
const config = require('../support/config');

const btnNext = `//button[normalize-space(.)='Next']`;
const rdoFreshInstallation = `//label[normalize-space(.)='Fresh Installation']//input[@type='radio']/../span`;
const chkAcceptTerms = `//label[normalize-space(.)='I accept the terms in the License Agreement']//input[@type='checkbox']/../span`;
const rdoNewDB = `//label[normalize-space(.)='New Database']//input[@type='radio']/../span`;
const chkUseSameUser = `//label[normalize-space(.)='Use the same Database User for OrangeHRM']//input[@type='checkbox']/../span`;
const chkEnableEncryption = `//label[normalize-space(.)='Enable Data Encryption']//input[@type='checkbox']/../span`;
const txtFields = `//label[normalize-space(.)='$labelName']/../..//input`;
const txtLastName = `//input[@placeholder="Last Name"]`;
const btnReCheck = `//button[normalize-space(.)='Re-Check']`;
const btnInstall = `//button[normalize-space(.)='Install']`;
const btnLaunchApp = `//button[normalize-space(.)='Launch OrangeHRM']`;
const txtPercentage = `//h5[text()='100%']`;


module.exports = {

    /**
    * Setup page initial
    * @author Nam Hoang
    */
    async setupPage() {
        await keywords.waitClick.call(this, rdoFreshInstallation);
        await keywords.waitClick.call(this, btnNext);
        await keywords.waitClick.call(this, chkAcceptTerms);
        await keywords.waitClick.call(this, btnNext);
        await keywords.waitClick.call(this, rdoNewDB);
        await keywords.waitClick.call(this, chkUseSameUser);
        await keywords.waitClick.call(this, chkEnableEncryption);
        await keywords.setText.call(this, txtFields.replace('$labelName', 'Database Host Name'), 'orangehrm-prod-db');
        await keywords.setText.call(this, txtFields.replace('$labelName', 'Database Name'), 'orangehrm_prod_db');
        await keywords.setText.call(this, txtFields.replace('$labelName', 'Privileged Database Username'), config.DB_USERNAME);
        await keywords.setText.call(this, txtFields.replace('$labelName', 'Privileged Database User Password'), config.DB_PASSWORD);
        await keywords.waitClick.call(this, btnNext);
        await keywords.waitClick.call(this, btnReCheck);
        await keywords.waitClick.call(this, btnNext);
        await keywords.setText.call(this, txtFields.replace('$labelName', 'Organization Name'), 'KMS-SEL-WS');
        await common.selectDropdownItemByValue.call(this, 'Viet Nam', 'Country');
        await common.selectDropdownItemByValue.call(this, 'English (United States)', 'Language');
        await common.selectDropdownItemByValue.call(this, 'Asia/Ho_Chi_Minh', 'Timezone');
        await keywords.waitClick.call(this, btnNext);
        await keywords.setText.call(this, txtFields.replace('$labelName', 'Employee Name'), 'Boss');
        await keywords.setText.call(this, txtLastName, 'A');
        await keywords.setText.call(this, txtFields.replace('$labelName', 'Email'), 'boss.a@gmail.com');
        await keywords.setText.call(this, txtFields.replace('$labelName', 'Admin Username'), config.ADMIN_USERNAME);
        await keywords.setText.call(this, txtFields.replace('$labelName', 'Password'), config.ADMIN_PASSWORD);
        await keywords.setText.call(this, txtFields.replace('$labelName', 'Confirm Password'), config.ADMIN_PASSWORD);
        await keywords.waitClick.call(this, btnNext);
        await keywords.waitClick.call(this, btnInstall);
        await keywords.waitUntilElementIsVisible.call(this, txtPercentage);
        await keywords.waitClick.call(this, btnNext);
        await keywords.waitClick.call(this, btnLaunchApp);
    },
};
