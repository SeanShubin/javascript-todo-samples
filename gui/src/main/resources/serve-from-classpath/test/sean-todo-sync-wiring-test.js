define(['qunit',
    'jquery',
    'todo/sean/sync/createTodoAsyncWiring'], function (qunit, $, createTodoAsyncWiring) {
    'use strict';
    qunit.module('sean-todo-sync-wiring-test');
    qunit.test('when we add an item to the model, it gets added to the view', function () {
        var fakeJsonOverHttp, fakeCreateTodoSyncComponent, listeners, fakeComponent, deferred, sampleItem, addItemToView;
        addItemToView = sinon.stub();
        listeners = undefined;
        deferred = $.Deferred();
        sampleItem = {name: 'blah'};
        fakeJsonOverHttp = sinon.stub().returns(deferred.promise());
        fakeComponent = {
            addItemToView: addItemToView
        };
        fakeCreateTodoSyncComponent = function (theListeners) {
            listeners = theListeners;
            return fakeComponent;
        };
        createTodoAsyncWiring({
            jsonOverHttp: fakeJsonOverHttp,
            createTodoSyncComponent: fakeCreateTodoSyncComponent
        });
        listeners.addItemToModel(sampleItem);
        deferred.resolve(sampleItem);

        qunit.ok(fakeJsonOverHttp.calledWithExactly({uri: 'db/item', method: 'POST', body: sampleItem}));
        qunit.equal(addItemToView.callCount, 1, 'added one item');
        qunit.ok(addItemToView.calledWith(sampleItem), 'added the correct item');
    });

    qunit.test('when we load items to the model, they are set in the view', function () {
        var fakeJsonOverHttp, fakeCreateTodoSyncComponent, listeners, fakeComponent, deferred, sampleItems, setItemsInView;
        setItemsInView = sinon.stub();
        listeners = undefined;
        deferred = $.Deferred();
        sampleItems = [
            {name: 'blah'}
        ];
        fakeJsonOverHttp = sinon.stub().returns(deferred.promise());
        fakeComponent = {
            setItemsInView: setItemsInView
        };
        fakeCreateTodoSyncComponent = function (theListeners) {
            listeners = theListeners;
            return fakeComponent;
        };
        createTodoAsyncWiring({
            jsonOverHttp: fakeJsonOverHttp,
            createTodoSyncComponent: fakeCreateTodoSyncComponent
        });
        listeners.loadItemsFromModel(sampleItems);
        deferred.resolve(sampleItems);

        qunit.ok(fakeJsonOverHttp.calledWithExactly({uri: 'db/item', method: 'GET'}));
        qunit.equal(setItemsInView.callCount, 1, 'set items once');
        qunit.ok(setItemsInView.calledWith(sampleItems), 'set the correct items');
    });
});
