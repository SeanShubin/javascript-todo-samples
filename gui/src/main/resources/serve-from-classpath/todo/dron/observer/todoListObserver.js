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

                function refreshTodoList(){
                    element.empty();
                    jsonOverHttp({uri: '/db/item', method: 'GET'}).then(function(response){
                        var todos = response.body;
                        element.append(templateService.template(todoLayout, [elementObserver, creatorObserver], {'todos':todos}));

                        element.find("[data-todo-creator]").on("newTodo", function(){
                            refreshTodoList();
                        });
                        
                        element.find("[data-todo-id]").on("todoStateChange", function(){
                            refreshTodoList();
                        });

                    });
                }

                refreshTodoList();
            }

            return {
                observer:templateService.observer({method:plugin, elementLocator:"#todo-list"}),
                setJsonOverHttp:function(j){jsonOverHttp = j;}
            };
});
