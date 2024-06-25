Feature: Gmail Automation

  Scenario: Successful Gmail Login
    Given I am on the Gmail login page
    When I log in with valid credentials
    Then I should see my inbox

  Scenario: Login with invalid credentials
    Given I am on the Gmail login page
    When I log in with invalid credentials
    Then I should see an error message

  Scenario: Search and open the latest email
    Given I am logged in to Gmail
    When I search for the latest email
    Then I should see the email content

  Scenario: Delete an email and verify in trash
    Given I am logged in to Gmail
    And I have an email to delete
    When I delete the email
    Then I should see it in the trash

  Scenario: Logout of Gmail
    Given I am logged in to Gmail
    When I log out
    Then I should be on the login page
