package com.seanshubin.todo.sample.test

import com.seanshubin.todo.sample.core.NumberedLine

case class TestResponse(lineNumber: Int, statusCode: Int, responseBody: String) {
  def toMultipleLineString: Seq[String] = {
    Seq(s"statusCode = $statusCode", s"responseBody = $responseBody")
  }
}

object TestResponse {

  import HttpRegexPatterns._

  val pattern = capture(digits) + spaces + capture(remaining)
  val PatternRegex = pattern.r

  def fromNumberedLine(numberedLine: NumberedLine): TestResponse = {
    val PatternRegex(statusCodeString, body) = numberedLine.text
    val statusCode = statusCodeString.toInt
    TestResponse(numberedLine.number, statusCode, body)
  }
}
