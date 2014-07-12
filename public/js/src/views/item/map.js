Application.View.Item.Map = Backbone.Marionette.ItemView.extend({
    className: 'map',

    template: JST.map,

    initialize: function () {
        this.on('show', this.renderMap);
        this.on('show', this.updateMap);
    },



    updateMap: function() {
        if (this.options.location.get('latitude') === null) {
            return;
        }


        var latLng = new google.maps.LatLng(
            this.options.location.get('latitude'),
            this.options.location.get('longitude')
        );

        this.marker = new google.maps.Marker({
            position: latLng,
            map: this.map,
            title: 'Hello World!'
        });

        this.map.setCenter(latLng);
    },


    renderMap: function () {

        var styles = [
          {
            'elementType': 'geometry.fill',
            'stylers': [
              { 'saturation': -98 }
            ]
          },{
            'featureType': 'road',
            'stylers': [
              { 'color': '#36393d' },
              { 'visibility': 'simplified' }
            ]
          },{
            'featureType': 'landscape',
            'stylers': [
              { 'color': '#3f4248' }
            ]
          },{
            'elementType': 'labels',
            'stylers': [
              { 'visibility': 'off' }
            ]
          },{
            'featureType': 'poi',
            'stylers': [
              { 'visibility': 'off' }
            ]
          },{
            'featureType': 'transit.station',
            'stylers': [
              { 'visibility': 'off' }
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
            this.$el.find('#map-canvas').get(0),
            mapOptions
        );
    },


    onShow: function() {
        var location = this.options.location;

        if (location.get('latitude') === null) {
            location.fetch().done(
                _.bind(this.updateMap, this)
            );
        }
    }
});
