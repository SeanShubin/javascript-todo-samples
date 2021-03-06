package com.seanshubin.todo.sample.core.server

import com.seanshubin.todo.sample.core.{ExceptionInfo, JsonMarshaller, DataStore}
import com.seanshubin.todo.sample.core.http._
import com.seanshubin.todo.sample.core.http.Response
import com.seanshubin.todo.sample.core.http.Request
import com.seanshubin.todo.sample.core.notifications.Notifications

class DataStoreServer(dataStore: DataStore,
                      jsonMarshaller: JsonMarshaller,
                      notifications: Notifications,
                      charsetName: String,
                      dbPrefix: String) extends Server {
  val dataStoreContentType: String = "application/json"
  val DbPrefix = dbPrefix

  override def handle(request: Request): Option[Response] = {
    import Verb._
    notifications.dataStoreServerRequest(request)
    val Request(method, path, maybeRequestContent) = request
    val response = try {
      val (statusCode, dataStoreResult) = (method, path) match {
        case Get(DbPrefix, name) =>
          def loadDocument(id: String) = dataStore.find(name, id)
          val documents: Seq[AnyRef] = dataStore.list(name).map(loadDocument)
          (200, documents)
        case Post(DbPrefix, name) =>
          val jsonString = extractRequestBody(maybeRequestContent)
          val storedJsonObject = jsonMarshaller.fromJson(jsonString, classOf[AnyRef])
          val id = dataStore.create(name, storedJsonObject)
          val loadedJsonObject = dataStore.find(name, id)
          (201, loadedJsonObject)
        case Post(DbPrefix, name, id) =>
          val jsonString = extractRequestBody(maybeRequestContent)
          val jsonObject = jsonMarshaller.fromJson(jsonString, classOf[AnyRef])
          dataStore.create(name, jsonObject, id)
          val newObject = dataStore.find(name, id)
          (201, newObject)
        case Get(DbPrefix, name, id) => (200, dataStore.find(name, id))
        case Put(DbPrefix, name, id) =>
          val jsonString: String = extractRequestBody(maybeRequestContent)
          val jsonObject = jsonMarshaller.fromJson(jsonString, classOf[AnyRef])
          dataStore.replace(name, id, jsonObject)
          val newObject = dataStore.find(name, id)
          (200, newObject)
        case Delete(DbPrefix, name, id) =>
          val jsonObject = dataStore.find(name, id)
          dataStore.delete(name, id)
          (200, jsonObject)
        case Delete(DbPrefix, name) =>
          def loadDocument(id: String) = dataStore.find(name, id)
          val documents: Seq[AnyRef] = dataStore.list(name).map(loadDocument)
          dataStore.delete(name)
          (200, documents)
        case Patch(DbPrefix, name, id) =>
          val jsonString: String = extractRequestBody(maybeRequestContent)
          val oldObject = dataStore.find(name, id)
          val mergeObject = jsonMarshaller.fromJson(jsonString, classOf[AnyRef])
          val newObject = jsonMarshaller.merge(oldObject, mergeObject)
          dataStore.replace(name, id, newObject)
          val foundObject = dataStore.find(name, id)
          (200, foundObject)
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
      case Some(Content(bytes, maybeCharsetName, rawRequestContentType)) =>
        val requestCharsetName = maybeCharsetName.getOrElse(charsetName)
        val requestContentType = HttpParseUtil.parseContentType(rawRequestContentType)
        if (requestContentType != dataStoreContentType)
          throw new RuntimeException(s"Expected content type to be $dataStoreContentType, was $requestContentType")
        val body = new String(bytes, requestCharsetName)
        body
      case _ =>
        throw new RuntimeException(s"Expected content")
    }
  }

  private def stringContent(s: String): Content = {
    val content = Content(s.getBytes(charsetName), Some(charsetName), dataStoreContentType)
    content
  }
}
