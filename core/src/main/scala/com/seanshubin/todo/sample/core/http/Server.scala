package com.seanshubin.todo.sample.core.http

trait Server {
  def handle(request: Request): Option[Response]
}
