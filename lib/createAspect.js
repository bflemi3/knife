define(['interpolate', 'utils'], function (str, _) {

    return function(observer, conductor) {
        conductor.observers.register(observer, 1);

        return function(name, callback) {
            conductor.observe(name, callback);
            return this;
        }
    }
});