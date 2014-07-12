Application.View.Widget = Backbone.View.extend({
    el: '.widget',


    events: {
        'click .widget-button': 'onClick'
    },


    initialize: function() {

    },


    onClick: function() {
        this.trigger('widget:action');
    }
});