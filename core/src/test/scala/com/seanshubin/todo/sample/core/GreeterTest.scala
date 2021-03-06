package com.seanshubin.todo.sample.core

import org.scalatest.FunSuite

class GreeterTest extends FunSuite {
  test("greeting") {
    val subject: Greeter = new Greeter()
    val target = "world"
    val actual = subject.sayHello(target)
    val expected = "Hello, world!"
    assert(expected === actual)
  }
}
