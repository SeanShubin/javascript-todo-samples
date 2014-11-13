define(['react', 'http/json-over-http', 'underscore', 'underscore.string'], function (React, jsonOverHttp, _, _s) {
    'use strict';
    var createTodo, TodoAdd, TodoElement, TodoList, TodoLayout;

    TodoAdd = React.createClass({
        addButtonPressed: function () {
            var name = _s.trim(this.state.value);
            if (!_s.isBlank(name)) {
                this.setState({value: ''});
                this.props.onAddTodoItem(this.state.value);
                this.refs.myTextInput.getDOMNode().focus();
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
                <input type="text"
                       ref="myTextInput"
                       value={this.state.value}
                       onChange={this.textUpdated}
                       onKeyUp={this.keyUp}/>
                <button onClick={this.addButtonPressed}>Add todo entry</button>
            </div>;
        }
    });

    TodoElement = React.createClass({
        deleteButtonPressed: function(){
            jsonOverHttp({uri: 'db/todo-entry/' + this.props.id, method: 'DELETE'}).then(this.props.onRespondToTodoDeleted);
        },
        getInitialState: function () {
            return this.props;
        },
        doneChanged:function(event){
            this.state.done = event.target.checked;
            this.setState(this.state);
            jsonOverHttp({
                uri: 'db/todo-entry/' + this.state.id,
                method: 'PATCH',
                body: {done: this.state.done}
            });
        },
        render: function () {
            return <li>
                <input type="checkbox" checked={this.state.done} onChange={this.doneChanged} />
                <label>{this.state.name}</label>
                <button onClick={this.deleteButtonPressed}>Delete</button>
            </li>;
        }
    });

    TodoList = React.createClass({
        render: function () {
            var todoEntries, todoDeletedFunction;
            todoDeletedFunction = this.props.onRespondToTodoDeleted;
            todoEntries = this.props.data.map(function (todoEntry) {
                return <TodoElement key={todoEntry.id}
                                    id={todoEntry.id}
                                    name={todoEntry.name}
                                    done={todoEntry.done}
                                    onRespondToTodoDeleted={todoDeletedFunction}
                />
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
        onRespondToTodoDeleted: function (response) {
            var id, newStateData;
            id = response.body.id;
            newStateData = _.filter(this.state.data, function(item){return item.id !== id});
            this.setState({data: newStateData});
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
                <TodoList data={this.state.data}
                          onRespondToTodoDeleted={this.onRespondToTodoDeleted}/>
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
