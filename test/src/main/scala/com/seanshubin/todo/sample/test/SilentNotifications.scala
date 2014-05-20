package com.seanshubin.todo.sample.test

import com.seanshubin.todo.sample.core.notifications.Notifications
import com.seanshubin.todo.sample.core.http.{Request, Response}

class SilentNotifications extends Notifications {
  override def dataStoreServerRequest(request: Request): Unit = {}

  override def dataStoreServerResponse(response: Response): Unit = {}
}
