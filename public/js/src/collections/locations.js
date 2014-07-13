Application.Collection.Locations = Parse.Collection.extend({
    className: "Location",
    model: Application.Model.Location,


    initialize: function(options) {
        if (options.location) {
            console.log(options.location);
            this.location = options.location;
        }
    },



    /**
     * Get closest
     *
     * @param  {Integer} threshold
     * @return {Application.Model.Location}
     */
    closest: function(threshold) {
        var userLatLng = new google.maps.LatLng(
            this.location.get("latitude"),
            this.location.get("longitude")
        );


        var closestLocation = null;
        this.forEach(function(location) {
            var point = location.get("location");

            // Should never happen
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


            // Not within threshold
            if (distance > threshold) {
                return;
            }

            // No existing closest
            if (closestLocation === null) {
                closestLocation = location;
            }

            // Closest
            if (distance < closestLocation.get("distance")) {
                closestLocation = location;
            }
        });

        return closestLocation;
    }
});
