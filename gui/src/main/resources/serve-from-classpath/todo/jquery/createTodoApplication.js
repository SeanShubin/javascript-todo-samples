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
            var item, promisePost, promiseAddedItem;
            item = {name: 'item', number: counter};
            counter++;
            promisePost = jsonOverHttp({uri: 'item', method: 'POST', body: item});
            promiseAddedItem = promisePost.then(function(response) {
                return addedItemToModel(response)
            });
            return promiseAddedItem;
        };
        addedItemToModel = function (response) {
            var promise = addItemToView(response.body);
            return promise;
        };
        addItemToView = function (item) {
            var text, promise;
            text = '<li>' + item.name + ' ' + item.number + '</li>';
            list.append($(text));
            promise = Q.fcall(returnApp);
            return promise;
        };
        refreshItemList = function (itemListResponse) {
            var promise;
            _.each(itemListResponse.body, addItemToView);
            promise = Q.fcall(returnApp);
            return promise;
        };
        addButton.on('click', addItemToModel);
        application.pressAddButton = addItemToModel;
        result = jsonOverHttp({uri: 'item', method: 'GET'}).then(refreshItemList);
        return result;
    }

    return createTodoApplication;
});
/*
contract
    outgoing
        addItem
    incoming
        itemAdded
        refreshItems
 */