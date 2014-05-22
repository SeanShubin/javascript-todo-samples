define(['qunit', 'jquery'], function (qunit, $) {
    'use strict';
    qunit.module('learn-jquery-promise');
    qunit.test('test promise synchronously', function () {
        var  deferred, asyncValue, doAsyncWork;
        deferred = $.Deferred();
        doAsyncWork = function (x) {
            asyncValue+=x;
        };
        asyncValue = 1;
        deferred.then(doAsyncWork);
        qunit.equal(asyncValue, 1, 'asyncValue equals 1');
        deferred.resolve(3);
        qunit.equal(asyncValue, 4, 'asyncValue equals 4');
    });
    qunit.asyncTest('simple promise', function () {
        var  deferred, assertResult;
        assertResult = function (x) {
            qunit.equal(x, 3, 'x equals 3');
            qunit.start();
        };
        deferred = $.Deferred();
        deferred.then(assertResult);
        deferred.resolve(3);
    });
    qunit.asyncTest('convert callback to promise', function () {
        var deferred, promise, millisecondsToWait;
        qunit.expect(1);
        millisecondsToWait = 1;
        deferred = $.Deferred();
        setTimeout(function () {
            deferred.resolve(3)
        }, millisecondsToWait);
        promise = deferred.promise();
        promise.then(function (value) {
            qunit.equal(value, 3, 'x equals 3');
            qunit.start();
        });
    });
    qunit.asyncTest('join two promises in serial', function () {
        var returnThree, multiplyByTwo, assertResult;
        returnThree = $.Deferred();
        multiplyByTwo = function (x) {
            return x * 2;
        };
        assertResult = function (x) {
            qunit.equal(x, 6, 'x equals 6');
            qunit.start();
        };
        $.when(returnThree).then(multiplyByTwo).then(assertResult);
        returnThree.resolve(3);
    });
    qunit.asyncTest('join two promises in parallel', function () {
        var returnTwo, returnThree, multiply, assertResult;
        returnTwo = $.Deferred();
        returnThree = $.Deferred();
        multiply = function (x, y) {
            return x * y;
        };
        assertResult = function (x) {
            qunit.equal(x, 6, 'x equals 6');
            qunit.start();
        };
        $.when(returnTwo, returnThree).then(multiply).then(assertResult);
        returnTwo.resolve(2);
        returnThree.resolve(3);
    });
});
