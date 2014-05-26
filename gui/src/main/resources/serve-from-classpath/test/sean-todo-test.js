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
    qunit.test('start with no todo entries', function () {
        var dom, fake;
        fake = createFake();

        fake.expectRequest({ uri: 'todo', method: 'GET'});
        dom = createTodoApplication(fake.jsonOverHttp);
        fake.resolveResponse({status: 200, body: []});

        qunit.equal(fake.getRequestCount(), 1, 'one request was made');
        qunit.equal(dom.find('li').length, 0, 'no todo entries in list');
    });

    qunit.test('start with many todo entries', function () {
        var dom, fake;
        fake = createFake();

        fake.expectRequest({ uri: 'todo', method: 'GET'});
        dom = createTodoApplication(fake.jsonOverHttp);
        fake.resolveResponse({status: 200, body: [
            {id:'todo-1', name:'First thing to do', done:false},
            {id:'todo-2', name:'Second thing to do', done:true},
            {id:'todo-3', name:'Third thing to do', done:false},
        ]});

        qunit.equal(fake.getRequestCount(), 1, 'one request was made');
        qunit.equal(dom.find('.todo-name').length, 3, 'three todo entries added');
        qunit.equal($(dom.find('.todo-id')[0]).val(), 'todo-1', 'first id matches');
        qunit.equal($(dom.find('.todo-name')[0]).text(), 'First thing to do', 'first text matches');
        qunit.equal($(dom.find('.todo-done')[0]).is(':checked'), false, 'first not checked');
        qunit.equal($(dom.find('.todo-id')[1]).val(), 'todo-2', 'second id matches');
        qunit.equal($(dom.find('.todo-name')[1]).text(), 'Second thing to do', 'second text matches');
        qunit.equal($(dom.find('.todo-done')[1]).is(':checked'), true, 'second checked');
        qunit.equal($(dom.find('.todo-id')[2]).val(), 'todo-3', 'third id matches');
        qunit.equal($(dom.find('.todo-name')[2]).text(), 'Third thing to do', 'third text matches');
        qunit.equal($(dom.find('.todo-done')[2]).is(':checked'), false, 'third not checked');
    });

    qunit.test('add todo entry using button', function () {
        var dom, fake;
        fake = createFake();

        fake.expectRequest({ uri: 'todo', method: 'GET'});
        dom = createTodoApplication(fake.jsonOverHttp);
        fake.resolveResponse({status: 200, body: []});

        dom.find('.user-input').val('First thing to do');

        fake.expectRequest({ uri: 'todo', method: 'POST', 'body': {
            name: 'First thing to do',
            done: false
        }});
        dom.find('.add-todo-entry-button').click();
        fake.resolveResponse({status: 201, body: {
            id: 'todo-1',
            name: 'First thing to do',
            done: false
        }});

        qunit.equal(fake.getRequestCount(), 2, 'two requests were made');
        qunit.equal(dom.find('.todo-name').length, 1, 'one todo entry added');
        qunit.equal($(dom.find('.todo-id')[0]).val(), 'todo-1', 'first id matches');
        qunit.equal($(dom.find('.todo-name')[0]).text(), 'First thing to do', 'first text matches');
        qunit.equal($(dom.find('.todo-done')[0]).is(':checked'), false, 'first not checked');
    });
});
