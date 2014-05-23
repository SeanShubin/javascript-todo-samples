package com.seanshubin.todo.sample.server

trait RunnerFactory {
  def create(configuration: Configuration): Runner
}
