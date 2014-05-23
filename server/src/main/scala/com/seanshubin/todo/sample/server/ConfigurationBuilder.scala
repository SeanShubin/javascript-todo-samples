package com.seanshubin.todo.sample.server

case class ConfigurationBuilder(commandLineArguments: Seq[String],
                                maybePort: Option[Int] = None,
                                maybeOverrideServeFromClasspath: Option[String] = None,
                                errors: Seq[String] = Seq()) {
  def atLeastOneArgument: ConfigurationBuilder = {
    if (commandLineArguments.size < 1) addError("At least one argument is required")
    else this
  }

  def noMoreThanTwoArguments: ConfigurationBuilder = {
    if (commandLineArguments.size > 2) addError("No more than two arguments allowed")
    else this
  }

  def portMustBeInteger: ConfigurationBuilder = {
    if (commandLineArguments.size > 0) {
      try {
        val port = Integer.parseInt(commandLineArguments(0))
        copy(maybePort = Some(port))
      } catch {
        case ex: Exception =>
          addError(s"For port, unable to convert '${commandLineArguments(0)}' to an integer value")
      }
    } else {
      this
    }
  }

  def mayHavePath: ConfigurationBuilder = {
    val result =
      if (commandLineArguments.size > 1) copy(maybeOverrideServeFromClasspath = Some(commandLineArguments(1)))
      else this
    result
  }

  def addError(message: String) = copy(errors = errors :+ message)

  def toConfiguration: Either[Seq[String], Configuration] = {
    val withRulesApplied = atLeastOneArgument.noMoreThanTwoArguments.portMustBeInteger.mayHavePath
    withRulesApplied match {
      case ConfigurationBuilder(_, Some(port), theMaybeOverrideServeFromClasspath, Seq()) =>
        Right(Configuration(port, theMaybeOverrideServeFromClasspath))
      case ConfigurationBuilder(_, _, _, theErrors) =>
        Left(theErrors ++ syntax())

    }
  }

  def syntax(): Seq[String] = {
    Seq("",
      "One or two command line parameters required",
      "(1) port - must be an integer",
      "(2) class path override - path to directory to serve files from before looking at serve=from-classpath")
  }
}

object ConfigurationBuilder {
  def validate(commandLineArguments: Seq[String]): Either[Seq[String], Configuration] = {
    ConfigurationBuilder(commandLineArguments).toConfiguration
  }
}