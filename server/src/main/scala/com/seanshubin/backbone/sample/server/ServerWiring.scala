package com.seanshubin.backbone.sample.server

import org.eclipse.jetty.server.Handler
import com.seanshubin.backbone.sample.core.{JsonMarshaller, JsonMarshallerImpl, MemoryDataStore, DataStore}
import com.seanshubin.backbone.sample.core.server.DataStoreServer
import com.seanshubin.backbone.sample.core.http.Server
import com.seanshubin.backbone.sample.{ClassLoaderHandler, ClassOnSameLoaderAsResources}
import com.seanshubin.backbone.sample.core.notifications.{LineEmittingNotifications, Notifications}

trait ServerWiring {
  def port: Int

  lazy val charsetName: String = "utf-8"
  lazy val jsonMarshaller: JsonMarshaller = new JsonMarshallerImpl
  lazy val dataStore: DataStore = new MemoryDataStore(jsonMarshaller)
  lazy val emitLine: String => Unit = println
  lazy val notifications: Notifications = new LineEmittingNotifications(emitLine)
  lazy val dataStoreServer: Server = new DataStoreServer(dataStore, jsonMarshaller, notifications, charsetName)
  lazy val dataStoreHandler: Handler = new ServerToJettyHandler(dataStoreServer)
  lazy val classOnSameLoaderAsResources: Class[_] = classOf[ClassOnSameLoaderAsResources]
  lazy val classLoader: ClassLoader = classOnSameLoaderAsResources.getClassLoader
  lazy val onlyServeResourcesFrom: String = "serve-from-classpath"
  lazy val classLoaderHandler: Handler = new ClassLoaderHandler(classLoader, onlyServeResourcesFrom)
  lazy val allHandlers: Seq[Handler] = Seq(classLoaderHandler, dataStoreHandler)
  lazy val compositeHandler: Handler = new CompositeHandler(allHandlers)
  lazy val jettyServer: HttpServer = new JettyServer(port, compositeHandler)
}
