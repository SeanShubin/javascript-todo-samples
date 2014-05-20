define(['lib/domReady!',
    'jquery',
    'qunit',
    'q',
    'todo/sean/jquery/createTodoApplication'], function (dom, $, qunit, Q, createTodoApplication) {
    'use strict';
    qunit.module('todo-jquery-test');
    var createFakeJsonOverHttp = function (calls) {
        var callIndex;
        callIndex = 0;
        return function (options) {
            var deferredResponse, actualBody, expectedBody;
            qunit.equal(options.uri, calls[callIndex].request.uri, 'uri(' + callIndex + ') ' + options.uri);
            qunit.equal(options.method, calls[callIndex].request.method, 'method(' + callIndex + ') ' + options.method);
            actualBody = options.body;
            expectedBody = calls[callIndex].request.body;
            qunit.deepEqual(actualBody, expectedBody, 'body(' + callIndex + ') ' + options.body);
            deferredResponse = Q.defer();
            deferredResponse.resolve(calls[callIndex].response);
            callIndex++;
            return deferredResponse.promise;
        };
    };
    qunit.asyncTest('start with no items', function () {
        var appPromise, jsonOverHttp;
        jsonOverHttp = createFakeJsonOverHttp([
            {
                request: {uri: 'item', method: 'GET'},
                response: { status: 200, body: []}
            }
        ]);
        appPromise = createTodoApplication(jsonOverHttp);
        appPromise.then(function (app) {
            qunit.equal(app.dom.find('li').length, 0, 'no items in list');
            qunit.start();
        }).done();
    });
    qunit.asyncTest('add item', function () {
        var jsonOverHttp;
        jsonOverHttp = createFakeJsonOverHttp([
            {
                request: {uri: 'item', method: 'GET'},
                response: { status: 200, body: []}
            },
            {
                request: {uri: 'item', method: 'POST', body: { "name": "item", "number": 1}},
                response: { status: 200, body: { "name": "item", "number": 1, id: "1"}}
            }
        ]);
        createTodoApplication(jsonOverHttp).then(function (app) {
            return app.pressAddButton();
        }).then(function (app) {
            qunit.equal(app.dom.find('li').length, 1, 'one item added');
            qunit.equal($(app.dom.find('li')[0]).text(), 'item 1', 'item 1');
            qunit.start();
        }).done();
    });
    qunit.asyncTest('add many items', function () {
        var jsonOverHttp, pressAddButton, assertThreeItemsAdded;
        jsonOverHttp = createFakeJsonOverHttp([
            {
                request: {uri: 'item', method: 'GET'},
                response: { status: 200, body: []}
            },
            {
                request: {uri: 'item', method: 'POST', body: { "name": "item", "number": 1}},
                response: { status: 200, body: { "name": "item", "number": 1, id: "1"}}
            },
            {
                request: {uri: 'item', method: 'POST', body: { "name": "item", "number": 2}},
                response: { status: 200, body: { "name": "item", "number": 2, id: "2"}}
            },
            {
                request: {uri: 'item', method: 'POST', body: { "name": "item", "number": 3}},
                response: { status: 200, body: { "name": "item", "number": 3, id: "3"}}
            }
        ]);

        pressAddButton = function (app) {
            return app.pressAddButton();
        };

        assertThreeItemsAdded = function (app) {
            qunit.equal(app.dom.find('li').length, 3, 'three items added');
            qunit.equal($(app.dom.find('li')[0]).text(), 'item 1', 'item 1');
            qunit.equal($(app.dom.find('li')[1]).text(), 'item 2', 'item 2');
            qunit.equal($(app.dom.find('li')[2]).text(), 'item 3', 'item 3');
            qunit.start();
        };

        createTodoApplication(jsonOverHttp).
            then(pressAddButton).
            then(pressAddButton).
            then(pressAddButton).
            then(assertThreeItemsAdded).
            done();
    });
});
