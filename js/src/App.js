var Application = new Marionette.Application();

Application.addRegions({mainRegion: "#main"});
 
Application.View = {
    Layout: {},
    Composite: {},
    Collection: {},
    Item: {},
};

Application.Collection = {};
Application.Router     = {};
Application.Model      = {};


Application.Controller = {};

Application.addInitializer(function() {

    Parse.initialize("whobwGO4S8YZKOOF9jrBEkiXYyJ2c9UI9WLKhr5t", "8NoGm9zXSDZvx64CX6KVPdIgLObjXc3GSBmXlqnB");

    window.fbAsyncInit = function() {
        Parse.FacebookUtils.init({
            appId      : '305718059581705', 
            channelUrl : '//nanny.app.dev/channel.html', 
            status     : true, 
            cookie     : true, 
            xfbml      : true
        });
    };
    // Initialize all your routes
    Application.router = new Application.Router.Default();

    Backbone.history.start();


});

$(window).load(function() {
    Application.start();
});