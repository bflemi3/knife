define(['proceed', 'utils'], function(proceed, _) {

    return function(fn, args, proceed) {
        if(callback({ args: args, proceed: proceed}))
            proceed();
    }
});