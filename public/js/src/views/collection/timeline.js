Application.View.Collection.Timeline = Backbone.Marionette.CompositeView.extend({
    
    template: JST.timeline,

    childView: Application.View.Item.TimelineActivity,
    childViewContainer: ".times",
    className: "timeline-container",

    events: {
        "click .tab" : "toggleTab"
    },


    initialize:function(){
    },


    onDomRefresh: function(){
        var self = this;
        
        $(".tab-timeline").addClass("active");
        $(".time").text( this.calculateCurrentTime() );

        setInterval(function(){
            $(".time").text( self.calculateCurrentTime() );
        }, 1000);
    },


    /**
     * calculates the current time
     * @return {string} time
     */
    calculateCurrentTime: function(){
        var dt = new Date();
        var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
        return time;
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