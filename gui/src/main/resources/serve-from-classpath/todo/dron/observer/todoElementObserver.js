/*global require */

define(["lib/templateobserver", "jquery", "underscore","http/json-over-http"],    function (templateService, $, _, jsonOverHttp) {
    function plugin(element){
        var todoName = element.data("todo-name"),
            todoId = element.data("todo-id"),
            todoState = element.data("todo-state") ? true:false,
            checkbox = $("<input type=checkbox>").click(function(){
                var newState = todoState ? false:true;
                jsonOverHttp({uri: '/db/item/'+todoId, method:'PATCH', body:{done:newState, id:todoId}}).then(function(){
                    element.trigger("todoStateChange", newState);
                });
            });
        if (todoState) element.addClass("todo-done");
        element.append(checkbox).append("<span>"+todoName+"</span>");

    }
    
    return {
        observer:templateService.observer({method:plugin, elementLocator:"[data-todo-id]"}),
        setJsonOverHttp:function(j){jsonOverHttp = j;}
    };
});
