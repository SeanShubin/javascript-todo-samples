define([
        "lib/templateobserver",
        "jquery",
        "underscore",
        "http/json-over-http"
    ],function(templateService, $, _, jsonOverHttp){
        function plugin(element){
            element.find("input.submit").click(function(){
                var newItemName=element.find("input.new-todo").val();
                jsonOverHttp({uri: '/db/item', method:'POST', body:{name:newItemName}}).then(function(){
                    element.trigger("newTodo", newItemName);
                });
            });
        }

        return {
            observer:templateService.observer({method:plugin, elementLocator:"[data-todo-creator]"}),
            setJsonOverHttp:function(j){jsonOverHttp = j;}
        };
        
});
