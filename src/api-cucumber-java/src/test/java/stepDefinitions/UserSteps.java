package stepDefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.response.Response;
import static io.restassured.RestAssured.*;
import static org.junit.Assert.*;

public class UserSteps {

    private Response response;

    @Given("the user ID is {int}")
    public void setUserId(int userId) {
        // No action needed here, the user ID will be used in the request
    }

    @When("I retrieve user details")
    public void retrieveUserDetails() {
        response = get("https://reqres.in/api/users/2");
    }

    @Then("I should receive a successful response")
    public void validateResponse() {
        assertNotNull(response);
        assertEquals(200, response.getStatusCode());
    }

    @Then("the user information should be correct")
    public void validateUserInfo() {
        String email = response.jsonPath().getString("data.email");
        String firstName = response.jsonPath().getString("data.first_name");
        String lastName = response.jsonPath().getString("data.last_name");

        assertEquals("janet.weaver@reqres.in", email);
        assertEquals("Janet", firstName);
        assertEquals("Weaver", lastName);
    }
}
