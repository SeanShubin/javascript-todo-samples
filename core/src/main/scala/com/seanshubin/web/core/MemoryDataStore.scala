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
    idNumbers += name -> (idNumbers(name) + 1)
    val idNumber = idNumbers(name)
    val id = idNumber.toString
    data = data.updated(name, data(name).updated(id, value))
    id
  }

  override def create(name: String, value: Object, id: String) {
    replace(name, id, value)
  }

  override def list(name: String): Seq[String] = {
    data(name).keys.toSeq.sorted
  }
}
