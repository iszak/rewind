Application.View.Item.TimelineActivity = Backbone.Marionette.ItemView.extend({
    className: "timeline-activity moment",

    tagName: "li",

    template: JST.timelineItem,

    initialize: function(){
        console.log(this.model);
    },


    renderActivities: function() {
        if (this.map === undefined) {
            return;
        }

        if (this.collection.length === 0) {
            return;
        }

        this.collection.forEach(this.renderActivity, this);
    }
});
