Application.Collection.Timline = Backbone.Marionette.CollectionView.extend({
    className: 'timeline',

    childView: Application.View.Item.TimelineActivity

});