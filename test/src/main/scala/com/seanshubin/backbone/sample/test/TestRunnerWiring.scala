package com.seanshubin.backbone.sample.test

import com.seanshubin.backbone.sample.client.HttpImpl
import com.seanshubin.backbone.sample.core.{DataStore, MemoryDataStore, JsonMarshaller, JsonMarshallerImpl}
import org.eclipse.jetty.server.Handler
import com.seanshubin.backbone.sample.core.server.DataStoreServer
import com.seanshubin.backbone.sample.core.http.{Client, Server}
import com.seanshubin.backbone.sample.server.{ServerToJettyHandler, JettyServer, HttpServer}

trait TestRunnerWiring {
  def name: String

  lazy val freePortFinder: FreePortFinder = new FreePortFinderImpl
  lazy val host: String = "localhost"
  lazy val port: Int = freePortFinder.port
  lazy val contentType: String = "application/json"
  lazy val charsetName: String = "utf-8"
  lazy val jsonMarshaller: JsonMarshaller = new JsonMarshallerImpl
  lazy val client: Client = new HttpImpl
  lazy val webSettings: WebSettings = WebSettings(host, port, charsetName, contentType)
  lazy val scenarioLoader: ScenarioLoader = new ScenarioLoaderImpl(webSettings)
  lazy val environment: TestEnvironment = TestEnvironment(client, jsonMarshaller)
  lazy val dataStore: DataStore = new MemoryDataStore(jsonMarshaller)
  lazy val dataStoreServer: Server = new DataStoreServer(dataStore, jsonMarshaller, charsetName)
  lazy val dataStoreHandler: Handler = new ServerToJettyHandler(dataStoreServer)
  lazy val httpServer: HttpServer = new JettyServer(port, dataStoreHandler)
  lazy val runner: Runner = new RunnerImpl(name, httpServer, scenarioLoader, environment)
}
