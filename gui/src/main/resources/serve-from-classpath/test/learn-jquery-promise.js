define(['qunit', 'jquery'], function (qunit, $) {
    'use strict';
    qunit.module('learn-jquery-promise');
    qunit.test('test promise synchronously', function () {
        var deferred, asyncValue, doAsyncWork;
        deferred = $.Deferred();
        doAsyncWork = function (x) {
            asyncValue += x;
        };
        asyncValue = 1;
        deferred.then(doAsyncWork);
        qunit.equal(asyncValue, 1, 'asyncValue equals 1');
        deferred.resolve(3);
        qunit.equal(asyncValue, 4, 'asyncValue equals 4');
    });
    qunit.test('simple promise', function () {
        var deferred, assertResult;
        qunit.expect(1);
        assertResult = function (x) {
            qunit.equal(x, 3, 'x equals 3');
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
            deferred.resolve(3);
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
    qunit.asyncTest('join array of promises', function () {
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
        $.when.apply($, [returnTwo, returnThree]).then(multiply).then(assertResult);
        returnTwo.resolve(2);
        returnThree.resolve(3);
    });
    qunit.test('simulate async', function () {
        var createFake, fake, callback, args;
        args = [];
        callback = function () {
            args = arguments;
        };
        createFake = function () {
            var makeCall, resolve, deferred, theCallback, invokeCallback;
            invokeCallback = function (d, e, f) {
                return theCallback(d, e, f);
            };
            deferred = $.Deferred();
            makeCall = function (a, b, c, callback) {
                theCallback = callback;
            };
            deferred.then(invokeCallback);
            resolve = function (d, e, f) {
                deferred.resolve(d, e, f);
            };
            return {
                makeCall: makeCall,
                resolve: resolve
            };
        };
        fake = createFake();
        fake.makeCall(1, 2, 3, callback);
        qunit.equal(args.length, 0);
        fake.resolve(4, 5, 6);
        qunit.equal(args.length, 3);
        qunit.equal(args[0], 4);
        qunit.equal(args[1], 5);
        qunit.equal(args[2], 6);
    });
});
