package com.seanshubin.todo.sample.test

import org.openqa.selenium.{By, WebElement, WebDriver}
import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.support.ui.{ExpectedCondition, WebDriverWait}

object SeleniumPrototype extends App {
  System.setProperty("webdriver.chrome.driver","/home/sshubin/dev/selenium/chromedriver")
  val driver: WebDriver = new ChromeDriver()
  driver.get("http://www.google.com")
  val element: WebElement = driver.findElement(By.name("q"))
  element.sendKeys("Cheese!")
  element.submit()
  System.out.println("Page title is: " + driver.getTitle)
  new WebDriverWait(driver, 10).until(new ExpectedCondition[java.lang.Boolean]() {
    def apply(d: WebDriver): java.lang.Boolean = {
      d.getTitle.toLowerCase.startsWith("cheese!")
    }
  })
  System.out.println("Page title is: " + driver.getTitle)
  driver.quit()
}
