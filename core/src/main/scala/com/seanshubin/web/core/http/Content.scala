package com.seanshubin.backbone.sample.core.http

case class Content(bytes: Array[Byte], maybeCharsetName: Option[String], contentType: String) {
  override def toString: String = maybeCharsetName match {
    case Some(charsetName) => new String(bytes, charsetName)
    case None => bytes.mkString("[", ",", "]")
  }
}

object Content {
  def fromString(value: String, charsetName: String, contentType: String): Content = {
    Content(value.getBytes(charsetName), Some(charsetName), contentType)
  }

  def fromBytes(bytes: Array[Byte], maybeCharsetName: Option[String], contentType: String): Option[Content] = {
    if (bytes.length == 0) None else Some(Content(bytes, maybeCharsetName, contentType))
  }
}