package com.seanshubin.todo.sample.core.notifications

import com.seanshubin.todo.sample.core.http.{Response, Request}

class LineEmittingNotifications(emitLine: String => Unit) extends Notifications {
  override def dataStoreServerRequest(request: Request): Unit = {
    emitLine(request.toString)
  }

  override def dataStoreServerResponse(response: Response): Unit = {
    emitLine(response.toString)
  }

  override def errorWithConfiguration(errorReport: Seq[String]): Unit = {
    errorReport.foreach(emitLine)
  }

  override def servedResource(source: String, name: String): Unit = {
    emitLine(s"served $name from $source")
  }
}
