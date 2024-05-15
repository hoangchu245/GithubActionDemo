require('dotenv').config();
module.exports = {
    TIMEOUT_SHORT: 3000,
    TIMEOUT_MEDIUM: 50000,
    TIMEOUT_LONG: 100000,
    BASE_URL_LOCAL: 'http://localhost:8200',
    BASE_URL: 'https://opensource-demo.orangehrmlive.com',
    ADMIN_USERNAME: process.env.HRM_USERNAME_ADMIN,
    ADMIN_PASSWORD: process.env.HRM_PASSWORD_ADMIN,
    // ADMIN_USERNAME: 'Admin',
    // ADMIN_PASSWORD: 'admin123',
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    ESS_USERNAME: process.env.HRM_USERNAME_ESS,
    ESS_PASSWORD: process.env.HRM_PASSWORD_ESS,
};
