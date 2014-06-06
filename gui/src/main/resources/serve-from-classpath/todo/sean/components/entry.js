define(['jquery',
        'text!todo/sean/components/entry-template.html'],
    function ($, entryTemplate) {
        'use strict';
        return function (parameters) {
            var dom, deleteButtonPressed, doneChanged, respondToUpdate, respondToDelete;
            respondToUpdate = function (todo) {
                dom.find('.name-label').text(todo.name);
                if (todo.done) {
                    dom.find('.done-checkbox').attr('checked', 'checked');
                } else {
                    dom.find('.done-checkbox').removeAttr('checked');
                }
            };
            deleteButtonPressed = function () {
                parameters.dataAccess.deleteTodo(parameters.todo.id).then(respondToDelete);
            };
            doneChanged = function () {
                var done = dom.find('.done-checkbox').is(':checked');
                parameters.dataAccess.setDone({
                    id: parameters.todo.id,
                    done: done}).then(respondToUpdate);
            };
            respondToDelete = function () {
                dom.remove();
            };
            dom = $(entryTemplate);
            dom.addClass('todo-id-' + parameters.todo.id);
            dom.find('.delete-button').on('click', deleteButtonPressed);
            dom.find('.done-checkbox').on('change', doneChanged);
            respondToUpdate(parameters.todo);
            return dom;
        };
    });
