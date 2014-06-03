define(['jquery',
        'todo/sean/components/todo-entry',
        'text!todo/sean/components/todo-entry-list-template.html'],
    function ($, createTodoEntryComponent, listTemplate) {
        'use strict';
        return function (dataAccess) {
            var dom, createTodoEntry;
            dom = $(listTemplate);
            createTodoEntry = function (todoEntry) {
                var todoEntryDom = createTodoEntryComponent({
                    dataAccess: dataAccess,
                    todoEntry: todoEntry
                });
                dom.append(todoEntryDom);
            };
            dataAccess.addCreateListener(createTodoEntry);
            return dom;
        };
    });
