Application.Controller.Main = Marionette.Controller.extend({
    initialize: function() {
        
    },



    index: function() {
        if (!Parse.User.current()) {
            var loginView = new Application.View.Login();

            Application.mainRegion.show(loginView);
        } else {
            window.location.hash = '/activities';
        }
    },



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
                }
                else {
                    window.location.hash = '';
                }

            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });




    },

    add: function(id) {
        if (Parse.User.current()) {

            var addActivity = new Application.View.Add();

            Application.mainRegion.show(addActivity);
        } else {
            window.location.hash = '';
        }
    }
});