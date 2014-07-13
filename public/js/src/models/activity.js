Application.Model.Activity = Parse.Object.extend({
    className: "Activity",

    toJSON: function() {
        var data = _.clone(this.attributes);

        data.createdAt = this.createdAt;
        data.updatedAt = this.updatedAt;

        if (data.location) {
            data.location = this.get("location").toJSON();
        } else {
            data.location = {
                name: ""
            };
        }

        return data;
    }
});
