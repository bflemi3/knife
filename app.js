require.config({
    baseUrl: 'lib'
});

require(["knife", "utils"], function(knife, _) {

    var Person = knife('Person', function(name) {
        this.name = name;
        this.walk = function(speed) {
            var newSpeed = speed + 1;
            _.log("new speed = {0}", newSpeed);
            return newSpeed;
        }
    }).before('walk', function(subject) {
        // log arguments passed to walk invocation
        _.log(subject.args);

        // if the first argument is one, let's proceeed with original invocation but change the arguments
        if(args[0] === 1)
            subject.proceed(10);

        // returning true will proceed the invocation with the original arguments
        if(args[0] === 2)
            return true;

        // while returning false will halt execution of the method invocation
        return false;
    });

    // let's test it out
    var brandon = new Person("brandon");
    brandon.walk(5);
});