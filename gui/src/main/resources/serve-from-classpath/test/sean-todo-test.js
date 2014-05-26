define(['lib/domReady!',
    'jquery',
    'qunit',
    'todo/sean/createTodoApplication'], function (dom, $, qunit, createTodoApplication) {
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
    qunit.module('sean-todo-test');
    qunit.test('start with no todo items', function () {
        var dom, fake;
        fake = createFake();

        fake.expectRequest({ uri: 'todo', method: 'GET'});
        dom = createTodoApplication(fake.jsonOverHttp);
        fake.resolveResponse({status: 200, body: []});

        qunit.equal(fake.getRequestCount(), 1, 'one request was made');
        qunit.equal(dom.find('li').length, 0, 'no todo items in list');
    });
    qunit.test('add todo item', function () {
        var dom, fake;
        fake = createFake();

        fake.expectRequest({ uri: 'todo', method: 'GET'});
        dom = createTodoApplication(fake.jsonOverHttp);
        fake.resolveResponse({status: 200, body: []});

        dom.find('.user-input').val('First thing to do');

        fake.expectRequest({ uri: 'todo', method: 'POST', 'body': {
            'item': 'First thing to do',
            'done': false
        }});
        dom.find('.add').click();
        fake.resolveResponse({status: 201, body: {
            'item': 'First thing to do',
            'done': false
        }});

        qunit.equal(fake.getRequestCount(), 2, 'two requests were made');
        qunit.equal(dom.find('.todo-label').length, 1, 'one todo item added');
        qunit.equal($(dom.find('.todo-label')[0]).text(), 'First thing to do', 'text matches');
        qunit.equal($(dom.find('.done-checkbox')[0]).is(':checked'), false, 'not checked');
    });
});
