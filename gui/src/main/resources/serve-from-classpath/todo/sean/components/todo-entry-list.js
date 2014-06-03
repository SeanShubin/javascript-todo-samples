define(['jquery',
    'underscore',
    'underscore.string',
    'todo/sean/components/todo-entry',
    'text!todo/sean/components/todo-entry-list-template.html'], function ($, _, _s, createTodoEntryComponent, listTemplate) {
    'use strict';
    return function (parameters) {
        var dom, list, createTodoEntry;
        dom = $(listTemplate);
        createTodoEntry = function (todoEntry) {
            var todoEntryDom = createTodoEntryComponent(_.extend(parameters, {
                todoEntry: todoEntry
            }));
            list.append(todoEntryDom);
        };
        return {
            dom: dom,
            createTodoEntry: createTodoEntry
        };
    };
});
