Application.View.Body = Backbone.View.extend({
    el: 'body',


    events: {
        'dblclick': 'onDblClick'
    },


    initialize: function() {

    },


    onDblClick: function() {
        console.log('body is double clicked');
    }
});