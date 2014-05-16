package com.seanshubin.backbone.sample.core

import org.scalatest.FunSuite
import com.seanshubin.backbone.sample.core.http.HttpParseUtil

class ParseContentTypeTest extends FunSuite {
  test("parse content type when no fields present") {
    val rawContentType = "application/json"
    val actualContentType = HttpParseUtil.parseContentType(rawContentType)
    val expectedContentType = "application/json"
    assert(expectedContentType === actualContentType)
  }
  test("parse content type when fields present") {
    val rawContentType = "application/json; charset=UTF-8"
    val actualContentType = HttpParseUtil.parseContentType(rawContentType)
    val expectedContentType = "application/json"
    assert(expectedContentType === actualContentType)
  }

}
