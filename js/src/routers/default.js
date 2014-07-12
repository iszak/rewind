Application.Router.Default = Backbone.Marionette.AppRouter.extend({

    initialize: function() {

        var location = new Application.Model.GeoLocation();

        var options = {
            location: location
        };

        this.processAppRoutes(
            new Application.Controller.Main(options),
            {
                "": "index",
                "map": "map"
            }
        );
    
    }

});