package com.seanshubin.backbone.sample.core.server

import com.seanshubin.backbone.sample.core.{ExceptionInfo, JsonMarshaller, DataStore}
import com.seanshubin.backbone.sample.core.http._
import com.seanshubin.backbone.sample.core.http.Response
import com.seanshubin.backbone.sample.core.http.Request
import com.seanshubin.web.core.notifications.Notifications

class DataStoreServer(dataStore: DataStore,
                      jsonMarshaller: JsonMarshaller,
                      notifications:Notifications,
                      charsetName: String) extends Server {
  val dataStoreContentType: String = "application/json"

  override def handle(request: Request): Option[Response] = {
    import Verb._
    notifications.dataStoreServerRequest(request)
    val Request(method, path, maybeRequestContent) = request
    val response = try {
      val (statusCode, dataStoreResult) = (method, path) match {
        case Get(name) =>
          def qualify(id: String) = s"/$name/$id"
          (200, dataStore.list(name).map(qualify))
        case Post(name) =>
          val jsonString = extractRequestBody(maybeRequestContent)
          val jsonObject = jsonMarshaller.fromJson(jsonString, classOf[AnyRef])
          val id = dataStore.create(name, jsonObject)
          (201, s"/$name/$id")
        case Post(name, id) =>
          val jsonString = extractRequestBody(maybeRequestContent)
          val jsonObject = jsonMarshaller.fromJson(jsonString, classOf[AnyRef])
          dataStore.create(name, jsonObject, id)
          (201, s"/$name/$id")
        case Get(name, id) => (200, dataStore.find(name, id))
        case Put(name, id) =>
          val jsonString: String = extractRequestBody(maybeRequestContent)
          val jsonObject = jsonMarshaller.fromJson(jsonString, classOf[AnyRef])
          dataStore.replace(name, id, jsonObject)
          (200, s"/$name/$id")
        case Delete(name, id) =>
          dataStore.delete(name, id)
          (200, s"/$name/$id")
        case Patch(name, id) =>
          val jsonString: String = extractRequestBody(maybeRequestContent)
          val oldObject = dataStore.find(name, id)
          val mergeObject = jsonMarshaller.fromJson(jsonString, classOf[AnyRef])
          val newObject = jsonMarshaller.merge(oldObject, mergeObject)
          dataStore.replace(name, id, newObject)
          (200, s"/$name/$id")
      }
      marshallResponse(dataStoreResult, statusCode)
    } catch {
      case ex: Exception => marshallResponse(ex, 500)
    }
    notifications.dataStoreServerResponse(response)
    Some(response)
  }

  private def marshallResponse(responseValue: Any, statusCode: Int): Response = {
    responseValue match {
      case ex: Exception => marshallException(ex, statusCode)
      case ref: AnyRef => Response(statusCode, stringContent(jsonMarshaller.toJson(responseValue)))
    }
  }

  private def marshallException(ex: Exception, statusCode: Int): Response = {
    val exceptionInfo = ExceptionInfo.fromException(ex)
    val exceptionJson = jsonMarshaller.toJson(exceptionInfo)
    val content = stringContent(exceptionJson)
    Response(statusCode, content)
  }

  private def extractRequestBody(maybeRequestContent: Option[Content]): String = {
    maybeRequestContent match {
      case Some(Content(bytes, Some(requestCharsetName), rawRequestContentType)) =>
        val requestContentType = HttpParseUtil.parseContentType(rawRequestContentType)
        if (requestContentType != dataStoreContentType)
          throw new RuntimeException(s"Expected content type to be $dataStoreContentType, was $requestContentType")
        val body = new String(bytes, requestCharsetName)
        body
      case Some(Content(bytes, None, contentType)) =>
        throw new RuntimeException(s"Expected a character set")
      case _ =>
        throw new RuntimeException(s"Expected content")
    }
  }

  private def stringContent(s: String): Content = {
    val content = Content(s.getBytes(charsetName), Some(charsetName), dataStoreContentType)
    content
  }
}
