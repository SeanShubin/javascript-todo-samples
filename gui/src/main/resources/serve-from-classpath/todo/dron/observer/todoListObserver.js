/*global require */

define([
        "lib/templateobserver", 
        "http/json-over-http", 
        "todo/dron/observer/todoElementObserver",
        "todo/dron/observer/todoElementCreatorObserver",
        "text!todo/dron/observer/todoLayout.html"
        ],function (templateService, jsonOverHttp, elementObserver, creatorObserver, todoLayout) {
            function plugin(element){
                
                //*********EVENT HANDLERS THIS COMPONENT RESPONDS TO
                element.on("newTodo todoStateChange", function(){
                    refreshTodoList();
                });

                element.on("click","#clear-completed", function(){
                    element.find(".todo-item").trigger("todoClearCompleted");
                });
                //********DONE WITH EVENT HANDLERS

                //Redraw the todo list by clearing out the container and re-applying the template.
                function refreshTodoList(){
                    jsonOverHttp({uri: '/db/item', method: 'GET'}).then(function(response){
                        var todos = response.body;
                        element.empty();
                        element.append(templateService.template(todoLayout, [elementObserver, creatorObserver], {'todos':todos}));
                     
                        element.find("input.new-todo").focus();
                    });
                }

                refreshTodoList();
            }

            return {
                observer:templateService.observer({method:plugin, elementLocator:"#todo-list"}),
                setJsonOverHttp:function(j){jsonOverHttp = j;}
            };
});
