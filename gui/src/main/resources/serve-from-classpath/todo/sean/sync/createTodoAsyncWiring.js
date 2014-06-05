define(function () {
    'use strict';
    function createTodoAsyncWiring(dependencies) {
        var listeners, app, addItemToView, setItemsInView;
        addItemToView = function (response) {
            app.addItemToView(response);
        };
        setItemsInView = function (response) {
            app.setItemsInView(response);
        };
        listeners = {
            addItemToModel: function (item) {
                dependencies.jsonOverHttp({uri: 'db/item', method: 'POST', body: item}).then(addItemToView);
            },
            loadItemsFromModel: function () {
                dependencies.jsonOverHttp({uri: 'db/item', method: 'GET'}).then(setItemsInView);
            }
        };
        app = dependencies.createTodoSyncComponent(listeners);
        return app.dom;
    }

    return createTodoAsyncWiring;
});
