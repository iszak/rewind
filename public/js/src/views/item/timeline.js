Application.View.Item.Timeline = Backbone.Marionette.ItemView.extend({
    template: JST.timeline,

    initialize: function(){
        console.log(this.collection);
    },


    events: {
        "click .tab" : "toggleTab"
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
