/*global require */

define(["lib/templateobserver", "jquery", "underscore"],    function (templateService, $, _) {
    function plugin(element){
        
    }
    
    return {
        observer:templateService.observer({method:plugin, elementLocator:"[data-content]"})
    };
});
