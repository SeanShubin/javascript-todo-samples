define(["qunit", "todo/dron/observer/todoListObserver", "todo/dron/observer/todoElementObserver", "lib/templateobserver"], function (qunit, todo, todoElementObserver, templateService) {
    var test = qunit.test,
        didntCrash=true,
        lastJsonOverHttpRequest = {},
        vanillaResponse = [{'name':"name 1", 'number':1, 'id':1}, {'name':"name 2", number:2, 'id':2}];

    qunit.module('dron-todo-observer-test');
    
    test("The Todo Component Properly Loads When A Well-Formatted Template Is Provided", function(){
        var element;
        
        mockJsonOverHttp(vanillaResponse);
        
        element = templateService.template("<div id='todo-list'></div>", [todo]);
        equal(element.find(".todo-container>div").size(),2,"Both elements are drawn into the element");
        equal($(element.find(".todo-container>div").get(0)).text(), "name 1", "The first element should be the first returned from the REST endpoint");
        equal($(element.find(".todo-container>div").get(0)).data("todo-id"), 1, "The element should be given an ID of 1.");
    });

    test("The todo component doesn't crash when an empty body is returned by the server", function(){
        nextJsonOverHttpResponse = [];
        templateService.template("<div id='todo-list'></div>", [todo]);
        ok(didntCrash);
    });


    test("Should be able to add new todo entries", function(){
        var element, 
            newTodoName = "This is a new todo entry";
        mockJsonOverHttp(vanillaResponse);

        element = templateService.template("<div id='todo-list'></div>", [todo]);
        
        element.find("input.new-todo").val(newTodoName);
        element.find("input.submit").click();
        equal(lastJsonOverHttpRequest.body.name, newTodoName);
        equal(lastJsonOverHttpRequest.body.id, undefined);
        equal(lastJsonOverHttpRequest.body.number, 3, "Since this is the third element, let's make it position three");
        ok(true);
        
        
    });


    test("When The Todo Element Checkbox Is Checked, It Should Mark The Todo Complete ", function(){
        var element,
            stateChanged=false;
        mockJsonOverHttp(vanillaResponse);

        element = templateService.template("<div id='todo-list'></div>", [todo]);

        equal(element.find("[data-todo-id=1]").data("todo-state"), "incomplete", "The todo state should default to 'incomplete'");
        element.on("todoStateChange", function(event){
            var element = $(event.target);
            equal(element.data("todo-state"), "complete");
            stateChanged=true;
        });
        
        element.find("input").click();
        
        ok(stateChanged, "clicking on the todo should have triggered a state change");
    });
    
    
    function mockJsonOverHttp(nextJsonOverHttpResponse){
        todo.setJsonOverHttp(function(requestObject){
            equal(requestObject.uri, 'db/item', 'A valid URI was used.');
            lastJsonOverHttpRequest.body = requestObject.body ? JSON.parse(requestObject.body): {};
            return {
                then:function(callback){
                    callback({body:JSON.stringify(nextJsonOverHttpResponse)});
                }
            };
        });
    }
    
});
