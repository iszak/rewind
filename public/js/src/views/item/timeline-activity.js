Application.View.Item.TimelineActivity = Backbone.Marionette.ItemView.extend({
    className: "timeline-activity",

    template: JST.timelineItem,

    initialize: function () {
        this.location = this.options.location;

        console.log(this.model);

        // var parseObj = Parse.Object.extend("Location");

        // new Parse.Query(parseObj)
        //   .include("Location")
        //   .find(function (data) {
        //     //data.get("location").get("name");
        //     console.log(data);
        //   });
        // console.log(this.model.attributes);

        //this.listenTo(this.collection, "sync", this.renderActivities);

        //this.listenTo(this.collection, "add", this.renderActivity);
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
