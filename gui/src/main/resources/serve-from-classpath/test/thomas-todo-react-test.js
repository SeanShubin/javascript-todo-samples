define(["react", "qunit", "todo/thomas/react/createTodoApplication"], function (React, qunit, Todo) {

    function TestClient(todos) {
        // fake http client
        return {
            add: function (todo, callback) {
                todos.push(todo);
                if (callback) callback();
            },
            get: function (callback) {
                callback({todos: todos});
            }
        }
    }

    function TestApp(todos) {
        // app mounted into in memory dom node
        var client = TestClient(todos),
            app = Todo.app({client: client});
        React.addons.TestUtils.renderIntoDocument(app);
        return app;
    }

    // helpers for interacting with virtual components
    var scry = React.addons.TestUtils.scryRenderedDOMComponentsWithTag,
        find = React.addons.TestUtils.findRenderedDOMComponentWithTag,
        click = React.addons.TestUtils.Simulate.click;

    qunit.module('thomas-todo-react-test');

    qunit.test('start with no items', function () {
        var todos = [],
            app = TestApp(todos);
        qunit.equal(scry(app, "button").length, 1, 'a single button is rendered');
        qunit.equal(scry(app, "li").length, 0, 'no list items are rendered');
    });

    qunit.test('add item', function () {
        var todos = [],
            app = TestApp(todos),
            button = find(app, "button");
        click(button);
        qunit.equal(todos.length, 1, 'a single item is added');
        qunit.deepEqual(todos[0], {number: 1, name: "item"}, 'a todo makes it into our test store');
        qunit.equal(scry(app, "li").length, todos.length, 'a li is rendered for each todo');
    });

    qunit.test('add many items', function () {
        var todos = [],
            app = TestApp(todos),
            button = find(app, "button");
        click(button);
        click(button);
        click(button);
        qunit.equal(todos.length, 3, '3 items are added');
        qunit.equal(scry(app, "li").length, todos.length, 'a li is rendered for each todo');
        scry(app, "li").forEach(function(li, i) {
            var todo = todos[i],
                expected = todo.name + " " + todo.number;
            qunit.equal(li.props.children, expected, "todo is rendered " + todo.number);
        });
    });

});
