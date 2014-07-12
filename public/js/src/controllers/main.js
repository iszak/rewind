Application.Controller.Main = Marionette.Controller.extend({


    /**
     * index - checks if a user is logged in.
     * if the aren"t show login view, if they are show
     * @return {undefined}
     */
    index: function() {
        if (!Parse.User.current()) {
            Application.router.navigate("/login", true);
        } else {
            Application.router.navigate("/start", true);
        }
    },


    /**
     * show login view
     * @return {[type]} [description]
     */
    login: function() {
        var loginView = new Application.View.Item.Login();
        Application.mainRegion.show(loginView);
    },


    /**
     * show start view
     * @return {[type]} [description]
     */
    start: function(){

        if (!Parse.User.current()) {
            return Application.router.navigate("/login", true);
        }

        var startView = new Application.View.Item.Start();
        Application.mainRegion.show(startView);
    },

    /**
     * Activities
     *
     * @return {undefined}
     */
    map: function() {

        if (!Parse.User.current()) {
            return Application.router.navigate("/login", true);
        }

        var location = this.options.location,
            activities = this.options.activities;

        activities.fetch();


        var model = new Application.Model.Activity();


        var mapView = new Application.View.Item.Map({
            collection : activities,
            location   : location,
            model      : model
        });

        Application.mainRegion.show(mapView);
    },


    /**
     * Timeline
     *
     * @return {Undefined}
     */
    timeline: function() {

        if (!Parse.User.current()) {
            return Application.router.navigate("/login", true);
        }

        var location = this.options.location,
            activities = this.options.activities;

        activities.fetch();

        var model = new Application.Model.Activity();


        var timelineView = new Application.View.Item.Map({
            collection : activities,
            location   : location,
            model      : model
        });

        Application.mainRegion.show(timelineView);

    }
});
