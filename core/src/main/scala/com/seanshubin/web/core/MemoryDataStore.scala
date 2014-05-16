package com.seanshubin.backbone.sample.core

class MemoryDataStore(jsonMarshaller: JsonMarshaller) extends DataStore {
  private var data: Map[String, Map[String, AnyRef]] = Map().withDefaultValue(Map())
  private var idNumbers: Map[String, Long] = Map().withDefaultValue(0L)

  override def delete(name: String, id: String) {
    data = data.updated(name, data(name) - id)
  }

  override def replace(name: String, id: String, value: Object) {
    data = data.updated(name, data(name).updated(id, value))
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
        idNumbers += name -> (idNumbers(name) + 1)
        val idNumber = idNumbers(name)
        val id = idNumber.toString
        val valueWithId = addId(map, id)
        data = data.updated(name, data(name).updated(id, valueWithId))
        id
      case notMap =>
        idNumbers += name -> (idNumbers(name) + 1)
        val idNumber = idNumbers(name)
        val id = idNumber.toString
        data = data.updated(name, data(name).updated(id, value))
        id
    }
  }

  override def list(name: String): Seq[String] = {
    data(name).keys.toSeq.sorted
  }
}
