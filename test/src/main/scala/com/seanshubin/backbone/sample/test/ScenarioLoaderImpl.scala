package com.seanshubin.backbone.sample.test

import com.seanshubin.backbone.sample.core.NumberedLine
import com.seanshubin.backbone.sample.integration.IoUtil

class ScenarioLoaderImpl(webSettings: WebSettings) extends ScenarioLoader {
  def load(name: String): TestScenario = {
    def hasContent(line: NumberedLine) = !line.text.isEmpty
    val resourceName: String = s"/$name.txt"
    val inputLines = IoUtil.resourceToLines(resourceName, webSettings.charsetName)
    val numberedInputLines = NumberedLine.linesToNumberedLines(inputLines)
    val linesWithContent = numberedInputLines.filter(hasContent)
    val linesGrouped = linesWithContent.grouped(2)
    val testCases = linesGrouped.map(TestCase.fromLines(webSettings, resourceName, _)).toSeq
    val testScenario = TestScenario(resourceName, testCases)
    testScenario
  }
}
