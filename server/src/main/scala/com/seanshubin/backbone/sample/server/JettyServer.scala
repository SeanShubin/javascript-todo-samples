package com.seanshubin.backbone.sample.server

import org.eclipse.jetty.server.{Server, Handler}

class JettyServer(port: Int, handler: Handler) extends HttpServer {
  private val server = new Server(port)
  server.setHandler(handler)

  def start() {
    server.start()
  }

  def join() {
    server.join()
  }

  def stop() {
    server.stop()
  }
}
