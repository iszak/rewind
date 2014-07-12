var Application = new Marionette.Application();

Application.addRegions({mainRegion: '#main'});
 
Application.View = {
    Layout: {},
    Composite: {},
    Collection: {},
    Item: {}
};

Application.Collection = {};
Application.Router     = {};
Application.Model      = {};

Application.Controller = {};


/**
 * Facebook / Parse Init
 */
Application.addInitializer(function() {

    Parse.initialize('tQwka3iy4tadatRg4ZPMmWwiR6W5ChAoMTfSkQbS', 'vPBf8a9VEX4FU4yRz2tsvYhlTnvj8hAuFIhmwZfr');

    window.fbAsyncInit = function() {
        Parse.FacebookUtils.init({
            appId      : '1436116333338502', 
            channelUrl : '', 
            status     : true, 
            cookie     : true, 
            xfbml      : true
        });
    };

    (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = '//connect.facebook.net/en_US/sdk.js';
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

});


Application.addInitializer(function(){
    // Initialize all your routes
    Application.router = new Application.Router.Default();
    Backbone.history.start();
});


$(window).load(function() {
    Application.start();
});