Application.View.Activities = Backbone.Marionette.CollectionView.extend({
    className: 'activities',


    render: function () {
        var template = Handlebars.compile($('#activities-template').html());

        this.$el.html(template);
    }
});
