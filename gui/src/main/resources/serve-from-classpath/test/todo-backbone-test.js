define(['lib/domReady!',
    'jquery',
    'qunit',
    'sinon',
    'todo/backbone/createTodoApplication'], function (dom, $, qunit, sinon, createTodoApplication) {
    'use strict';
    qunit.module('todo-backbone-test');
    qunit.test('start with no items', function () {
        var $el = createTodoApplication();
        qunit.equal($el.find('li').length, 0, 'no items');

    });
    qunit.test('add item', function () {
        var $el;
        $el = createTodoApplication();
        $el.find('.add').click();
        qunit.equal($el.find('li').length, 1, 'one item added');
        qunit.equal($($el.find('li')[0]).text(), 'item 1', 'item 1');
    });
    qunit.test('add many items', function () {
        var $el, addButton;
        $el = createTodoApplication();
        addButton = $el.find('.add');
        addButton.click();
        addButton.click();
        addButton.click();
        qunit.equal($el.find('li').length, 3, 'three items added');
        qunit.equal($($el.find('li')[0]).text(), 'item 1', 'item 1');
        qunit.equal($($el.find('li')[1]).text(), 'item 2', 'item 2');
        qunit.equal($($el.find('li')[2]).text(), 'item 3', 'item 3');
    });
});
