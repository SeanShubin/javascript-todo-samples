package com.seanshubin.todo.sample.test

import org.scalatest.FunSuite
import com.seanshubin.todo.sample.server.{Configuration, RunnerWiring}
import com.seanshubin.todo.sample.client.HttpImpl
import com.seanshubin.todo.sample.core.http.Client

import com.gargoylesoftware.htmlunit.WebClient
import com.gargoylesoftware.htmlunit.html.HtmlPage

class JavascriptUnitTests extends FunSuite {
  test("javascript unit tests") {
    val runner = new RunnerWiring() {
      lazy val freePortFinder: FreePortFinder = new FreePortFinderImpl
      lazy val port = freePortFinder.port
      lazy val maybeServeFromPath: Option[String] = None
      lazy val configuration: Configuration = Configuration(port, maybeServeFromPath)
      lazy val client: Client = new HttpImpl
    }
    runner.jettyServer.start()
    val webClient: WebClient = new WebClient()
    val htmlPage: HtmlPage = webClient.getPage(s"http://localhost:${runner.port}/logic-tests.html")
    //Javascript capabilities seem far to limited, going to have to use selenium instead


//    webClient.waitForBackgroundJavaScript(1000 * 5)
//    val text = htmlPage.asXml()
//    println(text)
  }
}
