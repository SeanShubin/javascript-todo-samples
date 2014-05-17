define(['jquery', 'underscore', 'http/json-over-http'], function ($, _, jsonOverHttp) {
    'use strict';
    function createTodoApplication() {
        var root, addItemToModel, counter, addButton, list, addedItemToModel, addItemToView, refreshItemList;
        root = $("<div></div>");
        addButton = root.append('<button class="add">Add list item</button>');
        list = root.append('<ul></ul>');
        counter = 1;
        addItemToModel = function () {
            var item;
            item = {name: 'item', number: counter};
            counter++;
            jsonOverHttp({uri: 'item', method: 'POST', body: item}, addedItemToModel)
        };
        addedItemToModel = function (response) {
            addItemToView(response.body);
        };
        addItemToView = function (item) {
            var text = '<li>' + item.name + ' ' + item.number + '</li>';
            list.append($(text))
        };
        refreshItemList = function (itemListResponse) {
            _.each(itemListResponse.body, addItemToView);
        };
        addButton.on('click', addItemToModel);
        jsonOverHttp({uri: 'item', method: 'GET'}, refreshItemList);
        return root;
    }

    return createTodoApplication;
});
