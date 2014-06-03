define(['todo/sean/components/layout',
        'todo/sean/components/data-access'],
    function (createLayout, createDataAccess) {
        'use strict';
        return function (jsonOverHttp) {
            var dataAccess, layout, initialize, component;
            dataAccess = createDataAccess(jsonOverHttp);
            initialize = function () {
                dataAccess.getAllAndFireCreateForEachTodoEntry();
                return component;
            };
            layout = createLayout(dataAccess);
            component = {
                dom: layout,
                initialize: initialize
            };
            return component;
        };
    });
