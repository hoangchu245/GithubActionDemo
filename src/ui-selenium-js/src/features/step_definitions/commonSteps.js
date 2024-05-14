const { Given, Then, When } = require('@cucumber/cucumber');
const common = require('../page_objects/common');

Given('A user visits OrangeHRM page', common.navigateToOrangeHRMPage);

Given('A user logged in by admin role', common.loginByAdminRole);

Then('Page title is {string}', common.verifyPageTitle);

Then('A user is on {string} page', common.verifyPageURL);

When('A user click {string} item in main menu', common.clickMainMenuItem);

When('A user click {string} item in topbar menu', common.clickTopBarMenuItem);

When('A user click {string} dropdown and choose {string} item in topbar menu', common.selectDropdownMenuItemByText);

Given('Verify the module page header is {string}', common.verifyModulePageHeaderTitle);

Given('Verify the level page header is {string}', common.verifyLevelPageHeaderTitle);

When('A user select option {string} in dropdown {string}', common.selectDropdownItemByValue);

When('A user type a hint {string} in field {string} to search and then select option {string} in the dropdown list', common.selectDropdownItemByHint);

Then('Verify number of records found', common.verifyNumberOfRecordsFound);

Then('Verify this page has pagination', common.verifyPageHasPagination);

Then('Verify the paginated page number is {string}', common.verifyPaginatedPageNumber);

When('A user delete a record with key is {string}', common.clickDeleteRecordByKey);

Then('Verify alert message is {string}', common.verifyAlert);

When('A user click edit a record with key is {string}', common.clickEditActionByKey);

When('A user select checkbox with keys are {string}', common.selectCheckboxByKeys);

When('A user delete selected records', common.deleteSeletedRecords);

When('read csv data file from {string}', common.readDataFromCSVFile);

When('A user upload file {string}', common.uploadFile);

When('A user click {string} item in User Profile dropdown', common.selectItemInUserDropdown);

When('User click the {string} button', common.clickBtnByName);

Then('Verify the main title {string} is displayed correctly', common.verifyTheMainTitleIsDisplayed);

When('User click the {string} button on pop-up', common.clickBtnInPopup);

Then('The popup with the question {string} is displayed', common.verifyPopupIsDisplayed);

Then('The popup with the question {string} is not displayed', common.popupIsNotDisplayed);

Then('Verify a error message {string} is shown under {string} field', common.verifyValidationErrorMessage);

Given('Delete the record {string} to clean environment', common.deleteRecordToCleanEnv);

Given('Verify {string} is displayed in table after adding successfully', common.verifyRecordWithTitleDisplay);

Given('Verify {string} is not displayed in table after removing successfully', common.verifyRecordWithTitleIsNotDisplay);
