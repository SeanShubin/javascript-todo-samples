package com.seanshubin.todo.sample.server

class RunnerFactoryImpl extends RunnerFactory {
  def create(theConfiguration: Configuration): Runner = new RunnerWiring {
    override def configuration: Configuration = theConfiguration
  }.runner
}
