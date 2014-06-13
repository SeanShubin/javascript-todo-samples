define([
        "lib/templateobserver",
        "http/json-over-http"
    ],function(templateService, jsonOverHttp){
        function plugin(element){

            element.find("form").on("submit",function(event){
                var newItemName=element.find("input.new-todo").val();
                jsonOverHttp({uri: '/db/item', method:'POST', body:{name:newItemName}}).then(function(){
                    element.trigger("newTodo", newItemName);
                });
                event.preventDefault();
            });
        }

        return {
            observer:templateService.observer({method:plugin, elementLocator:"[data-todo-creator]"}),
            setJsonOverHttp:function(j){jsonOverHttp = j;}
        };        
});
