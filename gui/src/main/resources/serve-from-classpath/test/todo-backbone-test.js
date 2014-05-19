define(['lib/domReady!',
    'jquery',
    'qunit',
    'sinon',
    'todo/backbone/createTodoApplication'], function (dom, $, qunit, sinon, createTodoApplication) {
    'use strict';
    qunit.module('todo-backbone-test');
    qunit.test('start with no items', function () {
        var $el, server, responseString;

        //returning an item when the test expects none should fail the test
        responseString = JSON.stringify([{
            "number" : 3,
            "name" : "item",
            "id" : "1"
        }]);

        console.log(responseString);
        server = sinon.fakeServer.create();
        server.respondWith([200, { }, responseString]);
        $el = createTodoApplication();
        qunit.equal(server.requests.length, 1, 'server.requests.length');
        qunit.equal(server.requests[0].method, "GET", 'server.requests[0].method ' + server.requests[0].method);
        qunit.equal(server.requests[0].url, "item", 'server.requests[0].url ' + server.requests[0].url);
        qunit.equal($el.find('li').length, 0, 'no items');
        server.restore();
    });
/*
    qunit.test('add item', function () {
        var $el;
        $el = createTodoApplication();
        $el.find('.add').click();
        qunit.equal($el.find('li').length, 1, 'one item added');
        qunit.equal($($el.find('li')[0]).text(), 'item 1', 'item 1');
    });
    qunit.test('add many items', function () {
        var $el, addButton;
        $el = createTodoApplication();
        addButton = $el.find('.add');
        addButton.click();
        addButton.click();
        addButton.click();
        qunit.equal($el.find('li').length, 3, 'three items added');
        qunit.equal($($el.find('li')[0]).text(), 'item 1', 'item 1');
        qunit.equal($($el.find('li')[1]).text(), 'item 2', 'item 2');
        qunit.equal($($el.find('li')[2]).text(), 'item 3', 'item 3');
    });
*/
});
