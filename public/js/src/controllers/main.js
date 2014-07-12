Application.Controller.Main = Marionette.Controller.extend({


    /**
     * index - checks if a user is logged in.
     * if the aren't show login view, if they are show
     * @return {undefined}
     */
    index: function() {
        if (!Parse.User.current()) {
            var loginView = new Application.View.Login();
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
    activities: function() {
        var location = this.options.location;
        var collection = new Application.Collection.Activities();
        var model = new Application.Model.Activity();

        collection.query = new Parse.Query(Application.Model.Activity);

        collection.fetch({
            success: function(collection) {
                if (Parse.User.current()) {
                    var mapView = new Application.View.Map({
                        collection: collection,
                        location: location,
                        model: model
                    });

                    Application.mainRegion.show(mapView);
                } else {
                    window.location.hash = '';
                }

            },
            error: function(error) {
                console.log(error);
            }
        });

    }

});
