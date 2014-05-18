define(['lib/domReady!',
    'jquery',
    'qunit',
    'q',
    'todo/jquery/createTodoApplication'], function (dom, $, qunit, Q, createTodoApplication) {
    'use strict';
    qunit.module('todo-jquery-test');
    var createFakeJsonOverHttp = function (calls) {
        var callIndex;
        callIndex = 0;
        return function (options) {
            var deferredResponse, actualBody, expectedBody;
            qunit.equal(options.uri, calls[callIndex].request.uri, 'uri matches for call ' + callIndex);
            qunit.equal(options.method, calls[callIndex].request.method, 'method matches for call ' + callIndex);
            actualBody = options.body;
            expectedBody = calls[callIndex].request.body;
//                console.log('callIndex');
//                console.log(callIndex);
//                console.log('actualBody');
//                console.log(actualBody);
//                console.log('expectedBody');
//                console.log(expectedBody);
//                console.log('calls');
//                console.log(calls);
            qunit.deepEqual(actualBody, expectedBody, 'body matches for call ' + callIndex);
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
            qunit.equal(app.dom.find('li').length, 0, 'no items');
            qunit.start();
        }).done();
    });
//        qunit.test('add item', function () {
//            var jsonOverHttp;
//            jsonOverHttp = createFakeJsonOverHttp([
//                {
//                    request: {uri: 'item', method: 'GET'},
//                    response: { status: 200, body: []}
//                },
//                {
//                    request: {uri: 'item', method: 'POST', body: { "name": "item", "number": 1}},
//                    response: { status: 200, body: []}
//                }
//            ]);
//            createTodoApplication(jsonOverHttp).then(function (app) {
//                console.log('a');
//                return app.pressAddButton();
//            }).then(function (app) {
//                console.log('b');
//                qunit.equal(app.dom.find('li').length, 1, 'one item added');
//                qunit.equal($(app.dom.find('li')[0]).text(), 'item 1', 'item 1');
//                qunit.start();
//            }).done();
//        });
//        qunit.test('add many items', function () {
//            var $el, addButton;
//            $el = createTodoApplication();
//            addButton = $el.find('.add');
//            addButton.click();
//            addButton.click();
//            addButton.click();
//            qunit.equal($el.find('li').length, 3, 'three items added');
//            qunit.equal($($el.find('li')[0]).text(), 'item 1', 'item 1');
//            qunit.equal($($el.find('li')[1]).text(), 'item 2', 'item 2');
//            qunit.equal($($el.find('li')[2]).text(), 'item 3', 'item 3');
//        });
});
