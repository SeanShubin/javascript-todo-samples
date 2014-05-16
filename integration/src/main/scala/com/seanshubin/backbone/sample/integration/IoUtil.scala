package com.seanshubin.backbone.sample.integration

import java.io._
import scala.annotation.tailrec
import scala.collection.JavaConversions

object IoUtil {
  def feedInputStreamToOutputStream(inputStream: InputStream, outputStream: OutputStream) {
    @tailrec
    def loop(byte: Int) {
      if (byte != -1) {
        outputStream.write(byte)
        loop(inputStream.read())
      }
    }
    loop(inputStream.read())
  }

  def inputStreamToBytes(inputStream: InputStream): Array[Byte] = {
    val outputStream = new ByteArrayOutputStream
    feedInputStreamToOutputStream(inputStream, outputStream)
    val byteArray = outputStream.toByteArray
    byteArray
  }

  def resourceToLines(resourceName: String, charsetName: String): Seq[String] = {
    val inputStream = getClass.getResourceAsStream(resourceName)
    val reader = new InputStreamReader(inputStream, charsetName)
    val bufferedReader = new BufferedReader(reader)
    val linesJavaStream = bufferedReader.lines()
    val linesJavaIterator = linesJavaStream.iterator()
    val linesIterator = JavaConversions.asScalaIterator(linesJavaIterator)
    val lines = linesIterator.toSeq
    lines
  }
}
