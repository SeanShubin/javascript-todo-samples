define(['jquery', 'underscore', 'q'], function ($, _, Q) {
    'use strict';
    function createTodoApplication(jsonOverHttp) {
        var application, addItemToModel, counter, addButton, list, addedItemToModel, addItemToView, refreshItemList, returnApp, result;
        returnApp = function () {
            return application;
        };
        application = {};
        application.dom = $("<div></div>");
        addButton = application.dom.append('<button class="add">Add list item</button>');
        list = application.dom.append('<ul></ul>');
        counter = 1;
        addItemToModel = function () {
            var item;
            item = {name: 'item', number: counter};
            counter++;
            return jsonOverHttp({uri: 'item', method: 'POST', body: item}).then(addedItemToModel);
        };
        addedItemToModel = function (response) {
            var appDelegate = addItemToView(response.body);
            return appDelegate;
        };
        addItemToView = function (item) {
            var text = '<li>' + item.name + ' ' + item.number + '</li>';
            list.append($(text));
            return Q.fcall(returnApp);
        };
        refreshItemList = function (itemListResponse) {
            console.log('refresh item list');
            _.each(itemListResponse.body, addItemToView);
            return application;
        };
        addButton.on('click', addItemToModel);
        application.pressAddButton = addItemToModel;
        result = jsonOverHttp({uri: 'item', method: 'GET'}).then(refreshItemList);
        return result;
    }

    return createTodoApplication;
});
