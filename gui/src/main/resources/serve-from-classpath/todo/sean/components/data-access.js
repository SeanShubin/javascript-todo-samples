define([], function () {
    'use strict';
    function create(jsonOverHttp) {
        var createWithName, setDoneStatus, deleteEntry, getEntries, extractResponseBody;
        createWithName = function (name) {
            return jsonOverHttp({
                uri: 'todo-entry',
                method: 'POST',
                body: {name: name, done: false}}).then(extractResponseBody);
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
        return {
            createWithName: createWithName,
            setDoneStatus: setDoneStatus,
            deleteEntry: deleteEntry,
            getEntries: getEntries
        };
    }

    return create;
});
