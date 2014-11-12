define(['react', 'http/json-over-http', 'underscore', 'underscore.string'], function (React, jsonOverHttp, _, _s) {
    'use strict';
    var createTodo, TodoAdd, TodoElement, TodoList, TodoLayout;

    TodoAdd = React.createClass({
        addButtonPressed: function () {
            var name = _s.trim(this.state.value);
            if (!_s.isBlank(name)) {
                this.setState({value: ''});
                this.props.onAddTodoItem(this.state.value);
            }
        },
        getInitialState: function () {
            return {value: ''};
        },
        textUpdated: function (event) {
            this.setState({value: event.target.value});
        },
        keyUp: function (event) {
            if (event.which === 13) {
                this.addButtonPressed();
            }
        },
        render: function () {
            return <div>
                <input className="user-input" type="text" value={this.state.value} onChange={this.textUpdated} onKeyUp={this.keyUp}/>
                <button className="add-todo-entry-button" onClick={this.addButtonPressed}>Add todo entry</button>
            </div>;
        }
    });

    TodoElement = React.createClass({
        render: function () {
            return <li className="todo-entry">
                <input className="todo-done" type="checkbox"/>
                <label className="todo-name">{this.props.name}</label>
                <button className="todo-delete">Delete</button>
            </li>;
        }
    });

    TodoList = React.createClass({
        render: function () {
            var todoEntries;
            todoEntries = this.props.data.map(function (todoEntry) {
                return <TodoElement key={todoEntry.id} name={todoEntry.name}/>
            });
            return <ul todo-entries-list>{todoEntries}</ul>;
        }
    });

    TodoLayout = React.createClass({
        onAddTodoItem: function (name) {
            var todo;
            todo = { name: name, done: false };
            jsonOverHttp({uri: 'db/todo-entry', method: 'POST', body: todo}).then(this.respondToTodoAdded);
        },
        respondToTodoAdded: function (response) {
            this.state.data.push(response.body);
            this.setState(this.state);
        },
        respondToRefreshTodoEntries: function (response) {
            this.setState({data: response.body});
        },
        getInitialState: function () {
            return {
                data: []
            };
        },
        componentDidMount: function () {
            jsonOverHttp({uri: 'db/todo-entry', method: 'GET'}).then(this.respondToRefreshTodoEntries);
        },
        render: function () {
            return <div>
                <TodoAdd onAddTodoItem={this.onAddTodoItem}/>
                <TodoList data={this.state.data}/>
            </div>
        }
    });

    createTodo = function (options) {
        var mount, todoComponent;
        mount = options.domNode;
        todoComponent = <TodoLayout/>;
        React.render(todoComponent, mount);
    };

    return createTodo;
});

/*
define(['jquery',
    'underscore',
    'underscore.string'], function ($, _, _s) {
    'use strict';
    function createPrototypeTodoComponent(jsonOverHttp) {
        var dom, addButtonPressed, keyPressed, addButton, userInput, list, appendTodoEntryToView, respondToTodoAdded,
            respondToRefreshTodoEntries, respondToTodoDeleted, respondToTodoModified, updateTodoElementValues;
        dom = $(
                '<div>' +
                '    <input class="user-input" type="text">' +
                '    <button class="add-todo-entry-button">Add todo entry</button>' +
                '    <ul class="todo-entries-list">' +
                '    </ul>' +
                '</div>');
        addButton = dom.find('.add-todo-entry-button');
        userInput = dom.find('.user-input');
        list = dom.find('.todo-entries-list');
        keyPressed = function (event) {
            if (event.which === 13) {
                addButtonPressed();
            }
        };
        addButtonPressed = function () {
            var toAdd, todo;
            toAdd = _s.trim(userInput.val());
            if (!_s.isBlank(toAdd)) {
                userInput.val('');
                userInput.focus();
                todo = { name: toAdd, done: false };
                jsonOverHttp({uri: 'db/todo-entry', method: 'POST', body: todo}).then(respondToTodoAdded);
            }
        };
        appendTodoEntryToView = function (todoEntry) {
            var todoElement, deleteEvent, doneEvent;
            todoElement = $(
                    '<li class="todo-entry">' +
                    '    <input class="todo-done" type="checkbox">' +
                    '    <label class="todo-name"></label>' +
                    '    <button class="todo-delete">Delete</button>' +
                    '</li>');
            list.append(todoElement);
            todoElement.addClass('todo-id-' + todoEntry.id);
            updateTodoElementValues(todoEntry);
            deleteEvent = function () {
                jsonOverHttp({uri: 'db/todo-entry/' + todoEntry.id, method: 'DELETE'}).then(respondToTodoDeleted);
            };
            doneEvent = function () {
                var checkedValue = todoElement.find('.todo-done').is(':checked');
                jsonOverHttp({
                    uri: 'db/todo-entry/' + todoEntry.id,
                    method: 'PATCH',
                    body: {done: checkedValue}
                }).then(respondToTodoModified);
            };
            todoElement.find('.todo-delete').on('click', deleteEvent);
            todoElement.find('.todo-done').on('change', doneEvent);
        };
        respondToTodoAdded = function (response) {
            appendTodoEntryToView(response.body);
        };
        respondToRefreshTodoEntries = function (response) {
            _.each(response.body, appendTodoEntryToView);
        };
        respondToTodoDeleted = function (response) {
            dom.find('.todo-id-' + response.body.id).remove();
        };
        updateTodoElementValues = function (todoEntry) {
            var todoElement = dom.find('.todo-id-' + todoEntry.id);
            todoElement.find('.todo-name').text(todoEntry.name);
            if (todoEntry.done) {
                todoElement.find('.todo-done').attr('checked', 'checked');
            } else {
                todoElement.find('.todo-done').removeAttr('checked');
            }
        };
        respondToTodoModified = function (response) {
            updateTodoElementValues(response.body);
        };
        addButton.on('click', addButtonPressed);
        userInput.on('keyup', keyPressed);
        jsonOverHttp({uri: 'db/todo-entry', method: 'GET'}).then(respondToRefreshTodoEntries);
        return dom;
    }

    return createPrototypeTodoComponent;
});
*/