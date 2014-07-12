Application.View.Activity = Backbone.Marionette.ItemView.extend({
    className: 'activity',


    render: function () {
        var template = Handlebars.compile($('#item-template').html());

        this.$el.html(template);
    }
});
