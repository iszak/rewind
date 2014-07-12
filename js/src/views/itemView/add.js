Application.View.Add = Backbone.Marionette.ItemView.extend({

    initialize: function(){
        this.render();
        this.on('show', this.renderMap);
    },

    events: {
        "click .button": "addLocation"        
    },

    render: function(){
        var template = Handlebars.compile( $("#add-template").html() );

        this.$el.html( template );
    },


    renderMap: function () {

        var lat = location.hash.split('/')[2];
        var lng = location.hash.split('/')[3];

        this.$el.find('.lat').val(lat);
        this.$el.find('.lng').val(lng);

        var latLng = new google.maps.LatLng(lat,lng);

        var mapOptions = {
            zoom: 8,
            center: latLng
        };

        this.map = new google.maps.Map(
            this.$el.find('#map-canvas').get(0),
            mapOptions
        );

        this.marker = new google.maps.Marker({
            position: latLng,
            map: this.map,
            draggable: true
        });



        this.map.setCenter(latLng);


        this.mapEvents(this.map, this.marker);
    },

    mapEvents: function(map, marker){

        var self = this;

        google.maps.event.addListener(this.marker, 'dragend', function(event){

            lat = event.latLng.lat().toString();
            lng = event.latLng.lng().toString();

            self.$el.find('.lat').val(lat);
            self.$el.find('.lng').val(lng);
            
        });

    },

    addLocation: function(){
     
        var Activity = new Application.Model.Activity();

        var lat = this.$el.find('.lat').val();
        var lng = this.$el.find('.lng').val();

        Activity.set("lat", lat);
        Activity.set("lng", lng);
         
        Activity.save(null, {
          success: function(Activity) {
            // Execute any logic that should take place after the object is saved.
            console.log('New object created with objectId: ' + Activity.id);
          },
          error: function(Activity, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and description.
            alert('Failed to create new object, with error code: ' + Activity.message);
          }
        });
    }

});