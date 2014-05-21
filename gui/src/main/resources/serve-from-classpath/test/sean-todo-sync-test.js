define(['lib/domReady!',
    'jquery',
    'qunit',
    'q',
    'todo/sean/sync/createTodoApplication'], function (dom, $, qunit, Q, createTodoApplication) {
    'use strict';
    qunit.module('todo-sync-test');
    qunit.test('start with no items', function () {
        var app, addItemToModelCount, loadItemsFromModelCount, listener;
        listener = {
            addItemToModel: function () {
                addItemToModelCount++;
            },
            loadItemsFromModel: function () {
                loadItemsFromModelCount++;
            }
        };
        addItemToModelCount = 0;
        loadItemsFromModelCount = 0;
        app = createTodoApplication(listener);
        qunit.equal(addItemToModelCount, 0, 'never called add item');
        qunit.equal(loadItemsFromModelCount, 1, 'called load items from model once');
        qunit.equal(app.dom.find('li').length, 0, 'no items in list');
    });
    qunit.test('add item', function () {
        var app, items, listener, loadItemsFromModelCount;
        items = [];
        listener = {
            addItemToModel: function (item) {
                items.push(item);
            },
            loadItemsFromModel: function () {
                loadItemsFromModelCount++;
            }
        };
        app = createTodoApplication(listener);
        app.dom.find('.add').click();
        qunit.equal(items.length, 1, 'called add item after pressing add button');
        app.addItemToView(items[0]);
        qunit.equal(app.dom.find('li').length, 1, 'one item added');
        qunit.equal($(app.dom.find('li')[0]).text(), 'item 1', 'item 1');
    });
    qunit.test('add many items', function () {
        var app, items, listener, loadItemsFromModelCount;
        items = [];
        listener = {
            addItemToModel: function (item) {
                items.push(item);
            },
            loadItemsFromModel: function () {
                loadItemsFromModelCount++;
            }
        };
        app = createTodoApplication(listener);
        app.dom.find('.add').click();
        app.dom.find('.add').click();
        app.dom.find('.add').click();
        qunit.equal(items.length, 3, 'called add item three times');
        app.addItemToView(items[0]);
        app.addItemToView(items[1]);
        app.addItemToView(items[2]);
        qunit.equal(app.dom.find('li').length, 3, 'three items added');
        qunit.equal($(app.dom.find('li')[0]).text(), 'item 1', 'item 1');
        qunit.equal($(app.dom.find('li')[1]).text(), 'item 2', 'item 2');
        qunit.equal($(app.dom.find('li')[2]).text(), 'item 3', 'item 3');
    });
});
