define([
    "qunit", 
    "todo/dron/observer/todoListObserver", 
    "todo/dron/observer/todoElementObserver", 
    "todo/dron/observer/todoElementCreatorObserver", 
    "lib/templateobserver"], 
function (qunit, todo, todoElementObserver, creator, templateService) {
    var test = qunit.test,
        didntCrash=true,
        lastJsonOverHttpRequest = {},
        vanillaResponse = [{'name':"name 1", 'number':1, 'id':1}, {'name':"name 2", number:2, 'id':2}];

    qunit.module('dron-todo-observer-test');
    
    test("The Todo Component Properly Loads When A Well-Formatted Template Is Provided", function(){
        var element = loadTodoAppWithData(vanillaResponse);
        
        equal(element.find(".todo-container>div").size(),2,"Both elements are drawn into the element");
        equal($(element.find(".todo-container>div").get(0)).text(), "name 1", "The first element should be the first returned from the REST endpoint");
        equal($(element.find(".todo-container>div").get(0)).data("todo-id"), 1, "The element should be given an ID of 1.");
    });

    test("The todo component doesn't crash when an empty body is returned by the server", function(){
        loadTodoAppWithData([]);
        ok(didntCrash);
    });


    test("Should be able to add new todo entries", function(){
        var element, 
            newTodoName = "This is a new todo entry",
            newTodoCreated = false;
        creator.setJsonOverHttp(mockJsonOverHttp());
        element = templateService.template("<span data-todo-creator><input type='text' class='new-todo'><input type='button' class='submit'></span>", [creator]);
        element.find("input.new-todo").val(newTodoName);
        element.on("newTodo", function(event, newName){
            newTodoCreated = true;
            equal(newName, newTodoName, "The event should contain the new name that was entered");
        });

        element.find("input.submit").click();

        equal(lastJsonOverHttpRequest.body.name, newTodoName);
        equal(lastJsonOverHttpRequest.body.id, undefined);
        ok(newTodoCreated, "New Todo Event Should Have Been Triggered");
    });
    
    test("When a new todo entry is created, the list should reload", function(){
        var element = loadTodoAppWithData(vanillaResponse);

        element.find("[data-todo-creator]").trigger("newTodo");        

        expectActionToCauseARedraw(element, function(){
            element.find("[data-todo-creator]").trigger("newTodo");
        });

    });

    test("When The Todo Element Checkbox Is Checked, It Should Post The Change And Trigger A Notification ", function(){
        var element,
            stateChanged=false;
        element = templateService.template("<div data-todo-id='5'></div>", [todoElementObserver]);
        element.on("todoStateChange", function(event){
            stateChanged=true;
        });
        
        todoElementObserver.setJsonOverHttp(mockJsonOverHttp("", "/db/item/5"));
        
        element.find("input[type=checkbox]").click();

        equal(lastJsonOverHttpRequest.body.done, true);
        equal(lastJsonOverHttpRequest.method, "PATCH");


        ok(stateChanged, "clicking on the todo should have triggered a state change");
    });

    test("When The Todo Element Checkbox Is Checked, the content should reload ", function(){
        var element = loadTodoAppWithData(vanillaResponse),
            stateChanged=false;

        //Then:
        expectActionToCauseARedraw(element, function(){
            //When
            element.find("[data-todo-id]").trigger("todoStateChange");
        });
              
    });
    
    function loadTodoAppWithData(data){
        todo.setJsonOverHttp(mockJsonOverHttp(data));
        return templateService.template("<div id='todo-list'></div>", [todo]);
    }

    function expectActionToCauseARedraw(element, f){
        todo.setJsonOverHttp(mockJsonOverHttp([{'name':"name 9", 'number':9, 'id':9}]));
        f();
        equal($(element.find(".todo-container>div").get(0)).data("todo-id"), 9, "Todo number 9 should exist now.");

    }
    
    function mockJsonOverHttp(nextJsonOverHttpResponse, uri){
        realUri = uri?uri:'/db/item';
        return function(requestObject){
            equal(requestObject.uri, realUri, 'A valid URI was used.');
            lastJsonOverHttpRequest=requestObject;
            //lastJsonOverHttpRequest.body = requestObject.body ? $.parseJSON(requestObject.body): {};            
            lastJsonOverHttpRequest.body = requestObject.body ? requestObject.body: {};
            return {
                then:function(callback){
                    callback({body:nextJsonOverHttpResponse});
                }
            };
        };
    }
    
});
