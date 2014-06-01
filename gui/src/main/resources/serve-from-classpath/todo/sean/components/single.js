define(['jquery',
    'underscore',
    'underscore.string',
    'text!todo/sean/full-featured/single-template.html'], function ($, _, _s, singleTemplate) {
    'use strict';
    return function (overrides) {
        var dom, dataAccess, todoEntry, respondToTodoDeleted, respondToTodoModified, update, deleteEvent, doneEvent;
        dataAccess = overrides.dataAccess || {
            deleteEntry: function (id) {
            },
            setDoneStatus: function (idAndNewDoneStatus) {
            }
        };
        todoEntry = overrides.todoEntry || {
            id: '0', name: 'test name', done: false
        };
        dom = $(singleTemplate);
        dom.addClass('todo-id-' + todoEntry.id);
        update = function (todoEntry) {
            dom.find('.name').text(todoEntry.name);
            if (todoEntry.done) {
                dom.find('.done').attr('checked', 'checked');
            } else {
                dom.find('.done').removeAttr('checked');
            }
        };
        update(todoEntry);
        deleteEvent = function () {
            dataAccess.deleteEntry(todoEntry.id).then(respondToTodoDeleted);
        };
        doneEvent = function () {
            var checkedValue = dom.find('.todo-done').is(':checked');
            dataAccess.setDoneStatus(checkedValue).then(respondToTodoModified);
        };
        dom.find('.delete').on('click', deleteEvent);
        dom.find('.done').on('change', doneEvent);

        respondToTodoDeleted = function () {
            dom.remove();
        };
        respondToTodoModified = function (response) {
            update(response.body);
        };
        return {
            dom: dom,
            update: update
        };
    };
});
