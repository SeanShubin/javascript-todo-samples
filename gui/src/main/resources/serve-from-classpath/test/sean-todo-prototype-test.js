define(['lib/domReady!',
    'jquery',
    'qunit',
    'todo/sean/prototype/createPrototypeTodoApplication'], function (dom, $, qunit, createTodoApplication) {
    'use strict';
    var createFake = function () {
        var requestCount, jsonOverHttp, asyncResponse, getRequestCount, expectRequest, expectedRequest, resolveResponse;
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
        expectRequest = function (newExpectedRequest) {
            expectedRequest = newExpectedRequest;
            asyncResponse = $.Deferred();
        };
        resolveResponse = function (newValue) {
            asyncResponse.resolve(newValue);
        };
        return {
            jsonOverHttp: jsonOverHttp,
            getRequestCount: getRequestCount,
            expectRequest: expectRequest,
            resolveResponse: resolveResponse
        };
    };
    qunit.module('sean-todo-prototype-test');
    qunit.test('start with no items', function () {
        var dom, fake;
        fake = createFake();

        fake.expectRequest({ uri: 'item', method: 'GET'});
        dom = createTodoApplication(fake.jsonOverHttp);
        fake.resolveResponse({status: 200, body: []});

        qunit.equal(fake.getRequestCount(), 1, 'one request was made');
        qunit.equal(dom.find('li').length, 0, 'no items in list');
    });
    qunit.test('add item', function () {
        var dom, fake;
        fake = createFake();

        fake.expectRequest({ uri: 'item', method: 'GET'});
        dom = createTodoApplication(fake.jsonOverHttp);
        fake.resolveResponse({status: 200, body: []});

        fake.expectRequest({ uri: 'item', method: 'POST', 'body': { 'name': 'item', 'number': 1 }});
        dom.find('.add').click();
        fake.resolveResponse({status: 201, body: { 'name': 'item', 'number': 1 }});

        qunit.equal(fake.getRequestCount(), 2, 'two requests were made');
        qunit.equal(dom.find('li').length, 1, 'one item added');
        qunit.equal($(dom.find('li')[0]).text(), 'item 1', 'item 1');
    });
    qunit.test('add many items', function () {
        var dom, fake;
        fake = createFake();

        fake.expectRequest({ uri: 'item', method: 'GET'});
        dom = createTodoApplication(fake.jsonOverHttp);
        fake.resolveResponse({status: 200, body: []});

        fake.expectRequest({ uri: 'item', method: 'POST', 'body': { 'name': 'item', 'number': 1 }});
        dom.find('.add').click();
        fake.resolveResponse({status: 201, body: { 'name': 'item', 'number': 1 }});

        fake.expectRequest({ uri: 'item', method: 'POST', 'body': { 'name': 'item', 'number': 2 }});
        dom.find('.add').click();
        fake.resolveResponse({status: 201, body: { 'name': 'item', 'number': 2 }});

        fake.expectRequest({ uri: 'item', method: 'POST', 'body': { 'name': 'item', 'number': 3 }});
        dom.find('.add').click();
        fake.resolveResponse({status: 201, body: { 'name': 'item', 'number': 3 }});

        qunit.equal(fake.getRequestCount(), 4, 'four requests were made');
        qunit.equal(dom.find('li').length, 3, 'three items added');
        qunit.equal($(dom.find('li')[0]).text(), 'item 1', 'item 1');
        qunit.equal($(dom.find('li')[1]).text(), 'item 2', 'item 2');
        qunit.equal($(dom.find('li')[2]).text(), 'item 3', 'item 3');
    });
});
/*
 Noteworthy features
 * fake does exactly what we need, and we can tell how it works by looking at it
 * 'requestCount' ensures we don't get a false positive if an event is not fired
 * behavior of jquery deferred allows test to be synchronous
 */
