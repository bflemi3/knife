define(['lib/interpolate'], function(str) {
    var knife = {};

    function warn() {
        console.warn(str.apply(null, arguments));
    }

    function log() {
        console.log(str.apply(null, arguments));
    }

    function slice(array) {
        return Array.prototype.slice.apply(array);
    }

    knife.before = function(constructor, method, fn) {
        var ctor = constructor;

        function proxy() {

            return function() {
                var args = slice(arguments);
                var instance = new (Function.prototype.bind.apply(ctor, [this].concat(args)));
                if(typeof instance[method] !== 'function')
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
        }

        proxy.prototype = constructor.prototype;
        constructor.prototype = new proxy();
        constructor.prototype.constructor = constructor;

        //var proto = constructor.prototype;
        //constructor = proxy;
        //constructor.prototype = proto;
        //return constructor;
        //var test = new constructor('brandno');
        //test.walk(5);
    };


    return knife;
});
