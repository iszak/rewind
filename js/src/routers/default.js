Application.Router.Default = Backbone.Router.extend({
    routes: {
        '': 'index'
    },


    index: function() {
        var widget = new Application.View.Widget();

        widget.on('widget:action', function(){
            console.log('widget action called, call another view');
        });
    }
});
