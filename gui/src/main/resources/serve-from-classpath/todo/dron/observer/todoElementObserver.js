/*global require */

define(["lib/templateobserver", "http/json-over-http"],    function (templateService, jsonOverHttp) {
    function plugin(element){
        var todoName = element.data("todo-name"),
            todoId = element.data("todo-id"),
            todoIsDone = element.hasClass("todo-done"),
            checkbox = $("<input type=checkbox>").prop("checked", todoIsDone).click(function(){
                var newState = todoIsDone ? false:true;
                jsonOverHttp({uri: '/db/item/'+todoId, method:'PATCH', body:{done:newState, id:todoId}}).then(function(){
                    element.trigger("todoStateChange", newState);
                });
            });
        element.append(checkbox).append("<span>"+todoName+"</span>");

        element.on("todoClearCompleted", function(){
            if(element.hasClass("todo-done") && !element.hasClass("deleted")){
                jsonOverHttp({uri: '/db/item/'+todoId, method:'DELETE'});
                element.addClass("deleted").remove();
            }
        });
    }
    
    return {
        observer:templateService.observer({method:plugin, elementLocator:"[data-todo-id]"}),
        setJsonOverHttp:function(j){jsonOverHttp = j;}
    };
});
