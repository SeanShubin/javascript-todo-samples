package com.seanshubin.todo.sample.core.http

case class Request(method: String, path: String, maybeContent: Option[Content])
