package com.seanshubin.todo.sample.server

import com.seanshubin.todo.sample.core.notifications.{Notifications, LineEmittingNotifications}

trait LauncherWiring {
  def commandLineArguments: Seq[String]

  lazy val emitLine: String => Unit = println
  lazy val notifications: Notifications = new LineEmittingNotifications(emitLine)
  lazy val runnerFactory: RunnerFactory = new RunnerFactoryImpl()
  lazy val launcher: Launcher = new LauncherImpl(commandLineArguments, notifications, runnerFactory)
}
