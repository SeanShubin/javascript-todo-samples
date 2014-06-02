define(['jquery',
    'todo/sean/components/add',
    'todo/sean/components/list',
    'text!todo/sean/components/layout.html'], function ($, createAdd, createList, layoutTemplate) {
    'use strict';
    return function (parameters) {
        var dom = $(layoutTemplate);
        dom.find('.add').replaceWith(createAdd(parameters));
        dom.find('.list').replaceWith(createList(parameters));
        return dom;
    };
});
