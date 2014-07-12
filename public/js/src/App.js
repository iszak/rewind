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

    Parse.FacebookUtils.init({
        appId      : '1436116333338502',
        channelUrl : 'http://digital-memory.parseapp.com/channel.html',
        status     : true,
        cookie     : true,
        xfbml      : true
    });
});


// Router
Application.addInitializer(function(){
    Application.router = new Application.Router.Default();
});

// History
Application.addInitializer(function(){
    Backbone.history.start();
});


$(window).load(function() {
    Application.start();
});
