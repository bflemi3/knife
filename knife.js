define(['lib/interpolate'], function(str) {

    function warn() {
        console.warn(str.apply(null, arguments));
    }

    function log() {
        console.log(str.apply(null, arguments));
    }

    function slice(array) {
        return Array.prototype.slice.apply(array);
    }

    function Proxy() {
        this.base =
    }

    function knife(ctor) {
        function Proxy() {
            this.base = ctor;
            this.metadata = {};

            var args = slice(arguments),
                instance = new (Function.prototype.bind.apply(this.base, [this].concat(args))),
                impl;
        }
    }

    knife.prototype.before = function(callback) {};

    knife.prototyep.after = function(callback) {};

    knife.before = function(constructor, method, fn) {
        var ctor = constructor[0];

        var wrap = { ctor: constructor };

        function Proxy() {
            this.realConstructor = ctor;
            this.metadata = {};

            var args = slice(arguments),
                instance = new (Function.prototype.bind.apply(this.realConstructor, [this].concat(args))),
                impl;

            if(typeof instance[method] !== 'function')
                return warn("'{0}' does not exist within given constructor.", method);

            impl = instance[method];
            instance[method] = function() {
                var args = slice(arguments);
                this.metadata = {
                    arguments: args,
                    impl: impl
                };

                fn(metadata);
            };
            return instance;
        }

        var oldProto = wrap.ctor.prototype;
        wrap.ctor = Proxy;
        wrap.ctor.prototype = oldProto;


        //
        //Proxy.prototype = constructor.prototype;
        //
        //constructor.prototype = new Proxy();
        //constructor.prototype.constructor = proxy();

        //var proto = constructor.prototype;
        //constructor = proxy;
        //constructor.prototype = proto;
        //return constructor;
        //var test = new constructor('brandno');
        //test.walk(5);
    };


    return knife;
});
