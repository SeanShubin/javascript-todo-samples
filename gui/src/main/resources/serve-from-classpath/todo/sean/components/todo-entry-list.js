define(['jquery',
        'underscore',
        'todo/sean/components/todo-entry',
        'text!todo/sean/components/todo-entry-list-template.html'],
    function ($, _, createTodoEntryComponent, listTemplate) {
        'use strict';
        return function (dataAccess) {
            var dom, list, createTodoEntry;
            dom = $(listTemplate);
            createTodoEntry = function (todoEntry) {
                var todoEntryDom = createTodoEntryComponent({
                    dataAccess: dataAccess,
                    todoEntry: todoEntry
                });
                list.append(todoEntryDom);
            };
            dataAccess.addCreateListener(createTodoEntry);
            return dom;
        };
    });
