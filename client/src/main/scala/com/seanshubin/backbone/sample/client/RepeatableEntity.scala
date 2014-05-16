package com.seanshubin.backbone.sample.client

import org.apache.http.entity.AbstractHttpEntity
import java.io.{ByteArrayInputStream, OutputStream, InputStream}
import com.seanshubin.backbone.sample.core.http.Content

class RepeatableEntity(bytes: Array[Byte], theContentType: String) extends AbstractHttpEntity {
  setContentType(theContentType)

  override def isRepeatable: Boolean = true

  override def isStreaming: Boolean = false

  override def writeTo(outputStream: OutputStream): Unit = outputStream.write(bytes)

  override def getContent: InputStream = new ByteArrayInputStream(bytes)

  override def getContentLength: Long = bytes.length
}

object RepeatableEntity {
  def create(content: Content): RepeatableEntity = {
    val repeatableEntity = new RepeatableEntity(content.bytes, content.contentType)
    content.maybeCharsetName.foreach {
      charsetName => repeatableEntity.setContentEncoding(charsetName)
    }
    repeatableEntity
  }
}
