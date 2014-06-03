define(['jquery',
        'text!todo/sean/components/todo-entry-template.html'],
    function ($, todoEntryTemplate) {
        'use strict';
        return function (parameters) {
            var dom, respondToUpdate, deleteClicked, doneChanged, respondToTodoDeleted;
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
                parameters.dataAccess.deleteEntry(parameters.todoEntry.id).then(respondToTodoDeleted);
            };
            doneChanged = function () {
                var checkedValue = dom.find('.done').is(':checked');
                parameters.dataAccess.setDoneStatus({
                    id: parameters.todoEntry.id,
                    done: checkedValue}).then(respondToUpdate);
            };
            respondToTodoDeleted = function () {
                dom.remove();
            };
            dom.find('.delete').on('click', deleteClicked);
            dom.find('.done').on('change', doneChanged);
            return dom;
        };
    });
