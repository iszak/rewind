Application.Router.Default = Backbone.Marionette.AppRouter.extend({
    initialize: function() {
        var location = new Application.Model.Location();

        // location.watch(function() {
        //     var user = Parse.User.current();
        //     var locations = new Application.Collection.Locations();

        //     var promise = locations.fetch();

        //     promise.then(function(){
        //         var activity = new Application.Model.Activity({
        //             user: user.get('id'),
        //             location: locations.at(0).get('id')
        //         });

        //         activity.save();
        //     }, function(error) {
        //         alert(error);
        //     });
        // });

        var options = {
            location: location
        };

        this.processAppRoutes(
            new Application.Controller.Main(options),
            {
                "": "index",
                "map": "map",
                "timeline": "timeline"
            }
        );
    }
});
