Application.View.Collection.Activities = Backbone.Marionette.CollectionView.extend({
    className: 'activities',

    childView: Application.View.Activity,

    render: function () {
        var template = Handlebars.compile($('#activities-template').html());

        this.$el.html(template);
    }
});
