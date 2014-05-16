package com.seanshubin.backbone.sample.test

import org.scalatest.FunSuite

class DataStoreTest extends FunSuite {
  test("post") {
    runTestNamed("post")
  }
  test("delete") {
    runTestNamed("delete")
  }
  test("put") {
    runTestNamed("put")
  }
  test("patch") {
    runTestNamed("patch")
  }

  def runTestNamed(name: String) {
    val summary = new TestRunnerImpl(name).runner.run()
    summary.lines.foreach(println)
    assert(summary.allPassed)
  }
}
