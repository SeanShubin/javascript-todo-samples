define(['jquery', 'underscore'], function ($, _) {
    'use strict';
    function createTodoApplication(listeners) {
        var dom, addItemToModel, counter, addButton, list, addItemToView, setItemsInView;
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
            addItemToView: addItemToView,
            setItemsInView: setItemsInView
        };
    }

    return createTodoApplication;
});
