Application.View.Item.TimelineActivity = Backbone.Marionette.ItemView.extend({
    className: 'timeline-activity',

    template: JST.timeline

    // initialize: function () {
    //     this.location = this.options.location;

    //     this.listenTo(this.collection, "sync", this.renderActivities);

    // },

    // renderActivities: function() {
    //     if (this.collection.length === 0) {
    //         return;
    //     }

    //     this.collection.forEach(function(activity) {
    //         //var location = activity.get("location");

    //         if (location === undefined) {
    //             return;
    //         }

    //     }, this);
    // },
});
