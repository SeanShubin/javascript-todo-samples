package com.seanshubin.backbone.sample.test

import com.seanshubin.backbone.sample.core.http.Content
import com.seanshubin.backbone.sample.core.NumberedLine

case class TestCase(webSettings: WebSettings, source: String, testRequest: TestRequest, testResponse: TestResponse) {

  import AssertResult._

  def toMultipleLineString: Seq[String] = {
    testRequest.toMultipleLineString ++ testResponse.toMultipleLineString
  }

  def runTest(environment: TestEnvironment) = {
    val WebSettings(host, port, charsetName, contentType) = webSettings
    val TestRequest(method, path, maybeRequestBody) = testRequest
    val TestResponse(lineNumber, expectedStatusCode, expectedResponseBody) = testResponse
    try {
      val actualResponse = maybeRequestBody match {
        case Some(body) => environment.client.send(host, port, method, path, Content.fromString(body, charsetName, contentType))
        case None => environment.client.send(host, port, method, path)
      }
      val normalizedExpected = environment.jsonMarshaller.normalize(expectedResponseBody)
      val normalizedActual = environment.jsonMarshaller.normalize(actualResponse.content.toString)

      val statusCodeResult = mustEqual(source, lineNumber, "status code", expectedStatusCode, actualResponse.statusCode)
      val responseBodyResult = mustEqual(source, lineNumber, "body", normalizedExpected, normalizedActual)
      val results = Seq(statusCodeResult, responseBodyResult)
      val testResult = NonExceptionResult(source, lineNumber, this, results)
      testResult
    } catch {
      case ex: Exception => ExceptionResult(source, lineNumber, this, ex)
    }
  }
}

object TestCase {
  def fromLines(webSettings: WebSettings, source: String, lines: Seq[NumberedLine]): TestCase = {
    val request = TestRequest.fromString(lines(0).text)
    val response = TestResponse.fromNumberedLine(lines(1))
    TestCase(webSettings, source, request, response)
  }
}
