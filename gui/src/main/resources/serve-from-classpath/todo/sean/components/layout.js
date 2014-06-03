define(['jquery',
    'todo/sean/components/add',
    'todo/sean/components/list',
    'text!todo/sean/components/layout-template.html'], function ($, createAdd, createList, layoutTemplate) {
    'use strict';
    return function (parameters) {
        var dom, list;
        list = createList(parameters);
        dom = $(layoutTemplate);
        dom.find('.add').replaceWith(createAdd(parameters));
        dom.find('.list').replaceWith(list);
        return {
            dom:dom,
            list:list
        };
    };
});
