define(['qunit', 'sinon'], function (qunit, sinon) {
    'use strict';
    qunit.module('debugging-test');
    qunit.test('arguments to lines', function () {
        var foo, debugString;
        debugString = 'debug string not set';
        foo = function () {
            debugString = sinon.format(arguments);
        };
        foo('a', 123, {}, foo);
        qunit.equal(debugString, '{ 0: \"a\", 1: 123, 2: {  }, 3: function () {} }', 'arguments');
    });
});
