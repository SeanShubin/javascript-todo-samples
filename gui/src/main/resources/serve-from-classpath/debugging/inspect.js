define(['underscore'], function (_) {
    'use strict';
    var argumentsToLines, consoleLogArgumentsToLines;
    argumentsToLines = function (args) {
        var lines, pushArgumentString;
        lines = [];
        lines.push('' + args.length + ' arguments');
        pushArgumentString = function (arg, index) {
            lines.push('arg[' + index + '] = (' + typeof (arg) + ') ' + JSON.stringify(arg));
        };
        _.forEach(args, pushArgumentString);
        return lines;
    };
    consoleLogArgumentsToLines = function(args) {
        _.forEach(argumentsToLines(args), function(line){
            console.log(line);
        });
    };
    return  {
        argumentsToLines: argumentsToLines,
        consoleLogArgumentsToLines: consoleLogArgumentsToLines
    }
});
