define(['qunit', 'http/json-over-http'], function (qunit, jsonOverHttp) {
    'use strict';
    var setupAsyncTest;
    setupAsyncTest = function (options) {
        var responsePromise = jsonOverHttp(options.request);
        responsePromise.then(function (actual) {
            qunit.equal(actual.status, options.expected.status, options.name + ' - status matches');
            qunit.deepEqual(actual.body, options.expected.body, options.name + ' - body matches');
        });
        return responsePromise;
    };
    qunit.module('json-over-http');
    qunit.asyncTest('post', function () {
        var resetDataStore, initialGetAll, addRed, addGreen, addBlue, finalGetAll, getRed;
        resetDataStore = function () {
            return jsonOverHttp({uri: 'db/test-post', method: 'DELETE'});
        };
        initialGetAll = function () {
            return setupAsyncTest({
                name: 'initial get all',
                request: {uri: 'db/test-post', method: 'GET'},
                expected: {status: 200, body: []}
            });
        };
        addRed = function () {
            return setupAsyncTest({
                name: 'add red',
                request: {uri: 'db/test-post', method: 'POST', body: { "name": "red", "wavelength": 650 }},
                expected: {status: 201, body: { "name": "red", "wavelength": 650, "id": "1" }}
            });
        };
        addGreen = function () {
            return setupAsyncTest({
                name: 'add green',
                request: {uri: 'db/test-post', method: 'POST', body: { "name": "green", "wavelength": 510 }},
                expected: {status: 201, body: { "name": "green", "wavelength": 510, "id": "2" }}
            });
        };
        addBlue = function () {
            return setupAsyncTest({
                name: 'add blue',
                request: {uri: 'db/test-post', method: 'POST', body: { "name": "blue", "wavelength": 475 }},
                expected: {status: 201, body: { "name": "blue", "wavelength": 475, "id": "3" }}
            });
        };
        finalGetAll = function () {
            return setupAsyncTest({
                name: 'final get all',
                request: {uri: 'db/test-post', method: 'GET'},
                expected: {status: 200, body: [
                    { "name": "red", "wavelength": 650, "id": "1" },
                    { "name": "green", "wavelength": 510, "id": "2" },
                    { "name": "blue", "wavelength": 475, "id": "3" }
                ]}
            });
        };
        getRed = function () {
            return setupAsyncTest({
                name: 'get red',
                request: {uri: 'db/test-post/1', method: 'GET'},
                expected: {status: 200, body: { "name": "red", "wavelength": 650, "id": "1" }}
            });
        };
        resetDataStore().
            then(initialGetAll).
            then(addRed).
            then(addGreen).
            then(addBlue).
            then(finalGetAll).
            then(getRed).
            then(qunit.start);
    });

//    qunit.asyncTest('patch', function () {
//        var patchTestCases;
//        patchTestCases = [
//            ['GET', 'test-patch'],
//            [200, []],
//            ['POST', 'test-patch', { "name": "reed", "wavelength": 650 } ],
//            [201, { "name": "reed", "wavelength": 650, "id": "1" } ],
//            ['PATCH', 'test-patch/1', { "name": "red" } ],
//            [200, { "name": "red", "wavelength": 650, "id": "1" } ],
//            ['GET', 'test-patch/1' ],
//            [200, { "name": "red", "wavelength": 650, "id": "1" } ],
//            ['POST', 'test-patch', { "name": "green", "wavelength": 510 } ],
//            [201, { "name": "green", "wavelength": 510, "id": "2" } ],
//            ['PATCH', 'test-patch/2', { "isPrimary": true } ],
//            [200, { "name": "green", "wavelength": 510, "id": "2", "isPrimary": true } ],
//            ['GET', 'test-patch/2' ],
//            [200, { "name": "green", "wavelength": 510, "id": "2", "isPrimary": true } ],
//            ['POST', 'test-patch', { "name": "blue", "wavelength": 475 } ],
//            [201, { "name": "blue", "wavelength": 475, "id": "3" } ],
//            ['PATCH', 'test-patch/3', { "wavelength": null } ],
//            [200, { "name": "blue", "id": "3" } ],
//            ['GET', 'test-patch/3' ],
//            [200, { "name": "blue", "id": "3" } ]
//        ];
//        runTestCases(patchTestCases);
//    });

});
