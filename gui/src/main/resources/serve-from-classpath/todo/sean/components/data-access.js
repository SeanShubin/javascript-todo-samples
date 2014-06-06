define(['underscore'], function (_) {
    'use strict';
    return function (jsonOverHttp) {
        var createWithName, setDone, deleteTodo, getTodoList, extractResponseBody, createListeners,
            addCreateListener, notifyCreateListeners, fireCreateForAll, getAndFireCreateForAll;
        createListeners = [];
        createWithName = function (name) {
            return jsonOverHttp({
                uri: 'db/todo',
                method: 'POST',
                body: {name: name, done: false}}).then(extractResponseBody).then(notifyCreateListeners);
        };
        setDone = function (todo) {
            return jsonOverHttp({
                uri: 'db/todo/' + todo.id,
                method: 'PATCH',
                body: {done: todo.done}}).then(extractResponseBody);
        };
        deleteTodo = function (id) {
            return jsonOverHttp({
                uri: 'db/todo/' + id,
                method: 'DELETE'}).then(extractResponseBody);
        };
        getTodoList = function () {
            return jsonOverHttp({
                uri: 'db/todo',
                method: 'GET'}).then(extractResponseBody);
        };
        extractResponseBody = function (response) {
            return response.body;
        };
        addCreateListener = function (listener) {
            createListeners.push(listener);
        };
        notifyCreateListeners = function (todo) {
            _.invoke(createListeners, 'call', undefined, todo);
        };
        fireCreateForAll = function (todoList) {
            _.each(todoList, notifyCreateListeners);
        };
        getAndFireCreateForAll = function () {
            getTodoList().then(fireCreateForAll);
        };
        return {
            createWithName: createWithName,
            setDone: setDone,
            deleteTodo: deleteTodo,
            getTodoList: getTodoList,
            addCreateListener: addCreateListener,
            getAndFireCreateForAll: getAndFireCreateForAll
        };
    };
});
