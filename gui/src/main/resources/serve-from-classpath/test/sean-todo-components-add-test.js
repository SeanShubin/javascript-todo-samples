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
            $('#application').append(dom);

            //when
            dom.find('.user-input').val('First thing to do');
            dom.find('.add-todo-entry-button').click();

            //then
            qunit.equal(dom.find('.user-input').length, 1, 'has user input element');
            qunit.equal(dom.find('.add-todo-entry-button').length, 1, 'has add todo button');
            qunit.equal(actualCalls.length, 1, 'one call to createWithName');
            qunit.equal(actualCalls[0].length, 1, 'exactly one argument to createWithName');
            qunit.equal(actualCalls[0][0], 'First thing to do', 'createWithName was given the correct name');
            qunit.equal($(dom.find('.user-input')[0]).val(), '', 'user input set to blank after adding todo entry');
            qunit.equal($(dom.find('.user-input')[0]).is(':focus'), true, 'user input has focus after adding todo entry');
            dom.remove();
        });

        qunit.test('add using enter key', function () {
            var dom, fakeDataAccess, actualCalls, keyEvent;

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
            keyEvent = $.Event('keyup');
            keyEvent.which = 13;
            dom.find('.user-input').trigger(keyEvent);

            //then
            qunit.equal(actualCalls.length, 1, 'one call to createWithName');
            qunit.equal(actualCalls[0].length, 1, 'exactly one argument to createWithName');
            qunit.equal(actualCalls[0][0], 'First thing to do', 'createWithName was given the correct name');
            qunit.equal($(dom.find('.user-input')[0]).val(), '', 'user input set to blank after adding todo entry');
        });

        qunit.test('trim name', function () {
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
            dom.find('.user-input').val('   trim    me   ');
            dom.find('.add-todo-entry-button').click();

            //then
            qunit.equal(dom.find('.user-input').length, 1, 'has user input element');
            qunit.equal(dom.find('.add-todo-entry-button').length, 1, 'has add todo button');
            qunit.equal(actualCalls.length, 1, 'one call to createWithName');
            qunit.equal(actualCalls[0].length, 1, 'exactly one argument to createWithName');
            qunit.equal(actualCalls[0][0], 'trim me', 'createWithName was given the correct name');
            qunit.equal($(dom.find('.user-input')[0]).val(), '', 'user input set to blank after adding todo entry');
        });

        qunit.test('do nothing if name blank', function () {
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
            dom.find('.user-input').val('      ');
            dom.find('.add-todo-entry-button').click();

            //then
            qunit.equal(dom.find('.user-input').length, 1, 'has user input element');
            qunit.equal(dom.find('.add-todo-entry-button').length, 1, 'has add todo button');
            qunit.equal(actualCalls.length, 0, 'no calls call to createWithName');
        });

        qunit.test('do not add on keypress if key is not enter', function () {
            var dom, fakeDataAccess, actualCalls, keyEvent;

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
            keyEvent = $.Event('keyup');
            keyEvent.which = 65;
            dom.find('.user-input').trigger(keyEvent);

            //then
            qunit.equal(actualCalls.length, 0, 'one call to createWithName');
        });
    });
