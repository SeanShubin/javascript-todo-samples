define(['jquery',
    'underscore',
    'underscore.string',
    'text!todo/sean/page-template.html',
    'text!todo/sean/todo-entry-template.html'], function ($, _, _s, pageTemplate, todoEntryTemplate) {
    'use strict';
    function createPrototypeTodoApplication(jsonOverHttp) {
        var dom, addButtonPressed, keyPressed, addButton, userInput, list, appendTodoEntryToView, respondToTodoAdded, respondToRefreshTodoEntries;
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
                jsonOverHttp({uri: 'todo', method: 'POST', body: todo}).then(respondToTodoAdded);
            }
        };
        appendTodoEntryToView = function (todoEntry) {
            var todoElement;
            todoElement = $(todoEntryTemplate);
            todoElement.find('.todo-id').val(todoEntry.id);
            todoElement.find('.todo-name').text(todoEntry.name);
            if (todoEntry.done) {
                todoElement.find('.todo-done').attr('checked', 'checked');
            } else {
                todoElement.find('.todo-done').removeAttr('checked');
            }
            list.append(todoElement);
        };
        respondToTodoAdded = function (response) {
            appendTodoEntryToView(response.body);
        };
        respondToRefreshTodoEntries = function (response) {
            _.each(response.body, appendTodoEntryToView);
        };
        addButton.on('click', addButtonPressed);
        userInput.on('keyup', keyPressed);
        jsonOverHttp({uri: 'todo', method: 'GET'}).then(respondToRefreshTodoEntries);
        return dom;
    }

    return createPrototypeTodoApplication;
});
