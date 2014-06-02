define(['jquery',
    'underscore',
    'underscore.string',
    'todo/sean/components/data-access',
    'text!todo/sean/components/add-template.html'], function ($, _, _s, addTemplate) {
    'use strict';
    return function (parameters) {
        var dataAccess, dom, addButtonPressed, keyPressed, userInput;
        dataAccess = parameters.dataAccess || {
            createWithName: function (name) {
            }
        };
        dom = $(addTemplate);
        userInput = dom.find('.user-input');
        keyPressed = function (event) {
            if (event.which === 13) {
                addButtonPressed();
            }
        };
        addButtonPressed = function () {
            var name = _s.trim(userInput.val());
            if (!_s.isBlank(name)) {
                userInput.val('');
                userInput.focus();
                dataAccess.createWithName(name);
            }
        };
        dom.find('.add-todo-entry-button').on('click', addButtonPressed);
        userInput.on('keyup', keyPressed);
        return dom;
    };
});
