/*global require */

define([
        "lib/templateobserver", 
        "jquery", 
        "underscore", 
        "http/json-over-http", 
        "todo/dron/observer/todoElementObserver",
        "text!todo/dron/observer/todoLayout.html"
        ],function (templateService, $, _, jsonOverHttp, elementObserver, todoLayout) {
            function plugin(element){
                jsonOverHttp({uri: 'db/item', method: 'GET'}).then(function(response){
                    var todos = JSON.parse(response.body);
                    element.append(templateService.template(todoLayout, [elementObserver], {'todos':todos}));
                    element.find("input.submit").click(function(){
                        var newItemName=element.find("input.new-todo").val();
                        jsonOverHttp({uri: 'db/item', method:'POST', body:JSON.stringify({name:newItemName, number:todos.length+1})});
                    });
                });
            }
    
            return {
                observer:templateService.observer({method:plugin, elementLocator:"#todo-list"}),
                setJsonOverHttp:function(j){jsonOverHttp = j;}
            };
});
