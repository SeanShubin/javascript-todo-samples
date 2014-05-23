define(['jquery', 'underscore'], function ($, _) {
    'use strict';
    function createTodoApplication(jsonOverHttp) {
        var dom, sendAddItemRequest, counter, addButton, list, appendItemToView, respondToItemAdded, respondToRefreshItems;
        dom = $("<div></div>");
        addButton = dom.append('<button class="add">Add list item</button>');
        list = dom.append('<ul></ul>');
        counter = 1;
        sendAddItemRequest = function () {
            var item = {name: 'item', number: counter};
            counter++;
            jsonOverHttp({uri: 'item', method: 'POST', body: item}).then(respondToItemAdded);
        };
        appendItemToView = function (item) {
            var text = '<li>' + item.name + ' ' + item.number + '</li>';
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
/*
 Noteworthy features
 * no hoisting, it is obvious when everything is defined
 * no anonymous functions, you can tell what each does by its name
 * multiple vars in same scope not initialized when declared, so can set breakpoint on each assignment
 * single vars in same scope initialized when declared
 * collaborator is constructor injected, so easy to fake without squire
 * each async call names its destination, so it is easy to follow the code flow
 * no knowledge of parent element, or its location in dom, or even if it is attached to the dom
 */
