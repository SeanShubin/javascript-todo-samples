package com.seanshubin.todo.sample.test

import com.seanshubin.todo.sample.core.http.Client
import com.seanshubin.todo.sample.core.JsonMarshaller

case class TestEnvironment(client: Client, jsonMarshaller: JsonMarshaller)
