define(['utils'], function (_) {

    return function createProceed(context, func, originalArgs) {
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
});