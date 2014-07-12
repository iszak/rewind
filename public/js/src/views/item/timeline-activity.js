Application.View.Item.TimelineActivity = Backbone.Marionette.ItemView.extend({
    className: "timeline-activity",

    template: JST.timelineItem,

    initialize: function () {
        // this.location = this.options.location;

        // console.log(activity);

        // this.listenTo(this.collection, "sync", this.renderActivities);

        // this.listenTo(this.collection, "add", this.renderActivity);

    }


    // renderActivity: function(activity) {
    //     var location = activity.get("location");

    //     console.log(location);
    // },


    // renderActivities: function() {
    //     if (this.map === undefined) {
    //         return;
    //     }

    //     if (this.collection.length === 0) {
    //         return;
    //     }

    //     this.collection.forEach(this.renderActivity, this);
    // }
});
