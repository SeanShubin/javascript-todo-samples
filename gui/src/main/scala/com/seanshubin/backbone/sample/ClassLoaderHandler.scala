package com.seanshubin.backbone.sample

import org.eclipse.jetty.server.handler.AbstractHandler
import org.eclipse.jetty.server.Request
import javax.servlet.http.{HttpServletResponse, HttpServletRequest}
import IoUtil.feedInputStreamToOutputStream

class ClassLoaderHandler(classLoader: ClassLoader, prefix: String) extends AbstractHandler {
  override def handle(target: String, baseRequest: Request, request: HttpServletRequest, response: HttpServletResponse) {
    val resourceName = prefix + request.getRequestURI
    val inputStream = classLoader.getResourceAsStream(resourceName)
    if (inputStream == null) {
      baseRequest.setHandled(false)
    } else {
      baseRequest.setHandled(true)
      try {
        val outputStream = response.getOutputStream
        feedInputStreamToOutputStream(inputStream, outputStream)
        outputStream.flush()
      } finally {
        inputStream.close()
      }
    }
  }
}
