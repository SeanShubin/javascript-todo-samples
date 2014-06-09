/*global require */

define([
        "lib/templateobserver", 
        "jquery", 
        "underscore", 
        "http/json-over-http", 
        "todo/dron/observer/todoElementObserver",
        "todo/dron/observer/todoElementCreatorObserver",
        "text!todo/dron/observer/todoLayout.html"
        ],function (templateService, $, _, jsonOverHttp, elementObserver, creatorObserver, todoLayout) {
            function plugin(element){
                
                //When these events bubble up from children, the todo list should be refreshed.
                element.on("newTodo todoStateChange", function(){
                    refreshTodoList();
                });

                //Redraw the todo list by clearing out the container and re-applying the template.
                function refreshTodoList(){
                    jsonOverHttp({uri: '/db/item', method: 'GET'}).then(function(response){
                        var listeners = [],
                            todos = response.body;
                        element.empty();
                        element.append(templateService.template(todoLayout, [elementObserver, creatorObserver], {'todos':todos}));
                     
                        element.find("button#clear-completed").on("click",function(){
                            element.trigger("todoClearCompleted");
                        });

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
