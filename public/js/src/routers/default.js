Application.Router.Default = Backbone.Marionette.AppRouter.extend({
    initialize: function() {
        var locations = new Application.Collection.Locations();


        var userLocation = new Application.Model.Location();

        function onError(error) {
            alert(error);
        }

        function onLocationsLoad() {
            userLocation.on("change", onLocationChange);
            userLocation.watch(5000);
        }

        function onLocationChange() {
            locations.updateUserLocation(userLocation);
        }


        locations.fetch().then(
            _.bind(onLocationsLoad, this),
            _.bind(onError, this)
        );



        // function onChange() {

        // }

        // this.listenTo(location, "change", onChange);

        // var user = Parse.User.current();
        // var locations = new Application.Collection.Locations();

        // var promise = locations.fetch();

        // promise.then(function(){
        //     var activity = new Application.Model.Activity({
        //         user: user.get("id"),
        //         location: locations.at(0).get("id")
        //     });

        //     activity.save();
        // }, function(error) {
        //     alert(error);
        // });


        var options = {
            location: location
        };

        this.processAppRoutes(
            new Application.Controller.Main(options),
            {
                "": "index",
                "map": "map",
                "timeline": "timeline"
            }
        );
    }
});
