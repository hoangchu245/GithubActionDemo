export param=$1
rm -rf ./report/$param/
mkdir -p ./report/$param/
export startTime=$(date)
export BROWSER=$param
node node_modules/@cucumber/cucumber/bin/cucumber-js --parallel 2 -f json:report/$param/cucumber_report.json src/features/ --tags "@e2e_01 or @e2e_02"
result=$?
export endTime=$(date)
node multiReport.js
exit $result