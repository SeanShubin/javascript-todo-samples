define(['qunit', 'debugging/inspect'], function (qunit, inspect) {
    'use strict';
    qunit.module('debugging-test');
    qunit.test('arguments to lines', function () {
        var foo, lines;
        foo = function () {
            return inspect.argumentsToLines(arguments);
        };
        lines = foo('a', 123, {}, foo);
        qunit.equal(lines.length, 5, '5 argument lines');
        qunit.equal(lines[0], '4 arguments', 'header line');
        qunit.equal(lines[1], 'arg[0] = (string) \"a\"', 'string line');
        qunit.equal(lines[2], 'arg[1] = (number) 123', 'int line');
        qunit.equal(lines[3], 'arg[2] = (object) {}', 'object line');
    });
});
