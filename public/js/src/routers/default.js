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



        var lastLocation = null;

        // Wait for 5 (2 x sync), (3 x fetch)
        var count = 0;
        function onLoad() {
            // Hack for jQuery.when() not working with parse
            if (++count < 5) {
                return;
            }

            // Set default
            if (lastLocation == null) {
                var lastActivity = activities.at(0);

                if (lastActivity) {
                    lastLocation = lastActivity.get("location");
                } else {
                    lastLocation = null;
                }
            }



            var closestLocation = locations.closest(
                100
            );

            if (closestLocation == null) {
                return;
            }

            if (lastLocation) {
                // Same closest location
                if (closestLocation.get("name") ===
                    lastLocation.get("name")) {
                    return;
                }
            }

            lastLocation = closestLocation;



            onClosestLocation(closestLocation);
        }


        function onClosestLocation(closestLocation) {
            var activity = new Application.Model.Activity();

            activity.set("user", user);
            activity.set("location", closestLocation);

            activity.save().then(onActivitySave);
        }

        function onActivitySave(activity) {
            activities.add(activity);
        }


        // Hack for Facebook batch load
        userLocation.fetch().then(onLoad);
        locations.fetch().then(onLoad);
        activities.fetch().then(onLoad);
        activities.on("sync", onLoad);


        userLocation.on("change", onLoad);

        // Watch user locgation
        userLocation.watch(
            // 60s
            5 * 1000
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
