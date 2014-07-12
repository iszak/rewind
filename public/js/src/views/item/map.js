Application.View.Item.Map = Backbone.Marionette.ItemView.extend({
    className: "map",

    template: JST.map,

    markers: [],

    events: {
        "click .tab" : "toggleTab"
    },

    initialize: function () {
        this.location = this.options.location;

        this.listenTo(this.location, "change", this.renderUser);
        this.listenTo(this.collection, "sync", this.renderActivities);

        this.listenTo(this.collection, "add", this.renderActivity);

        this.on("show", this.renderMap);
    },


    renderActivity: function(activity) {
        var location = activity.get("location");

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
            icon: "img/venue.png"
        });

        this.markers.push(marker);


        var markerLenth = this.markers.length;
        if (markerLenth === 1) {
            console.log("return");
            return;
        }


        var path = new google.maps.Polyline({
            path: [
                this.markers[markerLenth - 2].getPosition(),
                this.markers[markerLenth - 1].getPosition()
            ],
            geodesic: true,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.8,
            strokeWeight: 2
        });

        path.setMap(this.map);
    },

    onDomRefresh: function(){
        $(".tab-map").addClass("active");
    },


    toggleTab: function(evt){

        var type = $(evt.currentTarget).data("type");

        $(".tab").removeClass("active");

        $(evt.currentTarget).addClass("active");

        if (type === "map") {
            Application.router.navigate("/map", true);
        } else if (type === "timeline") {
            Application.router.navigate("/timeline", true);
        }

    },


    renderActivities: function() {
        if (this.map === undefined) {
            return;
        }

        if (this.collection.length === 0) {
            return;
        }

        this.collection.forEach(this.renderActivity, this);

        console.log(this.collection.length);
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
            this.marker = new google.maps.Marker({
                map: this.map,
                title: "Your Location",
                icon: "img/man.png"
            });
        }

        this.marker.setPosition(latLng);

        this.map.setCenter(latLng);
    },


    renderMap: function () {
        var styles = [{
            "elementType": "geometry.fill",
            "stylers": [{
                "saturation": -98
            }]
        }, {
            "featureType": "road",
            "stylers": [{
                "color": "#36393d"
            }, {
                "visibility": "simplified"
            }]
        }, {
            "featureType": "landscape",
            "stylers": [{
                "color": "#3f4248"
            }]
        }, {
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit.station",
            "stylers": [{
                "visibility": "off"
            }]
        }, {}];


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
