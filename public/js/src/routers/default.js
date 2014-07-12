Application.Router.Default = Backbone.Marionette.AppRouter.extend({
    initialize: function() {
        var locations = new Application.Collection.Locations();


        var user = Parse.User.current();
        var userLocation = new Application.Model.Location();

        function onError(error) {
            alert(error);
        }

        function onLocationsLoad(locations) {
            userLocation.on("change", function(userLocation){
                onLocationChange(userLocation, locations);
            });
            userLocation.watch(
                // 10s
                10 * 1000
            );
        }

        function onLocationChange(userLocation, locations) {
            locations.updateUserLocation(userLocation);

            var closestLocation = locations.closest(
                100
            );

            if (closestLocation) {
                onClosestLocation(closestLocation);
            }
        }

        function onClosestLocation(closestLocation) {
            var activity = new Application.Model.Activity({
                user: user.get("id"),
                location: closestLocation.get("id")
            });

            activity.save().then(onActivitySave, onError);
        }

        function onActivitySave() {
            console.log("Activity saved");
        }


        locations.fetch().then(
            _.bind(onLocationsLoad, this),
            _.bind(onError, this)
        );


        var options = {
            location: location
        };

        this.processAppRoutes(
            new Application.Controller.Main(options),
            {
                "": "index",
                "login":"login",
                "start": "start",
                "map": "map",
                "timeline": "timeline"
            }
        );
    }
});
