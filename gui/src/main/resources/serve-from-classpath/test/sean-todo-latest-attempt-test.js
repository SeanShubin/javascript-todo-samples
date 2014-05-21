define(['lib/domReady!',
    'jquery',
    'qunit',
    'q',
    'todo/sean/latest-attempt/createTodoApplication'], function (dom, $, qunit, Q, createTodoApplication) {
    'use strict';

    qunit.module('sean-todo-latest-attempt-test');
    qunit.asyncTest('start with no items', function () {
        var dom, jsonOverHttp, response, expectedRequest, requestCount;
        requestCount = 0;
        jsonOverHttp = function (actualRequest) {
            requestCount++;
            qunit.equal(actualRequest.uri, expectedRequest.uri, 'uri');
            qunit.equal(actualRequest.method, expectedRequest.method, 'method');
            qunit.deepEqual(actualRequest.body, expectedRequest.body, 'body');
            return response.promise;
        };
        expectedRequest = { uri: 'item', method: 'GET'};
        response = Q.defer();
        dom = createTodoApplication(jsonOverHttp);
        response.resolve({status: 200, body: []});
        response.promise.then(function () {
            qunit.equal(requestCount, 1, 'one request was made');
            qunit.equal(dom.find('li').length, 0, 'no items in list');
            qunit.start();
        });
    });
    qunit.asyncTest('add item', function () {
        var dom, jsonOverHttp, response, expectedRequest, requestCount;
        requestCount = 0;
        jsonOverHttp = function (actualRequest) {
            requestCount++;
            qunit.equal(actualRequest.uri, expectedRequest.uri, 'uri');
            qunit.equal(actualRequest.method, expectedRequest.method, 'method');
            qunit.deepEqual(actualRequest.body, expectedRequest.body, 'body');
            return response.promise;
        };
        expectedRequest = { uri: 'item', method: 'GET'};
        response = Q.defer();
        dom = createTodoApplication(jsonOverHttp);
        response.resolve({status: 200, body: []});
        expectedRequest = { uri: 'item', method: 'POST', 'body': {
            "name": "item",
            "number": 1
        }};
        response = Q.defer();
        dom.find('.add').click();
        response.resolve({status: 201, body: {
            "name": "item",
            "number": 1
        }});
        response.promise.then(function () {
            qunit.equal(requestCount, 2, 'two requests were made');
            qunit.equal(dom.find('li').length, 1, 'one item added');
            qunit.equal($(dom.find('li')[0]).text(), 'item 1', 'item 1');
            qunit.start();
        });
    });
    qunit.asyncTest('add many items', function () {
        var dom, jsonOverHttp, response, expectedRequest, requestCount;
        requestCount = 0;
        jsonOverHttp = function (actualRequest) {
            requestCount++;
            qunit.equal(actualRequest.uri, expectedRequest.uri, 'uri');
            qunit.equal(actualRequest.method, expectedRequest.method, 'method');
            qunit.deepEqual(actualRequest.body, expectedRequest.body, 'body');
            return response.promise;
        };
        expectedRequest = { uri: 'item', method: 'GET'};
        response = Q.defer();
        dom = createTodoApplication(jsonOverHttp);
        response.resolve({status: 200, body: []});
        expectedRequest = { uri: 'item', method: 'POST', 'body': {
            "name": "item",
            "number": 1
        }};
        response = Q.defer();
        dom.find('.add').click();
        response.resolve({status: 201, body: {
            "name": "item",
            "number": 1
        }});
        expectedRequest = { uri: 'item', method: 'POST', 'body': {
            "name": "item",
            "number": 2
        }};
        response = Q.defer();
        dom.find('.add').click();
        response.resolve({status: 201, body: {
            "name": "item",
            "number": 2
        }});
        expectedRequest = { uri: 'item', method: 'POST', 'body': {
            "name": "item",
            "number": 3
        }};
        response = Q.defer();
        dom.find('.add').click();
        response.resolve({status: 201, body: {
            "name": "item",
            "number": 3
        }});
        response.promise.then(function () {
            qunit.equal(requestCount, 4, 'four requests were made');
            qunit.equal(dom.find('li').length, 3, 'three items added');
            qunit.equal($(dom.find('li')[0]).text(), 'item 1', 'item 1');
            qunit.equal($(dom.find('li')[1]).text(), 'item 2', 'item 2');
            qunit.equal($(dom.find('li')[2]).text(), 'item 3', 'item 3');
            qunit.start();
        });
    });
});
