require.config({
    baseUrl: 'node_modules'
});

require(['meld/meld'], function(meld) {

    // var Person = knife('Person', function(name) {
    //     this.name = name;
    //     this.walk = function(speed) {
    //         var newSpeed = speed + 1;
    //         _.log('new speed = {0}', newSpeed);
    //         return newSpeed;
    //     }
    // }).before('walk', function(subject) {
    //     // log arguments passed to walk invocation
    //     _.log(subject.args);
    //
    //     // if the first argument is one, let's proceeed with original invocation but change the arguments
    //     if(args[0] === 1)
    //         subject.proceed(10);
    //
    //     // returning true will proceed the invocation with the original arguments
    //     if(args[0] === 2)
    //         return true;
    //
    //     // while returning false will halt execution of the method invocation
    //     return false;
    // });

    function Person(name) {
        this.name = name;
        this.walk = function(speed) {
            var newSpeed = speed + 1;
            console.log('new speed = {0}', newSpeed);
            return newSpeed;
        }
    }

    var brandon = new Person('brandon');

    meld.before(brandon, 'walk', function(speed) {
        console.log('here');
    });


    // let's test it out

    brandon.walk(5);
});