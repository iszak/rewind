Application.Router.Default = Backbone.Marionette.AppRouter.extend({
    initialize: function() {
        // Load user and user location
        var user = Parse.User.current();
        var userLocation = new Application.Model.Location();


        // Load activities
        var activities = new Application.Collection.Activities();
            activities.query = new Parse.Query(Application.Model.Activity);

        activities.query.include(["location", "user"]);
        activities.query.equalTo("user", user);

        // Load locations
        var locations = new Application.Collection.Locations({
            location: userLocation
        });


        function onError(error) {
            alert(error);
        }


        var currentLocation = null;
        function onDistanceUpdate(locations) {
            var closestLocation = locations.closest(
                100
            );

            console.log("Closest location", closestLocation);

            if (closestLocation !== currentLocation) {
                onClosestLocation(closestLocation);
            }
        }


        function onClosestLocation(closestLocation) {
            var activity = new Application.Model.Activity();

            activity.set("user", user);
            activity.set("location", closestLocation);

            activity.save().then(onActivitySave, onError);
        }

        function onActivitySave(activity) {
            console.log("Activity saved");
            activities.add(activity);
        }


        this.listenTo(locations, "distance:update", onDistanceUpdate);

        // Fetch data
        locations.fetch();
        userLocation.fetch();

        // Watch user location
        userLocation.watch(
            // 60s
            10 * 1000
        );

        var options = {
            location: userLocation,
            locations: locations,
            activities: activities
        };


        this.processAppRoutes(
            new Application.Controller.Main(options),
            {
                ""         : "index",
                "login"    : "login",
                "start"    : "start",
                "map"      : "map",
                "timeline" : "timeline"
            }
        );
    }
});
