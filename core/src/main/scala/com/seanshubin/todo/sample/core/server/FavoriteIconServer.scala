package com.seanshubin.todo.sample.core.server

import com.seanshubin.todo.sample.core.http._
import scala.Some
import com.seanshubin.todo.sample.core.http.Request
import com.seanshubin.todo.sample.core.http.Response

class FavoriteIconServer extends Server {
  override def handle(request: Request): Option[Response] = {
    import Verb._
    val Request(method, path, _) = request
    (method, path) match {
      case Get("favicon.ico") =>
        //don't feel like creating a favicon, so just serve a blank one so it doesn't clog up the logging
        Some(Response(200, Content(Array(), None, "image/x-icon")))
      case _ =>
        None
    }
  }
}
