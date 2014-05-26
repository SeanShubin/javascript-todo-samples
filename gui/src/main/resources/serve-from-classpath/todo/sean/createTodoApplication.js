define(['jquery',
    'underscore',
    'underscore.string',
    'text!todo/sean/page-template.html',
    'text!todo/sean/item-template.html'], function ($, _, _s, pageTemplate, itemTemplate) {
    'use strict';
    function createPrototypeTodoApplication(jsonOverHttp) {
        var dom, addButtonPressed, keyPressed, addButton, userInput, list, appendItemToView, respondToTodoAdded, respondToRefreshItems;
        dom = $(pageTemplate);
        addButton = dom.find('.add-todo-item-button');
        userInput = dom.find('.user-input');
        list = dom.find('.todo-items-list');
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
        appendItemToView = function (todo) {
            var todoElement;
            todoElement = $(itemTemplate);
            todoElement.find('.todo-id').val(todo.id);
            todoElement.find('.todo-name').text(todo.name);
            if (todo.done) {
                todoElement.find('.todo-done').attr('checked', 'checked');
            } else {
                todoElement.find('.todo-done').removeAttr('checked');
            }
            list.append(todoElement);
        };
        respondToTodoAdded = function (response) {
            appendItemToView(response.body);
        };
        respondToRefreshItems = function (response) {
            _.each(response.body, appendItemToView);
        };
        addButton.on('click', addButtonPressed);
        userInput.on('keyup', keyPressed);
        jsonOverHttp({uri: 'todo', method: 'GET'}).then(respondToRefreshItems);
        return dom;
    }

    return createPrototypeTodoApplication;
});
