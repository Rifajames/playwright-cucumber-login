Feature: Login functionality

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I fill in username "student" and password "Password123"
    And I click the login button
    Then I should see the success message "Logged In Successfully"

  Scenario: Unsuccessful login with invalid credentials
    Given I am on the login page
    When I fill in username "wronguser" and password "wrongpass"
    And I click the login button
    Then I should see the error message "Your username is invalid!"