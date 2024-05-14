@smoke_qa @sanity_qa @regression_qa
@users
Feature: Retrieving user information

  Scenario: Retrieving user details by ID
    Given the user ID is 2
    When I retrieve user details
    Then I should receive a successful response
    And the user information should be correct