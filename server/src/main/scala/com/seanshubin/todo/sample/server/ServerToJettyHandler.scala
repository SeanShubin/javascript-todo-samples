package com.seanshubin.todo.sample.server

import org.eclipse.jetty.server.handler.AbstractHandler
import com.seanshubin.todo.sample.core.http.{Request => CoreRequest, Content, Server, Response}
import javax.servlet.http.{HttpServletResponse, HttpServletRequest}
import org.eclipse.jetty.server.Request
import com.seanshubin.todo.sample.integration.IoUtil

class ServerToJettyHandler(server: Server) extends AbstractHandler {
  override def handle(target: String,
                      baseRequest: Request,
                      httpServletRequest: HttpServletRequest,
                      httpServletResponse: HttpServletResponse): Unit = {
    val method: String = httpServletRequest.getMethod
    val path = httpServletRequest.getRequestURI
    val maybeRequestCharsetName: Option[String] = Option(baseRequest.getCharacterEncoding)
    val requestBody = IoUtil.inputStreamToBytes(httpServletRequest.getInputStream)
    val requestContentType = httpServletRequest.getContentType
    val maybeContent = Content.fromBytes(requestBody, maybeRequestCharsetName, requestContentType)
    val request = CoreRequest(method, path, maybeContent)
    val maybeResponse = server.handle(request)
    maybeResponse match {
      case Some(Response(statusCode, Content(responseBytes, Some(responseCharsetName), responseContentType))) =>
        baseRequest.setHandled(true)
        httpServletResponse.setStatus(statusCode)
        httpServletResponse.setContentType(responseContentType)
        httpServletResponse.setCharacterEncoding(responseCharsetName)
        httpServletResponse.getOutputStream.write(responseBytes)
      case Some(Response(statusCode, Content(responseBytes, None, responseContentType))) =>
        baseRequest.setHandled(true)
        httpServletResponse.setStatus(statusCode)
        httpServletResponse.setContentType(responseContentType)
        httpServletResponse.getOutputStream.write(responseBytes)
      case None =>
        baseRequest.setHandled(false)
    }
  }
}
