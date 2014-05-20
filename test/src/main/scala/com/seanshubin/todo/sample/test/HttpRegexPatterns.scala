package com.seanshubin.todo.sample.test

object HttpRegexPatterns {
  val spaces = """\s+"""
  val word = """\w+"""
  val path = """[/\w]+"""
  val remaining = ".*"
  val digits = """\d+"""

  def capture(s: String) = s"($s)"

  def nonCapture(s: String) = s"(?:$s)"

  def optional(s: String) = s"$s?"
}
