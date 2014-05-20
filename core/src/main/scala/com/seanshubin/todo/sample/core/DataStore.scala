package com.seanshubin.todo.sample.core

trait DataStore {
  def list(name: String): Seq[String]

  def create(name: String, value: Object): String

  def create(name: String, value: Object, id: String)

  def find(name: String, id: String): Object

  def replace(name: String, id: String, value: Object)

  def delete(name: String, id: String)
}
