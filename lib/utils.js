define(["interpolate"], function(str) {
    function msg(args, scope) {
        return str.apply(scope, args);
    }

    return {
        warn: function() {
            console.warn(msg(arguments));
        },
        log: function() {
            console.log(msg(arguments));
        },
        error: function() {
            message = msg(arguments);
            throw new Error(message);
        },
        slice: function() {
            var slice = Array.prototype.slice,
                args = slice.apply(arguments),
                array = args.shift();

            return slice.apply(array, args);
        },
        splice: [].splice,
        isFunction: function(obj) {
            return typeof obj === 'function';
        },
        isUndefined: function(obj) {
            return typeof obj === 'undefined';
        },
        isString: function(obj) {
            return typeof obj === 'string';
        },
        extend: function (child, parent) {
            for(var prop in parent) {
                if(parent.hasOwnProperty(prop))
                    child[prop] = parent[prop];
            }
        }
    }
});