define(['lib/domReady!',
    'jquery',
    'qunit',
    'todo/sean/createTodoComponent'], function (dom, $, qunit, createTodoComponent) {
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
        dom = createTodoComponent(fake.jsonOverHttp);
        fake.resolveResponse({status: 200, body: []});

        qunit.equal(fake.getRequestCount(), 1, 'one request was made');
        qunit.equal(dom.find('li').length, 0, 'no todo entries in list');
    });

    qunit.test('start with many todo entries', function () {
        var dom, fake;
        fake = createFake();

        fake.expectRequest({ uri: 'todo', method: 'GET'});
        dom = createTodoComponent(fake.jsonOverHttp);
        fake.resolveResponse({status: 200, body: [
            {id: '1', name: 'First thing to do', done: false},
            {id: '2', name: 'Second thing to do', done: true},
            {id: '3', name: 'Third thing to do', done: false}
        ]});

        qunit.equal(fake.getRequestCount(), 1, 'one request was made');
        qunit.equal(dom.find('.todo-entry').length, 3, 'three todo entries added');
        qunit.ok($(dom.find('.todo-entry')[0]).hasClass('todo-id-1'), 'first id matches');
        qunit.equal($(dom.find('.todo-name')[0]).text(), 'First thing to do', 'first text matches');
        qunit.equal($(dom.find('.todo-done')[0]).is(':checked'), false, 'first not checked');
        qunit.ok($(dom.find('.todo-entry')[1]).hasClass('todo-id-2'), 'second id matches');
        qunit.equal($(dom.find('.todo-name')[1]).text(), 'Second thing to do', 'second text matches');
        qunit.equal($(dom.find('.todo-done')[1]).is(':checked'), true, 'second checked');
        qunit.ok($(dom.find('.todo-entry')[2]).hasClass('todo-id-3'), 'third id matches');
        qunit.equal($(dom.find('.todo-name')[2]).text(), 'Third thing to do', 'third text matches');
        qunit.equal($(dom.find('.todo-done')[2]).is(':checked'), false, 'third not checked');
    });

    qunit.test('add todo entry using button', function () {
        var dom, fake;
        fake = createFake();

        fake.expectRequest({ uri: 'todo', method: 'GET'});
        dom = createTodoComponent(fake.jsonOverHttp);
        fake.resolveResponse({status: 200, body: []});

        dom.find('.user-input').val('First thing to do');

        fake.expectRequest({ uri: 'todo', method: 'POST', 'body': {
            name: 'First thing to do',
            done: false
        }});
        dom.find('.add-todo-entry-button').click();
        fake.resolveResponse({status: 201, body: {
            id: '1',
            name: 'First thing to do',
            done: false
        }});

        qunit.equal(fake.getRequestCount(), 2, 'two requests were made');
        qunit.equal(dom.find('.todo-entry').length, 1, 'one todo entry added');
        qunit.ok($(dom.find('.todo-entry')[0]).hasClass('todo-id-1'), 'first id matches');
        qunit.equal($(dom.find('.todo-name')[0]).text(), 'First thing to do', 'first text matches');
        qunit.equal($(dom.find('.todo-done')[0]).is(':checked'), false, 'first not checked');
        qunit.equal($(dom.find('.user-input')[0]).val(), '', 'user input set to blank after adding todo entry');
    });

    qunit.test('add todo entry using enter key', function () {
        var dom, fake, keyEvent;
        fake = createFake();

        fake.expectRequest({ uri: 'todo', method: 'GET'});
        dom = createTodoComponent(fake.jsonOverHttp);
        fake.resolveResponse({status: 200, body: []});

        dom.find('.user-input').val('First thing to do');

        fake.expectRequest({ uri: 'todo', method: 'POST', 'body': {
            name: 'First thing to do',
            done: false
        }});
        keyEvent = $.Event('keyup');
        keyEvent.which = 13;
        dom.find('.user-input').trigger(keyEvent);
        fake.resolveResponse({status: 201, body: {
            id: '1',
            name: 'First thing to do',
            done: false
        }});

        qunit.equal(fake.getRequestCount(), 2, 'two requests were made');
        qunit.equal(dom.find('.todo-entry').length, 1, 'one todo entry added');
        qunit.ok($(dom.find('.todo-entry')[0]).hasClass('todo-id-1'), 'first id matches');
        qunit.equal($(dom.find('.todo-name')[0]).text(), 'First thing to do', 'first text matches');
        qunit.equal($(dom.find('.todo-done')[0]).is(':checked'), false, 'first not checked');
    });

    qunit.test('do not add item if input is all whitespace', function () {
        var dom, fake, keyEvent;
        fake = createFake();

        fake.expectRequest({ uri: 'todo', method: 'GET'});
        dom = createTodoComponent(fake.jsonOverHttp);
        fake.resolveResponse({status: 200, body: []});

        dom.find('.user-input').val('   ');

        keyEvent = $.Event('keyup');
        keyEvent.which = 13;
        dom.find('.user-input').trigger(keyEvent);

        qunit.equal(fake.getRequestCount(), 1, 'one request was made');
        qunit.equal(dom.find('.todo-name').length, 0, 'no todo entries added');
    });

    qunit.test('trim name for todo entry', function () {
        var dom, fake;
        fake = createFake();

        fake.expectRequest({ uri: 'todo', method: 'GET'});
        dom = createTodoComponent(fake.jsonOverHttp);
        fake.resolveResponse({status: 200, body: []});

        dom.find('.user-input').val('   First thing to do   ');

        fake.expectRequest({ uri: 'todo', method: 'POST', 'body': {
            name: 'First thing to do',
            done: false
        }});
        dom.find('.add-todo-entry-button').click();
        fake.resolveResponse({status: 201, body: {
            id: '1',
            name: 'First thing to do',
            done: false
        }});

        qunit.equal(fake.getRequestCount(), 2, 'two requests were made');
        qunit.equal(dom.find('.todo-entry').length, 1, 'one todo entry added');
        qunit.ok($(dom.find('.todo-entry')[0]).hasClass('todo-id-1'), 'first id matches');
        qunit.equal($(dom.find('.todo-name')[0]).text(), 'First thing to do', 'first text matches');
        qunit.equal($(dom.find('.todo-done')[0]).is(':checked'), false, 'first not checked');
    });

    qunit.test('ignore non-enter key', function () {
        var dom, fake, keyEvent;
        fake = createFake();

        fake.expectRequest({ uri: 'todo', method: 'GET'});
        dom = createTodoComponent(fake.jsonOverHttp);
        fake.resolveResponse({status: 200, body: []});

        dom.find('.user-input').val('First thing to do');

        keyEvent = $.Event('keyup');
        keyEvent.which = 65;
        dom.find('.user-input').trigger(keyEvent);

        qunit.equal(fake.getRequestCount(), 1, 'one request was made');
        qunit.equal(dom.find('.todo-name').length, 0, 'no todo entries added');
    });

    qunit.test('delete entry', function () {
        var dom, fake;
        fake = createFake();

        fake.expectRequest({ uri: 'todo', method: 'GET'});
        dom = createTodoComponent(fake.jsonOverHttp);
        fake.resolveResponse({status: 200, body: [
            {id: '1', name: 'First thing to do', done: false},
            {id: '2', name: 'Second thing to do', done: true},
            {id: '3', name: 'Third thing to do', done: false}
        ]});

        fake.expectRequest({ uri: 'todo/2', method: 'DELETE'});
        dom.find('.todo-id-2 .todo-delete').click();
        fake.resolveResponse({status: 200, body: {
            id: '2',
            name: 'Second thing to do',
            done: true
        }});

        qunit.equal(fake.getRequestCount(), 2, 'two requests were made');
        qunit.equal(dom.find('.todo-entry').length, 2, 'have two todo entries');
        qunit.ok($(dom.find('.todo-entry')[0]).hasClass('todo-id-1'), 'first id matches');
        qunit.equal($(dom.find('.todo-name')[0]).text(), 'First thing to do', 'first text matches');
        qunit.equal($(dom.find('.todo-done')[0]).is(':checked'), false, 'first not checked');
        qunit.ok($(dom.find('.todo-entry')[1]).hasClass('todo-id-3'), 'third id matches');
        qunit.equal($(dom.find('.todo-name')[1]).text(), 'Third thing to do', 'third text matches');
        qunit.equal($(dom.find('.todo-done')[1]).is(':checked'), false, 'third not checked');
    });
});
