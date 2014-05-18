package com.seanshubin.backbone.sample

import org.eclipse.jetty.server.handler.AbstractHandler
import org.eclipse.jetty.server.Request
import javax.servlet.http.{HttpServletResponse, HttpServletRequest}
import IoUtil.feedInputStreamToOutputStream

class ClassLoaderHandler(classLoader: ClassLoader, prefix: String) extends AbstractHandler {
  val contentTypeByExtension = Map(
    ".js" -> "application/json",
    ".css" -> "text/css",
    ".html" -> "text/html",
    ".ico" -> "image/x-icon"
  )

  def getExtension(name: String): Option[String] = {
    val lastDot = name.lastIndexOf('.')
    val maybeExtension =
      if (name.lastIndexOf('.') == -1) None
      else Some(name.substring(lastDot))
    maybeExtension
  }

  override def handle(target: String, baseRequest: Request, request: HttpServletRequest, response: HttpServletResponse) {
    val resourceName =
      if (request.getRequestURI == "/") prefix + request.getRequestURI + "index.html"
      else prefix + request.getRequestURI
    val inputStream = classLoader.getResourceAsStream(resourceName)
    if (inputStream == null) {
      baseRequest.setHandled(false)
    } else {
      baseRequest.setHandled(true)
      getExtension(target).flatMap(contentTypeByExtension.get).foreach(response.setContentType)
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
