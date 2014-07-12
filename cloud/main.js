Parse.Cloud.define("closestLocation", function(request, response) {
    var query = new Parse.Query("Location");


    var location = new Parse.GeoPoint(
      request.params.latitude,
      request.params.longitude
    );

    query.withinKilometers(
      "location",
      location,
      request.params.distance
    );
    query.first({
        success: function(location) {
            response.success(location);
        },

        error: function() {
            response.error("closest location failed");
        }
    });
});
