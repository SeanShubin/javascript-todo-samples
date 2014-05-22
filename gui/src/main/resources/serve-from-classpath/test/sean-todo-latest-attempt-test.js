define(['lib/domReady!',
    'jquery',
    'qunit',
    'todo/sean/latest-attempt/createTodoApplication'], function (dom, $, qunit, createTodoApplication) {
    'use strict';
    var createFake;
    createFake = function () {
        var requestCount, jsonOverHttp, asyncResponse, getRequestCount, expect, expectedRequest, resolveResponse;
        requestCount = 0;
        jsonOverHttp = function (actualRequest) {
            requestCount++;
            qunit.equal(actualRequest.uri, expectedRequest.uri, 'uri');
            qunit.equal(actualRequest.method, expectedRequest.method, 'method');
            qunit.deepEqual(actualRequest.body, expectedRequest.body, 'body');
            qunit.deepEqual(actualRequest, expectedRequest, 'request');
            return asyncResponse.promise();
        };
        getRequestCount = function () {
            return requestCount;
        };
        expect = function (newExpectedRequest) {
            expectedRequest = newExpectedRequest;
            asyncResponse = $.Deferred();
        };
        resolveResponse = function (newValue) {
            asyncResponse.resolve(newValue);
        };
        return {
            jsonOverHttp: jsonOverHttp,
            getRequestCount: getRequestCount,
            expect: expect,
            resolveResponse: resolveResponse
        };
    };
    qunit.module('sean-todo-latest-attempt-test');
    qunit.test('start with no items', function () {
        var dom, fake;
        fake = createFake();
        fake.expect({ uri: 'item', method: 'GET'});
        dom = createTodoApplication(fake.jsonOverHttp);
        fake.resolveResponse({status: 200, body: []});
        qunit.equal(fake.getRequestCount(), 1, 'one request was made');
        qunit.equal(dom.find('li').length, 0, 'no items in list');
    });
    qunit.test('add item', function () {
        var dom, fake;
        fake = createFake();
        fake.expect({ uri: 'item', method: 'GET'});
        dom = createTodoApplication(fake.jsonOverHttp);
        fake.resolveResponse({status: 200, body: []});
        fake.expect({ uri: 'item', method: 'POST', 'body': { "name": "item", "number": 1 }});
        dom.find('.add').click();
        fake.resolveResponse({status: 201, body: { "name": "item", "number": 1 }});
        qunit.equal(fake.getRequestCount(), 2, 'two requests were made');
        qunit.equal(dom.find('li').length, 1, 'one item added');
        qunit.equal($(dom.find('li')[0]).text(), 'item 1', 'item 1');
    });
    qunit.test('add many items', function () {
        var dom, fake;
        fake = createFake();
        fake.expect({ uri: 'item', method: 'GET'});
        dom = createTodoApplication(fake.jsonOverHttp);
        fake.resolveResponse({status: 200, body: []});
        fake.expect({ uri: 'item', method: 'POST', 'body': { "name": "item", "number": 1 }});
        dom.find('.add').click();
        fake.resolveResponse({status: 201, body: { "name": "item", "number": 1 }});
        fake.expect({ uri: 'item', method: 'POST', 'body': { "name": "item", "number": 2 }});
        dom.find('.add').click();
        fake.resolveResponse({status: 201, body: { "name": "item", "number": 2 }});
        fake.expect({ uri: 'item', method: 'POST', 'body': { "name": "item", "number": 3 }});
        dom.find('.add').click();
        fake.resolveResponse({status: 201, body: { "name": "item", "number": 3 }});
        qunit.equal(fake.getRequestCount(), 4, 'four requests were made');
        qunit.equal(dom.find('li').length, 3, 'three items added');
        qunit.equal($(dom.find('li')[0]).text(), 'item 1', 'item 1');
        qunit.equal($(dom.find('li')[1]).text(), 'item 2', 'item 2');
        qunit.equal($(dom.find('li')[2]).text(), 'item 3', 'item 3');
    });
});
