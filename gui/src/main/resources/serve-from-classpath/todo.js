define(['backbone'], function (Backbone) {
    'use strict';
    function createTodoApplication() {
        var ListView, listView, List, Model, View, oldBackboneSync ;

        oldBackboneSync = Backbone.sync;
        Backbone.sync = function( method, model, options ) {
            console.log('method');
            console.log(method);
            console.log('model');
            console.log(model);
            console.log('options');
            console.log(options);
            return oldBackboneSync.apply(this, [method, model, options]);
        };

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
                this.collection.bind('add', this.addItemToView, this);
            },
            render: function () {
                this.$el.append('<button class="add">Add list item</button>');
                this.$el.append('<ul></ul>');
                this.collection.fetch();
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
                model.save();
            }
        });

        listView = new ListView();
        return listView.render().$el;
    }

    return createTodoApplication;
});
