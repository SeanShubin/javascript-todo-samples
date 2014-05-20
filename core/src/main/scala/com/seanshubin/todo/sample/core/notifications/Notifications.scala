package com.seanshubin.todo.sample.core.notifications

import com.seanshubin.todo.sample.core.http.{Response, Request}

trait Notifications {
  def dataStoreServerRequest(request: Request)

  def dataStoreServerResponse(response: Response)
}