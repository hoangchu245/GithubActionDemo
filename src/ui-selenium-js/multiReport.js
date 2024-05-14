#!/usr/bin/env node
const report = require('multiple-cucumber-html-reporter');
const os = require('os');

const { startTime } = process.env;
const { endTime } = process.env;
const browserName = process.env.BROWSER;
const paramPath = process.env.param;

/**
* Parse the milliseconds into readable time.
* @author Nam Hoang
* @param {number} milliseconds The page title.
* @return {string} the readable time.
*/
function parseMillisecondsIntoReadableTime(milliseconds) {
    // Get hours from milliseconds
    const hours = milliseconds / (1000 * 60 * 60);
    const absoluteHours = Math.floor(hours);
    const h = absoluteHours > 9 ? absoluteHours : `0${absoluteHours}`;

    // Get remainder from hours and convert to minutes
    const minutes = (hours - absoluteHours) * 60;
    const absoluteMinutes = Math.floor(minutes);
    const m = absoluteMinutes > 9 ? absoluteMinutes : `0${absoluteMinutes}`;

    // Get remainder from minutes and convert to seconds
    const seconds = (minutes - absoluteMinutes) * 60;
    const absoluteSeconds = Math.floor(seconds);
    const s = absoluteSeconds > 9 ? absoluteSeconds : `0${absoluteSeconds}`;

    return `${h}:${m}:${s}`;
}

const executionTime = parseMillisecondsIntoReadableTime(new Date(endTime) - new Date(startTime));

const customData = {
    title: 'Run info',
    data: [
        { label: 'Execution Start Time:', value: startTime },
        { label: 'Execution End Time:', value: endTime },
        { label: 'Execution Time:', value: executionTime },
    ],
};

const platformMap = {
    darwin: 'osx',
    window: '10',
};

let platformName = os.platform();

if (platformMap[os.platform()]) {
    platformName = platformMap[os.platform()];
}

const metadata = {
    device: 'Local test machine',
    browser: {
        name: browserName,
    },
    platform: {
        name: platformName,
        version: os.release(),
    },
};

report.generate({
    jsonDir: `./report/${paramPath}`,
    reportPath: `./report/${paramPath}`,
    displayDuration: true,
    metadata,
    customData,
    reportName: 'Orange HRM Automation Report',
    saveCollectedJSON: true,
    openReportInBrowser: true,
});
