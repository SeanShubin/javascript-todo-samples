define(['jquery',
    'underscore',
    'underscore.string',
    'text!todo/sean/components/list-template.html'], function ($, _, _s, listTemplate) {
    'use strict';
    return function (overrides) {
        var dom, createSingle, dataAccess, list, todoEntryAdded, todoEntriesRefreshed;
        createSingle = overrides.createSingle || function (todoEntry) {
        };
        dataAccess = overrides.dataAccess || {getEntries: function () {
        }};
        dom = $(listTemplate);
        todoEntryAdded = function (todoEntry) {
            var single = createSingle(_.extend(overrides, {todoEntry: todoEntry}));
            list.append(single.dom);
        };
        todoEntriesRefreshed = function (todoEntries) {
            dom.replaceWith(listTemplate);
            _.each(todoEntries, todoEntryAdded);
        };
        dataAccess.getEntries().then(todoEntriesRefreshed);
        return {
            dom: dom,
            todoEntryAdded: todoEntryAdded,
            todoEntriesRefreshed: todoEntriesRefreshed
        };
    };
});
