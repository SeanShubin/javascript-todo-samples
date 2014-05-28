define(['backbone', 'jquery'], function (Backbone, $) {
    'use strict';
    function createTodoApplication() {
        var ListView, listView, List, Model, View;

        Model = Backbone.Model.extend({
            defaults: {
                name: 'item',
                number: 0
            }
        });

        View = Backbone.View.extend({
            templateString: '<li><%= model.name %> <%= model.number %></li>',
            render: function () {
                this.template = _.template(this.templateString);
                this.$el.append(this.template({model: this.model.toJSON()}));
                return this;
            }
        });

        List = Backbone.Collection.extend({
            model: Model,
            url: 'item'
        });

        ListView = Backbone.View.extend({
            events: {
                'click button.add': 'addItemToModel'
            },
            initialize: function () {
                this.counter = 1;
                this.collection = new List();
                this.collection.on('add', this.addItemToView, this);
            },
            render: function () {
                this.listItemContainer = $('<ul></ul>');
                this.$el.append('<button class="add">Add list item</button>');
                this.$el.append(this.listItemContainer);
                return this;
            },
            addItemToModel: function () {
                var item = new Model({number: this.counter});
                this.counter++;
                this.collection.add(item);
                item.save();
            },
            addItemToView: function (model) {
                new View({
                    model: model,
                    el: this.listItemContainer
                }).render();
            }
        });

        listView = new ListView();
        listView.render();
        return listView;
    }

    return createTodoApplication;
});
