package com.seanshubin.backbone.sample

import org.eclipse.jetty.server.Server

object ServerApplication extends App {
  val port = args(0).toInt
  val server = new Server(port)
  val classOnSameLoaderAsResources = classOf[ClassOnSameLoaderAsResources]
  val classLoader = classOnSameLoaderAsResources.getClassLoader
  lazy val onlyServeResourcesFrom: String = "serve-from-classpath"
  val classLoaderHandler = new ClassLoaderHandler(classLoader, onlyServeResourcesFrom)
  server.setHandler(classLoaderHandler)
  server.start()
  server.join()
}
