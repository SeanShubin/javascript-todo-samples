package com.seanshubin.backbone.sample.core.notifications

import com.seanshubin.backbone.sample.core.http.{Response, Request}

trait Notifications {
  def dataStoreServerRequest(request: Request)

  def dataStoreServerResponse(response: Response)
}
