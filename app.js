//require.config({
//    baseUrl: '/',
//    paths: {
//        interpolate: 'lib/interpolate'
//    }
//});

require(["knife"], function(knife) {
    //function Person(name) {
    //    this.name = name;
    //
    //    this.walk = function(speed) {
    //        return speed + 1;
    //    }
    //}

    var Person = knife(function(name){
        this.name = name
        this.walk = function(speed) {
            return speed + 1
        }
    }).before(function(metadata) { console.log(metadata); });

    //Person.prototype.jump = function(height) {
    //    return height + 1;
    //};
    //
    //knife.before([Person], "walk", function(metadata) {
    //    console.log(metadata);
    //});

    var brandon = new Person("brandon");
    brandon.walk(5);
});