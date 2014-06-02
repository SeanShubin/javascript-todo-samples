define(['todo/sean/components/layout', 'todo/sean/components/data-access'], function (createLayout, dataAccess) {
    'use strict';
    return function () {
        var createWithName, addToList, layout;
        createWithName = function (name) {
            dataAccess.createWithName(name).then(addToList);
        };
        addToList = function (todoEntry) {
            layout.list.todoEntryAdded(todoEntry);
        };
        layout = createLayout({
            createWithName: createWithName
        });
        return layout.dom;
    };
});
