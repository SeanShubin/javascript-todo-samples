define(['lib/domReady!',
    'jquery',
    'qunit',
    'sinon',
    'backbone',
    'todo/sean/backbone/createTodoComponent'], function (dom, $, qunit, sinon, Backbone, createTodoComponent) {
    'use strict';
    qunit.module('sean-todo-backbone-test-sinon-fake-server');
    qunit.test('start with no items', function () {
        var $el, server;
        server = sinon.fakeServer.create();

        $el = createTodoComponent();
        server.respondWith('GET', 'db/item', [200, { 'Content-Type': 'application/json' }, JSON.stringify([])]);
        server.respond();

        qunit.equal(server.requests.length, 1, 'server.requests.length');
        qunit.equal(server.requests[0].method, 'GET', 'server.requests[0].method ' + server.requests[0].method);
        qunit.equal(server.requests[0].url, 'db/item', 'server.requests[0].url ' + server.requests[0].url);
        qunit.equal($el.find('li').length, 0, 'no items');

        server.restore();
    });
    qunit.test('add item', function () {
        var $el, server;
        server = sinon.fakeServer.create();

        $el = createTodoComponent();
        server.respondWith('GET', 'db/item', [200, { 'Content-Type': 'application/json' }, JSON.stringify([])]);
        server.respond();

        $el.find('.add').click();

        qunit.equal($el.find('li').length, 1, 'one item added');
        qunit.equal($($el.find('li')[0]).text(), 'item 1', 'item 1');

        server.restore();
    });
    qunit.test('add many items', function () {
        var $el, addButton, server;
        server = sinon.fakeServer.create();

        $el = createTodoComponent();
        server.respondWith('GET', 'db/item', [200, { 'Content-Type': 'application/json' }, JSON.stringify([])]);
        server.respond();

        addButton = $el.find('.add');
        addButton.click();
        addButton.click();
        addButton.click();

        qunit.equal($el.find('li').length, 3, 'three items added');
        qunit.equal($($el.find('li')[0]).text(), 'item 1', 'item 1');
        qunit.equal($($el.find('li')[1]).text(), 'item 2', 'item 2');
        qunit.equal($($el.find('li')[2]).text(), 'item 3', 'item 3');

        server.restore();
    });
    qunit.test('start with many items', function () {
        var $el, server;
        server = sinon.fakeServer.create();

        $el = createTodoComponent();
        server.respondWith('GET', 'db/item',
            [
                200,
                { 'Content-Type': 'application/json' },
                JSON.stringify([
                    { id: "1", name: "item", number: 1 },
                    { id: "2", name: "item", number: 2 },
                    { id: "3", name: "item", number: 3 }
                ])
            ]);
        server.respond();

        qunit.equal($el.find('li').length, 3, 'three items added');
        qunit.equal($($el.find('li')[0]).text(), 'item 1', 'item 1');
        qunit.equal($($el.find('li')[1]).text(), 'item 2', 'item 2');
        qunit.equal($($el.find('li')[2]).text(), 'item 3', 'item 3');

        server.restore();
    });
});
