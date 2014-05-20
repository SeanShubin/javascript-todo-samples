package com.seanshubin.todo.sample.test

case class TestScenario(source: String, testCases: Seq[TestCase]) {
  def run(environment: TestEnvironment): Summary = {
    val testResults = testCases.map(_.runTest(environment)).toSeq
    val passedCount = testResults.count(_.isPassing)
    val totalCount = testResults.size
    val allPassed = passedCount == totalCount
    val outputLines = if (allPassed) {
      val count = testResults.size
      Seq(s"All $count tests passed ($source)")
    } else {
      testResults.flatMap(_.toMultipleLineString)
    }
    Summary(passedCount, totalCount, outputLines)
  }
}
