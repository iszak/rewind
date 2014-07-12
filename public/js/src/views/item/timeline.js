Application.View.Item.Timeline = Backbone.Marionette.ItemView.extend({
    template: JST.timeline,

    initialize: function(){
        console.log(this.collection);
    },

    events: {
    }
});
