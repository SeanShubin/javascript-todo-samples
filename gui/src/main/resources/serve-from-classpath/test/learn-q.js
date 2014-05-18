define(['qunit', 'q'], function (qunit, Q) {
    'use strict';
    qunit.module('learn-q');
    qunit.asyncTest('simple promise', function () {
        var returnThree, promiseReturnThree, assertResult;
        returnThree = function () {
            return 3;
        };
        assertResult = function (x) {
            qunit.equal(x, 3, 'x equals 3');
            qunit.start();
        };
        promiseReturnThree = Q.fcall(returnThree);
        promiseReturnThree.then(assertResult);
    });
    qunit.asyncTest('convert callback to promise', function () {
        var deferThree, promiseThree, millisecondsToWait;
        qunit.expect(1);
        millisecondsToWait = 1;
        deferThree = Q.defer();
        setTimeout(function () {
            deferThree.resolve(3)
        }, millisecondsToWait);
        promiseThree = deferThree.promise;
        promiseThree.then(function (value) {
            qunit.equal(value, 3);
            qunit.start();
        });
    });
    qunit.asyncTest('join two promises in serial', function () {
        var returnThree, multiplyByTwo, assertResult;
        returnThree = function () {
            return 3;
        };
        multiplyByTwo = function (x) {
            return x * 2;
        };
        assertResult = function (x) {
            qunit.equal(x, 6, 'x equals 6');
            qunit.start();
        };
        Q.fcall(returnThree).then(multiplyByTwo).then(assertResult);
    });
    qunit.asyncTest('join two promises in parallel', function () {
        var promiseTwo, promiseThree, multiply, assertResult;
        promiseTwo = Q.fcall(function () {
            return 2;
        });
        promiseThree = Q.fcall(function () {
            return 3;
        });
        multiply = function (x, y) {
            return x * y;
        };
        assertResult = function (x) {
            qunit.equal(x, 6, 'x equals 6');
            qunit.start();
        };
        Q.all([promiseTwo, promiseThree]).spread(multiply).then(assertResult);
    });
});
