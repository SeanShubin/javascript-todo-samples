define(["qunit", "todo/dron/observer/todoListObserver", "todo/dron/observer/todoElementObserver", "lib/templateobserver"], function (qunit, todo, todoElementObserver, templateService) {
    var test = qunit.test;
    qunit.module('dron-todo-observer-test');
    
    test("The Todo Component Properly Loads When A Well-Formatted Template Is Provided", function(){
        var element;
        jsonOverHttpWillReturn([{name:"name 1", number:1, id:1}, {name:"name 2", number:2, id:2}]);
        element = templateService.template("<div id='todo-list'></div>", [todo]);
        equal(element.find(".todo-container>div").size(),2,"Both elements are drawn into the element");
        equal($(element.find(".todo-container>div").get(0)).text(), "name 1", "The first element should be the first returned from the REST endpoint");
	equal($(element.find(".todo-container>div").get(0)).data("todo-id"), 1, "The element should be given an ID of 1.");
    });

    test("When The Todo Element Checkbox Is Checked, It Should Mark The Todo Complete ", function(){
	var element,
	    stateChanged=false;
	element = templateService.template("<div data-todo-id='5'></div>", [todoElementObserver]);
	equal(element.data("todo-state"), "incomplete", "The todo state should default to 'incomplete'");
	element.on("todoStateChange", function(event){
	    var element = $(event.target);
	    equal(element.data("todo-state"), "complete");
	    stateChanged=true;
	});
	
	element.find("input").click();
	
        ok(stateChanged, "clicking on the todo should have triggered a state change");
    });
    
    
    function jsonOverHttpWillReturn(value){
        todo.setJsonOverHttp(function(){
            return {
                then:function(callback){
                    callback({"body":value});
                }
            };
        });
    }
    
});
