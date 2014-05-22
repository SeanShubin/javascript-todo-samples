define(['jquery', 'underscore'], function ($, _) {
    'use strict';
    function createTodoApplication(jsonOverHttp) {
        var dom, sendAddItemRequest, counter, addButton, list, appendItemToView, respondToItemAdded, respondToRefreshItems;
        dom = $("<div></div>");
        addButton = dom.append('<button class="add">Add list item</button>');
        list = dom.append('<ul></ul>');
        counter = 1;
        sendAddItemRequest = function () {
            var item;
            item = {name: 'item', number: counter};
            counter++;
            jsonOverHttp({uri: 'item', method: 'POST', body: item}).then(respondToItemAdded);
        };
        appendItemToView = function (item) {
            var text;
            text = '<li>' + item.name + ' ' + item.number + '</li>';
            list.append($(text));
        };
        respondToItemAdded = function (response) {
            appendItemToView(response.body);
        };
        respondToRefreshItems = function (response) {
            _.each(response.body, appendItemToView);
        };
        addButton.on('click', sendAddItemRequest);
        jsonOverHttp({uri: 'item', method: 'GET'}).then(respondToRefreshItems);
        return dom;
    }

    return createTodoApplication;
});
