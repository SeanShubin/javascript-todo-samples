define(['lib/domReady!',
        'jquery',
        'qunit',
        'todo/sean/components/add'],
    function (dom, $, qunit, createAddComponent) {
        'use strict';

        qunit.module('sean-todo-components-add-test');

        qunit.test('add using button', function () {
            var dom, fakeDataAccess, actualCalls;

            //given
            actualCalls = [];
            fakeDataAccess = {
                createWithName: function () {
                    actualCalls.push(arguments);
                }
            };
            dom = createAddComponent(fakeDataAccess);

            //when
            dom.find('.user-input').val('First thing to do');
            dom.find('.add-todo-entry-button').click();

            //then
            qunit.equal(actualCalls.length, 1, 'one call to createWithName');
            qunit.equal(actualCalls[0].length, 1, 'exactly one argument to createWithName');
            qunit.equal(actualCalls[0][0], 'First thing to do', 'createWithName was given the correct name');
            qunit.equal($(dom.find('.user-input')[0]).val(), '', 'user input set to blank after adding todo entry');
        });
    });
