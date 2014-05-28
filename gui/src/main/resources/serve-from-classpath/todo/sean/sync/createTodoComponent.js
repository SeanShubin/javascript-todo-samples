define(['jquery', 'underscore'], function ($, _) {
    'use strict';
    function createTodoComponent(listeners) {
        var dom, addItemToModel, counter, addButton, list, addItemToView, addItemResponseToView, setItemsInView;
        dom = $("<div></div>");
        addButton = dom.append('<button class="add">Add list item</button>');
        list = dom.append('<ul></ul>');
        counter = 1;
        addItemToModel = function () {
            var item;
            item = {name: 'item', number: counter};
            counter++;
            listeners.addItemToModel(item);
        };
        addItemResponseToView = function (response) {
            addItemToView(response.body);
        };
        addItemToView = function (item) {
            var text;
            text = '<li>' + item.name + ' ' + item.number + '</li>';
            list.append($(text));
        };
        setItemsInView = function (itemListResponse) {
            _.each(itemListResponse.body, addItemToView);
        };
        addButton.on('click', addItemToModel);
        listeners.loadItemsFromModel();
        return {
            dom: dom,
            addItemToView: addItemResponseToView,
            setItemsInView: setItemsInView
        };
    }

    return createTodoComponent;
});
