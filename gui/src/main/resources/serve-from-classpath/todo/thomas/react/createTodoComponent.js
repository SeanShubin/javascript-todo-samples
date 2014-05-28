define(["react", "superagent"], function (React, Agent) {
    var dom = React.DOM;

    var TodoClient = function (root) {
        function add(todo, callback) {
            Agent.post(root).send(todo).end(callback);
        }

        function get(callback) {
            Agent.get(root).end(function (res) {
                if (callback) callback({ todos: res.body });
            });
        }

        return { add: add, get: get };
    };

    var TodoItem = React.createClass({
        displayName: "TodoItem",
        name: function (todo) {
            return [todo.name, todo.number].join(" ");
        },
        render: function (todo) {
            var name = this.name(this.props);
            return dom.li({key: name}, name);
        }
    });

    var TodoList = React.createClass({
        displayName: "TodoList",
        render: function () {
            var todos = this.props.todos.map(TodoItem);
            return dom.ul({}, todos);
        }
    });

    var TodoApp = React.createClass({
        displayName: "TodoApp",
        getInitialState: function () {
            var name = "todo";
            return {
                todos: [],
                defaultName: name,
                name: name
            };
        },
        componentWillMount: function () {
            this.getTodos();
        },
        getTodos: function () {
            var app = this;
            this.props.client.get(function (appState) {
                app.setState(appState);
            });
        },
        resetState: function () {
            this.setState({ defaultName: this.state.name });
            this.getTodos();
        },
        getTodo: function () {
            var number = this.state.todos.length + 1;
            return { number: number, name: this.state.name };
        },
        setTodo: function (event) {
            this.setState({ name: event.target.value });
        },
        addTodo: function (event) {
            var todo = this.getTodo();
            if (todo.name) this.props.client.add(todo, this.resetState);
        },
        handleEnter: function (event) {
            if (event.key === "Enter") this.addTodo();
        },
        render: function () {
            var button = dom.button({ onClick: this.addTodo }, "Add list"),
                input = dom.input({
                    placeholder: this.state.defaultName,
                    value: this.state.name,
                    onChange: this.setTodo,
                    onKeyDown: this.handleEnter
                }),
                todos = TodoList({ todos: this.state.todos });
            return dom.div({}, button, input, todos);
        }
    });

    return {
        client: TodoClient,
        todo: TodoItem,
        todos: TodoList,
        app: TodoApp
    };

});
