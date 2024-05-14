# qc-guild-testops
## src/api-cucumber-java
#### Requirements
- Java 11+
- Maven 3.6+
#### Running Tests
```bash
cd src/api-cucumber-java
mvn clean test -Dcucumber.options="--tags @regression_qa"
```

## src/ui-selenium-js
#### Requirements
- Node 14.x+
- Chrome, Firefox and Edge browser
#### Getting Started
You need to install Node on your machine. Then use Node for installing packages and running scripts.
```bash
npm install
```
#### Running Demo
You can use chrome, firefox or edge to run the demo.
```bash
cd src/ui-selenium-js
bash runFeature_Demo.sh chrome
```