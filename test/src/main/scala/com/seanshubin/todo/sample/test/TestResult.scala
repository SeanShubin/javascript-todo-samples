package com.seanshubin.todo.sample.test

import java.io.{StringWriter, PrintWriter}

trait TestResult {
  def isPassing: Boolean

  def toMultipleLineString: Seq[String]
}

object TestResult {
  def indent(lines: Seq[String]): Seq[String] = lines.map(x => "  " + x)
}

case class NonExceptionResult(source: String,
                              lineNumber: Int,
                              testCase: TestCase,
                              assertResults: Seq[AssertResult]) extends TestResult {

  override def isPassing: Boolean = assertResults.forall(_.isPassing)

  override def toMultipleLineString: Seq[String] = {
    if (isPassing) {
      assertResults.flatMap(_.toMultipleLineString)
    } else {
      assertResults.flatMap(_.toMultipleLineString) ++ TestResult.indent(testCase.toMultipleLineString)
    }
  }
}

case class ExceptionResult(source: String, lineNumber: Int, testCase: TestCase, exception: Exception) extends TestResult {
  override def isPassing: Boolean = false

  override def toMultipleLineString: Seq[String] = {
    val stringWriter = new StringWriter()
    val printWriter = new PrintWriter(stringWriter)
    exception.printStackTrace(printWriter)
    val stackTraceLines = stringWriter.toString.split("\n")
    val errorLines = Seq(s"Error: ${exception.getMessage}") ++ stackTraceLines
    val testCaseLines = testCase.toMultipleLineString
    val lines = errorLines ++ TestResult.indent(testCaseLines)
    lines
  }
}

