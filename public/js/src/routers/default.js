Application.Router.Default = Backbone.Marionette.AppRouter.extend({
    initialize: function() {
        function onError(error) {
            alert(error);
        }

        function onDistanceUpdate(locations) {
            console.log("on distance update", locations);

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


        var user = Parse.User.current();
        var userLocation = new Application.Model.Location();
        userLocation.watch(
            // 10s
            1 * 1000
        );


        var locations = new Application.Collection.Locations({
            location: userLocation
        });

        locations.fetch();

        this.listenTo(
            locations,
            "change:distance",
            onDistanceUpdate
        );


        var options = {
            location: userLocation
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
