var Application = _.extend({
    Collection: {},
    Model: {},
    View: {},
    Router: {}
}, Backbone.Events);


// Custom initializer
Application.on('initialize', function() {
    Application.router = new Application.Router.Default();
});



Application.on('initialize:after', function() {
    // Start history tracking
    Backbone.history.start({
        root: '/',
        pushState: false,
        hashChange: true
    });
});



$(function(){
    Application.trigger('initialize:before');
    Application.trigger('initialize');
    Application.trigger('initialize:after');
});
