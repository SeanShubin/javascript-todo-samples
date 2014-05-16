package com.seanshubin.backbone.sample.core.http

trait Server {
  def handle(request: Request): Option[Response]
}
