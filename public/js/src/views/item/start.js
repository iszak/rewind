Application.View.Item.Start = Backbone.Marionette.ItemView.extend({
    
    template: JST.start,
    className: 'mainbg m-start',

    events: {
    	'click #start' : 'start'
    },


    /**
     * redirect to timeline page
     * @return {undefined}
     */
    start: function(){
    	return Application.router.navigate('/timeline', true);
    }

});
