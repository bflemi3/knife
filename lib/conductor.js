define(['utils'], function (_) {

    function Conductor() {
        this.instances = [];
        this.observers = {};
    }

    Conductor.prototype = {
        observe: function(name, callback) {
            if(_.isUndefined(callback)) return _.error("Invalid argument. 'callback' is undefined.");
            if(!_.isFunction(callback)) return _.error("Invalid argument. 'callback' is not a function.");
            if(_.isUndefined(name)) return _.error("Invalid argument. 'name' is undefined.");

            // Wrap the instance[name] method so that every time it's called we notify the observers.
            for(var i = 0, instance; instance = this.instances[i]; i++) {
                var original = instance[name];
                instance[name] = function() {
                    var args = _.slice(arguments),
                        proceed = proceed(instance, original, function() {


                        });

                    // There has to be an order in which observers are notified.
                    // First let's take care of the before (1) observers
                    if(this.observers[0].notify(original, args, proceed))
                        proceed();
                }
            }

        },
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