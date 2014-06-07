/*global require */

define(["lib/templateobserver", "jquery", "underscore","http/json-over-http"],    function (templateService, $, _, jsonOverHttp) {
    var listener=$("<span>");
    function plugin(element){
        var todoName = element.data("todo-name"),
            todoId = element.data("todo-id"),
            todoState = element.hasClass("todo-done"),
            checkbox = $("<input type=checkbox>").click(function(){
                var newState = todoState ? false:true;
                jsonOverHttp({uri: '/db/item/'+todoId, method:'PATCH', body:{done:newState, id:todoId}}).then(function(){
                    element.trigger("todoStateChange", newState);
                });
            });
        //if (todoState) element.addClass("todo-done");
        element.append(checkbox).append("<span>"+todoName+"</span>");

        listener.on("todoClearCompleted", function(){
            if(element.hasClass("todo-done")){
                jsonOverHttp({uri: '/db/item/'+todoId, method:'DELETE'});
                element.empty();
                element.trigger("todoClearCompleted");
            }
        });

    }
    
    return {
        observer:templateService.observer({method:plugin, elementLocator:"[data-todo-id]"}),
        trigger:function(event){listener.trigger(event);},
        setJsonOverHttp:function(j){jsonOverHttp = j;}
    };
});
