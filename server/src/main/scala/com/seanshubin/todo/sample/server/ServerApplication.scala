package com.seanshubin.todo.sample.server

object ServerApplication extends App with ServerWiring {
  lazy val port = args(0).toInt
  jettyServer.start()
  jettyServer.join()
}
