/*
 Terminology guide
 model
 -   todo
 -       id
 -       name
 -       done
 view
 -   layout
 -   add
 -       add-button
 -       name-field
 -   list
 -   entry
 -       done-checkbox
 -       name-label
 -       delete-button
 events
 -   create
 -   update
 -   delete
 -   get
 */
define(['todo/sean/components/layout',
        'todo/sean/components/data-access'],
    function (createLayout, createDataAccess) {
        'use strict';
        return function (jsonOverHttp) {
            var dataAccess, layout, initialize, component;
            dataAccess = createDataAccess(jsonOverHttp);
            initialize = function () {
                dataAccess.getAndFireCreateForAll();
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
