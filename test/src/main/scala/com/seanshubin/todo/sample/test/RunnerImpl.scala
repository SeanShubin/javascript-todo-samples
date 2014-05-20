package com.seanshubin.todo.sample.test

import com.seanshubin.todo.sample.server.HttpServer

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
