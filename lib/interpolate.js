define([], function() {

    return function(message) {
        args = Array.prototype.slice.call(arguments, 1);
        return message.replace(/\{\d+\}/g, function(match) {
            var index = match.slice(1, -1);
            return typeof args[index] !== 'undefined' ? args[index] : match;
        })
    }

});