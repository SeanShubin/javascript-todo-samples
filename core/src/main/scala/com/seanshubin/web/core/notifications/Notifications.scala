package com.seanshubin.web.core.notifications

import com.seanshubin.backbone.sample.core.http.{Response, Request}

trait Notifications {
  def dataStoreServerRequest(request:Request)
  def dataStoreServerResponse(response:Response)
}
