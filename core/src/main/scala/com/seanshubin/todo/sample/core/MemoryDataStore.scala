package com.seanshubin.todo.sample.core

/*
todo:
This class has gotten a bit out of hand because its original behavior is so much different than what had to be adapted
to model the expectations of backbone.js.  At this point my intention is to simply rewrite it when I have the time.
 */
class MemoryDataStore(jsonMarshaller: JsonMarshaller) extends DataStore {
  private var data: Map[String, OrderedMap[String, AnyRef]] = Map().withDefaultValue(OrderedMap())
  private var idNumbers: Map[String, Long] = Map().withDefaultValue(0L)

  override def delete(name: String, id: String) {
    data = data.updated(name, data(name) - id)
  }

  override def delete(name: String): Unit = {
    data = data.updated(name, OrderedMap())
    idNumbers = idNumbers.updated(name, 0L)
  }

  override def replace(name: String, id: String, value: Object) {
    value match {
      case untypedMap: Map[_, _] =>
        val map = untypedMap.asInstanceOf[Map[AnyRef, AnyRef]]
        val valueWithId = addId(map, id)
        data = data.updated(name, data(name).updated(id, valueWithId))
      case notMap =>
        data = data.updated(name, data(name).updated(id, value))
    }
  }

  override def find(name: String, id: String): AnyRef = data(name)(id)

  override def create(name: String, value: Object): String = {
    value match {
      case untypedMap: Map[_, _] =>
        val map = untypedMap.asInstanceOf[Map[AnyRef, AnyRef]]
        lookForId(map) match {
          case Some(id) =>
            data = data.updated(name, data(name).updated(id, value))
            id
          case None =>
            idNumbers += name -> (idNumbers(name) + 1)
            val idNumber = idNumbers(name)
            val id = idNumber.toString
            val valueWithId = addId(map, id)
            data = data.updated(name, data(name).updated(id, valueWithId))
            id
        }
      case notMap =>
        idNumbers += name -> (idNumbers(name) + 1)
        val idNumber = idNumbers(name)
        val id = idNumber.toString
        data = data.updated(name, data(name).updated(id, value))
        id
    }
  }

  def lookForId(map: Map[AnyRef, AnyRef]): Option[String] = {
    map.get("id") match {
      case Some(id) => Some(id.toString)
      case None => None
    }
  }

  def addId(map: Map[AnyRef, AnyRef], id: String): Map[_, _] = {
    val newMap = map + ("id" -> id)
    newMap
  }

  override def create(name: String, value: Object, id: String) {
    value match {
      case untypedMap: Map[_, _] =>
        val map = untypedMap.asInstanceOf[Map[AnyRef, AnyRef]]
        val valueWithId = addId(map, id)
        data = data.updated(name, data(name).updated(id, valueWithId))
      case notMap =>
        idNumbers += name -> (idNumbers(name) + 1)
        val idNumber = idNumbers(name)
        val id = idNumber.toString
        data = data.updated(name, data(name).updated(id, value))
    }
  }

  override def list(name: String): Seq[String] = {
    data(name).keys
  }
}
