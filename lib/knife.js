define(['createAspect', 'beforeObserver', 'conductor'], function(createAspect, beforeObserver, Conductor) {

    var knife = function(name, Ctor) {
        var conductor = new Conductor();

        function Proxy() {
            var instance = new (Function.prototype.bind.apply(Ctor, [this].concat(_.slice(arguments))));
            conductor.registerInstance(instance);
            return instance;
        }

        _.extend(Proxy, knife.prototype);

        return Proxy;
    };

    knife.prototype = {
        before: createAspect(beforeObserver, 1)
    };

    return knife;
});