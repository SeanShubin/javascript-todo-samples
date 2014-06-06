define(['jquery',
        'underscore.string',
        'text!todo/sean/components/add-template.html'],
    function ($, _s, addTemplate) {
        'use strict';
        return function (dataAccess) {
            var dom, addButtonPressed, keyPressed, nameField;
            dom = $(addTemplate);
            nameField = dom.find('.name-field');
            keyPressed = function (event) {
                if (event.which === 13) {
                    addButtonPressed();
                }
            };
            addButtonPressed = function () {
                var name = _s.trim(nameField.val()).replace(/\s+/g, ' ');
                if (!_s.isBlank(name)) {
                    nameField.val('');
                    nameField.focus();
                    dataAccess.createWithName(name);
                }
            };
            dom.find('.add-button').on('click', addButtonPressed);
            nameField.on('keyup', keyPressed);
            return dom;
        };
    });
