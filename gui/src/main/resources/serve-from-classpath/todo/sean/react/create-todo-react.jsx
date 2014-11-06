define(['react'], function (React) {
    'use strict';
    var createTodo, TodoAdd;

    TodoAdd = React.createClass({
        render: function () {
            return <div>
                <input className="user-input" type="text"/>
                <button className="add-todo-entry-button">Add todo entry</button>
                <ul className="todo-entries-list">
                </ul>
            </div>;
        }
    });

    createTodo = function (options) {
        var mount, todoApp;
        mount = options.domNode;
        todoApp = React.createElement(TodoAdd);
        React.render(todoApp, mount);
    };

    return createTodo;
});
