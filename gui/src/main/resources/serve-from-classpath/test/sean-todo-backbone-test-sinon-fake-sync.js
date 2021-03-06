define(['lib/domReady!',
    'jquery',
    'qunit',
    'sinon',
    'backbone',
    'todo/sean/backbone/createTodoComponent'], function (dom, $, qunit, sinon, Backbone, createTodoComponent) {
    'use strict';
    qunit.module('sean-todo-backbone-test-sinon-fake-sync');
    qunit.test('start with no items', function () {
        var $el, stubbedSync, syncResponse, fakeSync;
        fakeSync = function (method, model, options) {
            options.success(syncResponse);
        };
        stubbedSync = sinon.stub(Backbone, 'sync', fakeSync);

        syncResponse = [];
        $el = createTodoComponent();

        qunit.equal($el.find('li').length, 0, 'no items');

        qunit.equal(1, stubbedSync.callCount, 'one sync call');
        qunit.equal(stubbedSync.getCall(0).args[0], 'read', 'read');
        qunit.equal(stubbedSync.getCall(0).args[1].url, 'db/item', 'url is item');

        stubbedSync.restore();
    });

    qunit.test('add item', function () {
        var $el, stubbedSync, syncResponse, fakeSync;
        fakeSync = function (method, model, options) {
            options.success(syncResponse);
        };
        stubbedSync = sinon.stub(Backbone, 'sync', fakeSync);

        syncResponse = [];
        $el = createTodoComponent();

        syncResponse = { id: '1', name: 'item', number: 1 };
        $el.find('.add').click();

        qunit.equal($el.find('li').length, 1, 'one item added');
        qunit.equal($($el.find('li')[0]).text(), 'item 1', 'item 1');

        qunit.equal(2, stubbedSync.callCount, 'two sync calls');
        qunit.equal(stubbedSync.getCall(0).args[0], 'read', 'method is read');
        qunit.equal(stubbedSync.getCall(0).args[1].url, 'db/item', 'url is item');
        qunit.equal(stubbedSync.getCall(1).args[0], 'create', 'method is create');
        qunit.equal(stubbedSync.getCall(1).args[1].url(), 'db/item/1', 'url is item');

        stubbedSync.restore();
    });
    qunit.test('add many items', function () {
        var $el, stubbedSync, syncResponse, fakeSync;

        fakeSync = function (method, model, options) {
            options.success(syncResponse);
        };
        stubbedSync = sinon.stub(Backbone, 'sync', fakeSync);

        syncResponse = [];
        $el = createTodoComponent();

        syncResponse = { id: '1', name: 'item', number: 1 };
        $el.find('.add').click();

        syncResponse = { id: '2', name: 'item', number: 2 };
        $el.find('.add').click();

        syncResponse = { id: '3', name: 'item', number: 3 };
        $el.find('.add').click();

        qunit.equal($el.find('li').length, 3, 'three items added');
        qunit.equal($($el.find('li')[0]).text(), 'item 1', 'item 1');
        qunit.equal($($el.find('li')[1]).text(), 'item 2', 'item 2');
        qunit.equal($($el.find('li')[2]).text(), 'item 3', 'item 3');

        qunit.equal(4, stubbedSync.callCount, 'four sync calls');
        qunit.equal(stubbedSync.getCall(0).args[0], 'read', 'method is read');
        qunit.equal(stubbedSync.getCall(0).args[1].url, 'db/item', 'url is item');
        qunit.equal(stubbedSync.getCall(1).args[0], 'create', 'method is create');
        qunit.equal(stubbedSync.getCall(1).args[1].url(), 'db/item/1', 'url is item');
        qunit.equal(stubbedSync.getCall(2).args[0], 'create', 'method is create');
        qunit.equal(stubbedSync.getCall(2).args[1].url(), 'db/item/2', 'url is item');
        qunit.equal(stubbedSync.getCall(3).args[0], 'create', 'method is create');
        qunit.equal(stubbedSync.getCall(3).args[1].url(), 'db/item/3', 'url is item');

        stubbedSync.restore();
    });
    qunit.test('start with many items', function () {
        var $el, stubbedSync, syncResponse, fakeSync;

        fakeSync = function (method, model, options) {
            options.success(syncResponse);
        };
        stubbedSync = sinon.stub(Backbone, 'sync', fakeSync);

        syncResponse = [
            { id: '1', name: 'item', number: 1 },
            { id: '2', name: 'item', number: 2 },
            { id: '3', name: 'item', number: 3 }
        ];
        $el = createTodoComponent();

        qunit.equal($el.find('li').length, 3, 'three items added');
        qunit.equal($($el.find('li')[0]).text(), 'item 1', 'item 1');
        qunit.equal($($el.find('li')[1]).text(), 'item 2', 'item 2');
        qunit.equal($($el.find('li')[2]).text(), 'item 3', 'item 3');

        qunit.equal(1, stubbedSync.callCount, 'one sync call');
        qunit.equal(stubbedSync.getCall(0).args[0], 'read', 'method is read');
        qunit.equal(stubbedSync.getCall(0).args[1].url, 'db/item', 'url is item');

        stubbedSync.restore();
    });
});
