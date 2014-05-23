package com.seanshubin.todo.sample.server

import com.seanshubin.todo.sample.core.notifications.Notifications

class LauncherImpl(commandLineArguments: Seq[String],
                   notifications: Notifications,
                   runnerFactory: RunnerFactory) extends Launcher {
  override def launch(): Unit = {
    val configurationResult = ConfigurationBuilder.validate(commandLineArguments)
    configurationResult match {
      case Left(theConfigurationErrorReport) => notifications.errorWithConfiguration(theConfigurationErrorReport)
      case Right(validConfiguration) => runnerFactory.create(validConfiguration).run()
    }
  }
}
