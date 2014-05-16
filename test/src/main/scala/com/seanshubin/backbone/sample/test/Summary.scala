package com.seanshubin.backbone.sample.test

case class Summary(passed: Int, total: Int, lines: Seq[String]) {
  def allPassed = passed == total
}

object Summary {
  def combine(others: Seq[Summary]): Summary = {
    def loop(summary: Summary, result: Summary): Summary = {
      val Summary(passed, total, lines) = summary
      val newSummary = Summary(passed + result.passed, total + result.total, lines ++ result.lines)
      newSummary
    }
    others.foldLeft(Summary(0, 0, Seq()))(loop)
  }
}
