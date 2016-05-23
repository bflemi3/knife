define(['createProceed', 'utils'], function(createProceed, _) {

    function knife(Ctor) {
        var methods = {};

        // create and register our aspects
        Proxy.before = createJoinPoint('before');
        Proxy.after = createJoinPoint('after');
        Proxy.exception = createJoinPoint('exception');

        function Proxy() {
            var instance = new (Function.prototype.bind.apply(Ctor, [this].concat(_.slice(arguments))));

            // any methods that are being cross cut need to be wrapped with a new function for this new instance
            _.forEach(methods, function(pointcut, name) {
                if(!_.isFunction(instance[name]))
                    return _.error("'{0}' is not a function. Only functions can be cross cut.", name);

                instance[name] = function() {
                    var args = _.slice(arguments), returnValue, proceed = createProceed(instance, instance[name], args), joinPoint;

                    try {
                        // if this method has before advice registered to it then let's call all of them
                        joinPoint = pointcut['before'];
                        if(pointcut['before'])
                            iterate(joinPoint, { arguments: args, method: name, proceed: proceed(joinPoint) });

                        // then let's call the method
                        returnValue = proceed()();
                    } catch(e) {
                        if(pointcut['exception'])
                            iterate(pointcut['exception'], { arguments: joinPoint.args, method: name, error: e });
                        throw e;
                    }

                    // then call the after join point if there are any
                    if(pointcut['after'])
                        iterate(pointcut['after'], { value: returnValue, arguments: args,  method: name });

                    return proceed();
                }
            });

            return instance;
        }

        function iterate(joinPoint, args) {
            _.forEach(joinPoint, function (advice) {
                advice(args);
            });
        }

        function createJoinPoint(type) {
            return function(name, advice) {
                if(!_.isFunction(advice))
                    return _.error("Invalid argument type. 'advice' must be a function.");

                if(!methods[name]) methods[name] = {};
                if(!methods[name][type]) methods[name][type] = [];

                methods[name][type].push(advice);
            };
        }

        return Proxy;
    }

    return knife;
});