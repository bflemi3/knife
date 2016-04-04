(function() {

    var knife = window.knife = {};

    var instances = [];

    knife.before = function(constructor, method, fn) {
        // wrap the constructor to get every instance created
        if(typeof constructor.constructor === 'function')
            ctor = constructor.constructor
            constructor.constructor = function() {
                var instance = ctor.apply(null, arguments);
                if(typeof instance[method] === 'function')
                    var impl = instance[method];
                    instance[method] = function() {
                        var args = Array.prototype.slice.apply(arguments),
                            metadata = {
                                arguments: args,
                                impl: impl
                            };

                        return metadata;
                    };
            };
    }

})();