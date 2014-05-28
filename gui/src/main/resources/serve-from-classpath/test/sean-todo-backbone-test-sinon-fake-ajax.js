define(['lib/domReady!',
    'jquery',
    'qunit',
    'sinon',
    'backbone',
    'todo/sean/backbone/createTodoComponent'], function (dom, $, qunit, sinon, Backbone, createTodoComponent) {
    'use strict';
    qunit.module('sean-todo-backbone-test-sinon-fake-ajax');
    qunit.test('start with no items', function () {
        var $el, stubbedAjax, ajaxResponse, fakeAjax;
        fakeAjax = function (options) {
            options.success(ajaxResponse);
        };
        stubbedAjax = sinon.stub(Backbone, 'ajax', fakeAjax);

        ajaxResponse = [];
        $el = createTodoComponent();

        qunit.equal($el.find('li').length, 0, 'no items');

        qunit.equal(1, stubbedAjax.callCount, 'one ajax call');
        qunit.equal(stubbedAjax.firstCall.args[0].type, 'GET');
        qunit.equal(stubbedAjax.firstCall.args[0].url, 'item');

        stubbedAjax.restore();
    });

    qunit.test('add item', function () {
        var $el, stubbedAjax, ajaxResponse, fakeAjax;
        fakeAjax = function (options) {
            options.success(ajaxResponse);
        };
        stubbedAjax = sinon.stub(Backbone, 'ajax', fakeAjax);

        ajaxResponse = [];
        $el = createTodoComponent();

        ajaxResponse = { id: '1', name: 'item', number: 1 };
        $el.find('.add').click();

        qunit.equal($el.find('li').length, 1, 'one item added');
        qunit.equal($($el.find('li')[0]).text(), 'item 1', 'item 1');

        qunit.equal(2, stubbedAjax.callCount, 'two ajax calls');
        qunit.equal(stubbedAjax.getCall(0).args[0].type, 'GET');
        qunit.equal(stubbedAjax.getCall(0).args[0].url, 'item');
        qunit.equal(stubbedAjax.getCall(1).args[0].type, 'POST');
        qunit.equal(stubbedAjax.getCall(1).args[0].url, 'item');

        stubbedAjax.restore();
    });
    qunit.test('add many items', function () {
        var $el, stubbedAjax, ajaxResponse, fakeAjax;

        fakeAjax = function (options) {
            options.success(ajaxResponse);
        };
        stubbedAjax = sinon.stub(Backbone, 'ajax', fakeAjax);

        ajaxResponse = [];
        $el = createTodoComponent();

        ajaxResponse = { id: '1', name: 'item', number: 1 };
        $el.find('.add').click();

        ajaxResponse = { id: '2', name: 'item', number: 2 };
        $el.find('.add').click();

        ajaxResponse = { id: '3', name: 'item', number: 3 };
        $el.find('.add').click();

        qunit.equal($el.find('li').length, 3, 'three items added');
        qunit.equal($($el.find('li')[0]).text(), 'item 1', 'item 1');
        qunit.equal($($el.find('li')[1]).text(), 'item 2', 'item 2');
        qunit.equal($($el.find('li')[2]).text(), 'item 3', 'item 3');

        qunit.equal(4, stubbedAjax.callCount, 'four ajax calls');
        qunit.equal(stubbedAjax.getCall(0).args[0].type, 'GET', 'type get');
        qunit.equal(stubbedAjax.getCall(0).args[0].url, 'item', 'url item');
        qunit.equal(stubbedAjax.getCall(1).args[0].type, 'POST', 'type post');
        qunit.equal(stubbedAjax.getCall(1).args[0].url, 'item', 'url item');
        qunit.equal(stubbedAjax.getCall(2).args[0].type, 'POST', 'type post');
        qunit.equal(stubbedAjax.getCall(2).args[0].url, 'item', 'url item');
        qunit.equal(stubbedAjax.getCall(3).args[0].type, 'POST', 'type post');
        qunit.equal(stubbedAjax.getCall(3).args[0].url, 'item');

        stubbedAjax.restore();
    });
    qunit.test('start with many items', function () {
        var $el, stubbedAjax, ajaxResponse, fakeAjax;

        fakeAjax = function (options) {
            options.success(ajaxResponse);
        };
        stubbedAjax = sinon.stub(Backbone, 'ajax', fakeAjax);

        ajaxResponse = [
            { id: '1', name: 'item', number: 1 },
            { id: '2', name: 'item', number: 2 },
            { id: '3', name: 'item', number: 3 }
        ];
        $el = createTodoComponent();

        qunit.equal($el.find('li').length, 3, 'three items added');
        qunit.equal($($el.find('li')[0]).text(), 'item 1', 'item 1');
        qunit.equal($($el.find('li')[1]).text(), 'item 2', 'item 2');
        qunit.equal($($el.find('li')[2]).text(), 'item 3', 'item 3');

        qunit.equal(1, stubbedAjax.callCount, 'one ajax call');
        qunit.equal(stubbedAjax.getCall(0).args[0].type, 'GET', 'type get');
        qunit.equal(stubbedAjax.getCall(0).args[0].url, 'item', 'url item');

        stubbedAjax.restore();
    });
});
