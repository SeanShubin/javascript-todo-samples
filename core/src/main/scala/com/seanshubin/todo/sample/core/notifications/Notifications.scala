package com.seanshubin.todo.sample.core.notifications

import com.seanshubin.todo.sample.core.http.{Response, Request}

trait Notifications {
  def servedResource(source:String, name:String)

  def dataStoreServerRequest(request: Request)

  def dataStoreServerResponse(response: Response)

  def errorWithConfiguration(errorReport: Seq[String])
}
