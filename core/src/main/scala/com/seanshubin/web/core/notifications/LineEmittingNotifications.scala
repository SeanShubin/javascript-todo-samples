package com.seanshubin.web.core.notifications

import com.seanshubin.backbone.sample.core.http.{Response, Request}

class LineEmittingNotifications(emitLine: String => Unit) extends Notifications {
  override def dataStoreServerRequest(request: Request): Unit = {
    emitLine(request.toString)
  }

  override def dataStoreServerResponse(response: Response): Unit = {
    emitLine(response.toString)
  }
}
