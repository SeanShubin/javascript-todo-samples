define([], function () {
    'use strict';
    function create(jsonOverHttp) {
        var createWithName, setDoneStatus, deleteEntry, getEntries, entryAdded;
        createWithName = function (name) {
            return jsonOverHttp({
                uri: 'todo-entry',
                method: 'POST',
                body: {name: name, done: false}}).then(entryAdded);
        };
        setDoneStatus = function (parameters) {
            return jsonOverHttp({
                uri: 'todo-entry/' + parameters.id,
                method: 'PATCH',
                body: {done: parameters.done}});
        };
        deleteEntry = function (id) {
            return jsonOverHttp({
                uri: 'todo-entry/' + id,
                method: 'DELETE'});
        };
        getEntries = function () {
            return jsonOverHttp({
                uri: 'todo-entry',
                method: 'GET'});
        };
        entryAdded = function (response) {
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
