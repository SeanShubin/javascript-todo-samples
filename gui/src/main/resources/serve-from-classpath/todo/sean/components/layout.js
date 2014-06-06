define(['jquery',
        'todo/sean/components/add',
        'todo/sean/components/list',
        'text!todo/sean/components/layout-template.html'],
    function ($, createAdd, createList, layoutTemplate) {
        'use strict';
        return function (dataAccess) {
            var dom = $(layoutTemplate);
            dom.find('.add').replaceWith(createAdd(dataAccess));
            dom.find('.list').replaceWith(createList(dataAccess));
            return dom;
        };
    });
