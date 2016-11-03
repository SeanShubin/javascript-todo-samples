package com.seanshubin.todo.sample.client

import java.net.URI
import org.apache.http.client.methods._
import org.apache.http.client.utils.URIBuilder
import org.apache.http.impl.client.HttpClients
import com.seanshubin.todo.sample.core.http._
import com.seanshubin.todo.sample.core.http.Response
import org.apache.http.{HttpEntity, Header, HttpResponse}
import com.seanshubin.todo.sample.integration.IoUtil

class HttpImpl extends Client {

  import HttpImpl._

  override def send(host: String, port: Int, method: String, path: String): Response = send(host, port, method, path, requestMap(method))

  override def send(host: String, port: Int, method: String, path: String, content: Content): Response = {
    val entity: HttpEntity = RepeatableEntity.create(content)
    val createRequest: (URI => HttpUriRequest) = (uri: URI) => {
      val request = entityRequestMap(method)(uri)
      request.setEntity(entity)
      request
    }
    send(host, port, method, path, createRequest)
  }

  private def send(host: String, port: Int, method: String, path: String, createRequest: URI => HttpUriRequest): Response = {
    val uri: URI = new URIBuilder().setScheme("http").setHost(host).setPort(port).setPath(path).build()
    val request = createRequest(uri)
    val httpClient = HttpClients.createDefault()
    val httpResponse = httpClient.execute(request)
    val statusCode = httpResponse.getStatusLine.getStatusCode
    val inputStream = httpResponse.getEntity.getContent
    val (contentType, charsetName) = getContentTypeAndCharsetName(httpResponse)
    val responseBytes = IoUtil.inputStreamToBytes(inputStream)
    val responseContent = Content(responseBytes, Option(charsetName), contentType)
    val response = Response(statusCode, responseContent)
    response
  }

  private def getContentTypeAndCharsetName(response: HttpResponse): (String, String) = {
    val contentTypeHeaders: Array[Header] = response.getHeaders("Content-Type")
    if (contentTypeHeaders.size == 0) {
      (null, null)
    } else if (contentTypeHeaders.size == 1) {
      val contentTypeHeader = contentTypeHeaders(0)
      val contentType = contentTypeHeader.getValue
      val contentTypeElements = contentTypeHeader.getElements
      val charsets = for {
        i <- 0 until contentTypeElements.size
        element = contentTypeElements(i)
      } yield {
        element.getParameterByName("charset")
      }
      if (charsets.size == 0) {
        (contentType, null)
      } else if (charsets.size == 1) {
        (contentType, charsets(0).getValue)
      } else {
        throw new RuntimeException("Too many charsets")
      }
    } else {
      throw new RuntimeException("Too many content types")
    }
  }

}

object HttpImpl {
  val requestMap: Map[String, URI => HttpUriRequest] = Map(
    "get" -> ((uri: URI) => new HttpGet(uri)),
    "post" -> ((uri: URI) => new HttpPost(uri)),
    "put" -> ((uri: URI) => new HttpPut(uri)),
    "delete" -> ((uri: URI) => new HttpDelete(uri)),
    "patch" -> ((uri: URI) => new HttpPatch(uri))
  )

  val entityRequestMap: Map[String, (URI) => HttpEntityEnclosingRequestBase] = Map(
    "post" -> ((uri: URI) => new HttpPost(uri)),
    "put" -> ((uri: URI) => new HttpPut(uri)),
    "patch" -> ((uri: URI) => new HttpPatch(uri))
  )
}
