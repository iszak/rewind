Application.View.Item.Start = Backbone.Marionette.ItemView.extend({
    
    template: JST.start,
    className: 'mainbg m-start',

    events: {
    	'click #start' : 'start'
    },


    start: function(){

    }

});
