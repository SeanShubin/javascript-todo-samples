package com.seanshubin.todo.sample.server

import org.eclipse.jetty.server.handler.HandlerList
import org.eclipse.jetty.server.Handler

class CompositeHandler(handlers: Seq[Handler]) extends HandlerList {
  setHandlers(handlers.toArray)
}
