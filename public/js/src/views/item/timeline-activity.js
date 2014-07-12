Application.View.Item.TimelineActivity = Backbone.Marionette.ItemView.extend({
    className: "timeline-activity",

    template: JST.timelineItem,


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
