package com.seanshubin.backbone.sample.test

import com.seanshubin.backbone.sample.core.notifications.Notifications
import com.seanshubin.backbone.sample.core.http.{Request, Response}

class SilentNotifications extends Notifications {
  override def dataStoreServerRequest(request: Request): Unit = {}

  override def dataStoreServerResponse(response: Response): Unit = {}
}
