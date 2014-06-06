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
                jsonOverHttp({uri: 'item', method: 'GET'}).then(function(response){
                    element.append(templateService.template(todoLayout, [elementObserver], {'todos':response.body}));
                });
        
        
            }
    
            return {
                observer:templateService.observer({method:plugin, elementLocator:"#todo-list"}),
                setJsonOverHttp:function(j){jsonOverHttp = j;}
            };
});
