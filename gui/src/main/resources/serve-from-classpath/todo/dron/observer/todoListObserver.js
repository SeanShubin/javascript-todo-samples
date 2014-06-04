/*global require */

define(["lib/templateobserver", "jquery", "underscore", "http/json-over-http"],    function (templateService, $, _, jsonOverHttp) {
    function plugin(element){
        jsonOverHttp({uri: 'item', method: 'GET'}).then(function(response){
            var items = response.body;
            
            _.each(items, function(item){
                element.append($("<div>").text(item.name));
            });
            
        });
        
        
    }
    
    return {
        observer:templateService.observer({method:plugin, elementLocator:"#todo-list"}),
        setJsonOverHttp:function(j){jsonOverHttp = j;}
    };
});
