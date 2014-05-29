define(['jquery',
    'underscore',
    'underscore.string',
    'text!todo/sean/full-featured/page-template.html',
    'text!todo/sean/full-featured/todo-entry-template.html'], function ($, _, _s, pageTemplate, todoEntryTemplate) {
    'use strict';
    function createPrototypeTodoComponent(jsonOverHttp) {
        var dom, addButtonPressed, keyPressed, addButton, userInput, list, appendTodoEntryToView, respondToTodoAdded,
            respondToRefreshTodoEntries, respondToTodoDeleted, respondToTodoModified, updateTodoElementValues;
        dom = $(pageTemplate);
        addButton = dom.find('.add-todo-entry-button');
        userInput = dom.find('.user-input');
        list = dom.find('.todo-entries-list');
        keyPressed = function (event) {
            if (event.which === 13) {
                addButtonPressed();
            }
        };
        addButtonPressed = function () {
            var toAdd, todo;
            toAdd = _s.trim(userInput.val());
            if (!_s.isBlank(toAdd)) {
                userInput.val('');
                userInput.focus();
                todo = { name: toAdd, done: false };
                jsonOverHttp({uri: 'todo-entry', method: 'POST', body: todo}).then(respondToTodoAdded);
            }
        };
        appendTodoEntryToView = function (todoEntry) {
            var todoElement, deleteEvent, doneEvent;
            todoElement = $(todoEntryTemplate);
            list.append(todoElement);
            todoElement.addClass('todo-id-' + todoEntry.id);
            updateTodoElementValues(todoEntry);
            deleteEvent = function () {
                jsonOverHttp({uri: 'todo-entry/' + todoEntry.id, method: 'DELETE'}).then(respondToTodoDeleted);
            };
            doneEvent = function () {
                var checkedValue = todoElement.find('.todo-done').is(':checked');
                jsonOverHttp({
                    uri: 'todo-entry/' + todoEntry.id,
                    method: 'PATCH',
                    body: {done: checkedValue}
                }).then(respondToTodoModified);
            };
            todoElement.find('.todo-delete').on('click', deleteEvent);
            todoElement.find('.todo-done').on('change', doneEvent);
        };
        respondToTodoAdded = function (response) {
            appendTodoEntryToView(response.body);
        };
        respondToRefreshTodoEntries = function (response) {
            _.each(response.body, appendTodoEntryToView);
        };
        respondToTodoDeleted = function (response) {
            dom.find('.todo-id-' + response.body.id).remove();
        };
        updateTodoElementValues = function(todoEntry) {
            var todoElement = dom.find('.todo-id-' + todoEntry.id);
            todoElement.find('.todo-name').text(todoEntry.name);
            if (todoEntry.done) {
                todoElement.find('.todo-done').attr('checked', 'checked');
            } else {
                todoElement.find('.todo-done').removeAttr('checked');
            }
        };
        respondToTodoModified = function (response) {
            updateTodoElementValues(response.body);
        };
        addButton.on('click', addButtonPressed);
        userInput.on('keyup', keyPressed);
        jsonOverHttp({uri: 'todo-entry', method: 'GET'}).then(respondToRefreshTodoEntries);
        return dom;
    }

    return createPrototypeTodoComponent;
});
