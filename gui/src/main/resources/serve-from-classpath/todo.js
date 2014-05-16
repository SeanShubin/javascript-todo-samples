define(['backbone'], function (Backbone) {
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
            tagName: 'li',
            render: function () {
                this.$el.append(this.model.get('name') + ' ' + this.model.get('number'));
                return this;
            }
        });

        List = Backbone.Collection.extend({
            model: Model
        });

        ListView = Backbone.View.extend({
            events: {
                'click button.add': 'addItemToModel'
            },
            initialize: function () {
                this.counter = 1;
                this.collection = new List();
                this.collection.bind('add', this.addItemToView, this);
            },
            render: function () {
                this.$el.append('<button class="add">Add list item</button>');
                this.$el.append('<ul></ul>');
                return this;
            },
            addItemToModel: function () {
                var item = new Model();
                item.set({
                    number: this.counter
                });
                this.counter++;
                this.collection.add(item);
            },
            addItemToView: function (model) {
                var view = new View({
                    model: model
                });
                this.$('ul').append(view.render().el);
            }
        });

        listView = new ListView();
        return listView.render().$el;
    }

    return createTodoApplication;
});
