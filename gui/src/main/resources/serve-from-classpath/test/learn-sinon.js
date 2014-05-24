define(['qunit', 'sinon'], function (qunit, sinon) {
    'use strict';
    var display = function (name, target) {
        console.log(name + ': ' + sinon.format(target));
    };
    qunit.module('learn-sinon');
    qunit.test('string format', function () {
        var foo, debugString;
        debugString = 'debug string not set';
        foo = function () {
            debugString = sinon.format(arguments);
        };
        foo('a', 123, {}, foo);
        qunit.equal(debugString, '{ 0: \"a\", 1: 123, 2: {  }, 3: function () {} }', 'arguments');
    });
    qunit.test('simple thing that is impossible to test with a spy', function () {
        //Very first thing I try to do with a spy and it fails me!
        //This is making me lean towards a constructor injection based architecture so I can send in fakes.
        var createSampleApp, sampleApp, helloSpy, composeSpy;
        createSampleApp = function () {
            var compose, sayHello;
            compose = function (a, b, c) {
                return '' + a + b + c;
            };
            sayHello = function (target) {
                return compose('Hello, ', target, '!');
            };
            return {
                compose: compose,
                sayHello: sayHello
            };
        };
        sampleApp = createSampleApp();
        helloSpy = sinon.spy(sampleApp, 'sayHello');
        composeSpy = sinon.spy(sampleApp, 'compose');

        //delegates to compose
        //but the spy won't notice
        //because it proxies around the outside
        //it can't see inside
        sampleApp.sayHello('world');
        sampleApp.compose('a', 'b', 'c');

        qunit.equal(helloSpy.callCount, 1, 'hello called once');
        qunit.equal(helloSpy.getCall(0).args.length, 1, 'hello called with one argument');
        qunit.equal(helloSpy.getCall(0).args[0], 'world', 'hello argument matches');
        qunit.equal(helloSpy.returnValues[0], 'Hello, world!', 'hello return value matches');
        qunit.equal(composeSpy.callCount, 1, 'compose called once');
        qunit.equal(composeSpy.getCall(0).args.length, 3, 'compose called with three arguments');
        qunit.equal(composeSpy.getCall(0).args[0], 'a', 'first compose argument matches');
        qunit.equal(composeSpy.getCall(0).args[1], 'b', 'second compose argument matches');
        qunit.equal(composeSpy.getCall(0).args[2], 'c', 'third compose argument matches');
        qunit.equal(composeSpy.returnValues[0], 'abc', 'compose return value matches');
    });
});
