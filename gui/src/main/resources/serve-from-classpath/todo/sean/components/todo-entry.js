define(['jquery',
        'underscore',
        'underscore.string',
        'text!todo/sean/components/todo-entry-template.html'],
    function ($, _, _s, todoEntryTemplate) {
        'use strict';
        return function (parameters) {
            var dom, todoEntry, respondToTodoDeleted, respondToUpdate, deleteClicked, doneChanged;
            dom = $(todoEntryTemplate);
            dom.addClass('todo-id-' + parameters.todoEntry.id);
            respondToUpdate = function (todoEntry) {
                dom.find('.name').text(todoEntry.name);
                if (todoEntry.done) {
                    dom.find('.done').attr('checked', 'checked');
                } else {
                    dom.find('.done').removeAttr('checked');
                }
            };
            respondToUpdate(parameters.todoEntry);
            deleteClicked = function () {
                parameters.dataAccess.deleteEntry(todoEntry.id).then(respondToTodoDeleted);
            };
            doneChanged = function () {
                var checkedValue = dom.find('.todo-done').is(':checked');
                parameters.dataAccess.setDoneStatus(checkedValue).then(respondToUpdate);
            };
            respondToTodoDeleted = function () {
                dom.remove();
            };
            dom.find('.delete').on('click', deleteClicked);
            dom.find('.done').on('change', doneChanged);
            return dom;
        };
    });
