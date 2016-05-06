define(['interpolate', 'core', 'utils'], function (str, core, _) {

    return function(observer) {
        var self = this;
        self.conductor.observers.register(observer, 1);

        return function(name, callback) {
            self.conductor.observe(name, callback);
            return this;
        }
    }
});