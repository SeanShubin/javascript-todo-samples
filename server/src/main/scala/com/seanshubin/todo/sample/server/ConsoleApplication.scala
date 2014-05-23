package com.seanshubin.todo.sample.server

object ConsoleApplication extends App with LauncherWiring {
  lazy val commandLineArguments = args.toSeq
  launcher.launch()
}
