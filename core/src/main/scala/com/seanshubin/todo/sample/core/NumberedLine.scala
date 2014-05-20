package com.seanshubin.todo.sample.core

case class NumberedLine(number: Int, text: String)

object NumberedLine {
  def linesToNumberedLines(lines: Seq[String]): Seq[NumberedLine] = {
    lines.zipWithIndex.map(NumberedLine.fromZippedWithIndex)
  }

  def fromZippedWithIndex(lineWithIndex: (String, Int)): NumberedLine = {
    val (text, index) = lineWithIndex
    NumberedLine(index + 1, text)
  }
}
