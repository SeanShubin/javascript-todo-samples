package com.seanshubin.backbone.sample.test

import java.net.ServerSocket

class FreePortFinderImpl extends FreePortFinder {
  override def port: Int = {
    val serverSocket: ServerSocket = new ServerSocket(0)
    val freePort = serverSocket.getLocalPort
    serverSocket.close()
    freePort
  }
}
