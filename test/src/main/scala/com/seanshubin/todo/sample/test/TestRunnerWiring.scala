package com.seanshubin.todo.sample.test

import com.seanshubin.todo.sample.client.HttpImpl
import com.seanshubin.todo.sample.core.{DataStore, MemoryDataStore, JsonMarshaller, JsonMarshallerImpl}
import org.eclipse.jetty.server.Handler
import com.seanshubin.todo.sample.core.server.DataStoreServer
import com.seanshubin.todo.sample.core.http.{Client, Server}
import com.seanshubin.todo.sample.server.{ServerToJettyHandler, JettyServer, HttpServer}
import com.seanshubin.todo.sample.core.notifications.Notifications

trait TestRunnerWiring {
  def name: String

  lazy val freePortFinder: FreePortFinder = new FreePortFinderImpl
  lazy val host: String = "localhost"
  lazy val port: Int = freePortFinder.port
  lazy val contentType: String = "application/json; charset=utf-8"
  lazy val charsetName: String = "utf-8"
  lazy val jsonMarshaller: JsonMarshaller = new JsonMarshallerImpl
  lazy val client: Client = new HttpImpl
  lazy val webSettings: WebSettings = WebSettings(host, port, charsetName, contentType)
  lazy val scenarioLoader: ScenarioLoader = new ScenarioLoaderImpl(webSettings)
  lazy val environment: TestEnvironment = TestEnvironment(client, jsonMarshaller)
  lazy val dataStore: DataStore = new MemoryDataStore(jsonMarshaller)
  lazy val notifications: Notifications = new SilentNotifications()
  lazy val dataStoreServer: Server = new DataStoreServer(dataStore, jsonMarshaller, notifications, charsetName)
  lazy val dataStoreHandler: Handler = new ServerToJettyHandler(dataStoreServer)
  lazy val httpServer: HttpServer = new JettyServer(port, dataStoreHandler)
  lazy val runner: Runner = new RunnerImpl(name, httpServer, scenarioLoader, environment)
}
