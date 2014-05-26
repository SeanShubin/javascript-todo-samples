package com.seanshubin.todo.sample

import org.eclipse.jetty.server.handler.AbstractHandler
import org.eclipse.jetty.server.Request
import javax.servlet.http.{HttpServletResponse, HttpServletRequest}
import IoUtil.feedInputStreamToOutputStream
import java.io.{FileNotFoundException, FileInputStream, InputStream}
import com.seanshubin.todo.sample.core.notifications.Notifications

class ClassLoaderHandler(classLoader: ClassLoader,
                         prefix: String,
                         overridePath: Option[String],
                         notifications: Notifications,
                         charsetName: String) extends AbstractHandler {
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
    def updateResponseWithContentTypeAndCharset(contentType: String) {
      response.setContentType(s"$contentType; charset=$charsetName")
    }
    def redirect() {
      baseRequest.setHandled(true)
      response.sendRedirect("index.html")
    }
    def found(inputStream: InputStream) {
      baseRequest.setHandled(true)
      getExtension(target).flatMap(contentTypeByExtension.get).foreach(updateResponseWithContentTypeAndCharset)
      try {
        val outputStream = response.getOutputStream
        feedInputStreamToOutputStream(inputStream, outputStream)
        outputStream.flush()
      } finally {
        inputStream.close()
      }
    }
    def notFound() {
      baseRequest.setHandled(false)
    }
    if (request.getRequestURI == "/") {
      redirect()
    } else {
      val resourceName = prefix + request.getRequestURI
      val inputStream = createInputStreamFor(resourceName)
      if (inputStream == null) {
        notFound()
      } else {
        found(inputStream)
      }
    }
  }

  private def createInputStreamFor(resourceName: String): InputStream = {
    overridePath match {
      case Some(path) =>
        try {
          val result = new FileInputStream(path + resourceName)
          notifications.servedResource(s"file system ($path)", resourceName)
          result
        } catch {
          case ex: FileNotFoundException =>
            val result = classLoader.getResourceAsStream(resourceName)
            notifications.servedResource("class path", resourceName)
            result
        }
      case None =>
        val result = classLoader.getResourceAsStream(resourceName)
        notifications.servedResource("class path", resourceName)
        result
    }
  }
}
