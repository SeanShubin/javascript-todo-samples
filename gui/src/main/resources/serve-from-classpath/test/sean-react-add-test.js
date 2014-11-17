define(['lib/domReady!',
    'jquery',
    'qunit',
    'react',
    'jsx!todo/sean/react/component-add'], function (dom, $, qunit, React, ComponentAdd) {
    'use strict';
    var renderIntoDocument, simulateChange, simulateClick, fireChangeEvent, withElementOnRealDom;

    renderIntoDocument = React.addons.TestUtils.renderIntoDocument;
    simulateChange = React.addons.TestUtils.Simulate.change;
    simulateClick = React.addons.TestUtils.Simulate.click;

    fireChangeEvent = function($el) {
        var event = new Event("input", {bubbles: true, cancelable: false});
        $el.get(0).dispatchEvent(event);
    };

    withElementOnRealDom = function(element, callback) {
        $('body').append(element);
        callback();
        element.remove();
    };

    qunit.module('sean-react-add-test');

    qunit.test('when user enters valid name and presses add button, fire add event (react test utils version)', function () {
        var componentAdd, renderedComponentAdd, taskNameField, addTaskButton, addTaskEvent, tasksAdded;
        //GIVEN
        tasksAdded = [];
        addTaskEvent = function(taskName){
            tasksAdded.push(taskName)
        };
        componentAdd = React.createElement(ComponentAdd, {addTaskEvent: addTaskEvent});
        renderedComponentAdd = renderIntoDocument(componentAdd);
        taskNameField = renderedComponentAdd.refs.taskNameField.getDOMNode();
        addTaskButton = renderedComponentAdd.refs.addTaskButton.getDOMNode();

        //WHEN
        simulateChange(taskNameField, { target: { value: 'Task A' } });
        //THEN
        qunit.equal(renderedComponentAdd.refs.taskNameField.getDOMNode().value , 'Task A');

        //WHEN
        simulateClick(addTaskButton);
        //THEN
        qunit.equal(tasksAdded.length, 1, 'exactly one task added');
        qunit.equal(tasksAdded[0], 'Task A', 'task was added with correct name');
    });

    qunit.test('when user enters valid name and presses add button, fire add event (jquery version)', function () {
        var componentAdd, renderedComponentAdd, renderedComponentAdd$, taskNameField, addTaskButton, addTaskEvent, tasksAdded;

        //GIVEN
        tasksAdded = [];
        addTaskEvent = function(taskName){
            tasksAdded.push(taskName)
        };
        componentAdd = React.createElement(ComponentAdd, {addTaskEvent: addTaskEvent});
        renderedComponentAdd = document.createElement('div');
        React.render(componentAdd, renderedComponentAdd);
        renderedComponentAdd$ = $(renderedComponentAdd);

        taskNameField = renderedComponentAdd$.find('input');
        addTaskButton = renderedComponentAdd$.find('button');

        withElementOnRealDom(renderedComponentAdd$, function() {
            //WHEN
            simulateChange(taskNameField[0], { target: { value: 'Task A' } });
            //THEN
            qunit.equal(taskNameField.val(), 'Task A');

            //WHEN
            addTaskButton.click();
            //THEN
            qunit.equal(tasksAdded.length, 1, 'exactly one task added');
            qunit.equal(tasksAdded[0], 'Task A', 'task was added with correct name');
        });
    });
});
