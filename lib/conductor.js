define(['utils', 'aspect'], function (_, Aspect) {

    function Conductor() {
        this.instances = [];
        this.aspects = {};
    }

    Conductor.registerAspect = function(type, aspect) {
        if(!_.isUndefined(this.aspects[type]))
            return _.log("'type' aspect has already been registered.", type);

        Conductor.aspects[type] = aspect; 
        
        return function(name, callback) {
            
        }
    };

    Conductor.prototype = {
        registerAspect: function(observer) {
            this.aspects[observer.type] = new Aspect(observer);
        },
        registerMe
        observe: function(instance) {
            this.instances.push(instance);

            // wrap all the methods that have aspects registered to them on this instance
            this.methods.forEach(function(method, i){
                if(!_.isFunction(instance[method.name]))
                    return _.error("'{0}' is not a function. Only functions can be registered with an aspect.", method.name);

                var func = instance[method.name];
                instance[method.name] = function() {
                    var args = _.slice(arguments), aspect, returnValue;

                    // if this method has before aspects registered to it then let's call them
                    callAspects('before', args, instance);
                    aspect = method.aspects['before'];
                    if(!_.isUndefined(before))
                        aspect(args, func, method.name);
                    
                    // then let's call the method
                    returnValue = func.apply(instance, args);

                    // then hit the after aspec
                    aspect = this.aspects['after'];
                    if(method.aspects['after'] && !_.isUndefined(aspect)) {
                        aspect(args, method.name, returnValue);
                    }

                    return returnValue;
                }
            });

        },
        // observe: function(name, callback) {
        //     if(_.isUndefined(callback)) return _.error("Invalid argument. 'callback' is undefined.");
        //     if(!_.isFunction(callback)) return _.error("Invalid argument. 'callback' is not a function.");
        //     if(_.isUndefined(name)) return _.error("Invalid argument. 'name' is undefined.");
        //     if(!_.isString(name)) return _.error("Invalid argument type. 'name' must be a string.");
        //
        //     // Wrap the instance[name] method so that every time it's called we notify the observers.
        //     for(var i = 0, instance; instance = this.instances[i]; i++) {
        //         var original = instance[name], aspects;
        //         instance[name] = function() {
        //             var args = _.slice(arguments),
        //                 proceed = proceed(instance, original, function() {
        //
        //
        //                 });
        //
        //             // lets do the before aspect
        //             aspects = this.aspects['before'];
        //             if(aspects)
        //                 forEach(aspects, function(aspect) {
        //                     aspect.notify(instance, original, args, proceed);
        //                 });
        //         }
        //     }
        //
        // },
        unobserve: function() {

        },
        notify: function(instance, name) {

        },
        registerInstance: function(instance) {
            if(_.isUndefined(instance)) return _.error("Invalid argument. 'instance' is undefined.");
            this.instances.push(instance);
        }
    };

    Conductor.observers = {
        length: 0,
        splice: _.splice,
        register: function(observer, type) {
            if(_.isUndefined(observer)) return _.error("Invalid argument. 'observer' is undefined.");
            this[++length] = { observer: observer, type: type };
        },
        forEach: function(type, predicate) {
            var typePredicate = function(observer) { return observer.type === type};
            if(_.isUndefined(type))
                typePredicate = function() { return true; };

            return Array.prototype.forEach.call(Conductor.observers, function(observer) {
                if(typePredicate(observer)) predicate(observer);
            });
        }
    }

});