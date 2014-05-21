define(["react", "superagent"], function(React, Agent) {
    var dom = React.DOM;

    // client for talking to http service
    var TodoClient = function(root) {

        function addTodo(todo, callback) {
            Agent.post(root).send(todo).end(callback);
        }

        function getTodos(callback) {
            Agent.get(root).end(function(res) {
                callback({ todos: JSON.parse(res.text) });
            });
        }
        
        return {
            add: addTodo,
            get: getTodos
        };

    };

    // list of todo items, stateless
    var TodoList = React.createClass({

        todoName: function(todo) {
            return [todo.name, todo.number].join(" ");
        },

        todoItem: function(todo) {
            return dom.li({key: todo}, this.todoName(todo));
        },

        render: function() {
            var todos = this.props.todos.map(this.todoItem);
            return dom.ul({}, todos);
        }

    });

    // app composing the http client and todo list
    var TodoApp = React.createClass({

        // react lifecycle *
        getInitialState: function() { // *
            return { todos: [] };
        },

        componentWillMount: function() { // *
            this.syncTodos();
        },

        getCurrentTodo: function() {
            return {
                name: "item",
                number: this.state.todos.length + 1
            };
        },

        syncTodos: function() {
            var app = this;
            this.props.client.get(function(state) {
                app.setState(state);
            });
        },

        addTodo: function(event) {
            var app = this;
            this.props.client.add(this.getCurrentTodo(), function() {
                app.syncTodos();
            });
        },

        render: function() {
            var button = dom.button({ onClick: this.addTodo }, "Add list item"),
                todos = TodoList({ todos: this.state.todos });
            return dom.div(null, [ button, todos ]);
        }

    });

    return {
        client: TodoClient,
        todos: TodoList,
        app: TodoApp
    };

});
