package com.seanshubin.todo.sample.test

trait ScenarioLoader {
  def load(name: String): TestScenario
}
