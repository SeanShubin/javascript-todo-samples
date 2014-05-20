define(['lib/domReady!',
    'jquery',
    'qunit',
    'sinon',
    'backbone',
    'todo/sean/backbone/createTodoApplication'], function (dom, $, qunit, sinon, Backbone, createTodoApplication) {
    'use strict';
    qunit.module('todo-backbone-test');
    qunit.test('learn sinon fake server', function () {
        var server = sinon.fakeServer.create();
        server.respondWith(
            "GET",
            "document/12345",
            [
                200,
                {"Content-Type": "application/json"},
                JSON.stringify({"name": "paul" })
            ]
        );
        var MyDocument = Backbone.Model.extend({
            url: function () {
                return 'document/' + this.id;
            }
        });
        var myDoc = new MyDocument({ id: 12345 });
        myDoc.fetch();
        server.respond();
        qunit.equal(myDoc.get('name'), 'paul', 'name is paul');
    });
    qunit.test('start with no items', function () {
        var $el, server, responseString;

        //returning an item when the test expects none should fail the test
        responseString = JSON.stringify([]);

        server = sinon.fakeServer.create();
        $el = createTodoApplication();
        server.respondWith('GET', 'item', [200, { "Content-Type": "application/json" }, responseString]);
        server.respond();
        qunit.equal(server.requests.length, 1, 'server.requests.length');
        qunit.equal(server.requests[0].method, "GET", 'server.requests[0].method ' + server.requests[0].method);
        qunit.equal(server.requests[0].url, "item", 'server.requests[0].url ' + server.requests[0].url);
        qunit.equal($el.find('li').length, 0, 'no items');
        server.restore();
    });
    qunit.test('add item', function () {
        var $el, server, responseString;
        responseString = JSON.stringify([
            {"number": 1, "name": "item", "id": "1"}
        ]);
        server = sinon.fakeServer.create();
        $el = createTodoApplication();
        server.respondWith('GET', 'item', [200, { "Content-Type": "application/json" }, JSON.stringify([])]);
        server.respond();
        $el.find('.add').click();
        server.respondWith('POST', 'item', [201, { "Content-Type": "application/json" }, responseString]);
        server.respond();
        qunit.equal($el.find('li').length, 1, 'one item added');
        qunit.equal($($el.find('li')[0]).text(), 'item 1', 'item 1');
        server.restore();
    });
    qunit.test('add many items', function () {
        var $el, addButton, server;
        server = sinon.fakeServer.create();
        $el = createTodoApplication();
        server.respondWith('GET', 'item', [200, { "Content-Type": "application/json" }, JSON.stringify([])]);
        server.respond();
        addButton = $el.find('.add');
        addButton.click();
        server.respondWith('POST', 'item', [201, { "Content-Type": "application/json" }, JSON.stringify([
            {"number": 1, "name": "item", "id": "1"}
        ])]);
        server.respond();
        addButton.click();
        server.respondWith('POST', 'item', [201, { "Content-Type": "application/json" }, JSON.stringify([
            {"number": 2, "name": "item", "id": "2"}
        ])]);
        server.respond();
        addButton.click();
        server.respondWith('POST', 'item', [201, { "Content-Type": "application/json" }, JSON.stringify([
            {"number": 3, "name": "item", "id": "3"}
        ])]);
        server.respond();
        qunit.equal($el.find('li').length, 3, 'three items added');
        qunit.equal($($el.find('li')[0]).text(), 'item 1', 'item 1');
        qunit.equal($($el.find('li')[1]).text(), 'item 2', 'item 2');
        qunit.equal($($el.find('li')[2]).text(), 'item 3', 'item 3');
    });
});