define(['todo/sean/components/layout', 'todo/sean/components/data-access'], function (createLayout, createDataAccess) {
    'use strict';
    return function (jsonOverHttp) {
        var createTodoEntryNamed, createTodoEntry,createTodoEntries, dataAccess, layout, initialize;
        dataAccess = createDataAccess(jsonOverHttp);
        createTodoEntryNamed = function (name) {
            dataAccess.createWithName(name).then(createTodoEntry);
        };
        createTodoEntry = function (todoEntry) {
            layout.list.createTodoEntry(todoEntry);
        };
        initialize = function () {
            dataAccess.getEntries().then(createTodoEntries);
        };
        createTodoEntries = function(todoEntries) {
            _.each(todoEntries, createTodoEntry);
        };
        layout = createLayout({
            createTodoEntryNamed: createTodoEntryNamed,
            dataAccess: dataAccess
        });
        return {
            dom: layout.dom,
            initialize: initialize
        };
    };
});
