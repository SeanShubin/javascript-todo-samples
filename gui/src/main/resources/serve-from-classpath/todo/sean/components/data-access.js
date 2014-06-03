define([], function () {
    'use strict';
    function create(jsonOverHttp) {
        var createWithName, setDoneStatus, deleteEntry, getEntries, extractResponseBody, createListeners,
            addCreateListener, notifyCreateListeners, fireCreateForEachTodoEntry, getAllAndFireCreateForEachTodoEntry;
        createListeners = [];
        createWithName = function (name) {
            return jsonOverHttp({
                uri: 'todo-entry',
                method: 'POST',
                body: {name: name, done: false}}).then(extractResponseBody).then(notifyCreateListeners);
        };
        setDoneStatus = function (parameters) {
            return jsonOverHttp({
                uri: 'todo-entry/' + parameters.id,
                method: 'PATCH',
                body: {done: parameters.done}}).then(extractResponseBody);
        };
        deleteEntry = function (id) {
            return jsonOverHttp({
                uri: 'todo-entry/' + id,
                method: 'DELETE'}).then(extractResponseBody);
        };
        getEntries = function () {
            return jsonOverHttp({
                uri: 'todo-entry',
                method: 'GET'}).then(extractResponseBody);
        };
        extractResponseBody = function (response) {
            return response.body;
        };
        addCreateListener = function(listener) {
            createListeners.push(listener);
        };
        notifyCreateListeners = function(todoEntry) {
            _.invoke(createListeners, 'call', todoEntry);
        };
        fireCreateForEachTodoEntry = function(todoEntries) {
            _.each(todoEntries, notifyCreateListeners);
        };
        getAllAndFireCreateForEachTodoEntry = function(){
            getEntries().then(fireCreateForEachTodoEntry);
        };
        return {
            createWithName: createWithName,
            setDoneStatus: setDoneStatus,
            deleteEntry: deleteEntry,
            getEntries: getEntries,
            addCreateListener: addCreateListener,
            getAllAndFireCreateForEachTodoEntry:getAllAndFireCreateForEachTodoEntry
        };
    }

    return create;
});
