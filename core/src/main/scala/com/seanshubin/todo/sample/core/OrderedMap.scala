package com.seanshubin.todo.sample.core

case class OrderedMap[KeyType, ValueType](keys: Seq[KeyType] = Seq[KeyType](),
                                          map: Map[KeyType, ValueType] = Map[KeyType, ValueType]()) {
  def +(entry: (KeyType, ValueType)) = {
    val (key, _) = entry
    val newOrder = if (keys.contains(key)) keys else keys :+ key
    val newMap = map + entry
    OrderedMap(newOrder, newMap)
  }

  def -(key: KeyType) = {
    val newKeys = keys.filter(_ != key)
    val newMap = map - key
    OrderedMap(newKeys, newMap)
  }

  def updated(key: KeyType, value: ValueType) = this +(key, value)

  def apply(key: KeyType) = map(key)

  def keyToEntry(key: KeyType): (KeyType, ValueType) = (key, map(key))

  def toSeq: Seq[(KeyType, ValueType)] = keys.map(keyToEntry)
}
