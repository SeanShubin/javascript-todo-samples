package com.seanshubin.todo.sample.core.http

trait Client {
  def send(host: String, port: Int, method: String, path: String, content: Content): Response

  def send(host: String, port: Int, method: String, path: String): Response
}
