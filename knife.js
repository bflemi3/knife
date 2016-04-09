define(['lib/interpolate'], function(str) {
    var knife = {};

    function warn() {
        console.warn(str.apply(null, arguments));
    }

    function log() {
        console.log(str.apply(null, arguments));
    }

    function slice() {
        return Array.prototype.slice.apply(null, arguments);
    }

    knife.before = function(constructor, method, fn) {
        var proto = function() {

            var instance = proto.apply(this, arguments);
            if(typeof this[method] !== 'function')
                return warn("'{0}' does not exist within given constructor.", method);

            var impl = instance[method];
            instance[method] = function() {
                var args = slice(arguments),
                    metadata = {
                        arguments: args,
                        impl: impl
                    };

                fn(metadata);
            };
            return instance;
        };

        proto.prototype = constructor.prototype;

        var test = new proto('brandon');

        constructor = proto;

    };


    return knife;
});