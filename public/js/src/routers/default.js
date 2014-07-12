Application.Router.Default = Backbone.Marionette.AppRouter.extend({
    initialize: function() {
        function onError(error) {
            alert(error);
        }

        function onDistanceUpdate(locations) {
            var closestLocation = locations.closest(
                100
            );

            if (closestLocation) {
                onClosestLocation(closestLocation);
            }
        }


        function onClosestLocation(closestLocation) {
            var activity = new Application.Model.Activity({
                user: user,
                location: closestLocation
            });

            activity.save().then(onActivitySave, onError);
        }

        function onActivitySave() {
            console.log("Activity saved");
        }


        var user = Parse.User.current();
        var userLocation = new Application.Model.Location();

        userLocation.watch(
            // 60s
            60 * 1000
        );


        var locations = new Application.Collection.Locations({
            location: userLocation
        });

        locations.fetch();

        this.listenTo(locations, "distance:update", onDistanceUpdate);


        var options = {
            location: userLocation
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
