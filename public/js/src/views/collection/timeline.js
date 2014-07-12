Application.View.Collection.Timeline = Backbone.Marionette.CompositeView.extend({
    
    template: JST.timeline,

    //childView: Application.View.Item.TimelineActivity,

    events: {
        "click .tab" : "toggleTab"
    },

    
    initialize:function(){
        console.log("BITCH!");
    },


    onDomRefresh: function(){
        $(".tab-timeline").addClass("active");
    },


    toggleTab: function(evt){

        var type = $(evt.currentTarget).data("type");

        $(".tab").removeClass("active");

        $(evt.currentTarget).addClass("active");

        if (type === "map") {
            Application.router.navigate("/map", true);
        } else if (type === "timeline") {
            Application.router.navigate("/timeline", true);
        }

    }

});