package com.seanshubin.todo.sample.test

import com.seanshubin.todo.sample.server.{Configuration, RunnerWiring}
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.support.ui.{ExpectedCondition, WebDriverWait}

object SmokeTests extends App {
  val runner = new RunnerWiring() {
    lazy val freePortFinder: FreePortFinder = new FreePortFinderImpl
    lazy val port = freePortFinder.port
    lazy val maybeServeFromPath: Option[String] = None
    lazy val configuration: Configuration = Configuration(port, maybeServeFromPath)
  }
  runner.jettyServer.start()

  val logicTestsPage = s"http://localhost:${runner.port}/logic-tests.html"
  System.setProperty("webdriver.chrome.driver", "/home/sshubin/dev/selenium/chromedriver")
  val driver: WebDriver = new ChromeDriver()
  driver.get(logicTestsPage)

  new WebDriverWait(driver, 10).until(new ExpectedCondition[java.lang.Boolean]() {
    def apply(d: WebDriver): java.lang.Boolean = {
      d.getTitle.toLowerCase.endsWith("Sample")
    }
  })
  System.out.println("Page title is: " + driver.getTitle)
  driver.quit()

  runner.jettyServer.stop()
}
