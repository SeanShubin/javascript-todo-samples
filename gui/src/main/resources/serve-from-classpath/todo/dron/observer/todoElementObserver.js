/*global require */

define(["lib/templateobserver", "jquery", "underscore"],    function (templateService, $, _) {
    function plugin(element){
	var todoName = element.text(),
	    checkbox = $("<input type=checkbox>").click(function(){
		if(element.data("todo-state") === "incomplete") element.data("todo-state", "complete");
		else element.data("todo-state", "incomplete");
		element.trigger("todoStateChange");
	    });
        element.data("todo-state", "incomplete");
	element.append(checkbox);
    }
    
    return {
        observer:templateService.observer({method:plugin, elementLocator:"[data-todo-id]"})
    };
});
