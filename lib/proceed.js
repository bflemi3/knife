define(['utils'], function(_) {

    return function(instance, fn, afterCallback) {

        return function() {
            var args = _.slice(arguments);
            return args.length ? fn.apply(instance, args) : fn.apply(instance);;
        }
    }
});