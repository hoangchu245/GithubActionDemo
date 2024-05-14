
import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
        features = "src/test/resources/features",
        glue = "stepDefinitions",
        plugin = {
                "pretty",
                "html:test-output.html",
                "json:target/cucumber-report/cucumber.json",
                "me.jvt.cucumber.report.PrettyReports:target/maven-cucumber-report"
        }
)
public class TestRunner {
}
