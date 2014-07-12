Application.Collection.Locations = Parse.Collection.extend({
    className: "Location",
    model: Application.Model.Location,


    updateUserLocation: function(userLocation) {
        this.updateUserLatLng(userLocation);
        this.calculateDistances();
    },


    updateUserLatLng: function(userLocation) {
        this.userLatLng = new google.maps.LatLng(
            userLocation.get("latitude"),
            userLocation.get("longitude")
        );
    },


    calculateDistances: function() {
      this.forEach(this.calculateDistance, this);
    },


    calculateDistance: function(location) {
        var userLatLng = this.userLatLng;

        var locationLatitude = location.get("location").latitude,
            locationLongitude = location.get("location").longitude;

        var locationLatLng = new google.maps.LatLng(
            locationLatitude,
            locationLongitude
        );

        var distance = google.maps.geometry.spherical.computeDistanceBetween(
          userLatLng,
          locationLatLng
        );

        location.set("distance", distance);
    },


    closest: function(threshold) {
        var closest = this.filter(function(location) {
            return location.get("distance") < threshold;
        });

        return closest[0];
    }
});
