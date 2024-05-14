const keywords = require('./keywords');
const common = require('./common');

const btn = `//button[normalize-space(.)='Add']`;
const btnSave = `//button[normalize-space(.)='Save']`;
const txtFields = `//label[normalize-space(.)='$lableName']/../..//input`;

const self = module.exports = {

    /**
   * Click button
   * @author Nam Hoang
   * @param {string} btnName The name of button
   */
    async clickButtonByName(btnName) {
        await keywords.waitClick.call(this, btn.replace('$btnName', btnName));
    },

    /**
    * Add an user
    * @author Nam Hoang
    * @param {string} userRole The role of new user.
    * @param {string} employeeName The employee name of new user.
    * @param {string} status The status of new user.
    * @return {string} The user information string has just been added.
    */
    async addUser(userRole, employeeName, status) {
        await self.clickButtonByName.call(this, 'Add');
        await common.selectDropdownItemByValue.call(this, userRole, 'User Role');
        await common.selectDropdownItemByHint.call(this, employeeName, 'Employee Name', employeeName);
        await common.selectDropdownItemByValue.call(this, status, 'Status');
        const username = 'user_' + await self.randomString.call(this, 'username', 8);
        const txtUsernameField = txtFields.replace('$lableName', 'Username');
        await keywords.setText.call(this, txtUsernameField, username);
        const password = await self.randomString.call(this, 'password', 8);
        const txtPasswordField = txtFields.replace('$lableName', 'Password');
        await keywords.setText.call(this, txtPasswordField, password);
        const txtConfirmPasswordField = txtFields.replace('$lableName', 'Confirm Password');
        await keywords.setText.call(this, txtConfirmPasswordField, password);
        const encodedPassword = await common.encodeString.call(this, password);
        const userInfo = '[userRole="' + userRole + '",employeeName="' + employeeName + '",status="' + status + '",username="' + username + '",encodedPassword="' + encodedPassword + '"]';
        console.log('userInfo=' + userInfo);
        await keywords.waitClick.call(this, btnSave);
        return userInfo;
    },

    /**
    * Add multiple users from CSV file
    * @author Nam Hoang
    * @param {string} filePath The path of csv file.
    */
    async addMultipleUsersFromCSV(filePath) {
        const csvData = await common.readDataFromCSVFile.call(this, filePath);
        for (let i = 1; i < csvData.length; i++) {
            const username = 'user_' + await self.randomString.call(this, 'username', 8);
            console.log('username=' + username);
            const password = await self.randomString.call(this, 'password', 8);
            console.log('password=' + password);
            await self.addUser.call(this, csvData[i]._0, csvData[i]._1, csvData[i]._2, username, password);
            // await keywords.waitClick.call(this, btnSave);
        }
    },

    /**
    * Random string
    * @author Nam Hoang
    * @param {string} strType The type of string that you want to random. Ex: we can random a part of username, password
    * @param {number} length The lenth of random string.
    * @return {string} The random string
    */
    async randomString(strType, length) {
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const uppercaseChars = lowercaseChars.toUpperCase();
        const numericChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';
        let randomString = '';
        if (strType === 'username') {
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * numericChars.length);
                randomString += numericChars[randomIndex];
            }
        } else {
            randomString = uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)] + lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)] + symbolChars[Math.floor(Math.random() * symbolChars.length)];
            for (let i = 1; i < length - 2; i++) {
                const randomIndex = Math.floor(Math.random() * numericChars.length);
                randomString += numericChars[randomIndex];
            }
        }
        return randomString;
    },
};
