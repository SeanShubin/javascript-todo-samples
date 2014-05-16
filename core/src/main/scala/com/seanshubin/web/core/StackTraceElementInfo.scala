package com.seanshubin.backbone.sample.core

case class StackTraceElementInfo(declaringClass: String, methodName: String, fileName: String, lineNumber: Int)

object StackTraceElementInfo {
  def fromStackTraceElement(stackTraceElement: StackTraceElement): StackTraceElementInfo = {
    StackTraceElementInfo(
      stackTraceElement.getClassName,
      stackTraceElement.getMethodName,
      stackTraceElement.getFileName,
      stackTraceElement.getLineNumber
    )
  }
}
