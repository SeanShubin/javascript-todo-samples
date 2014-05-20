package com.seanshubin.todo.sample.test

trait AssertResult {
  def isPassing: Boolean

  def toMultipleLineString: Seq[String]
}

object AssertResult {
  def mustEqual[T](source: String, lineNumber: Int, name: String, expected: T, actual: T): AssertResult = {
    if (expected == actual) {
      AssertEqualOk(source, lineNumber, name)
    } else {
      AssertEqualFail(source, lineNumber, name, s"expected $expected but got $actual")
    }
  }
}

case class AssertEqualOk(source: String, lineNumber: Int, name: String) extends AssertResult {
  override def toMultipleLineString: Seq[String] = Seq(s"Passed($source:$lineNumber): equality for $name")

  override def isPassing: Boolean = true
}

case class AssertEqualFail(source: String, lineNumber: Int, name: String, message: String) extends AssertResult {
  override def toMultipleLineString: Seq[String] = Seq(s"Failed($source:$lineNumber): equality for $name, $message")

  override def isPassing: Boolean = false
}
