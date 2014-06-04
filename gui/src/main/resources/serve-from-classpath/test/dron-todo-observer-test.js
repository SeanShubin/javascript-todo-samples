define(["qunit", "todo/dron/observer/todoListObserver", "lib/templateobserver"], function (qunit, todo, templateService) {
    var test = qunit.test;
    qunit.module('dron-todo-observer-test');
    
    test("The Todo Component Properly Loads When A Well-Formatted Template Is Provided", function(){
        var element;
        
        todo.setJsonOverHttp(jsonOverHttpWillReturn([{name:"name"}]))
        
        element = templateService.template("<div id='todo-list'></div>", [todo]);
        equal(element.find("div").size(),1,"Here it is")
    });
    
    
    function jsonOverHttpWillReturn(value){
        return function(){
            return {
                then:function(callback){
                    callback({"body":value});
                }
            }
        }
    }
    
});
