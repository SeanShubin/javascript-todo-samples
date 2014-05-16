package com.seanshubin.backbone.sample.test

import com.seanshubin.backbone.sample.core.http.Client
import com.seanshubin.backbone.sample.core.JsonMarshaller

case class TestEnvironment(client: Client, jsonMarshaller: JsonMarshaller)
