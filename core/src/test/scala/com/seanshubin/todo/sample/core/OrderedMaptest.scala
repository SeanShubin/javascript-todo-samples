package com.seanshubin.todo.sample.core

import org.scalatest.FunSuite

class OrderedMapTest extends FunSuite {
  test("ordered map") {
    var orderedMap: OrderedMap[Int, String] = new OrderedMap[Int, String]()
    orderedMap = orderedMap +(2, "b")
    orderedMap = orderedMap +(3, "c")
    orderedMap = orderedMap +(1, "a")
    val actual = orderedMap.toSeq
    val expected = Seq((2, "b"), (3, "c"), (1, "a"))
    assert(expected === actual)
  }

  test("don't allow duplicate keys") {
    var orderedMap: OrderedMap[Int, String] = new OrderedMap[Int, String]()
    orderedMap = orderedMap +(2, "b")
    orderedMap = orderedMap +(3, "c")
    orderedMap = orderedMap +(1, "a")
    orderedMap = orderedMap +(3, "c")
    val actual = orderedMap.toSeq
    val expected = Seq((2, "b"), (3, "c"), (1, "a"))
    assert(expected === actual)
  }

  test("delete") {
    var orderedMap: OrderedMap[Int, String] = new OrderedMap[Int, String]()
    orderedMap = orderedMap +(2, "b")
    orderedMap = orderedMap +(3, "c")
    orderedMap = orderedMap +(1, "a")
    orderedMap = orderedMap - 3
    val actual = orderedMap.toSeq
    val expected = Seq((2, "b"), (1, "a"))
    assert(expected === actual)
  }
}
