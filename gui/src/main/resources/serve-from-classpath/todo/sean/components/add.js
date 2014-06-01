define(['jquery',
    'underscore',
    'underscore.string',
    'todo/sean/components/data-access',
    'text!todo/sean/components/add-template.html'], function ($, _, _s, addTemplate) {
    'use strict';
    function create(overrides) {
        var dataAccess, dom, addButtonPressed, keyPressed, userInput, appendTodoEntryToView, respondToTodoAdded;
        dataAccess = overrides.dataAccess || {
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
                dataAccess.createWithName(name).then(respondToTodoAdded);
            }
        };
        respondToTodoAdded = function (entry) {
            appendTodoEntryToView(entry);
        };
        dom.find('.add-todo-entry-button').on('click', addButtonPressed);
        userInput.on('keyup', keyPressed);
        return dom;
    }

    return create;
});
