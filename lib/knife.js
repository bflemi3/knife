define(['createAspect', 'observers/beforeObserver', 'conductor', 'utils'], function(createAspect, beforeObserver, Conductor, _) {

    function knife(Ctor) {
        var methods = {};

        // create and register our aspects
        Proxy.before = createAspect('before');
        Proxy.after = createAspect('after');

        function Proxy() {
            var instance = new (Function.prototype.bind.apply(Ctor, [this].concat(_.slice(arguments))));

            // all methods that have been registered with any of the aspects need to be wrapped with an observer for this new instance
            _.forEach(methods, function(aspects, name) {
                if(!_.isFunction(instance[name]))
                    return _.error("'{0}' is not a function. Only functions can be registered with an aspect.", method.name);

                instance[name] = function() {
                    var args = _.slice(arguments), returnValue, proceed = createProceed(instance, instance[name], args);

                    // if this method has before aspects registered to it then let's call them
                    // IDEA: let's parse the function signature to return an object of the arguments passed (ie: { arg1: value, arg2: value }
                    if(aspects['before'])
                        iterate(aspects['before'], { arguments: args, method: method.name, proceed: proceed });

                    // then let's call the method
                    returnValue = proceed();//func.apply(instance, args);

                    // then hit the after aspect
                    if(aspects['after'])
                        iterate(aspects['after'], { value: returnValue, method: method.name, arguments: args });

                    return proceed();
                }
            });

            function createProceed(context, func, originalArgs) {
                var returnValue;

                return function() {
                    if(returnValue) return returnValue;

                    var args = _.slice(arguments);

                    // if we have new arguments passed in then we'll call func with the new arguments
                    // otherwise we'll pass the original arguments
                    returnValue = func.apply(context, args.length ? args : originalArgs);
                    return returnValue;
                }
            }

            return instance;
        }

        function createAspect(type) {
            return function(name, callback) {
                if(!_.isFunction(callback))
                    return _.error("Invalid argument type. 'callback' must be a function.");

                if(!methods[name]) methods[name] = {};
                if(!methods[name][type]) methods[name][type] = [];

                methods[name][type].push(callback);
            };
        }

        return Proxy;
    }

    return knife;
});