define(['react'], function (React) {
    'use strict';
    var HelloWorld, createTodo;

    HelloWorld = React.createClass({
        render: function () {
            return <h1>Hello World!</h1>;
        }
    });

    createTodo = function(options) {
        var mount, todoApp;
        mount = options.domNode;
        todoApp = React.createElement(HelloWorld);
        React.render(todoApp, mount);
    };

    return createTodo;
});
