package com.seanshubin.backbone.sample.core.http

case class Request(method: String, path: String, maybeContent: Option[Content])
