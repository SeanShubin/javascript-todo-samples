define(['lib/domReady!',
    'jquery',
    'qunit',
    'sinon',
    'backbone',
    'todo/sean/backbone/createTodoApplication',
    'debugging/inspect'], function (dom, $, qunit, sinon, Backbone, createTodoApplication, inspect) {
    'use strict';
    var createFakeAjax = function() {
        return {
            fakeAjaxFunction: function() {
                inspect.consoleLogArgumentsToLines(arguments)
                // {"type":"GET","dataType":"json","url":"item","parse":true,"emulateHTTP":false,"emulateJSON":false}
            }
        };
    };
    qunit.module('sean-todo-backbone-test-sinon-fake-ajax');
    qunit.test('start with no items', function () {
        var $el, fakeAjaxObject, stubbedAjax;
        fakeAjaxObject = createFakeAjax();
        stubbedAjax = sinon.stub($,'ajax', fakeAjaxObject.fakeAjaxFunction);
        $el = createTodoApplication();
        stubbedAjax.restore();
        qunit.ok(true, 'work in progress, trying to figure out how to combine sinon stubs and jquery ajax')
    });
});
