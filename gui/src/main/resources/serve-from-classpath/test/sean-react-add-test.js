define(['lib/domReady!',
    'jquery',
    'qunit',
    'react',
    'jsx!todo/sean/react/component-add'], function (dom, $, qunit, React, ComponentAdd) {
    'use strict';
    var renderIntoDocument, simulateChange, simulateClick;

    renderIntoDocument = React.addons.TestUtils.renderIntoDocument;
    simulateChange = React.addons.TestUtils.Simulate.change;
    simulateClick = React.addons.TestUtils.Simulate.click;

    qunit.module('sean-react-add-test');
    qunit.test('when user enters valid name and presses add button, fire add event', function () {
        var componentAdd, taskNameField, addTaskButton, addTaskEvent, tasksAdded;
        //GIVEN
        tasksAdded = [];
        addTaskEvent = function(taskName){
            tasksAdded.push(taskName)
        };
        componentAdd = React.createElement(ComponentAdd, {addTaskEvent: addTaskEvent});
        componentAdd = renderIntoDocument(componentAdd);
        taskNameField = componentAdd.refs.taskNameField.getDOMNode();
        addTaskButton = componentAdd.refs.addTaskButton.getDOMNode();

        //WHEN
        simulateChange(taskNameField, { target: { value: 'Task A' } });
        simulateClick(addTaskButton);

        //THEN
        qunit.equal(tasksAdded.length, 1, 'exactly one task added');
        qunit.equal(tasksAdded[0], 'Task A', 'task was added with correct name');
    });
});
