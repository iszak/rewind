Application.View.Item.Map = Backbone.Marionette.ItemView.extend({
    className: "map",

    template: JST.map,

    initialize: function () {
        this.location = this.options.location;

        this.listenTo(this.location, "change", this.renderUser);
        this.listenTo(this.collection, "sync", this.renderActivities);

        this.on("show", this.renderMap);
    },


    renderActivities: function() {
        if (this.map === undefined) {
            return;
        }

        if (this.collection.length === 0) {
            return;
        }

        var markers = [];
        this.collection.forEach(function(activity) {
            var location = activity.get("location"),
                image = "img/venue.png";

            if (location === undefined) {
                return;
            }

            var latLng = new google.maps.LatLng(
                location.get("location").latitude,
                location.get("location").longitude
            );

            var marker = new google.maps.Marker({
                position: latLng,
                map: this.map,
                title: location.get("name"),
                icon: image
            });

            markers.push(marker);
        }, this);
    },


    renderUser: function() {
        if (this.map === undefined) {
            return;
        }

        if (this.location.get("latitude") === null) {
            return;
        }


        var latLng = new google.maps.LatLng(
            this.location.get("latitude"),
            this.location.get("longitude")
        );


        if (this.marker === undefined) {
            var image = "img/man.png";

            this.marker = new google.maps.Marker({
                map: this.map,
                title: "Your Location",
                icon: image
            });
        }

        this.marker.setPosition(latLng);

        this.map.setCenter(latLng);
    },


    renderMap: function () {
        var styles = [
          {
            "elementType": "geometry.fill",
            "stylers": [
              { "saturation": -98 }
            ]
          },{
            "featureType": "road",
            "stylers": [
              { "color": "#36393d" },
              { "visibility": "simplified" }
            ]
          },{
            "featureType": "landscape",
            "stylers": [
              { "color": "#3f4248" }
            ]
          },{
            "elementType": "labels",
            "stylers": [
              { "visibility": "off" }
            ]
          },{
            "featureType": "poi",
            "stylers": [
              { "visibility": "off" }
            ]
          },{
            "featureType": "transit.station",
            "stylers": [
              { "visibility": "off" }
            ]
          },{
          }
        ];

        var mapOptions = {
            zoom: 16,
            center: new google.maps.LatLng(
                51.507222,
                -0.1275
            ),
            styles: styles,
            disableDefaultUI: true
        };

        this.map = new google.maps.Map(
            this.$el.find("#map-canvas").get(0),
            mapOptions
        );

        this.renderUser();
        this.renderUser();
    }
});
