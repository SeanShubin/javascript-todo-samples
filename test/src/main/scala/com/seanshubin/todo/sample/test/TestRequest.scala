package com.seanshubin.todo.sample.test

case class TestRequest(method: String, path: String, maybeRequestBody: Option[String]) {
  def toMultipleLineString: Seq[String] = {
    val methodAndPath = Seq(s"method = $method", s"path = $path")
    val allLines = maybeRequestBody match {
      case Some(body) => methodAndPath :+ s"requestBody = $body"
      case None => methodAndPath
    }
    allLines
  }
}

object TestRequest {

  import HttpRegexPatterns._

  val pattern = capture(word) + spaces + capture(path) + optional(nonCapture(spaces + capture(remaining)))
  val PatternRegex = pattern.r

  def fromString(s: String): TestRequest = {
    val PatternRegex(method, path, possiblyNullBody) = s
    val maybeBody = Option(possiblyNullBody)
    TestRequest(method, path, maybeBody)
  }
}
