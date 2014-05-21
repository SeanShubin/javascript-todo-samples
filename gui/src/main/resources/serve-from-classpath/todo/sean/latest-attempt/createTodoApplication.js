define(['jquery', 'underscore'], function ($, _) {
    'use strict';
    function createTodoApplication(jsonOverHttp) {
        var dom, addItemToModel, counter, addButton, list, addItemToView, addItemResponseToView, setItemsInView, response;
        dom = $("<div></div>");
        addButton = dom.append('<button class="add">Add list item</button>');
        list = dom.append('<ul></ul>');
        counter = 1;
        addItemToModel = function () {
            var item;
            item = {name: 'item', number: counter};
            counter++;
            jsonOverHttp({uri: 'item', method: 'POST', body: item}).then(addItemResponseToView);
        };
        addItemToView = function (item) {
            var text;
            text = '<li>' + item.name + ' ' + item.number + '</li>';
            list.append($(text));
        };
        addItemResponseToView = function (response) {
            addItemToView(response.body);
        };
        setItemsInView = function (response) {
            _.each(response.body, addItemToView);
        };
        addButton.on('click', addItemToModel);
        response = jsonOverHttp({uri: 'item', method: 'GET'});
        response.then(setItemsInView);
        return dom;
    }

    return createTodoApplication;
});
