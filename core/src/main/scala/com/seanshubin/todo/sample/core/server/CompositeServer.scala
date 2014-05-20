package com.seanshubin.todo.sample.core.server

import com.seanshubin.todo.sample.core.http.{Response, Request, Server}

class CompositeServer(servers: Seq[Server]) extends Server {
  override def handle(request: Request): Option[Response] = {
    servers.toStream.flatMap(_.handle(request)).headOption
  }
}
