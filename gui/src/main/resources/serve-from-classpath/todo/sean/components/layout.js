define(['jquery',
    'todo/sean/components/add',
    'todo/sean/components/list',
    'text!todo/sean/components/layout.html'], function ($, createAdd, createList, layoutTemplate) {
    'use strict';
    return function (overrides) {
        var dom = $(layoutTemplate);
        dom.find('.add').replaceWith(createAdd(overrides));
        dom.find('.list').replaceWith(createList(overrides));
        return dom;
    };
});
