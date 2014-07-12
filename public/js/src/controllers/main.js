Application.Controller.Main = Marionette.Controller.extend({


    /**
     * index - checks if a user is logged in.
     * if the aren't show login view, if they are show
     * @return {undefined}
     */
    index: function() {
        if (!Parse.User.current()) {
            var loginView = new Application.View.Item.Login();
            Application.mainRegion.show(loginView);
        } else {
            window.location.hash = '/map';
        }
    },


    /**
     * Activities
     *
     * @return {undefined}
     */
    map: function() {
        var location = this.options.location;

        var collection = new Application.Collection.Activities();
        var model = new Application.Model.Activity();

        collection.query = new Parse.Query(Application.Model.Activity);

        collection.done(function() {
            var mapView = new Application.View.Item.Map({
                collection: collection,
                location: location,
                model: model
            });

            Application.mainRegion.show(mapView);
        });

        collection.error(function(error) {
            alert(error);
        });
    },


    timeline: function() {
        var collection = new Application.Collection.Activities();
        var model = new Application.Model.Activity();

        collection.query = new Parse.Query(Application.Model.Activity);

        collection.done(function(){
            var mapView = new Application.View.Item.Activities({
                collection: collection,
                model: model
            });

            Application.mainRegion.show(mapView);
        });

        collection.error(function(error) {
            alert(error);
        });
    }
});
