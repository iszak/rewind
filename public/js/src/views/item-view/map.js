Application.View.Map = Backbone.Marionette.ItemView.extend({
    className: 'map',

    initialize: function () {
        this.render();

        this.on('show', this.renderMap);
        this.on('show', this.updateMap);
    },

    events: {
    },


    render: function () {
        var template = Handlebars.compile($('#map-template').html());

        this.$el.html(template);
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

        var mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(
                51.507222,
                -0.1275
            )
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
