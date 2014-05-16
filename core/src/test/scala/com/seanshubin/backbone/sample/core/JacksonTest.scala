package com.seanshubin.backbone.sample.core

import org.scalatest.FunSuite

class JacksonTest extends FunSuite {
  test("merge maps") {
    testMerge(
      """{"a": 1, "b": 2, "c": 3}""",
      """{"b": 4, "c": null, "d": 5}""",
      """{"a": 1, "b": 4, "d": 5}""")
  }
  test("merge strings") {
    testMerge(
      """"before"""",
      """"after"""",
      """"after"""")
  }
  test("merge arrays") {
    testMerge(
      """[1,2,3]""",
      """[2,3,4]""",
      """[2,3,4]""")
  }
  test("merge nested maps") {
    testMerge(
      """{"outer": {"a": 1, "b": 2, "c": 3}}""",
      """{"outer": {"b": 4, "c": null, "d": 5}}""",
      """{"outer": {"a": 1, "b": 4, "d": 5}}""")
  }

  def testMerge(a: String, b: String, expected: String) {
    val jsonMarshaller = new JsonMarshallerImpl
    val aObject = jsonMarshaller.fromJson(a, classOf[AnyRef])
    val bObject = jsonMarshaller.fromJson(b, classOf[AnyRef])
    val actual = jsonMarshaller.merge(aObject, bObject)
    val normalizedActual = jsonMarshaller.toJson(actual)
    val normalizedExpected = jsonMarshaller.normalize(expected)
    assert(normalizedExpected === normalizedActual)
  }
}
