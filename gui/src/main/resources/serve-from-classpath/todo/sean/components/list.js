define(['jquery',
        'todo/sean/components/entry',
        'text!todo/sean/components/list-template.html'],
    function ($, createEntryComponent, listTemplate) {
        'use strict';
        return function (dataAccess) {
            var dom, createTodoEntry;
            dom = $(listTemplate);
            createTodoEntry = function (todo) {
                var todoEntryDom = createEntryComponent({
                    dataAccess: dataAccess,
                    todo: todo
                });
                dom.append(todoEntryDom);
            };
            dataAccess.addCreateListener(createTodoEntry);
            return dom;
        };
    });
