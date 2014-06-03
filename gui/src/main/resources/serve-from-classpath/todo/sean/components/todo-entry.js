define(['jquery',
    'underscore',
    'underscore.string',
    'text!todo/sean/full-featured/todo-entry-template.html'], function ($, _, _s, todoEntryTemplate) {
    'use strict';
    return function (parameters) {
        var dom, dataAccess, todoEntry, respondToTodoDeleted, respondToUpdate, deleteClicked, doneChanged;
        todoEntry = parameters.todoEntry || {
            id: '0', name: 'test name', done: false
        };
        dataAccess = _.extend({setDoneStatus:function(done){}, deleteEntry:function(id){}}, parameters.dataAccess);
        dom = $(todoEntryTemplate);
        dom.addClass('todo-id-' + todoEntry.id);
        respondToUpdate = function (todoEntry) {
            dom.find('.name').text(todoEntry.name);
            if (todoEntry.done) {
                dom.find('.done').attr('checked', 'checked');
            } else {
                dom.find('.done').removeAttr('checked');
            }
        };
        respondToUpdate(todoEntry);
        deleteClicked = function () {
            dataAccess.deleteEntry(todoEntry.id).then(respondToTodoDeleted);
        };
        doneChanged = function () {
            var checkedValue = dom.find('.todo-done').is(':checked');
            dataAccess.setDoneStatus(checkedValue).then(respondToUpdate);
        };
        dom.find('.delete').on('click', deleteClicked);
        dom.find('.done').on('change', doneChanged);
        respondToTodoDeleted = function () {
            dom.remove();
        };
        return dom;
    };
});
