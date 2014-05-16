package com.seanshubin.backbone.sample.test

import com.seanshubin.backbone.sample.server.HttpServer

class RunnerImpl(name: String, httpServer: HttpServer,
                 scenarioLoader: ScenarioLoader,
                 environment: TestEnvironment) extends Runner {
  override def run() = {
    httpServer.start()
    val results = scenarioLoader.load(name).run(environment)
    httpServer.stop()
    results
  }
}
