define(['interpolate', 'utils'], function (str, _) {

    return function(observer, conductor) {
        conductor.registerAspect(observer);

        return function(name, callback) {
            conductor.observe(name, callback);
            return this;
        }
    }
});