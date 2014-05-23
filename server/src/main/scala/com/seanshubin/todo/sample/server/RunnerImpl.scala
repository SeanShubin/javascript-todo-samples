package com.seanshubin.todo.sample.server

class RunnerImpl(jettyServer: HttpServer) extends Runner {
  def run() {
    jettyServer.start()
    jettyServer.join()
  }
}
