Application.Model.Activity = Parse.Object.extend({
    className: "Activity",


    initialize: function() {
        this.on("change:user", this.updateACL);
    },


    updateACL: function() {
        var user = this.get("user");

        if (user === null) {
            return;
        }

        var acl = {};

        acl[user.id] = {
            "write": true,
            "read": true
        };

        this.setACL(acl);
    }
});
