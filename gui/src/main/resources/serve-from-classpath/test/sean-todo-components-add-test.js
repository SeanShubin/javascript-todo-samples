define(['lib/domReady!',
        'jquery',
        'qunit',
        'todo/sean/components/add'],
    function (dom, $, qunit, createAddComponent) {
        'use strict';

        var createHelper = function () {
            var dom, fakeDataAccess, createWithNameCalls, userTypesInText, userPressesAddButton,
                verifyCalledCreateWithName, verifyUserInputBlank, verifyUserInputHasFocus, userTypesKey,
                verifyCreateWithNameNotCalled;
            createWithNameCalls = [];
            fakeDataAccess = {
                createWithName: function () {
                    createWithNameCalls.push(arguments);
                }
            };
            dom = createAddComponent(fakeDataAccess);
            userTypesInText = function (text) {
                dom.find('.name-field').val(text);
            };
            userTypesKey = function (key) {
                var keyEvent = $.Event('keyup');
                keyEvent.which = key;
                dom.find('.name-field').trigger(keyEvent);
            };
            userPressesAddButton = function () {
                dom.find('.add-button').click();
            };
            verifyCalledCreateWithName = function (expected) {
                qunit.equal(createWithNameCalls.length, 1, 'exactly one call to createWithName');
                qunit.equal(createWithNameCalls[0].length, 1, 'exactly one argument to createWithName');
                qunit.equal(createWithNameCalls[0][0], expected, 'createWithName was given the correct name (' + expected + ')');
            };
            verifyCreateWithNameNotCalled = function () {
                qunit.equal(createWithNameCalls.length, 0, 'no calls to createWithName');
            };
            verifyUserInputBlank = function () {
                qunit.equal($(dom.find('.name-field')[0]).val(), '', 'user input set to blank after adding todo entry');
            };
            verifyUserInputHasFocus = function () {
                qunit.equal($(dom.find('.name-field')[0]).is(':focus'), true, 'user input has focus after adding todo entry');
            };
            return {
                dom: dom,
                userTypesInText: userTypesInText,
                userPressesAddButton: userPressesAddButton,
                verifyCalledCreateWithName: verifyCalledCreateWithName,
                verifyUserInputBlank: verifyUserInputBlank,
                verifyUserInputHasFocus: verifyUserInputHasFocus,
                userTypesKey: userTypesKey,
                verifyCreateWithNameNotCalled: verifyCreateWithNameNotCalled
            };
        };

        qunit.module('sean-todo-components-add-test');

        qunit.test('start with user input and add button', function () {
            var helper = createHelper();
            qunit.equal(helper.dom.find('.name-field').length, 1, 'has user input element');
            qunit.equal(helper.dom.find('.add-button').length, 1, 'has add todo button');
        });

        qunit.test('add using button', function () {
            //given
            var helper = createHelper();

            //when
            helper.userTypesInText('First thing to do');
            helper.userPressesAddButton();

            //then
            helper.verifyCalledCreateWithName('First thing to do');
        });

        qunit.test('blank out user input after add', function () {
            //given
            var helper = createHelper();

            //when
            helper.userTypesInText('First thing to do');
            helper.userPressesAddButton();

            //then
            helper.verifyUserInputBlank();
        });

        qunit.test('input area has focus after add', function () {
            //given
            var helper = createHelper();
            $('body').prepend(helper.dom);

            //when
            helper.userTypesInText('First thing to do');
            helper.userPressesAddButton();

            //then
            helper.verifyUserInputHasFocus();

            //cleanup (necessary because we can't check for focus unless we are actually rendered)
            helper.dom.remove();
        });

        qunit.test('add using enter key', function () {
            //given
            var helper = createHelper();

            //when
            helper.userTypesInText('First thing to do');
            helper.userTypesKey(13);

            //then
            helper.verifyCalledCreateWithName('First thing to do');
        });

        qunit.test('trim name', function () {
            //given
            var helper = createHelper();

            //when
            helper.userTypesInText('   trim    me   ');
            helper.userPressesAddButton();

            //then
            helper.verifyCalledCreateWithName('trim me');
        });

        qunit.test('do nothing if name blank', function () {
            //given
            var helper = createHelper();

            //when
            helper.userTypesInText('      ');
            helper.userPressesAddButton();

            //then
            helper.verifyCreateWithNameNotCalled();
        });

        qunit.test('do not add on keypress if key is not enter', function () {
            //given
            var helper = createHelper();

            //when
            helper.userTypesInText('First thing to do');
            helper.userTypesKey(65);

            //then
            helper.verifyCreateWithNameNotCalled();
        });
    });
