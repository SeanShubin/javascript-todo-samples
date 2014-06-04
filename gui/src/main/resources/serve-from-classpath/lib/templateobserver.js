/**
 * This module will automatically scan the dom for "script" tags of type html/template
 */
define("lib/templateobserver", ["jquery", "underscore"],    function ($, _) {
    function loadTemplateForUrl(url, backupString){
        if(url){
            return $.get(url);
        }
        else return $.Deferred().resolve(backupString).promise();
    }
    
    /**
    * Defines an observer - basically, takes an element locater and a method to run on that element when that locater is encountered when applying a template.
    **/
    function defineObserver(options){
        if (!options || !options.elementLocator || !options.method){
            return;
        }
        
        return function (templateElement){
            //Define the notify method: basically call options.method with each matching element.
            function notify(i, element){
                options.method($(element));
            }
            
            //Find matching elements, and for each one, call notify()
            $(templateElement).find(options.elementLocator).each(notify);  //If any child of the element matches.
            $(templateElement).filter(options.elementLocator).each(notify);//If the element itself matches.
        };
        
    }
    
    /**
    * Applies the given template with the provided observers.
    **/
    function template(templateString, observers){
        var ret = $(_.template(templateString)());
        _.each(observers,function(plugin){
            try{
                plugin.observer(ret);
            }catch(e){
                throw("\nProblem "+e.message+"\n With Plugin "+plugin.name+"\n"+plugin.plugin);
            }
        });
        return ret;
    }
    
    function scanOnce(){
        if (!window.scanForTemplates){
            window.scanForTemplates = function(e){
                var elementToScan = e || $("body");
                elementToScan.find('script[type="html/template"]').each(function(i, script){
                    var element=$(script),
                        observers = element.data("observers") || [];
                    
                    
                    require(observers, function(){
                        var requiredObservers = arguments;
                        loadTemplateForUrl(element.data("template-url"), element.html()).done(function(templateString){
                            element.after(template(templateString, requiredObservers));
                            element.trigger("scanned");
                        });            
                    });
                });
            };
            window.scanForTemplates();
        }
    }
    
    return {
        template: template,
        observer: defineObserver,
        scanOnce:scanOnce
    }
    
});

require(["lib/templateobserver"], function(templateService){templateService.scanOnce();})
