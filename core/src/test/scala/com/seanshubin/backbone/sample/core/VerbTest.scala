package com.seanshubin.backbone.sample.core

import com.seanshubin.backbone.sample.core.http.Verb
import org.scalatest.FunSuite

class VerbTest extends FunSuite {
  test("match") {
    import Verb._
    val methodAndPath = ("POST", "/aaa/bbb/ccc/ddd")
    val Post("aaa", firstValue, "ccc", secondValue) = methodAndPath
    assert(firstValue === "bbb")
    assert(secondValue === "ddd")
  }
}
