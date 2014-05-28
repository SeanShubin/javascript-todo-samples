define(['lib/domReady!',
    'jquery',
    'qunit',
    'sinon',
    'backbone',
    'todo/sean/backbone-white-box/createTodoApplication'], function (dom, $, qunit, sinon, Backbone, createTodoApplication) {
    'use strict';
    qunit.module('sean-todo-backbone-test-sinon-white-box');
    qunit.test('start with many items', function () {
        var component, $el;

        component = createTodoApplication();
        $el = component.$el;
        component.collection.add([
            { id: '1', name: 'item', number: 1 },
            { id: '2', name: 'item', number: 2 },
            { id: '3', name: 'item', number: 3 }
        ]);

        qunit.equal($el.find('li').length, 3, 'three items added');
        qunit.equal($($el.find('li')[0]).text(), 'item 1', 'item 1');
        qunit.equal($($el.find('li')[1]).text(), 'item 2', 'item 2');
        qunit.equal($($el.find('li')[2]).text(), 'item 3', 'item 3');
    });
});
