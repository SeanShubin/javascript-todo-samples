package com.seanshubin.backbone.sample

import java.io.{OutputStream, InputStream}
import scala.annotation.tailrec

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
}
