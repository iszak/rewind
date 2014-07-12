Application.Collection.Locations = Parse.Collection.extend({
    className: "Location",
    model: Application.Model.Location,


    initialize: function(options) {
        if (options.location) {
            this.location = options.location;
            this.location.on("change", _.bind(this.distanceUpdate, this));
        }
    },


    distanceUpdate: function(location) {
        var userLatLng = new google.maps.LatLng(
            location.get("latitude"),
            location.get("longitude")
        );

        this.forEach(function(location) {
            var point = location.get("location");

            if (point === undefined) {
                return;
            }

            var locationLatitude = point.latitude,
                locationLongitude = point.longitude;

            var locationLatLng = new google.maps.LatLng(
                locationLatitude,
                locationLongitude
            );

            var distance = google.maps.geometry.spherical.computeDistanceBetween(
              userLatLng,
              locationLatLng
            );

            location.set("distance", distance);
        });

        this.trigger("distance:update", this);
    },


    closest: function(threshold) {
        var closest = this.filter(function(location) {
            return location.get("distance") < threshold;
        });

        if (closest.length > 0) {
            return closest[0];
        } else {
            return null;
        }
    }
});
